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
    <section id={SECTION_IDS.perche} className="bg-slate-50 py-20 md:py-28">
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow="Il modo di lavorare"
            title="Perché contattarmi"
            subtitle="Un contatto diretto e schede chiare: così eviti perdite di tempo su auto già vendute o info confuse."
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2">
          {WHY_POINTS.map((point, index) => {
            const Icon = icons[point.id as keyof typeof icons];
            return (
              <FadeIn key={point.id} delay={index * 70}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
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
