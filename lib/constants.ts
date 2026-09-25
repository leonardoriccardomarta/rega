export const SITE = {
  name: "Alberto Regantini",
  title: "Auto usate · Treviglio",
  tagline: "Auto selezionate, contatto diretto",
  areaLine: "Treviglio (BG) e provincia di Bergamo",
  subitoUrl:
    process.env.NEXT_PUBLIC_SUBITO_URL?.trim() ||
    "https://impresapiu.subito.it/shops/60152-regantini",
} as const;

export const SECTION_IDS = {
  inventario: "inventario",
  perche: "perche",
  chiSono: "chi-sono",
  contatti: "contatti",
} as const;

export const NAV_LINKS = [
  { label: "Auto in vendita", href: `#${SECTION_IDS.inventario}` },
  { label: "Perché me", href: `#${SECTION_IDS.perche}` },
  { label: "Chi sono", href: `#${SECTION_IDS.chiSono}` },
  { label: "Contatti", href: `#${SECTION_IDS.contatti}` },
] as const;

export const HERO = {
  headline: "Auto usate chiare, senza giri inutili.",
  subheadline:
    "Seleziono e vendo auto a Treviglio e provincia. Guardi le schede, mi scrivi su WhatsApp e ti dico subito disponibilità, condizioni e possibilità di prova.",
  whatsappCta: "Scrivimi su WhatsApp",
  callCta: "Chiamami",
  subitoCta: "Vedi anche su Subito",
} as const;

export const TRUST_ITEMS = [
  "Treviglio (BG)",
  "Contatto diretto",
  "Schede chiare",
  "Niente call center",
] as const;

export const WHY_POINTS = [
  {
    id: "diretto",
    title: "Parli con me",
    description:
      "Niente centralini: mi scrivi, ti rispondo e ti dico se l'auto c'è ancora e in che condizioni è.",
  },
  {
    id: "chiaro",
    title: "Schede trasparenti",
    description:
      "Chilometri, anno, alimentazione e prezzo in evidenza. Se qualcosa non è chiaro, lo chiarisco subito.",
  },
  {
    id: "locale",
    title: "Zona Bergamo",
    description:
      "Opero da Treviglio: comodo per chi cerca un'auto usata in provincia di Bergamo e dintorni.",
  },
  {
    id: "prova",
    title: "Prova e confronto",
    description:
      "Possiamo sentirci, valutare l'auto insieme e capire se fa al caso tuo prima di chiudere.",
  },
] as const;

export const ABOUT = {
  name: "Alberto Regantini",
  description:
    "Vendo auto usate a Treviglio. Questo sito è la vetrina delle auto disponibili e il modo più veloce per contattarmi: WhatsApp o telefono, senza moduli complicati.",
  quote:
    "Se un'auto ti interessa, scrivimi: ti dico subito se è ancora disponibile e come possiamo vederla.",
} as const;

export const FINAL_CTA = {
  headline: "Hai visto un'auto che ti interessa?",
  subheadline:
    "Scrivimi su WhatsApp con il modello: ti rispondo sulla disponibilità e organizziamo il passo successivo.",
} as const;
