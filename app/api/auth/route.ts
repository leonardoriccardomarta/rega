import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getAdminPassword,
  timingSafeEqual,
} from "@/lib/auth";

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
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: expected,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
    secure: true,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: true,
  });
  return response;
}
