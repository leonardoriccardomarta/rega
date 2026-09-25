import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getAdminPassword,
  timingSafeEqual,
} from "@/lib/auth";

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = (body.password ?? "").trim();
  const expected = getAdminPassword();

  if (!password || !timingSafeEqual(password, expected)) {
    return NextResponse.json(
      { error: "Password non valida" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, expected, cookieOptions(60 * 60 * 24 * 60));
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", cookieOptions(0));
  return response;
}
