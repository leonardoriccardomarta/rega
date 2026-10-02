import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { HERO, SITE, TRUST_ITEMS, SECTION_IDS } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

type HeroProps = {
  featuredImage?: string;
  featuredTitle?: string;
  featuredPrice?: string;
};

export function Hero({
  featuredImage,
  featuredTitle,
  featuredPrice,
}: HeroProps) {
  const contact = getContactLinks();

  return (
    <section className="border-b border-slate-200/80 bg-gradient-to-b from-white to-primary-soft/40 py-8 md:py-12">
      <SectionContainer>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <FadeIn className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 md:text-base">
              {SITE.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              {SITE.areaLine}
            </p>

            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {HERO.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              {HERO.subheadline}
            </p>

            <ul className="mt-4 space-y-1.5">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button href={`#${SECTION_IDS.inventario}`} variant="primary">
                {HERO.inventoryCta}
              </Button>
              <Button href={`#${SECTION_IDS.stima}`} variant="outline">
                {HERO.sellCta}
              </Button>
              {contact && (
                <>
                  <Button
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    className="hidden sm:inline-flex"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {HERO.whatsappCta}
                  </Button>
                  <Button
                    href={contact.telHref}
                    variant="ghost"
                    className="hidden sm:inline-flex"
                  >
                    <Phone className="h-4 w-4" />
                    {HERO.callCta}
                  </Button>
                </>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={100} className="w-full lg:max-w-md lg:shrink-0">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
              {featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredImage}
                  alt={featuredTitle || "Auto in vetrina"}
                  className="aspect-[16/10] w-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div className="flex aspect-[16/10] w-full flex-col justify-end bg-gradient-to-br from-slate-900 to-slate-700 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-light">
                    Come funziona
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    Guardi la vetrina, mi scrivi, chiudiamo senza giri.
                  </p>
                </div>
              )}
              <div className="border-t border-slate-100 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {featuredTitle ? "In evidenza ora" : "Inizia da qui"}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 md:text-base">
                  {featuredTitle
                    ? `${featuredTitle}${featuredPrice ? ` · ${featuredPrice}` : ""}`
                    : "Vetrina aggiornata · Stima gratuita"}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </section>
  );
}
