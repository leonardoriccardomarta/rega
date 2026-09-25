import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import type { CarInput } from "@/lib/cars";
import { deleteCar, getCar, setFeaturedCar, updateCar } from "@/lib/storage";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const car = await getCar(id);
  if (!car || !car.published) {
    if (!(await isAdminAuthenticated()) || !car) {
      return NextResponse.json({ error: "Non trovato" }, { status: 404 });
    }
  }
  return NextResponse.json({ car });
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json()) as Partial<CarInput> & {
    setFeatured?: boolean;
  };

  if (body.setFeatured === true) {
    const car = await setFeaturedCar(id);
    if (!car) {
      return NextResponse.json({ error: "Non trovato" }, { status: 404 });
    }
    return NextResponse.json({ car });
  }

  const car = await updateCar(id, body);
  if (!car) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }
  return NextResponse.json({ car });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autenticato" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteCar(id);
  if (!ok) {
    return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
