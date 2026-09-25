import { ExternalLink, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { FINAL_CTA, SECTION_IDS, SITE } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function FinalCta() {
  const contact = getContactLinks();

  return (
    <section
      id={SECTION_IDS.contatti}
      className="bg-midnight pt-14 pb-8 text-white md:py-28"
    >
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-5xl">
              {FINAL_CTA.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 md:mt-5 md:text-lg">
              {FINAL_CTA.subheadline}
            </p>

            {/* Sticky bar already covers WhatsApp/call on mobile */}
            <div className="mt-7 hidden flex-col items-center justify-center gap-3 sm:flex-row md:mt-8 md:flex">
              {contact ? (
                <>
                  <Button
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="min-w-[200px] px-6 py-3.5 text-base"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </Button>
                  <Button
                    href={contact.telHref}
                    variant="secondary"
                    className="min-w-[200px] px-6 py-3.5 text-base"
                  >
                    <Phone className="h-5 w-5" />
                    {contact.phoneDisplay}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-sky-200/90">
                  Aggiungi il numero in{" "}
                  <code className="text-sky-100">NEXT_PUBLIC_CONTACT_PHONE</code>{" "}
                  per attivare i contatti.
                </p>
              )}
            </div>

            <p className="mt-5 text-sm text-white/55 md:hidden">
              Usa WhatsApp o chiama dalla barra in basso.
            </p>

            <a
              href={SITE.subitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white md:mt-6"
            >
              Oppure apri lo shop Subito
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}
