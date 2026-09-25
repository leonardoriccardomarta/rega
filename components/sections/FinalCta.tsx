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
      className="bg-slate-950 py-20 text-white md:py-28"
    >
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              {FINAL_CTA.headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">
              {FINAL_CTA.subheadline}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                <p className="text-sm text-amber-200/90">
                  Aggiungi il numero in{" "}
                  <code className="text-amber-100">NEXT_PUBLIC_CONTACT_PHONE</code>{" "}
                  per attivare i contatti.
                </p>
              )}
            </div>

            <a
              href={SITE.subitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-amber-300"
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
