import { SITE } from "@/lib/constants";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pb-28 pt-10 md:pb-10">
      <SectionContainer className="flex flex-col gap-4 text-center">
        <p className="text-lg font-semibold text-midnight">{SITE.name}</p>
        <p className="text-sm text-muted">{SITE.areaLine}</p>
        <a
          href={SITE.subitoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Shop Subito Impresa+
        </a>
        <p className="text-xs text-black/40">
          © {new Date().getFullYear()} {SITE.name}. Tutti i diritti riservati.
        </p>
      </SectionContainer>
    </footer>
  );
}
