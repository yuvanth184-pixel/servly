import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: "success" });
  response.cookies.set("session", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });
  return response;
}
