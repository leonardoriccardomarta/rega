import { SITE } from "@/lib/constants";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight pb-[calc(4.75rem+env(safe-area-inset-bottom))] pt-8 text-white md:pb-10 md:pt-10">
      <SectionContainer className="flex flex-col gap-3 text-center md:gap-4">
        <p className="text-base font-semibold md:text-lg">{SITE.name}</p>
        <p className="text-sm text-white/50">{SITE.areaLine}</p>
        <a
          href={SITE.subitoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-sky-300 hover:underline"
        >
          Shop Subito Impresa+
        </a>
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} {SITE.name}. Tutti i diritti riservati.
        </p>
      </SectionContainer>
    </footer>
  );
}
