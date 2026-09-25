import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { DEFAULT_CARS, type CarInput, type CarListing } from "@/lib/cars";

const DATA_DIR = path.join(process.cwd(), "data");
const CARS_FILE = path.join(DATA_DIR, "cars.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "cars");

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(CARS_FILE, "utf8");
  } catch {
    await writeFile(CARS_FILE, JSON.stringify(DEFAULT_CARS, null, 2), "utf8");
  }
}

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

export function getUploadDir() {
  return UPLOAD_DIR;
}

function sortCars(cars: CarListing[]) {
  return [...cars].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
  );
}

function optional(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function listCars(options?: {
  publishedOnly?: boolean;
}): Promise<CarListing[]> {
  await ensureDataFile();
  const raw = await readFile(CARS_FILE, "utf8");
  const cars = JSON.parse(raw) as CarListing[];
  const filtered = options?.publishedOnly
    ? cars.filter((car) => car.published)
    : cars;
  return sortCars(filtered);
}

export async function getCar(id: string): Promise<CarListing | null> {
  const cars = await listCars();
  return cars.find((car) => car.id === id) ?? null;
}

async function writeCars(cars: CarListing[]) {
  await ensureDataFile();
  await writeFile(CARS_FILE, JSON.stringify(sortCars(cars), null, 2), "utf8");
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

function buildCarFields(input: CarInput, fallback?: CarListing) {
  return {
    title: input.title?.trim() || fallback?.title || "",
    description:
      input.description !== undefined
        ? optional(input.description)
        : fallback?.description,
    subitoUrl:
      input.subitoUrl !== undefined
        ? optional(input.subitoUrl)
        : fallback?.subitoUrl,
    price:
      input.price !== undefined
        ? Number(input.price) || 0
        : (fallback?.price ?? 0),
    year:
      input.year !== undefined
        ? Number(input.year) || new Date().getFullYear()
        : (fallback?.year ?? new Date().getFullYear()),
    kmLabel: input.kmLabel?.trim() || fallback?.kmLabel || "",
    fuel: input.fuel?.trim() || fallback?.fuel || "",
    transmission:
      input.transmission?.trim() || fallback?.transmission || "",
    location:
      input.location?.trim() || fallback?.location || "Treviglio (BG)",
    brand:
      input.brand !== undefined ? optional(input.brand) : fallback?.brand,
    model:
      input.model !== undefined ? optional(input.model) : fallback?.model,
    version:
      input.version !== undefined
        ? optional(input.version)
        : fallback?.version,
    bodyType:
      input.bodyType !== undefined
        ? optional(input.bodyType)
        : fallback?.bodyType,
    doors:
      input.doors !== undefined ? optional(input.doors) : fallback?.doors,
    seats:
      input.seats !== undefined ? optional(input.seats) : fallback?.seats,
    color:
      input.color !== undefined ? optional(input.color) : fallback?.color,
    emissionClass:
      input.emissionClass !== undefined
        ? optional(input.emissionClass)
        : fallback?.emissionClass,
    condition:
      input.condition !== undefined
        ? optional(input.condition)
        : fallback?.condition,
    registration:
      input.registration !== undefined
        ? optional(input.registration)
        : fallback?.registration,
    badge:
      input.badge !== undefined
        ? optional(input.badge)
        : fallback?.badge,
    photoUrl:
      input.photoUrl !== undefined
        ? optional(input.photoUrl)
        : fallback?.photoUrl,
    published:
      input.published !== undefined
        ? Boolean(input.published)
        : (fallback?.published ?? true),
    sortOrder:
      input.sortOrder !== undefined
        ? Number(input.sortOrder) || 1
        : (fallback?.sortOrder ?? 1),
  };
}

export async function createCar(input: CarInput): Promise<CarListing> {
  const cars = await listCars();
  const timestamp = new Date().toISOString();
  const fields = buildCarFields(input);
  const car: CarListing = {
    id: makeId(fields.title),
    ...fields,
    badge: fields.badge || "Disponibile",
    sortOrder: fields.sortOrder || cars.length + 1,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  cars.push(car);
  await writeCars(cars);
  return car;
}

export async function updateCar(
  id: string,
  input: Partial<CarInput>,
): Promise<CarListing | null> {
  const cars = await listCars();
  const index = cars.findIndex((car) => car.id === id);
  if (index < 0) return null;

  const current = cars[index];
  const fields = buildCarFields({ ...current, ...input } as CarInput, current);
  const next: CarListing = {
    ...current,
    ...fields,
    updatedAt: new Date().toISOString(),
  };

  cars[index] = next;
  await writeCars(cars);
  return next;
}

export async function deleteCar(id: string): Promise<boolean> {
  const cars = await listCars();
  const next = cars.filter((car) => car.id !== id);
  if (next.length === cars.length) return false;
  await writeCars(next);
  return true;
}
