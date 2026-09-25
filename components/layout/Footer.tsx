import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-slate-900">{SITE.name}</p>
        <p className="text-sm text-slate-500">{SITE.areaLine}</p>
        <a
          href={SITE.subitoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-sky-700 hover:underline"
        >
          Shop Subito Impresa+
        </a>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE.name}. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
