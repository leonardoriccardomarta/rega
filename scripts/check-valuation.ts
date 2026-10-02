import { estimateCarValue } from "../lib/valuation";

const samples = [
  {
    label: "Shop: Peugeot 208 2012 (ask 4300)",
    input: {
      brand: "Peugeot",
      model: "208 Plus 1.1",
      year: 2012,
      mileage: 115000,
      fuel: "benzina" as const,
      transmission: "manual" as const,
      condition: "good" as const,
    },
  },
  {
    label: "Shop: Fiat Grande Punto 2010 (ask 2300)",
    input: {
      brand: "Fiat",
      model: "Grande Punto 1.3 MJT",
      year: 2010,
      mileage: 195000,
      fuel: "diesel" as const,
      transmission: "manual" as const,
      condition: "good" as const,
    },
  },
  {
    label: "Shop: Ford Fiesta 2010 (ask 2300)",
    input: {
      brand: "Ford",
      model: "Fiesta 1.4 TDCi Titanium",
      year: 2010,
      mileage: 185000,
      fuel: "diesel" as const,
      transmission: "manual" as const,
      condition: "good" as const,
    },
  },
  {
    label: "Shop: BMW 730d 2003 (ask 3300)",
    input: {
      brand: "BMW",
      model: "730d cat",
      year: 2003,
      mileage: 258000,
      fuel: "diesel" as const,
      transmission: "automatic" as const,
      condition: "fair" as const,
    },
  },
  {
    label: "Shop: Subaru Outback 2008 (ask 2100)",
    input: {
      brand: "Subaru",
      model: "Outback 2.5i",
      year: 2008,
      mileage: 320000,
      fuel: "benzina" as const,
      transmission: "manual" as const,
      condition: "fair" as const,
    },
  },
];

for (const s of samples) {
  const r = estimateCarValue(s.input);
  console.log(
    s.label,
    "=> ritiro",
    r.low,
    "-",
    r.high,
    "| mid",
    r.mid,
    "| ask~",
    r.askMid,
    "|",
    r.matchedModel,
    r.confidence,
  );
}
