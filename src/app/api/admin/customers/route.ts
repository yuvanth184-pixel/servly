import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const customers = await prisma.user.findMany({
      where: { role: "customer" },
      select: {
        id: true,
        phone: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        subscription: {
          select: { plan: true, status: true, amount: true },
        },
        _count: { select: { bookings: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ customers });
  } catch (error) {
    console.error("List customers error:", error);
    return NextResponse.json({ error: "Failed to list customers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phone, password, name } = await request.json();

    if (!phone || typeof phone !== "string" || phone.length !== 10) {
      return NextResponse.json({ error: "Valid 10-digit phone number required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      return NextResponse.json({ error: "Account already exists with this phone number" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await prisma.user.create({
      data: { phone, password: hashedPassword, name: name || null, role: "customer" },
      select: { id: true, phone: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Create customer error:", error);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, name, phone } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    if (phone && (typeof phone !== "string" || phone.length !== 10)) {
      return NextResponse.json({ error: "Valid 10-digit phone number required" }, { status: 400 });
    }

    if (phone) {
      const existing = await prisma.user.findFirst({
        where: { phone, NOT: { id: userId } },
      });
      if (existing) {
        return NextResponse.json({ error: "Phone number already in use" }, { status: 409 });
      }
    }

    const customer = await prisma.user.update({
      where: { id: userId },
      data: { name, phone },
      select: { id: true, phone: true, name: true, role: true },
    });

    return NextResponse.json({ customer });
  } catch (error) {
    console.error("Update customer error:", error);
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    let userId: string | undefined;

    if (request.headers.get("content-type")?.includes("application/json")) {
      const body = await request.json();
      userId = body.userId;
    } else {
      userId = url.searchParams.get("userId") ?? undefined;
    }

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete customer error:", error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
