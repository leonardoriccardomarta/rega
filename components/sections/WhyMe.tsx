import { Handshake, MapPinned, MessageSquare, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECTION_IDS, WHY_POINTS } from "@/lib/constants";

const icons = {
  diretto: MessageSquare,
  chiaro: ShieldCheck,
  locale: MapPinned,
  prova: Handshake,
} as const;

export function WhyMe() {
  return (
    <section id={SECTION_IDS.perche} className="py-14 md:py-28">
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow="Il modo di lavorare"
            title="Perché contattarmi"
            subtitle="Un contatto diretto e schede chiare: così eviti perdite di tempo su auto già vendute o info confuse."
          />
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {WHY_POINTS.map((point, index) => {
            const Icon = icons[point.id as keyof typeof icons];
            return (
              <FadeIn key={point.id} delay={index * 80}>
                <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-midnight">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
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
