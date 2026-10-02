import {
  BRAND_FALLBACKS,
  findBrandFallback,
  findCatalogModel,
  modelsForBrand,
  type CatalogModel,
} from "@/lib/valuation-catalog";

export { modelsForBrand, findCatalogModel } from "@/lib/valuation-catalog";

export const CAR_BRANDS = [
  ...BRAND_FALLBACKS.map((b) => b.brand),
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
  matchedModel: string | null;
  source: "modello" | "marca" | "generica";
  note: string;
};

const FUEL_FACTOR: Record<ValuationInput["fuel"], number> = {
  benzina: 1,
  diesel: 0.96,
  hybrid: 1.1,
  plugin: 1.12,
  electric: 0.98,
  lpg: 0.9,
};

const TRANSMISSION_FACTOR: Record<ValuationInput["transmission"], number> = {
  manual: 1,
  automatic: 1.05,
};

const CONDITION_FACTOR: Record<ValuationInput["condition"], number> = {
  excellent: 1.07,
  good: 1,
  fair: 0.86,
  poor: 0.7,
};

/** km/anno tipici Italia per usate di ritiro */
const KM_PER_YEAR = 15000;
const REF_AGE = 5;
const REF_KM = REF_AGE * KM_PER_YEAR;

const CURRENT_YEAR = new Date().getFullYear();

function roundTo500(value: number) {
  return Math.max(800, Math.round(value / 500) * 500);
}

/** Deprezzamento non lineare: più forte dopo i 3 anni, poi rallenta */
function ageFactor(age: number, hold: number) {
  const clamped = Math.max(0, Math.min(age, 22));
  let factor = 1;
  for (let y = 0; y < clamped; y += 1) {
    const yearly =
      y < 3 ? 0.88 : y < 8 ? 0.91 : y < 14 ? 0.93 : 0.95;
    factor *= yearly;
  }
  // hold sposta la curva (Toyota tiene meglio)
  const holdAdj = 1 + (hold - 1) * Math.min(clamped / 8, 1.2);
  return factor * holdAdj;
}

function kmFactor(age: number, mileage: number) {
  const expected = Math.max(age, 1) * KM_PER_YEAR;
  const ratio = mileage / expected;
  if (ratio > 1.6) return 0.78;
  if (ratio > 1.35) return 0.85;
  if (ratio > 1.15) return 0.92;
  if (ratio < 0.55) return 1.1;
  if (ratio < 0.75) return 1.05;
  return 1;
}

function trimBoost(modelText: string) {
  const t = modelText.toLowerCase();
  if (/amg|m sport|\bm\d\b|rs[3-7]|gti|gtd|cupra|s-line|s line|abarth/.test(t)) {
    return 1.08;
  }
  if (/business|executive|lounge|cross|allroad|4x4|awd|quattro|xdrive/.test(t)) {
    return 1.03;
  }
  if (/van|n1|autocarro/.test(t)) return 0.92;
  return 1;
}

function resolveBase(input: ValuationInput): {
  buyInAt5y: number;
  hold: number;
  matched: CatalogModel | null;
  source: ValuationResult["source"];
} {
  const matched = findCatalogModel(input.brand, input.model);
  if (matched) {
    return {
      buyInAt5y: matched.buyInAt5y,
      hold: matched.hold ?? 1,
      matched,
      source: "modello",
    };
  }
  const brand = findBrandFallback(input.brand);
  return {
    buyInAt5y: brand.buyInAt5y,
    hold: brand.hold ?? 0.92,
    matched: null,
    source: brand.brand === "Altro" ? "generica" : "marca",
  };
}

export function estimateCarValue(input: ValuationInput): ValuationResult {
  const age = Math.max(0, CURRENT_YEAR - input.year);
  const { buyInAt5y, hold, matched, source } = resolveBase(input);

  // Porta il riferimento 5y/75k al veicolo reale
  const atRef =
    buyInAt5y /
    (ageFactor(REF_AGE, hold) * kmFactor(REF_AGE, REF_KM));

  const midRaw =
    atRef *
    ageFactor(age, hold) *
    kmFactor(age, input.mileage) *
    FUEL_FACTOR[input.fuel] *
    TRANSMISSION_FACTOR[input.transmission] *
    CONDITION_FACTOR[input.condition] *
    trimBoost(input.model);

  // Fascia di ritiro: più ampia = più onesta
  let spreadLow = 0.14;
  let spreadHigh = 0.12;
  if (source === "marca") {
    spreadLow = 0.18;
    spreadHigh = 0.15;
  }
  if (source === "generica" || age > 14 || input.condition === "poor") {
    spreadLow = 0.24;
    spreadHigh = 0.18;
  }
  if (age <= 2 && source === "modello") {
    spreadLow = 0.1;
    spreadHigh = 0.1;
  }

  const mid = roundTo500(midRaw);
  const low = roundTo500(mid * (1 - spreadLow));
  const high = roundTo500(mid * (1 + spreadHigh));

  let confidence: ValuationResult["confidence"] = "media";
  if (source === "modello" && age <= 12 && input.condition !== "poor") {
    confidence = "alta";
  }
  if (
    source === "generica" ||
    age > 15 ||
    input.condition === "poor" ||
    input.mileage > 280000
  ) {
    confidence = "indicativa";
  }

  const note =
    source === "modello"
      ? `Fascia di ritiro calibrata sul modello ${matched!.name}.`
      : source === "marca"
        ? "Modello non in catalogo: fascia basata sulla marca (più ampia)."
        : "Dati limitati: fascia generica, da confermare con Alberto.";

  return {
    low,
    mid,
    high,
    confidence,
    matchedModel: matched?.name ?? null,
    source,
    note,
  };
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
    result.matchedModel
      ? `• Match catalogo: ${result.matchedModel}`
      : "• Match catalogo: non trovato (stima su marca)",
    `• Anno: ${input.year}`,
    `• Km: ${input.mileage.toLocaleString("it-IT")}`,
    `• Alimentazione: ${fuel}`,
    `• Cambio: ${transmission}`,
    `• Condizioni: ${condition}`,
    "",
    `Fascia ritiro indicativa: da ${formatEuro(result.low)} a ${formatEuro(result.high)}`,
    `Affidabilità: ${result.confidence}`,
    "Mi confermi se ha senso e come procedere?",
  ].join("\n");
}
