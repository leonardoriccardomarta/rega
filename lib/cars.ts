export type CarListing = {
  id: string;
  title: string;
  description?: string;
  subitoUrl?: string;
  price: number;
  year: number;
  kmLabel: string;
  fuel: string;
  transmission: string;
  location: string;
  brand?: string;
  model?: string;
  version?: string;
  bodyType?: string;
  doors?: string;
  seats?: string;
  color?: string;
  emissionClass?: string;
  condition?: string;
  registration?: string;
  badge?: string;
  /** @deprecated use photos[0] */
  photoUrl?: string;
  photos: string[];
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CarInput = {
  title: string;
  description?: string;
  subitoUrl?: string;
  price: number;
  year: number;
  kmLabel: string;
  fuel: string;
  transmission: string;
  location: string;
  brand?: string;
  model?: string;
  version?: string;
  bodyType?: string;
  doors?: string;
  seats?: string;
  color?: string;
  emissionClass?: string;
  condition?: string;
  registration?: string;
  badge?: string;
  photoUrl?: string;
  photos?: string[];
  published?: boolean;
  sortOrder?: number;
};

export function normalizePhotos(
  photos?: string[] | null,
  photoUrl?: string | null,
): string[] {
  const fromArray = (photos ?? []).map((p) => p.trim()).filter(Boolean);
  if (fromArray.length > 0) return fromArray;
  if (photoUrl?.trim()) return [photoUrl.trim()];
  return [];
}

export function coverPhoto(car: Pick<CarListing, "photos" | "photoUrl">) {
  return normalizePhotos(car.photos, car.photoUrl)[0];
}

const now = () => new Date().toISOString();

export const DEFAULT_CARS: CarListing[] = [
  {
    id: "punto-2010",
    title: "Fiat Grande Punto 1.3 MJT 75 5p Van Actual",
    description:
      "Punto diesel pratica, pensata per chi vuole spendere poco e muoversi senza pensieri. Scrivimi e ti dico subito se è ancora disponibile.",
    subitoUrl:
      "https://www.subito.it/auto/fiat-grande-punto-1-3mjt-75-5p-van-actual-4pt-bergamo-662116617.htm",
    price: 2500,
    year: 2010,
    kmLabel: "190–200.000 km",
    fuel: "Diesel",
    transmission: "Manuale",
    location: "Treviglio (BG)",
    brand: "Fiat",
    model: "Grande Punto",
    version: "1.3 MJT 75 Van Actual",
    bodyType: "Berlina",
    doors: "5",
    seats: "2",
    condition: "Usato",
    registration: "2010",
    badge: "Disponibile",
    photos: [],
    published: true,
    sortOrder: 1,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "bmw-730d",
    title: "BMW 730d cat",
    description:
      "Serie 7 diesel automatica: spazio, quiete di marcia e presenza. Km e condizioni te li spiego senza giri di parole, anche in prova.",
    subitoUrl:
      "https://www.subito.it/auto/bmw-730-730d-cat-bergamo-662114379.htm",
    price: 3500,
    year: 2003,
    kmLabel: "258.000 km",
    fuel: "Diesel",
    transmission: "Automatico",
    location: "Treviglio (BG)",
    brand: "BMW",
    model: "Serie 7 (E65/66)",
    version: "730d cat",
    bodyType: "Berlina",
    doors: "4/5",
    seats: "5",
    color: "Grigio",
    emissionClass: "Euro 3",
    condition: "Usato",
    registration: "09/2003",
    badge: "Disponibile",
    photos: [],
    published: true,
    sortOrder: 2,
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "subaru-outback",
    title: "Subaru Outback 2.5i 16V",
    description:
      "Outback benzina, cambio manuale: comoda per famiglia e viaggi. Se ti interessa, ti mando altri dettagli e organizziamo un confronto.",
    subitoUrl:
      "https://www.subito.it/auto/subaru-outback-2-5i-16v-fs-bergamo-662095583.htm",
    price: 2100,
    year: 2008,
    kmLabel: "300–350.000 km",
    fuel: "Benzina",
    transmission: "Manuale",
    location: "Treviglio (BG)",
    brand: "Subaru",
    model: "Outback",
    version: "2.5i 16V",
    bodyType: "Station wagon",
    doors: "5",
    seats: "5",
    condition: "Usato",
    registration: "2008",
    badge: "Disponibile",
    photos: [],
    published: true,
    sortOrder: 3,
    createdAt: now(),
    updatedAt: now(),
  },
];

export function carSpecs(car: CarListing): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Marca", value: car.brand ?? "" },
    { label: "Modello", value: car.model ?? "" },
    { label: "Versione", value: car.version ?? "" },
    { label: "Carburante", value: car.fuel },
    { label: "Carrozzeria", value: car.bodyType ?? "" },
    { label: "Porte", value: car.doors ?? "" },
    { label: "Classe emissioni", value: car.emissionClass ?? "" },
    { label: "Posti", value: car.seats ?? "" },
    { label: "Colore", value: car.color ?? "" },
    { label: "Cambio", value: car.transmission },
    { label: "Condizioni", value: car.condition ?? "Usato" },
    { label: "Km", value: car.kmLabel },
    { label: "Immatricolazione", value: car.registration ?? String(car.year) },
  ];
  return rows.filter((row) => row.value && row.value !== "-");
}
