import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ABOUT, SECTION_IDS, SITE } from "@/lib/constants";

export function About() {
  return (
    <section id={SECTION_IDS.chiSono} className="bg-slate-50/60 py-14 md:py-28">
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Chi sono
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-midnight md:text-5xl">
              {ABOUT.name}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/60">
              {ABOUT.description}
            </p>
            <blockquote className="mt-8 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 text-base italic leading-relaxed text-midnight/80 shadow-soft md:text-lg">
              “{ABOUT.quote}”
            </blockquote>
            <p className="mt-6 text-sm text-muted">{SITE.areaLine}</p>
          </div>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}
