import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getUserIdFromSession(session: string): string | null {
  try {
    const decoded = JSON.parse(atob(session));
    return decoded.userId || null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ plan: "free" });
    }

    const userId = getUserIdFromSession(sessionCookie);
    if (!userId) {
      return NextResponse.json({ plan: "free" });
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { plan: true, status: true, endDate: true },
    });

    if (!subscription || subscription.status !== "active") {
      return NextResponse.json({ plan: "free" });
    }

    if (subscription.endDate && new Date(subscription.endDate) < new Date()) {
      return NextResponse.json({ plan: "free" });
    }

    return NextResponse.json({ plan: subscription.plan });
  } catch {
    return NextResponse.json({ plan: "free" });
  }
}
