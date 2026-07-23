import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany({
      select: { id: true, phone: true, name: true, role: true },
    });
    return NextResponse.json({ connected: true, userCount: count, users });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ connected: false, error: message }, { status: 500 });
  }
}
