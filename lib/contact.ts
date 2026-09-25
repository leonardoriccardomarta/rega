const DEFAULT_WHATSAPP_MESSAGE =
  "Ciao, ti contatto dal sito: sono interessato a un'auto.";

export type ContactLinks = {
  telHref: string;
  whatsappHref: string;
  phoneDisplay: string;
};

function normalizePhone(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("3")) digits = `39${digits}`;
  return digits.length >= 9 ? digits : null;
}

export function getContactLinks(): ContactLinks | null {
  const phone = normalizePhone(
    process.env.NEXT_PUBLIC_CONTACT_PHONE ?? process.env.CONTACT_PHONE,
  );
  if (!phone) return null;

  const message =
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE?.trim() || DEFAULT_WHATSAPP_MESSAGE;

  const national =
    phone.startsWith("39") && phone.length > 2 ? phone.slice(2) : phone;

  return {
    telHref: `tel:+${phone}`,
    whatsappHref: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    phoneDisplay: national.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3"),
  };
}

export function whatsappHrefForCar(carTitle: string): string | null {
  const base = getContactLinks();
  if (!base) return null;
  const phone = normalizePhone(
    process.env.NEXT_PUBLIC_CONTACT_PHONE ?? process.env.CONTACT_PHONE,
  );
  if (!phone) return null;
  const message = `Ciao, ti contatto dal sito: sono interessato a ${carTitle}.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
