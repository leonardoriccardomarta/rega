import { Car, ExternalLink, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { HERO, SITE, TRUST_ITEMS } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function Hero() {
  const contact = getContactLinks();

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-28 pb-16 text-white md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.18),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(15,23,42,1),_transparent_60%)]" />
      <SectionContainer>
        <div className="relative grid items-center gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              <Car className="h-3.5 w-3.5 text-amber-400" />
              {SITE.name} · {SITE.areaLine}
            </p>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {HERO.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
              {HERO.subheadline}
            </p>

            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium text-white/55">
              {TRUST_ITEMS.map((item, index) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {index > 0 && <span className="text-amber-400/50">•</span>}
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
                  <Button href={contact.telHref} variant="secondary" className="px-6 py-3.5 text-base">
                    <Phone className="h-5 w-5" />
                    {HERO.callCta}
                  </Button>
                </>
              ) : (
                <p className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                  Imposta <code className="text-amber-200">NEXT_PUBLIC_CONTACT_PHONE</code>{" "}
                  per attivare WhatsApp e chiamata.
                </p>
              )}
              <Button
                href={SITE.subitoUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="border-white/20 bg-white/10 text-white hover:bg-white/15"
              >
                <ExternalLink className="h-4 w-4" />
                {HERO.subitoCta}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={120} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
              <p className="text-sm font-medium text-amber-400">Vetrina auto</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                Guardi le auto, mi contatti, chiudiamo senza passaggi inutili.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  Inventario aggiornato sul sito
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  WhatsApp diretto, senza form di prenotazione
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                  Stessa zona: Treviglio e Bergamo
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </section>
  );
}
