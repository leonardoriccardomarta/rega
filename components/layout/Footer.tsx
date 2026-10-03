import { SITE } from "@/lib/constants";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-8 md:py-10">
      <SectionContainer className="flex flex-col gap-2 text-center md:gap-3">
        <p className="text-sm font-bold text-slate-900 md:text-base">{SITE.name}</p>
        <p className="text-sm text-slate-500">{SITE.areaLine}</p>
        <a
          href={SITE.subitoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Shop Subito Impresa+
        </a>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE.name}. Tutti i diritti riservati.
        </p>
      </SectionContainer>
    </footer>
  );
}
