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

    const bookings = await prisma.booking.findMany({
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        technician: { select: { id: true, name: true, phone: true } },
        service: { select: { id: true, name: true, basePrice: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("List bookings error:", error);
    return NextResponse.json({ error: "Failed to list bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { customerId, technicianId, serviceId, scheduledDate, scheduledTime, address, notes, totalAmount } =
      await request.json();

    if (!customerId || !serviceId || !scheduledDate || !scheduledTime || !address || totalAmount === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [customer, service] = await Promise.all([
      prisma.user.findUnique({ where: { id: customerId } }),
      prisma.service.findUnique({ where: { id: serviceId } }),
    ]);

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    if (technicianId) {
      const technician = await prisma.user.findUnique({ where: { id: technicianId } });
      if (!technician || technician.role !== "technician") {
        return NextResponse.json({ error: "Invalid technician" }, { status: 400 });
      }
    }

    const booking = await prisma.booking.create({
      data: {
        customerId,
        technicianId: technicianId || null,
        serviceId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        address,
        notes: notes || null,
        totalAmount,
      },
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        technician: { select: { id: true, name: true, phone: true } },
        service: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, status, technicianId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        ...(status !== undefined && { status }),
        ...(technicianId !== undefined && { technicianId }),
      },
      include: {
        customer: { select: { id: true, name: true, phone: true } },
        technician: { select: { id: true, name: true, phone: true } },
        service: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Update booking error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
