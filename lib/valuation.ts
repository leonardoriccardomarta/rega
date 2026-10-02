export const CAR_BRANDS = [
  "Abarth",
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Citroën",
  "Cupra",
  "Dacia",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lancia",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Seat",
  "Skoda",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Altro",
] as const;

export const FUEL_OPTIONS = [
  { value: "benzina", label: "Benzina" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Ibrida" },
  { value: "plugin", label: "Plug-in hybrid" },
  { value: "electric", label: "Elettrica" },
  { value: "lpg", label: "GPL / Metano" },
] as const;

export const TRANSMISSION_OPTIONS = [
  { value: "manual", label: "Manuale" },
  { value: "automatic", label: "Automatico" },
] as const;

export const CONDITION_OPTIONS = [
  { value: "excellent", label: "Ottime", hint: "Pochi segni, tagliandi ok" },
  { value: "good", label: "Buone", hint: "Usura normale" },
  { value: "fair", label: "Discrete", hint: "Qualche intervento da fare" },
  { value: "poor", label: "Da ripristinare", hint: "Lavori evidenti" },
] as const;

export type ValuationInput = {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: (typeof FUEL_OPTIONS)[number]["value"];
  transmission: (typeof TRANSMISSION_OPTIONS)[number]["value"];
  condition: (typeof CONDITION_OPTIONS)[number]["value"];
};

export type ValuationResult = {
  low: number;
  mid: number;
  high: number;
  confidence: "alta" | "media" | "indicativa";
};

const BRAND_BASE: Record<string, number> = {
  abarth: 14500,
  "alfa romeo": 16000,
  audi: 24000,
  bmw: 25000,
  "citroën": 12000,
  citroen: 12000,
  cupra: 22000,
  dacia: 10000,
  fiat: 11000,
  ford: 13000,
  honda: 15000,
  hyundai: 14000,
  jeep: 18000,
  kia: 14000,
  lancia: 10000,
  mazda: 15000,
  "mercedes-benz": 26000,
  mercedes: 26000,
  mini: 17000,
  nissan: 13000,
  opel: 12000,
  peugeot: 13000,
  renault: 12000,
  seat: 13000,
  skoda: 14000,
  suzuki: 12000,
  toyota: 16000,
  volkswagen: 17000,
  volvo: 22000,
  altro: 13000,
};

const FUEL_FACTOR: Record<ValuationInput["fuel"], number> = {
  benzina: 1,
  diesel: 0.97,
  hybrid: 1.08,
  plugin: 1.12,
  electric: 1.05,
  lpg: 0.92,
};

const TRANSMISSION_FACTOR: Record<ValuationInput["transmission"], number> = {
  manual: 1,
  automatic: 1.06,
};

const CONDITION_FACTOR: Record<ValuationInput["condition"], number> = {
  excellent: 1.08,
  good: 1,
  fair: 0.88,
  poor: 0.72,
};

const CURRENT_YEAR = new Date().getFullYear();

function roundTo500(value: number) {
  return Math.max(500, Math.round(value / 500) * 500);
}

export function estimateCarValue(input: ValuationInput): ValuationResult {
  const brandKey = input.brand.trim().toLowerCase();
  const base = BRAND_BASE[brandKey] ?? BRAND_BASE.altro;

  const age = Math.max(0, CURRENT_YEAR - input.year);
  const yearFactor = Math.pow(0.9, Math.min(age, 18)) * (age > 18 ? 0.85 : 1);

  const expectedKm = Math.max(age, 1) * 14000;
  const kmRatio = input.mileage / expectedKm;
  let kmFactor = 1;
  if (kmRatio > 1.35) kmFactor = 0.82;
  else if (kmRatio > 1.15) kmFactor = 0.9;
  else if (kmRatio < 0.7) kmFactor = 1.08;
  else if (kmRatio < 0.85) kmFactor = 1.04;

  const modelBoost =
    /amg|m sport|gti|rs|s-line|tipo|panda|500|golf|serie [13]|classe a|yaris|corsa/i.test(
      input.model,
    )
      ? 1.04
      : 1;

  const midRaw =
    base *
    yearFactor *
    kmFactor *
    FUEL_FACTOR[input.fuel] *
    TRANSMISSION_FACTOR[input.transmission] *
    CONDITION_FACTOR[input.condition] *
    modelBoost;

  const mid = roundTo500(midRaw);
  const spread = age <= 3 ? 0.1 : age <= 8 ? 0.12 : 0.15;
  const low = roundTo500(mid * (1 - spread));
  const high = roundTo500(mid * (1 + spread));

  let confidence: ValuationResult["confidence"] = "media";
  if (input.model.trim().length >= 3 && age <= 12 && input.mileage > 0) {
    confidence = "alta";
  }
  if (brandKey === "altro" || age > 15 || input.condition === "poor") {
    confidence = "indicativa";
  }

  return { low, mid, high, confidence };
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function valuationWhatsAppMessage(
  input: ValuationInput,
  result: ValuationResult,
) {
  const fuel =
    FUEL_OPTIONS.find((f) => f.value === input.fuel)?.label ?? input.fuel;
  const transmission =
    TRANSMISSION_OPTIONS.find((t) => t.value === input.transmission)?.label ??
    input.transmission;
  const condition =
    CONDITION_OPTIONS.find((c) => c.value === input.condition)?.label ??
    input.condition;

  return [
    "Ciao Alberto, vorrei una valutazione per venderti la mia auto.",
    "",
    `• ${input.brand} ${input.model}`,
    `• Anno: ${input.year}`,
    `• Km: ${input.mileage.toLocaleString("it-IT")}`,
    `• Alimentazione: ${fuel}`,
    `• Cambio: ${transmission}`,
    `• Condizioni: ${condition}`,
    "",
    `Stima dal sito: ${formatEuro(result.low)} – ${formatEuro(result.high)}`,
    "Mi confermi se ha senso e come procedere?",
  ].join("\n");
}
