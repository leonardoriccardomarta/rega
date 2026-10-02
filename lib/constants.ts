export const SITE = {
  name: "Alberto Regantini",
  title: "Auto usate a Treviglio",
  tagline: "Compro e vendo auto usate, senza giri di parole",
  areaLine: "Treviglio (BG) e provincia di Bergamo",
  subitoUrl:
    process.env.NEXT_PUBLIC_SUBITO_URL?.trim() ||
    "https://impresapiu.subito.it/shops/60152-regantini",
} as const;

export const SECTION_IDS = {
  inventario: "inventario",
  stima: "stima",
  perche: "perche",
  chiSono: "chi-sono",
  contatti: "contatti",
} as const;

export const NAV_LINKS = [
  { label: "In vetrina", href: `#${SECTION_IDS.inventario}` },
  { label: "Vendi la tua", href: `#${SECTION_IDS.stima}` },
  { label: "Come lavoro", href: `#${SECTION_IDS.perche}` },
  { label: "Chi sono", href: `#${SECTION_IDS.chiSono}` },
  { label: "Contatti", href: `#${SECTION_IDS.contatti}` },
] as const;

export const HERO = {
  headline: "Compro e vendo auto usate a Treviglio.",
  subheadline:
    "Vetrina aggiornata, schede chiare e contatto diretto su WhatsApp. Cerchi un’usata o vuoi vendere la tua? Ti rispondo io, senza call center.",
  whatsappCta: "WhatsApp",
  callCta: "Chiama",
  inventoryCta: "Vedi le auto",
  sellCta: "Stima la tua auto",
} as const;

export const TRUST_ITEMS = [
  "Treviglio · Bergamo",
  "Contatto diretto",
  "Compro e vendo",
  "Niente call center",
] as const;

export const WHY_POINTS = [
  {
    id: "diretto",
    title: "Parli con me, punto",
    description:
      "Niente centralini e risposte a caso. Mi scrivi, ti rispondo io e ti dico se l’auto è ancora disponibile.",
  },
  {
    id: "chiaro",
    title: "Schede leggibili",
    description:
      "Prezzo, km, anno e condizioni in evidenza. Se qualcosa non torna, lo chiarisco prima che tu perda tempo.",
  },
  {
    id: "acquisto",
    title: "Compro anche la tua",
    description:
      "Valuto auto usate in zona: stima indicativa online, poi conferma diretta e proposta chiara.",
  },
  {
    id: "locale",
    title: "Qui vicino a te",
    description:
      "Lavoro da Treviglio: comodo se cerchi o vendi un’usata in provincia di Bergamo.",
  },
] as const;

export const ABOUT = {
  name: "Alberto Regantini",
  description:
    "A Treviglio compro e vendo auto usate. Questo sito è la mia vetrina e il punto dove puoi stimare la tua macchina in pochi minuti. Se qualcosa ti interessa, partiamo da WhatsApp.",
  quote:
    "Preferisco una chat chiara a dieci chiamate a vuoto. Se l’auto c’è, o se la compro, te lo dico subito.",
} as const;

export const SELL = {
  eyebrow: "Vendimi la tua auto",
  title: "Stima di ritiro in pochi minuti",
  subtitle:
    "Inserisci i dati: ricevi una fascia indicativa di ritiro basata sul catalogo modelli, poi Alberto ti conferma il valore reale.",
  disclaimer:
    "Fascia di ritiro indicativa, calibrata sullo stile di rivendita dello shop Subito (con margine tipico del rivenditore). Il valore definitivo lo concordiamo dopo foto, documenti e stato reale del veicolo.",
} as const;

export const FINAL_CTA = {
  headline: "Cerchi un’auto o vuoi venderla?",
  subheadline:
    "Scrivimi su WhatsApp: ti rispondo sulla disponibilità in vetrina o sulla valutazione della tua macchina.",
} as const;
