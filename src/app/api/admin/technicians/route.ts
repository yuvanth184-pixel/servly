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

    const technicians = await prisma.user.findMany({
      where: { role: "technician" },
      select: {
        id: true,
        phone: true,
        name: true,
        email: true,
        createdAt: true,
        technicianProfile: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ technicians });
  } catch (error) {
    console.error("List technicians error:", error);
    return NextResponse.json({ error: "Failed to list technicians" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phone, password, name, specialties, certifications } = await request.json();

    if (!phone || typeof phone !== "string" || phone.length !== 10) {
      return NextResponse.json({ error: "Valid 10-digit phone number required" }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (!specialties || typeof specialties !== "string") {
      return NextResponse.json({ error: "Specialties are required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      return NextResponse.json({ error: "Account already exists with this phone number" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const technician = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        name: name || null,
        role: "technician",
        technicianProfile: {
          create: {
            specialties,
            certifications: certifications || null,
          },
        },
      },
      select: {
        id: true,
        phone: true,
        name: true,
        role: true,
        technicianProfile: true,
      },
    });

    return NextResponse.json({ technician });
  } catch (error) {
    console.error("Create technician error:", error);
    return NextResponse.json({ error: "Failed to create technician" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, specialties, certifications, status } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const profile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!profile) {
      return NextResponse.json({ error: "Technician profile not found" }, { status: 404 });
    }

    const updated = await prisma.technicianProfile.update({
      where: { userId },
      data: {
        ...(specialties !== undefined && { specialties }),
        ...(certifications !== undefined && { certifications }),
        ...(status !== undefined && { status }),
      },
    });

    return NextResponse.json({ technicianProfile: updated });
  } catch (error) {
    console.error("Update technician error:", error);
    return NextResponse.json({ error: "Failed to update technician" }, { status: 500 });
  }
}
