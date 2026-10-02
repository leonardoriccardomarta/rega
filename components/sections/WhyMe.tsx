import { Calculator, MapPinned, MessageSquare, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECTION_IDS, WHY_POINTS } from "@/lib/constants";

const icons = {
  diretto: MessageSquare,
  chiaro: ShieldCheck,
  acquisto: Calculator,
  locale: MapPinned,
} as const;

export function WhyMe() {
  return (
    <section id={SECTION_IDS.perche} className="py-10 md:py-16">
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow="Il modo di lavorare"
            title="Perché contattarmi"
            subtitle="Contatto diretto, schede chiare e valutazione auto: così eviti perdite di tempo."
          />
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_POINTS.map((point, index) => {
            const Icon = icons[point.id as keyof typeof icons];
            return (
              <FadeIn key={point.id} delay={index * 50}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {point.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
