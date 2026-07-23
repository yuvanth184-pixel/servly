import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getAdminFromSession(session: string): string | null {
  try {
    const decoded = JSON.parse(atob(session));
    if (decoded.role !== "admin") return null;
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const [
      totalCustomers,
      totalTechnicians,
      activeBookings,
      completedThisMonth,
      revenueResult,
      pendingPayments,
      avgRatingResult,
      newCustomersThisMonth,
      recentBookings,
      recentPayments,
      monthlyRevenueRaw,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "customer" } }),
      prisma.user.count({ where: { role: "technician" } }),
      prisma.booking.count({
        where: { status: { in: ["pending", "confirmed", "in_progress"] } },
      }),
      prisma.booking.count({
        where: { status: "completed", createdAt: { gte: startOfMonth } },
      }),
      prisma.payment.aggregate({
        where: { status: "completed" },
        _sum: { amount: true },
      }),
      prisma.payment.count({ where: { status: "pending" } }),
      prisma.technicianProfile.aggregate({ _avg: { rating: true } }),
      prisma.user.count({
        where: { role: "customer", createdAt: { gte: startOfMonth } },
      }),
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          customer: { select: { name: true, phone: true } },
          service: { select: { name: true } },
        },
      }),
      prisma.payment.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          booking: { select: { id: true } },
          customer: { select: { name: true } },
        },
      }),
      prisma.payment.groupBy({
        by: ["createdAt"],
        where: { status: "completed", createdAt: { gte: sixMonthsAgo } },
        _sum: { amount: true },
      }),
    ]);

    const monthlyRevenueMap: Record<string, number> = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      monthlyRevenueMap[key] = 0;
    }

    for (const entry of monthlyRevenueRaw) {
      const d = new Date(entry.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in monthlyRevenueMap) {
        monthlyRevenueMap[key] += entry._sum.amount ?? 0;
      }
    }

    const monthlyRevenue = Object.entries(monthlyRevenueMap).map(([key, value]) => {
      const [year, month] = key.split("-").map(Number);
      return { month: monthNames[month], value };
    });

    const recentActivity = {
      bookings: recentBookings.map((b: (typeof recentBookings)[number]) => ({
        id: b.id,
        customerName: b.customer.name ?? b.customer.phone,
        serviceName: b.service.name,
        status: b.status,
        createdAt: b.createdAt,
      })),
      payments: recentPayments.map((p: (typeof recentPayments)[number]) => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        customerName: p.customer.name,
        createdAt: p.createdAt,
      })),
    };

    return NextResponse.json({
      totalCustomers,
      totalTechnicians,
      activeBookings,
      completedThisMonth,
      totalRevenue: revenueResult._sum.amount ?? 0,
      pendingPayments,
      avgRating: avgRatingResult._avg.rating ?? 0,
      newCustomersThisMonth,
      recentActivity,
      monthlyRevenue,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
