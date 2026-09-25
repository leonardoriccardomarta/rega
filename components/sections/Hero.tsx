import { MessageCircle, Phone } from "lucide-react";
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
    <section className="relative overflow-hidden bg-hero pt-24 pb-12 md:pt-36 md:pb-24">
      <SectionContainer>
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:text-sm">
              {SITE.name}
            </p>
            <p className="mt-1.5 text-sm text-black/50">{SITE.areaLine}</p>

            <h1 className="mt-4 text-balance text-[1.85rem] font-semibold leading-[1.12] tracking-tight text-midnight sm:mt-5 sm:text-5xl lg:text-6xl">
              {HERO.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/65 sm:mt-6 sm:text-lg md:text-xl">
              {HERO.subheadline}
            </p>

            <div className="mt-5 rounded-2xl border border-primary/15 bg-white/80 px-3.5 py-2.5 text-[13px] font-medium text-black/70 shadow-soft backdrop-blur-sm sm:mt-6 sm:px-4 sm:py-3 sm:text-sm">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {TRUST_ITEMS.map((item, index) => (
                  <span key={item} className="inline-flex items-center">
                    {index > 0 && (
                      <span className="mr-2 text-primary/40" aria-hidden="true">
                        •
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-7 hidden flex-col gap-3 sm:flex-row sm:flex-wrap md:flex">
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
                    className="px-6 py-3.5 text-base"
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

            <div className="mt-5 md:hidden">
              <Button
                href={`#${SECTION_IDS.inventario}`}
                variant="primary"
                className="w-full py-3.5"
              >
                Scorri le auto in vetrina
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:mr-0 lg:ml-auto">
              <div className="absolute -inset-4 rounded-[1.75rem] bg-gradient-to-br from-primary/10 to-sky-200/40 blur-2xl md:-inset-6 md:rounded-[2rem]" />
              <div className="relative overflow-hidden rounded-[1.5rem] shadow-feature md:rounded-[2rem]">
                {featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featuredImage}
                    alt={featuredTitle || "Auto in vetrina"}
                    className="h-[240px] w-full object-cover sm:h-[300px] md:h-[400px]"
                    fetchPriority="high"
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-[240px] w-full flex-col justify-end bg-[linear-gradient(160deg,#0b1f33,#1e3a5f)] p-6 sm:h-[300px] md:h-[400px] md:p-7">
                    <p className="text-sm font-semibold text-sky-200">
                      Come funziona
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white md:text-2xl">
                      Guardi la vetrina, mi scrivi, chiudiamo senza giri.
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
                  <p className="text-xs font-medium text-white/80 sm:text-sm">
                    {featuredTitle ? "In evidenza ora" : "Come funziona"}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-base font-semibold sm:text-lg">
                    {featuredTitle
                      ? `${featuredTitle}${featuredPrice ? ` · ${featuredPrice}` : ""}`
                      : "Guardi, mi scrivi, chiudiamo"}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </section>
  );
}
