import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createCar, listCars } from "@/lib/storage";
import type { CarInput } from "@/lib/cars";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";

  if (all) {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
    }
    const cars = await listCars();
    return NextResponse.json({ cars });
  }

  const cars = await listCars({ publishedOnly: true });
  return NextResponse.json({ cars });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }

  const body = (await request.json()) as CarInput;
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Titolo obbligatorio" }, { status: 400 });
  }

  const car = await createCar(body);
  return NextResponse.json({ car });
}
