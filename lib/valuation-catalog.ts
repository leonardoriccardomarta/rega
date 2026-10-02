/**
 * Catalogo interno per fasce di RITIRO (quanto un dealer può offrire),
 * non prezzi vetrina Autoscout.
 *
 * Ancora di calibrazione: auto ~5 anni, ~75.000 km, condizioni buone, allestimento medio.
 * Valori orientativi mercato Italia nord (BG/MI), aggiornabili a mano.
 */

export type CatalogModel = {
  brand: string;
  name: string;
  /** Token di matching sul testo modello (lowercase) */
  keys: string[];
  /** Offerta media di ritiro a 5 anni / ~75k km / buone condizioni */
  buyInAt5y: number;
  /** Tenuta del valore (Toyota/hybrid alta, diesel vecchi più bassa) */
  hold?: number;
};

export type BrandFallback = {
  brand: string;
  buyInAt5y: number;
  hold?: number;
};

export const BRAND_FALLBACKS: BrandFallback[] = [
  { brand: "Abarth", buyInAt5y: 14500, hold: 0.95 },
  { brand: "Alfa Romeo", buyInAt5y: 15500, hold: 0.92 },
  { brand: "Audi", buyInAt5y: 23000, hold: 0.96 },
  { brand: "BMW", buyInAt5y: 24000, hold: 0.95 },
  { brand: "Citroën", buyInAt5y: 10500, hold: 0.9 },
  { brand: "Cupra", buyInAt5y: 21000, hold: 0.97 },
  { brand: "Dacia", buyInAt5y: 8500, hold: 0.93 },
  { brand: "Fiat", buyInAt5y: 9000, hold: 0.9 },
  { brand: "Ford", buyInAt5y: 11500, hold: 0.92 },
  { brand: "Honda", buyInAt5y: 14000, hold: 1.02 },
  { brand: "Hyundai", buyInAt5y: 12500, hold: 0.98 },
  { brand: "Jeep", buyInAt5y: 16000, hold: 0.93 },
  { brand: "Kia", buyInAt5y: 12500, hold: 0.98 },
  { brand: "Lancia", buyInAt5y: 8500, hold: 0.88 },
  { brand: "Mazda", buyInAt5y: 14000, hold: 0.98 },
  { brand: "Mercedes-Benz", buyInAt5y: 25000, hold: 0.96 },
  { brand: "Mini", buyInAt5y: 15500, hold: 0.95 },
  { brand: "Nissan", buyInAt5y: 11000, hold: 0.92 },
  { brand: "Opel", buyInAt5y: 10500, hold: 0.9 },
  { brand: "Peugeot", buyInAt5y: 11500, hold: 0.92 },
  { brand: "Renault", buyInAt5y: 10500, hold: 0.91 },
  { brand: "Seat", buyInAt5y: 11500, hold: 0.93 },
  { brand: "Skoda", buyInAt5y: 12500, hold: 0.96 },
  { brand: "Suzuki", buyInAt5y: 11000, hold: 0.97 },
  { brand: "Toyota", buyInAt5y: 15500, hold: 1.06 },
  { brand: "Volkswagen", buyInAt5y: 15000, hold: 0.98 },
  { brand: "Volvo", buyInAt5y: 21000, hold: 0.97 },
  { brand: "Altro", buyInAt5y: 10000, hold: 0.9 },
];

export const MODEL_CATALOG: CatalogModel[] = [
  // Fiat / Abarth / Lancia
  { brand: "Fiat", name: "Panda", keys: ["panda"], buyInAt5y: 7800, hold: 0.95 },
  { brand: "Fiat", name: "500", keys: ["500", "cinquecento"], buyInAt5y: 9000, hold: 0.94 },
  { brand: "Fiat", name: "500X", keys: ["500x"], buyInAt5y: 12500, hold: 0.92 },
  { brand: "Fiat", name: "500L", keys: ["500l"], buyInAt5y: 9500, hold: 0.88 },
  { brand: "Fiat", name: "Tipo", keys: ["tipo"], buyInAt5y: 10500, hold: 0.92 },
  { brand: "Fiat", name: "Tipo Cross", keys: ["tipo cross"], buyInAt5y: 12500, hold: 0.93 },
  { brand: "Abarth", name: "595", keys: ["595", "500 abarth"], buyInAt5y: 15500, hold: 0.96 },
  { brand: "Lancia", name: "Ypsilon", keys: ["ypsilon", "ypsilon"], buyInAt5y: 8500, hold: 0.9 },

  // Volkswagen group
  { brand: "Volkswagen", name: "Golf", keys: ["golf"], buyInAt5y: 15500, hold: 1.0 },
  { brand: "Volkswagen", name: "Golf GTI", keys: ["golf gti", "gti"], buyInAt5y: 22000, hold: 1.02 },
  { brand: "Volkswagen", name: "Polo", keys: ["polo"], buyInAt5y: 11500, hold: 0.98 },
  { brand: "Volkswagen", name: "T-Roc", keys: ["t-roc", "troc"], buyInAt5y: 18500, hold: 0.99 },
  { brand: "Volkswagen", name: "Tiguan", keys: ["tiguan"], buyInAt5y: 22000, hold: 0.98 },
  { brand: "Volkswagen", name: "T-Cross", keys: ["t-cross", "tcross"], buyInAt5y: 15500, hold: 0.97 },
  { brand: "Volkswagen", name: "Passat", keys: ["passat"], buyInAt5y: 16000, hold: 0.94 },
  { brand: "Volkswagen", name: "Up!", keys: ["up!", "up "], buyInAt5y: 7500, hold: 0.92 },
  { brand: "Seat", name: "Ibiza", keys: ["ibiza"], buyInAt5y: 10500, hold: 0.94 },
  { brand: "Seat", name: "Leon", keys: ["leon", "león"], buyInAt5y: 14000, hold: 0.95 },
  { brand: "Seat", name: "Arona", keys: ["arona"], buyInAt5y: 13500, hold: 0.95 },
  { brand: "Seat", name: "Ateca", keys: ["ateca"], buyInAt5y: 16500, hold: 0.96 },
  { brand: "Cupra", name: "Formentor", keys: ["formentor"], buyInAt5y: 24500, hold: 1.0 },
  { brand: "Cupra", name: "Leon", keys: ["leon"], buyInAt5y: 22000, hold: 0.99 },
  { brand: "Skoda", name: "Fabia", keys: ["fabia"], buyInAt5y: 10500, hold: 0.96 },
  { brand: "Skoda", name: "Octavia", keys: ["octavia"], buyInAt5y: 15000, hold: 0.98 },
  { brand: "Skoda", name: "Kamiq", keys: ["kamiq"], buyInAt5y: 14500, hold: 0.97 },
  { brand: "Skoda", name: "Karoq", keys: ["karoq"], buyInAt5y: 17500, hold: 0.97 },
  { brand: "Skoda", name: "Superb", keys: ["superb"], buyInAt5y: 18000, hold: 0.95 },

  // BMW / Mini
  { brand: "BMW", name: "Serie 1", keys: ["serie 1", "120", "118", "116", "f40", "f20"], buyInAt5y: 19500, hold: 0.96 },
  { brand: "BMW", name: "Serie 2", keys: ["serie 2", "220", "218", "gran coupe", "active tourer"], buyInAt5y: 22000, hold: 0.96 },
  { brand: "BMW", name: "Serie 3", keys: ["serie 3", "320", "318", "330", "g20", "f30"], buyInAt5y: 25500, hold: 0.97 },
  { brand: "BMW", name: "Serie 5", keys: ["serie 5", "520", "530", "g30"], buyInAt5y: 30000, hold: 0.95 },
  { brand: "BMW", name: "X1", keys: ["x1"], buyInAt5y: 24000, hold: 0.97 },
  { brand: "BMW", name: "X3", keys: ["x3"], buyInAt5y: 31000, hold: 0.97 },
  { brand: "Mini", name: "Cooper", keys: ["cooper", "one", "mini"], buyInAt5y: 15500, hold: 0.95 },
  { brand: "Mini", name: "Countryman", keys: ["countryman"], buyInAt5y: 18500, hold: 0.94 },

  // Mercedes / Audi
  { brand: "Mercedes-Benz", name: "Classe A", keys: ["classe a", "a 180", "a180", "a 200", "a200"], buyInAt5y: 23000, hold: 0.96 },
  { brand: "Mercedes-Benz", name: "Classe B", keys: ["classe b", "b 180", "b180"], buyInAt5y: 18500, hold: 0.93 },
  { brand: "Mercedes-Benz", name: "Classe C", keys: ["classe c", "c 200", "c200", "c 220", "c220"], buyInAt5y: 28000, hold: 0.96 },
  { brand: "Mercedes-Benz", name: "GLA", keys: ["gla"], buyInAt5y: 25500, hold: 0.97 },
  { brand: "Mercedes-Benz", name: "GLC", keys: ["glc"], buyInAt5y: 34000, hold: 0.97 },
  { brand: "Audi", name: "A1", keys: ["a1"], buyInAt5y: 15500, hold: 0.96 },
  { brand: "Audi", name: "A3", keys: ["a3"], buyInAt5y: 21000, hold: 0.97 },
  { brand: "Audi", name: "A4", keys: ["a4"], buyInAt5y: 24000, hold: 0.95 },
  { brand: "Audi", name: "A6", keys: ["a6"], buyInAt5y: 29000, hold: 0.94 },
  { brand: "Audi", name: "Q2", keys: ["q2"], buyInAt5y: 19500, hold: 0.96 },
  { brand: "Audi", name: "Q3", keys: ["q3"], buyInAt5y: 25500, hold: 0.97 },
  { brand: "Audi", name: "Q5", keys: ["q5"], buyInAt5y: 33000, hold: 0.96 },

  // Toyota / Honda / Mazda / Suzuki
  { brand: "Toyota", name: "Yaris", keys: ["yaris"], buyInAt5y: 13500, hold: 1.08 },
  { brand: "Toyota", name: "Yaris Cross", keys: ["yaris cross"], buyInAt5y: 18500, hold: 1.08 },
  { brand: "Toyota", name: "Corolla", keys: ["corolla"], buyInAt5y: 16500, hold: 1.07 },
  { brand: "Toyota", name: "C-HR", keys: ["c-hr", "chr"], buyInAt5y: 18500, hold: 1.05 },
  { brand: "Toyota", name: "RAV4", keys: ["rav4", "rav 4"], buyInAt5y: 25500, hold: 1.06 },
  { brand: "Toyota", name: "Aygo", keys: ["aygo"], buyInAt5y: 8500, hold: 1.02 },
  { brand: "Honda", name: "Civic", keys: ["civic"], buyInAt5y: 16500, hold: 1.02 },
  { brand: "Honda", name: "Jazz", keys: ["jazz"], buyInAt5y: 12500, hold: 1.03 },
  { brand: "Honda", name: "HR-V", keys: ["hr-v", "hrv"], buyInAt5y: 17500, hold: 1.01 },
  { brand: "Mazda", name: "Mazda3", keys: ["mazda3", "mazda 3"], buyInAt5y: 15500, hold: 0.98 },
  { brand: "Mazda", name: "CX-30", keys: ["cx-30", "cx30"], buyInAt5y: 18500, hold: 0.99 },
  { brand: "Mazda", name: "CX-5", keys: ["cx-5", "cx5"], buyInAt5y: 20500, hold: 0.98 },
  { brand: "Suzuki", name: "Swift", keys: ["swift"], buyInAt5y: 10500, hold: 0.98 },
  { brand: "Suzuki", name: "Ignis", keys: ["ignis"], buyInAt5y: 10000, hold: 0.97 },
  { brand: "Suzuki", name: "Vitara", keys: ["vitara"], buyInAt5y: 14000, hold: 0.98 },
  { brand: "Suzuki", name: "S-Cross", keys: ["s-cross", "scross"], buyInAt5y: 13500, hold: 0.97 },

  // French
  { brand: "Peugeot", name: "208", keys: ["208"], buyInAt5y: 11500, hold: 0.94 },
  { brand: "Peugeot", name: "2008", keys: ["2008"], buyInAt5y: 14500, hold: 0.95 },
  { brand: "Peugeot", name: "308", keys: ["308"], buyInAt5y: 13500, hold: 0.93 },
  { brand: "Peugeot", name: "3008", keys: ["3008"], buyInAt5y: 17500, hold: 0.95 },
  { brand: "Peugeot", name: "5008", keys: ["5008"], buyInAt5y: 19500, hold: 0.94 },
  { brand: "Renault", name: "Clio", keys: ["clio"], buyInAt5y: 10500, hold: 0.93 },
  { brand: "Renault", name: "Captur", keys: ["captur"], buyInAt5y: 13000, hold: 0.94 },
  { brand: "Renault", name: "Megane", keys: ["megane", "mégane"], buyInAt5y: 12000, hold: 0.91 },
  { brand: "Renault", name: "Austral", keys: ["austral"], buyInAt5y: 21000, hold: 0.96 },
  { brand: "Citroën", name: "C3", keys: ["c3"], buyInAt5y: 9500, hold: 0.92 },
  { brand: "Citroën", name: "C3 Aircross", keys: ["c3 aircross", "aircross"], buyInAt5y: 12000, hold: 0.92 },
  { brand: "Citroën", name: "C4", keys: ["c4"], buyInAt5y: 12500, hold: 0.92 },
  { brand: "Citroën", name: "C5 Aircross", keys: ["c5 aircross"], buyInAt5y: 16000, hold: 0.93 },
  { brand: "Opel", name: "Corsa", keys: ["corsa"], buyInAt5y: 10500, hold: 0.92 },
  { brand: "Opel", name: "Mokka", keys: ["mokka"], buyInAt5y: 14000, hold: 0.93 },
  { brand: "Opel", name: "Astra", keys: ["astra"], buyInAt5y: 12500, hold: 0.91 },
  { brand: "Dacia", name: "Sandero", keys: ["sandero"], buyInAt5y: 8500, hold: 0.95 },
  { brand: "Dacia", name: "Duster", keys: ["duster"], buyInAt5y: 11500, hold: 0.96 },
  { brand: "Dacia", name: "Jogger", keys: ["jogger"], buyInAt5y: 12500, hold: 0.95 },

  // Others
  { brand: "Ford", name: "Fiesta", keys: ["fiesta"], buyInAt5y: 9500, hold: 0.92 },
  { brand: "Ford", name: "Focus", keys: ["focus"], buyInAt5y: 12000, hold: 0.92 },
  { brand: "Ford", name: "Puma", keys: ["puma"], buyInAt5y: 15500, hold: 0.97 },
  { brand: "Ford", name: "Kuga", keys: ["kuga"], buyInAt5y: 17500, hold: 0.94 },
  { brand: "Hyundai", name: "i20", keys: ["i20"], buyInAt5y: 10500, hold: 0.97 },
  { brand: "Hyundai", name: "i30", keys: ["i30"], buyInAt5y: 12500, hold: 0.96 },
  { brand: "Hyundai", name: "Tucson", keys: ["tucson"], buyInAt5y: 19500, hold: 0.99 },
  { brand: "Hyundai", name: "Kona", keys: ["kona"], buyInAt5y: 15500, hold: 0.97 },
  { brand: "Kia", name: "Rio", keys: ["rio"], buyInAt5y: 9500, hold: 0.96 },
  { brand: "Kia", name: "Ceed", keys: ["ceed", "cee'd"], buyInAt5y: 12000, hold: 0.96 },
  { brand: "Kia", name: "Sportage", keys: ["sportage"], buyInAt5y: 19500, hold: 0.99 },
  { brand: "Kia", name: "Stonic", keys: ["stonic"], buyInAt5y: 12500, hold: 0.96 },
  { brand: "Nissan", name: "Micra", keys: ["micra"], buyInAt5y: 8500, hold: 0.9 },
  { brand: "Nissan", name: "Juke", keys: ["juke"], buyInAt5y: 13000, hold: 0.93 },
  { brand: "Nissan", name: "Qashqai", keys: ["qashqai"], buyInAt5y: 16500, hold: 0.95 },
  { brand: "Nissan", name: "Leaf", keys: ["leaf"], buyInAt5y: 14000, hold: 0.88 },
  { brand: "Jeep", name: "Renegade", keys: ["renegade"], buyInAt5y: 14500, hold: 0.93 },
  { brand: "Jeep", name: "Compass", keys: ["compass"], buyInAt5y: 18500, hold: 0.94 },
  { brand: "Alfa Romeo", name: "Giulietta", keys: ["giulietta"], buyInAt5y: 11000, hold: 0.9 },
  { brand: "Alfa Romeo", name: "Giulia", keys: ["giulia"], buyInAt5y: 23000, hold: 0.94 },
  { brand: "Alfa Romeo", name: "Stelvio", keys: ["stelvio"], buyInAt5y: 28000, hold: 0.95 },
  { brand: "Alfa Romeo", name: "Tonale", keys: ["tonale"], buyInAt5y: 26000, hold: 0.97 },
  { brand: "Volvo", name: "XC40", keys: ["xc40"], buyInAt5y: 25500, hold: 0.98 },
  { brand: "Volvo", name: "XC60", keys: ["xc60"], buyInAt5y: 32000, hold: 0.97 },
  { brand: "Volvo", name: "V60", keys: ["v60"], buyInAt5y: 24000, hold: 0.96 },
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
        const score = key.length + (text === key ? 20 : text.startsWith(key) ? 10 : 5);
        if (score > bestScore) {
          bestScore = score;
          best = entry;
        }
      }
    }
    // also match display name
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
