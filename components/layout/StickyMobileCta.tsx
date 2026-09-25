import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function StickyMobileCta() {
  const contact = getContactLinks();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
      {contact ? (
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={contact.telHref}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200"
            aria-label="Chiama"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      ) : (
        <div className="mx-auto max-w-lg">
          <Button href={`#${SECTION_IDS.contatti}`} variant="primary" className="w-full">
            Contattami
          </Button>
        </div>
      )}
    </div>
  );
}
