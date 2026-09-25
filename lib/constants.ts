export const SITE = {
  name: "Alberto Regantini",
  title: "Auto usate a Treviglio",
  tagline: "Le auto che vendo, spiegate bene",
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
  { label: "In vetrina", href: `#${SECTION_IDS.inventario}` },
  { label: "Come lavoro", href: `#${SECTION_IDS.perche}` },
  { label: "Chi sono", href: `#${SECTION_IDS.chiSono}` },
  { label: "Contatti", href: `#${SECTION_IDS.contatti}` },
] as const;

export const HERO = {
  headline: "L’auto giusta, senza perdere tempo al telefono.",
  subheadline:
    "A Treviglio scelgo e vendo auto usate con schede chiare. Guardi le foto, mi scrivi su WhatsApp e ti dico subito se c’è ancora e come possiamo vederla.",
  whatsappCta: "Scrivimi su WhatsApp",
  callCta: "Chiamami",
  subitoCta: "Apri lo shop Subito",
} as const;

export const TRUST_ITEMS = [
  "Treviglio · Bergamo",
  "Contatto diretto",
  "Foto e dati aggiornati",
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
    id: "locale",
    title: "Qui vicino a te",
    description:
      "Lavoro da Treviglio: comodo se cerchi un’usata in provincia di Bergamo senza girare mezza Lombardia.",
  },
  {
    id: "prova",
    title: "Si chiude di persona",
    description:
      "Quando un’auto ti convince, ci sentiamo e la vediamo insieme. Niente sorprese dell’ultimo minuto.",
  },
] as const;

export const ABOUT = {
  name: "Alberto Regantini",
  description:
    "Vendo auto usate a Treviglio. Questo sito è la mia vetrina: le macchine che ho in questo momento, con foto, dati e un contatto diretto. Se qualcosa ti interessa, partiamo da WhatsApp.",
  quote:
    "Preferisco una chat chiara a dieci chiamate a vuoto. Se l’auto c’è, te lo dico subito.",
} as const;

export const FINAL_CTA = {
  headline: "Hai visto un’auto che ti interessa?",
  subheadline:
    "Scrivimi il modello su WhatsApp: ti rispondo sulla disponibilità e organizziamo il passo successivo.",
} as const;
