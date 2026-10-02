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
      className="bg-slate-900 py-10 text-white md:py-16"
    >
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              {FINAL_CTA.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
              {FINAL_CTA.subheadline}
            </p>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center sm:flex-wrap">
              {contact ? (
                <>
                  <Button
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="px-5 py-3"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    href={contact.telHref}
                    variant="outline"
                    className="border-slate-600 bg-transparent text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" />
                    {contact.phoneDisplay}
                  </Button>
                  <Button
                    href={`#${SECTION_IDS.stima}`}
                    variant="ghost"
                    className="border-slate-600 bg-transparent text-white hover:bg-white/10"
                  >
                    Stima la tua auto
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

            <a
              href={SITE.subitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
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
