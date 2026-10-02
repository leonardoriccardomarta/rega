import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ABOUT, SECTION_IDS, SITE } from "@/lib/constants";

export function About() {
  return (
    <section
      id={SECTION_IDS.chiSono}
      className="border-y border-slate-200/80 bg-white py-10 md:py-16"
    >
      <SectionContainer>
        <FadeIn>
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Chi sono
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {ABOUT.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {ABOUT.description}
            </p>
            <blockquote className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-800 md:text-base">
              “{ABOUT.quote}”
            </blockquote>
            <p className="mt-4 text-sm text-slate-500">{SITE.areaLine}</p>
          </div>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}
