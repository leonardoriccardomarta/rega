import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { HERO, SITE, TRUST_ITEMS, SECTION_IDS } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function Hero() {
  const contact = getContactLinks();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#e0f2fe_0%,#ffffff_42%,#f8fafc_100%)] pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl" />

      <SectionContainer>
        <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {SITE.name}
            </p>
            <p className="mt-2 text-sm text-slate-500">{SITE.areaLine}</p>

            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {HERO.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {HERO.subheadline}
            </p>

            <div className="mt-6 rounded-2xl border border-sky-200/80 bg-white/80 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {TRUST_ITEMS.map((item, index) => (
                  <span key={item} className="inline-flex items-center">
                    {index > 0 && (
                      <span className="mr-2 text-sky-400" aria-hidden="true">
                        •
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:flex-wrap md:flex">
              {contact ? (
                <>
                  <Button
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="px-6 py-3.5 text-base"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {HERO.whatsappCta}
                  </Button>
                  <Button
                    href={contact.telHref}
                    variant="ghost"
                    className="border-slate-300 px-6 py-3.5 text-base"
                  >
                    <Phone className="h-5 w-5" />
                    {HERO.callCta}
                  </Button>
                  <Button
                    href={`#${SECTION_IDS.inventario}`}
                    variant="primary"
                    className="px-6 py-3.5 text-base"
                  >
                    Vedi le auto
                  </Button>
                </>
              ) : (
                <Button href={`#${SECTION_IDS.inventario}`} variant="primary">
                  Vedi le auto in vetrina
                </Button>
              )}
            </div>

            <div className="mt-6 md:hidden">
              <Button href={`#${SECTION_IDS.inventario}`} variant="primary" className="w-full">
                Scorri le auto in vetrina
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-8">
              <p className="text-sm font-semibold text-sky-700">Come funziona</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                Guardi la vetrina, mi scrivi, chiudiamo senza passaggi inutili.
              </p>
              <ul className="mt-7 space-y-4 text-sm leading-relaxed text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  Foto e dati aggiornati da me, non da un portale generico
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  WhatsApp diretto: disponibilità in poche ore
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  Se ti convince, la vediamo a Treviglio
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </section>
  );
}
