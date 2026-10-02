"use client";

import { useEffect, useState } from "react";
import { Car, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { NAV_LINKS, SECTION_IDS, SITE } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function Header() {
  const [open, setOpen] = useState(false);
  const contact = getContactLinks();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <SectionContainer className="flex items-center justify-between gap-3 py-3">
        <a
          href="#"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Car className="h-[18px] w-[18px]" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-slate-900 sm:text-base">
              {SITE.name}
            </span>
            <span className="block truncate text-[11px] text-slate-500 sm:text-xs">
              {SITE.title}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          {contact ? (
            <Button href={contact.whatsappHref} variant="whatsapp" className="h-9 px-3.5 py-0">
              WhatsApp
            </Button>
          ) : (
            <Button href={`#${SECTION_IDS.contatti}`} variant="primary" className="h-9 px-3.5 py-0">
              Contatti
            </Button>
          )}
        </nav>

        <button
          type="button"
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-800 shadow-sm lg:hidden"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </SectionContainer>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[57px] z-40 bg-white lg:hidden">
          <nav
            className="flex h-full flex-col px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-2"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-slate-100 py-4 text-base font-semibold text-slate-900"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <Button
                href={`#${SECTION_IDS.stima}`}
                variant="outline"
                className="w-full py-3"
                onClick={() => setOpen(false)}
              >
                Stima la tua auto
              </Button>
              {contact && (
                <Button
                  href={contact.whatsappHref}
                  variant="whatsapp"
                  className="w-full py-3"
                  onClick={() => setOpen(false)}
                >
                  WhatsApp
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
