/**
 * Catalogo calibrato sullo stile di rivendita Regantini (Subito Impresa+).
 * Shop: https://impresapiu.subito.it/shops/60152-regantini
 *
 * I valori `askAt5y` sono prezzi VETRINA tipici (quanto rivenderebbe)
 * per un’auto ~5 anni / ~75.000 km / buone condizioni / allestimento medio.
 *
 * Il ritiro (quanto può offrire) = ask × (1 − DEALER_MARGIN).
 *
 * Ancore dallo shop (listino reale):
 * - BMW 730d 2003 ~258k km → 3.300 €
 * - Peugeot 208 2012 ~115k km → 4.300 €
 * - Ford Fiesta 2010 ~185k km → 2.300 €
 * - Fiat Grande Punto 2010 ~195k km → 2.300 €
 * - Subaru Outback 2008 ~320k km → 2.100 €
 */

/** Margine medio ritiro vs prezzo a cui rivenderebbe in vetrina */
export const DEALER_MARGIN = 0.2;

export type CatalogModel = {
  brand: string;
  name: string;
  keys: string[];
  /** Prezzo vetrina tipico a 5 anni / ~75k km / buone condizioni */
  askAt5y: number;
  /** Tenuta del valore (1 = media) */
  hold?: number;
};

export type BrandFallback = {
  brand: string;
  askAt5y: number;
  hold?: number;
};

export const BRAND_FALLBACKS: BrandFallback[] = [
  { brand: "Abarth", askAt5y: 16000, hold: 0.95 },
  { brand: "Alfa Romeo", askAt5y: 15000, hold: 0.9 },
  { brand: "Audi", askAt5y: 22000, hold: 0.95 },
  { brand: "BMW", askAt5y: 22000, hold: 0.94 },
  { brand: "Citroën", askAt5y: 9500, hold: 0.9 },
  { brand: "Cupra", askAt5y: 20000, hold: 0.96 },
  { brand: "Dacia", askAt5y: 8500, hold: 0.94 },
  { brand: "Fiat", askAt5y: 8500, hold: 0.9 },
  { brand: "Ford", askAt5y: 10000, hold: 0.91 },
  { brand: "Honda", askAt5y: 13000, hold: 1.02 },
  { brand: "Hyundai", askAt5y: 11500, hold: 0.97 },
  { brand: "Jeep", askAt5y: 14500, hold: 0.92 },
  { brand: "Kia", askAt5y: 11500, hold: 0.97 },
  { brand: "Lancia", askAt5y: 8000, hold: 0.88 },
  { brand: "Mazda", askAt5y: 13000, hold: 0.97 },
  { brand: "Mercedes-Benz", askAt5y: 23000, hold: 0.95 },
  { brand: "Mini", askAt5y: 14500, hold: 0.94 },
  { brand: "Nissan", askAt5y: 10000, hold: 0.91 },
  { brand: "Opel", askAt5y: 9500, hold: 0.9 },
  { brand: "Peugeot", askAt5y: 10000, hold: 0.91 },
  { brand: "Renault", askAt5y: 9500, hold: 0.9 },
  { brand: "Seat", askAt5y: 10500, hold: 0.93 },
  { brand: "Skoda", askAt5y: 11500, hold: 0.95 },
  { brand: "Subaru", askAt5y: 11000, hold: 0.9 },
  { brand: "Suzuki", askAt5y: 10000, hold: 0.96 },
  { brand: "Toyota", askAt5y: 14500, hold: 1.05 },
  { brand: "Volkswagen", askAt5y: 13500, hold: 0.97 },
  { brand: "Volvo", askAt5y: 19000, hold: 0.96 },
  { brand: "Altro", askAt5y: 9000, hold: 0.88 },
];

export const MODEL_CATALOG: CatalogModel[] = [
  // --- Ancore Regantini / segmento tipico shop ---
  {
    brand: "Fiat",
    name: "Grande Punto",
    keys: ["grande punto", "punto evo", "punto"],
    askAt5y: 6000,
    hold: 0.86,
  },
  {
    brand: "Fiat",
    name: "Panda",
    keys: ["panda"],
    askAt5y: 7500,
    hold: 0.95,
  },
  {
    brand: "Fiat",
    name: "500",
    keys: ["500", "cinquecento"],
    askAt5y: 9000,
    hold: 0.93,
  },
  {
    brand: "Fiat",
    name: "500X",
    keys: ["500x"],
    askAt5y: 12000,
    hold: 0.92,
  },
  {
    brand: "Fiat",
    name: "Tipo",
    keys: ["tipo"],
    askAt5y: 10000,
    hold: 0.92,
  },
  {
    brand: "Peugeot",
    name: "208",
    keys: ["208"],
    askAt5y: 7800,
    hold: 0.92,
  },
  {
    brand: "Peugeot",
    name: "2008",
    keys: ["2008"],
    askAt5y: 12500,
    hold: 0.94,
  },
  {
    brand: "Peugeot",
    name: "308",
    keys: ["308"],
    askAt5y: 11000,
    hold: 0.92,
  },
  {
    brand: "Peugeot",
    name: "3008",
    keys: ["3008"],
    askAt5y: 15500,
    hold: 0.94,
  },
  {
    brand: "Ford",
    name: "Fiesta",
    keys: ["fiesta"],
    askAt5y: 5800,
    hold: 0.88,
  },
  {
    brand: "Ford",
    name: "Focus",
    keys: ["focus"],
    askAt5y: 9500,
    hold: 0.91,
  },
  {
    brand: "Ford",
    name: "Puma",
    keys: ["puma"],
    askAt5y: 14500,
    hold: 0.96,
  },
  {
    brand: "Ford",
    name: "Kuga",
    keys: ["kuga"],
    askAt5y: 15000,
    hold: 0.93,
  },
  {
    brand: "BMW",
    name: "Serie 7",
    keys: ["serie 7", "730", "730d", "740", "750"],
    askAt5y: 12500,
    hold: 0.82,
  },
  {
    brand: "BMW",
    name: "Serie 1",
    keys: ["serie 1", "116", "118", "120", "f20", "f40"],
    askAt5y: 16500,
    hold: 0.94,
  },
  {
    brand: "BMW",
    name: "Serie 3",
    keys: ["serie 3", "316", "318", "320", "330", "f30", "g20"],
    askAt5y: 21000,
    hold: 0.95,
  },
  {
    brand: "BMW",
    name: "Serie 5",
    keys: ["serie 5", "520", "525", "530", "g30", "f10"],
    askAt5y: 24000,
    hold: 0.93,
  },
  {
    brand: "BMW",
    name: "X1",
    keys: ["x1"],
    askAt5y: 20000,
    hold: 0.96,
  },
  {
    brand: "BMW",
    name: "X3",
    keys: ["x3"],
    askAt5y: 25500,
    hold: 0.96,
  },
  {
    brand: "Subaru",
    name: "Outback",
    keys: ["outback"],
    askAt5y: 8500,
    hold: 0.84,
  },
  {
    brand: "Subaru",
    name: "Forester",
    keys: ["forester"],
    askAt5y: 12000,
    hold: 0.9,
  },
  {
    brand: "Subaru",
    name: "Impreza",
    keys: ["impreza"],
    askAt5y: 9500,
    hold: 0.9,
  },

  // --- Altri modelli frequenti ---
  { brand: "Abarth", name: "595", keys: ["595", "500 abarth"], askAt5y: 15000, hold: 0.95 },
  { brand: "Lancia", name: "Ypsilon", keys: ["ypsilon"], askAt5y: 8000, hold: 0.9 },
  { brand: "Volkswagen", name: "Golf", keys: ["golf"], askAt5y: 14000, hold: 0.99 },
  { brand: "Volkswagen", name: "Golf GTI", keys: ["golf gti", "gti"], askAt5y: 19500, hold: 1.01 },
  { brand: "Volkswagen", name: "Polo", keys: ["polo"], askAt5y: 10500, hold: 0.97 },
  { brand: "Volkswagen", name: "T-Roc", keys: ["t-roc", "troc"], askAt5y: 16500, hold: 0.98 },
  { brand: "Volkswagen", name: "Tiguan", keys: ["tiguan"], askAt5y: 19000, hold: 0.97 },
  { brand: "Volkswagen", name: "T-Cross", keys: ["t-cross", "tcross"], askAt5y: 14000, hold: 0.96 },
  { brand: "Volkswagen", name: "Passat", keys: ["passat"], askAt5y: 14000, hold: 0.93 },
  { brand: "Volkswagen", name: "Up!", keys: ["up!", "up "], askAt5y: 7000, hold: 0.92 },
  { brand: "Seat", name: "Ibiza", keys: ["ibiza"], askAt5y: 9500, hold: 0.93 },
  { brand: "Seat", name: "Leon", keys: ["leon", "león"], askAt5y: 12500, hold: 0.94 },
  { brand: "Seat", name: "Arona", keys: ["arona"], askAt5y: 12000, hold: 0.94 },
  { brand: "Seat", name: "Ateca", keys: ["ateca"], askAt5y: 14500, hold: 0.95 },
  { brand: "Cupra", name: "Formentor", keys: ["formentor"], askAt5y: 22000, hold: 0.99 },
  { brand: "Skoda", name: "Fabia", keys: ["fabia"], askAt5y: 9500, hold: 0.95 },
  { brand: "Skoda", name: "Octavia", keys: ["octavia"], askAt5y: 13500, hold: 0.97 },
  { brand: "Skoda", name: "Kamiq", keys: ["kamiq"], askAt5y: 13000, hold: 0.96 },
  { brand: "Skoda", name: "Karoq", keys: ["karoq"], askAt5y: 15500, hold: 0.96 },
  { brand: "Mini", name: "Cooper", keys: ["cooper", "mini"], askAt5y: 14000, hold: 0.94 },
  { brand: "Mini", name: "Countryman", keys: ["countryman"], askAt5y: 16500, hold: 0.93 },
  { brand: "Mercedes-Benz", name: "Classe A", keys: ["classe a", "a 180", "a180", "a 200", "a200"], askAt5y: 20000, hold: 0.95 },
  { brand: "Mercedes-Benz", name: "Classe C", keys: ["classe c", "c 200", "c200", "c 220", "c220"], askAt5y: 24000, hold: 0.95 },
  { brand: "Mercedes-Benz", name: "GLA", keys: ["gla"], askAt5y: 22000, hold: 0.96 },
  { brand: "Audi", name: "A1", keys: ["a1"], askAt5y: 14000, hold: 0.95 },
  { brand: "Audi", name: "A3", keys: ["a3"], askAt5y: 18500, hold: 0.96 },
  { brand: "Audi", name: "A4", keys: ["a4"], askAt5y: 20000, hold: 0.94 },
  { brand: "Audi", name: "Q2", keys: ["q2"], askAt5y: 17000, hold: 0.95 },
  { brand: "Audi", name: "Q3", keys: ["q3"], askAt5y: 22000, hold: 0.96 },
  { brand: "Toyota", name: "Yaris", keys: ["yaris"], askAt5y: 12500, hold: 1.07 },
  { brand: "Toyota", name: "Yaris Cross", keys: ["yaris cross"], askAt5y: 17000, hold: 1.07 },
  { brand: "Toyota", name: "Corolla", keys: ["corolla"], askAt5y: 15000, hold: 1.06 },
  { brand: "Toyota", name: "C-HR", keys: ["c-hr", "chr"], askAt5y: 16500, hold: 1.04 },
  { brand: "Toyota", name: "RAV4", keys: ["rav4", "rav 4"], askAt5y: 23000, hold: 1.05 },
  { brand: "Toyota", name: "Aygo", keys: ["aygo"], askAt5y: 8000, hold: 1.01 },
  { brand: "Honda", name: "Civic", keys: ["civic"], askAt5y: 14500, hold: 1.01 },
  { brand: "Honda", name: "Jazz", keys: ["jazz"], askAt5y: 11500, hold: 1.02 },
  { brand: "Mazda", name: "Mazda3", keys: ["mazda3", "mazda 3"], askAt5y: 14000, hold: 0.97 },
  { brand: "Mazda", name: "CX-30", keys: ["cx-30", "cx30"], askAt5y: 16500, hold: 0.98 },
  { brand: "Suzuki", name: "Swift", keys: ["swift"], askAt5y: 9500, hold: 0.97 },
  { brand: "Suzuki", name: "Vitara", keys: ["vitara"], askAt5y: 12500, hold: 0.97 },
  { brand: "Renault", name: "Clio", keys: ["clio"], askAt5y: 9500, hold: 0.92 },
  { brand: "Renault", name: "Captur", keys: ["captur"], askAt5y: 11500, hold: 0.93 },
  { brand: "Renault", name: "Megane", keys: ["megane", "mégane"], askAt5y: 10500, hold: 0.9 },
  { brand: "Citroën", name: "C3", keys: ["c3"], askAt5y: 8500, hold: 0.91 },
  { brand: "Citroën", name: "C3 Aircross", keys: ["c3 aircross", "aircross"], askAt5y: 11000, hold: 0.92 },
  { brand: "Opel", name: "Corsa", keys: ["corsa"], askAt5y: 9500, hold: 0.91 },
  { brand: "Opel", name: "Mokka", keys: ["mokka"], askAt5y: 12500, hold: 0.92 },
  { brand: "Dacia", name: "Sandero", keys: ["sandero"], askAt5y: 8000, hold: 0.95 },
  { brand: "Dacia", name: "Duster", keys: ["duster"], askAt5y: 10500, hold: 0.96 },
  { brand: "Hyundai", name: "i20", keys: ["i20"], askAt5y: 9500, hold: 0.96 },
  { brand: "Hyundai", name: "Tucson", keys: ["tucson"], askAt5y: 17500, hold: 0.98 },
  { brand: "Kia", name: "Sportage", keys: ["sportage"], askAt5y: 17500, hold: 0.98 },
  { brand: "Kia", name: "Stonic", keys: ["stonic"], askAt5y: 11500, hold: 0.95 },
  { brand: "Nissan", name: "Micra", keys: ["micra"], askAt5y: 7500, hold: 0.9 },
  { brand: "Nissan", name: "Juke", keys: ["juke"], askAt5y: 11500, hold: 0.92 },
  { brand: "Nissan", name: "Qashqai", keys: ["qashqai"], askAt5y: 14500, hold: 0.94 },
  { brand: "Jeep", name: "Renegade", keys: ["renegade"], askAt5y: 13000, hold: 0.92 },
  { brand: "Jeep", name: "Compass", keys: ["compass"], askAt5y: 16500, hold: 0.93 },
  { brand: "Alfa Romeo", name: "Giulietta", keys: ["giulietta"], askAt5y: 9500, hold: 0.88 },
  { brand: "Alfa Romeo", name: "Giulia", keys: ["giulia"], askAt5y: 20000, hold: 0.93 },
  { brand: "Alfa Romeo", name: "Stelvio", keys: ["stelvio"], askAt5y: 24500, hold: 0.94 },
  { brand: "Volvo", name: "XC40", keys: ["xc40"], askAt5y: 22500, hold: 0.97 },
  { brand: "Volvo", name: "XC60", keys: ["xc60"], askAt5y: 28000, hold: 0.96 },
];

export function modelsForBrand(brand: string): CatalogModel[] {
  return MODEL_CATALOG.filter(
    (m) => m.brand.toLowerCase() === brand.trim().toLowerCase(),
  );
}

export function findCatalogModel(
  brand: string,
  modelText: string,
): CatalogModel | null {
  const brandLc = brand.trim().toLowerCase();
  const text = modelText.trim().toLowerCase().replace(/\s+/g, " ");
  if (!brandLc || !text) return null;

  const candidates = MODEL_CATALOG.filter(
    (m) => m.brand.toLowerCase() === brandLc,
  );
  if (candidates.length === 0) return null;

  let best: CatalogModel | null = null;
  let bestScore = 0;

  for (const entry of candidates) {
    for (const key of entry.keys) {
      if (!key) continue;
      if (text === key || text.includes(key) || key.includes(text)) {
        const score =
          key.length + (text === key ? 20 : text.startsWith(key) ? 10 : 5);
        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      }
    }
    const nameLc = entry.name.toLowerCase();
    if (text.includes(nameLc) || nameLc.includes(text)) {
      const score = nameLc.length + 8;
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }
  }

  return bestScore >= 3 ? best : null;
}

export function findBrandFallback(brand: string): BrandFallback {
  const brandLc = brand.trim().toLowerCase();
  return (
    BRAND_FALLBACKS.find((b) => b.brand.toLowerCase() === brandLc) ??
    BRAND_FALLBACKS[BRAND_FALLBACKS.length - 1]!
  );
}

export function askToBuyIn(askPrice: number) {
  return askPrice * (1 - DEALER_MARGIN);
}
