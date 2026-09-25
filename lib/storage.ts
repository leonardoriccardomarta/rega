import {
  DEFAULT_CARS,
  normalizePhotos,
  type CarInput,
  type CarListing,
} from "@/lib/cars";
import { ensureSchema, sql } from "@/lib/db";

type CarRow = {
  id: string;
  title: string;
  description: string | null;
  subito_url: string | null;
  price: number;
  year: number;
  km_label: string;
  fuel: string;
  transmission: string;
  location: string;
  brand: string | null;
  model: string | null;
  version: string | null;
  body_type: string | null;
  doors: string | null;
  seats: string | null;
  color: string | null;
  emission_class: string | null;
  condition: string | null;
  registration: string | null;
  badge: string | null;
  photo_url: string | null;
  photos: unknown;
  published: boolean;
  sort_order: number;
  created_at: string | Date;
  updated_at: string | Date;
};

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function toIso(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

function parsePhotos(raw: unknown, fallbackUrl?: string | null): string[] {
  if (Array.isArray(raw)) {
    return normalizePhotos(
      raw.filter((item): item is string => typeof item === "string"),
      fallbackUrl,
    );
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        return normalizePhotos(
          parsed.filter((item): item is string => typeof item === "string"),
          fallbackUrl,
        );
      }
    } catch {
      // ignore
    }
  }
  return normalizePhotos(undefined, fallbackUrl);
}

function mapRow(row: CarRow): CarListing {
  const photos = parsePhotos(row.photos, row.photo_url);
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    subitoUrl: row.subito_url ?? undefined,
    price: Number(row.price) || 0,
    year: Number(row.year) || new Date().getFullYear(),
    kmLabel: row.km_label ?? "",
    fuel: row.fuel ?? "",
    transmission: row.transmission ?? "",
    location: row.location ?? "Treviglio (BG)",
    brand: row.brand ?? undefined,
    model: row.model ?? undefined,
    version: row.version ?? undefined,
    bodyType: row.body_type ?? undefined,
    doors: row.doors ?? undefined,
    seats: row.seats ?? undefined,
    color: row.color ?? undefined,
    emissionClass: row.emission_class ?? undefined,
    condition: row.condition ?? undefined,
    registration: row.registration ?? undefined,
    badge: row.badge ?? undefined,
    photoUrl: photos[0],
    photos,
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order) || 1,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function makeId(title: string) {
  const base = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "auto"}-${Date.now().toString(36)}`;
}

async function seedIfEmpty() {
  const db = sql();
  const countRows = (await db`SELECT COUNT(*)::int AS count FROM cars`) as {
    count: number;
  }[];
  if ((countRows[0]?.count ?? 0) > 0) return;

  for (const car of DEFAULT_CARS) {
    const photos = normalizePhotos(car.photos, car.photoUrl);
    await db`
      INSERT INTO cars (
        id, title, description, subito_url, price, year, km_label, fuel,
        transmission, location, brand, model, version, body_type, doors,
        seats, color, emission_class, condition, registration, badge,
        photo_url, photos, published, sort_order, created_at, updated_at
      ) VALUES (
        ${car.id},
        ${car.title},
        ${car.description ?? null},
        ${car.subitoUrl ?? null},
        ${car.price},
        ${car.year},
        ${car.kmLabel},
        ${car.fuel},
        ${car.transmission},
        ${car.location},
        ${car.brand ?? null},
        ${car.model ?? null},
        ${car.version ?? null},
        ${car.bodyType ?? null},
        ${car.doors ?? null},
        ${car.seats ?? null},
        ${car.color ?? null},
        ${car.emissionClass ?? null},
        ${car.condition ?? null},
        ${car.registration ?? null},
        ${car.badge ?? null},
        ${photos[0] ?? null},
        ${JSON.stringify(photos)}::jsonb,
        ${car.published},
        ${car.sortOrder},
        ${car.createdAt},
        ${car.updatedAt}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function ready() {
  await ensureSchema();
  await seedIfEmpty();
}

export async function listCars(options?: {
  publishedOnly?: boolean;
}): Promise<CarListing[]> {
  await ready();
  const db = sql();
  const rows = options?.publishedOnly
    ? ((await db`
        SELECT * FROM cars
        WHERE published = TRUE
        ORDER BY sort_order ASC, title ASC
      `) as CarRow[])
    : ((await db`
        SELECT * FROM cars
        ORDER BY sort_order ASC, title ASC
      `) as CarRow[]);
  return rows.map(mapRow);
}

export async function getCar(id: string): Promise<CarListing | null> {
  await ready();
  const db = sql();
  const rows = (await db`SELECT * FROM cars WHERE id = ${id} LIMIT 1`) as CarRow[];
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function createCar(input: CarInput): Promise<CarListing> {
  await ready();
  const db = sql();
  const existing = await listCars();
  const now = new Date().toISOString();
  const id = makeId(input.title);
  const published = input.published ?? true;
  const sortOrder = input.sortOrder ?? existing.length + 1;
  const photos = normalizePhotos(input.photos, input.photoUrl);

  const rows = (await db`
    INSERT INTO cars (
      id, title, description, subito_url, price, year, km_label, fuel,
      transmission, location, brand, model, version, body_type, doors,
      seats, color, emission_class, condition, registration, badge,
      photo_url, photos, published, sort_order, created_at, updated_at
    ) VALUES (
      ${id},
      ${input.title.trim()},
      ${optional(input.description)},
      ${optional(input.subitoUrl)},
      ${Number(input.price) || 0},
      ${Number(input.year) || new Date().getFullYear()},
      ${input.kmLabel.trim()},
      ${input.fuel.trim()},
      ${input.transmission.trim()},
      ${input.location.trim() || "Treviglio (BG)"},
      ${optional(input.brand)},
      ${optional(input.model)},
      ${optional(input.version)},
      ${optional(input.bodyType)},
      ${optional(input.doors)},
      ${optional(input.seats)},
      ${optional(input.color)},
      ${optional(input.emissionClass)},
      ${optional(input.condition)},
      ${optional(input.registration)},
      ${optional(input.badge) ?? "Disponibile"},
      ${photos[0] ?? null},
      ${JSON.stringify(photos)}::jsonb,
      ${published},
      ${sortOrder},
      ${now},
      ${now}
    )
    RETURNING *
  `) as CarRow[];

  return mapRow(rows[0]!);
}

export async function updateCar(
  id: string,
  input: Partial<CarInput>,
): Promise<CarListing | null> {
  await ready();
  const current = await getCar(id);
  if (!current) return null;

  const db = sql();
  const now = new Date().toISOString();
  const photos =
    input.photos !== undefined || input.photoUrl !== undefined
      ? normalizePhotos(
          input.photos !== undefined ? input.photos : current.photos,
          input.photoUrl !== undefined ? input.photoUrl : current.photoUrl,
        )
      : current.photos;

  const next = {
    title: input.title?.trim() ?? current.title,
    description:
      input.description !== undefined
        ? optional(input.description)
        : (current.description ?? null),
    subitoUrl:
      input.subitoUrl !== undefined
        ? optional(input.subitoUrl)
        : (current.subitoUrl ?? null),
    price:
      input.price !== undefined ? Number(input.price) || 0 : current.price,
    year:
      input.year !== undefined
        ? Number(input.year) || current.year
        : current.year,
    kmLabel: input.kmLabel?.trim() ?? current.kmLabel,
    fuel: input.fuel?.trim() ?? current.fuel,
    transmission: input.transmission?.trim() ?? current.transmission,
    location: input.location?.trim() ?? current.location,
    brand:
      input.brand !== undefined ? optional(input.brand) : (current.brand ?? null),
    model:
      input.model !== undefined ? optional(input.model) : (current.model ?? null),
    version:
      input.version !== undefined
        ? optional(input.version)
        : (current.version ?? null),
    bodyType:
      input.bodyType !== undefined
        ? optional(input.bodyType)
        : (current.bodyType ?? null),
    doors:
      input.doors !== undefined ? optional(input.doors) : (current.doors ?? null),
    seats:
      input.seats !== undefined ? optional(input.seats) : (current.seats ?? null),
    color:
      input.color !== undefined ? optional(input.color) : (current.color ?? null),
    emissionClass:
      input.emissionClass !== undefined
        ? optional(input.emissionClass)
        : (current.emissionClass ?? null),
    condition:
      input.condition !== undefined
        ? optional(input.condition)
        : (current.condition ?? null),
    registration:
      input.registration !== undefined
        ? optional(input.registration)
        : (current.registration ?? null),
    badge:
      input.badge !== undefined ? optional(input.badge) : (current.badge ?? null),
    published:
      input.published !== undefined ? Boolean(input.published) : current.published,
    sortOrder:
      input.sortOrder !== undefined
        ? Number(input.sortOrder) || current.sortOrder
        : current.sortOrder,
  };

  const rows = (await db`
    UPDATE cars SET
      title = ${next.title},
      description = ${next.description},
      subito_url = ${next.subitoUrl},
      price = ${next.price},
      year = ${next.year},
      km_label = ${next.kmLabel},
      fuel = ${next.fuel},
      transmission = ${next.transmission},
      location = ${next.location},
      brand = ${next.brand},
      model = ${next.model},
      version = ${next.version},
      body_type = ${next.bodyType},
      doors = ${next.doors},
      seats = ${next.seats},
      color = ${next.color},
      emission_class = ${next.emissionClass},
      condition = ${next.condition},
      registration = ${next.registration},
      badge = ${next.badge},
      photo_url = ${photos[0] ?? null},
      photos = ${JSON.stringify(photos)}::jsonb,
      published = ${next.published},
      sort_order = ${next.sortOrder},
      updated_at = ${now}
    WHERE id = ${id}
    RETURNING *
  `) as CarRow[];

  return rows[0] ? mapRow(rows[0]) : null;
}

export async function deleteCar(id: string): Promise<boolean> {
  await ready();
  const db = sql();
  const rows = (await db`
    DELETE FROM cars WHERE id = ${id} RETURNING id
  `) as { id: string }[];
  return rows.length > 0;
}
