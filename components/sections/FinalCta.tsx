import { Calculator, ExternalLink, MessageCircle, Phone } from "lucide-react";
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
      className="border-t border-slate-200 bg-gradient-to-b from-primary-soft/50 to-white py-10 md:py-16"
    >
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {FINAL_CTA.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {FINAL_CTA.subheadline}
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              {contact ? (
                <>
                  <Button
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="w-full px-5 py-3 sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    href={contact.telHref}
                    variant="outline"
                    className="w-full px-5 py-3 sm:w-auto"
                  >
                    <Phone className="h-4 w-4" />
                    {contact.phoneDisplay}
                  </Button>
                  <Button
                    href={`#${SECTION_IDS.stima}`}
                    variant="primary"
                    className="w-full px-5 py-3 sm:w-auto"
                  >
                    <Calculator className="h-4 w-4" />
                    Stima la tua auto
                  </Button>
                </>
              ) : (
                <p className="text-sm text-slate-600">
                  Aggiungi il numero in{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">
                    NEXT_PUBLIC_CONTACT_PHONE
                  </code>{" "}
                  per attivare i contatti.
                </p>
              )}
            </div>

            <a
              href={SITE.subitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
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
