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

    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("List services error:", error);
    return NextResponse.json({ error: "Failed to list services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, category, basePrice, duration, image, slug } = await request.json();

    if (!name || !description || !category || !basePrice || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (slug) {
      const existing = await prisma.service.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json({ error: "Service with this slug already exists" }, { status: 409 });
      }
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        category,
        basePrice,
        duration,
        image: image || null,
        slug: slug || null,
      },
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie || !getAdminFromSession(sessionCookie)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { serviceId, isActive } = await request.json();

    if (!serviceId || typeof isActive !== "boolean") {
      return NextResponse.json({ error: "serviceId and isActive (boolean) required" }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id: serviceId },
      data: { isActive },
    });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Toggle service error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}
