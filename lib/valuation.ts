import {
  BRAND_FALLBACKS,
  DEALER_MARGIN,
  askToBuyIn,
  findBrandFallback,
  findCatalogModel,
  modelsForBrand,
  type CatalogModel,
} from "@/lib/valuation-catalog";

export {
  modelsForBrand,
  findCatalogModel,
  DEALER_MARGIN,
} from "@/lib/valuation-catalog";

export const CAR_BRANDS = BRAND_FALLBACKS.map((b) => b.brand);

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
  /** Fascia di ritiro (quanto può offrire) */
  low: number;
  mid: number;
  high: number;
  /** Prezzo vetrina implicito medio (prima del margine) */
  askMid: number;
  confidence: "alta" | "media" | "indicativa";
  matchedModel: string | null;
  source: "modello" | "marca" | "generica";
  note: string;
  marginPct: number;
};

const FUEL_FACTOR: Record<ValuationInput["fuel"], number> = {
  benzina: 1,
  diesel: 0.95,
  hybrid: 1.08,
  plugin: 1.1,
  electric: 0.96,
  lpg: 0.9,
};

const TRANSMISSION_FACTOR: Record<ValuationInput["transmission"], number> = {
  manual: 1,
  automatic: 1.04,
};

const CONDITION_FACTOR: Record<ValuationInput["condition"], number> = {
  excellent: 1.06,
  good: 1,
  fair: 0.85,
  poor: 0.68,
};

const KM_PER_YEAR = 15000;
const REF_AGE = 5;
const REF_KM = REF_AGE * KM_PER_YEAR;
const CURRENT_YEAR = new Date().getFullYear();

function roundTo500(value: number) {
  return Math.max(500, Math.round(value / 500) * 500);
}

/** Deprezzamento non lineare, rallenta sulle auto molto vecchie (segmento tipico shop) */
function ageFactor(age: number, hold: number) {
  const clamped = Math.max(0, Math.min(age, 25));
  let factor = 1;
  for (let y = 0; y < clamped; y += 1) {
    const yearly =
      y < 3 ? 0.87 : y < 8 ? 0.91 : y < 14 ? 0.935 : 0.97;
    factor *= yearly;
  }
  const holdAdj = 1 + (hold - 1) * Math.min(clamped / 8, 1.25);
  return factor * holdAdj;
}

function kmFactor(age: number, mileage: number) {
  const expected = Math.max(age, 1) * KM_PER_YEAR;
  const ratio = mileage / expected;
  let factor = 1;
  if (ratio > 1.7) factor = 0.76;
  else if (ratio > 1.4) factor = 0.84;
  else if (ratio > 1.15) factor = 0.92;
  else if (ratio < 0.55) factor = 1.1;
  else if (ratio < 0.75) factor = 1.05;

  // Penalità km assoluti (tipiche usate “km alti” dello shop)
  if (mileage > 300000) factor *= 0.78;
  else if (mileage > 250000) factor *= 0.88;
  else if (mileage > 200000) factor *= 0.94;

  return factor;
}

function trimBoost(modelText: string) {
  const t = modelText.toLowerCase();
  if (/amg|m sport|\bm\d\b|rs[3-7]|gti|gtd|cupra|s-line|s line|abarth/.test(t)) {
    return 1.07;
  }
  if (/titanium|lounge|cross|business|executive|4x4|awd|quattro|xdrive/.test(t)) {
    return 1.03;
  }
  if (/van|n1|autocarro/.test(t)) return 0.9;
  return 1;
}

function resolveAsk(input: ValuationInput): {
  askAt5y: number;
  hold: number;
  matched: CatalogModel | null;
  source: ValuationResult["source"];
} {
  const matched = findCatalogModel(input.brand, input.model);
  if (matched) {
    return {
      askAt5y: matched.askAt5y,
      hold: matched.hold ?? 1,
      matched,
      source: "modello",
    };
  }
  const brand = findBrandFallback(input.brand);
  return {
    askAt5y: brand.askAt5y,
    hold: brand.hold ?? 0.9,
    matched: null,
    source: brand.brand === "Altro" ? "generica" : "marca",
  };
}

export function estimateCarValue(input: ValuationInput): ValuationResult {
  const age = Math.max(0, CURRENT_YEAR - input.year);
  const { askAt5y, hold, matched, source } = resolveAsk(input);

  // Porta il riferimento 5y/75k al veicolo reale (prezzo VETRINA)
  const askAtRef =
    askAt5y / (ageFactor(REF_AGE, hold) * kmFactor(REF_AGE, REF_KM));

  const askRaw =
    askAtRef *
    ageFactor(age, hold) *
    kmFactor(age, input.mileage) *
    FUEL_FACTOR[input.fuel] *
    TRANSMISSION_FACTOR[input.transmission] *
    CONDITION_FACTOR[input.condition] *
    trimBoost(input.model);

  const askMid = roundTo500(askRaw);
  const buyMidRaw = askToBuyIn(askRaw);
  const mid = roundTo500(buyMidRaw);

  // Fascia ritiro: più ampia se il match è debole
  let spreadLow = 0.12;
  let spreadHigh = 0.1;
  if (source === "marca") {
    spreadLow = 0.16;
    spreadHigh = 0.13;
  }
  if (source === "generica" || age > 16 || input.condition === "poor") {
    spreadLow = 0.22;
    spreadHigh = 0.16;
  }
  if (age <= 2 && source === "modello") {
    spreadLow = 0.09;
    spreadHigh = 0.09;
  }

  const low = roundTo500(mid * (1 - spreadLow));
  const high = roundTo500(mid * (1 + spreadHigh));

  let confidence: ValuationResult["confidence"] = "media";
  if (source === "modello" && age <= 14 && input.condition !== "poor") {
    confidence = "alta";
  }
  if (
    source === "generica" ||
    age > 18 ||
    input.condition === "poor" ||
    input.mileage > 300000
  ) {
    confidence = "indicativa";
  }

  const marginPct = Math.round(DEALER_MARGIN * 100);
  const note =
    source === "modello"
      ? `Calibrata su ${matched!.name}: vetrina tipica ~${askMid.toLocaleString("it-IT")} €, ritiro con margine ~${marginPct}%.`
      : source === "marca"
        ? `Modello non in catalogo: stima su marca. Vetrina tipica ~${askMid.toLocaleString("it-IT")} €, ritiro −${marginPct}%.`
        : `Dati limitati. Vetrina tipica ~${askMid.toLocaleString("it-IT")} €, ritiro −${marginPct}% (da confermare).`;

  return {
    low,
    mid,
    high,
    askMid,
    confidence,
    matchedModel: matched?.name ?? null,
    source,
    note,
    marginPct,
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
    `Vetrina tipica stimata: ~${formatEuro(result.askMid)} (margine ~${result.marginPct}%)`,
    `Affidabilità: ${result.confidence}`,
    "Mi confermi se ha senso e come procedere?",
  ].join("\n");
}
