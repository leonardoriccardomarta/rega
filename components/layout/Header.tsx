"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Car, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { NAV_LINKS, SECTION_IDS, SITE } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contact = getContactLinks();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.dataset.menuOpen = open ? "true" : "false";
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  const menu =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
              <a
                href="#"
                className="flex min-w-0 items-center gap-2.5"
                onClick={() => setOpen(false)}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                  <Car className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-slate-900">
                    {SITE.name}
                  </span>
                  <span className="block truncate text-[11px] text-slate-500">
                    {SITE.title}
                  </span>
                </span>
              </a>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-800 shadow-sm"
                aria-label="Chiudi menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col overflow-y-auto px-4 pb-8 pt-2"
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

              <div className="mt-6 flex flex-col gap-2">
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
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
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
              <Button
                href={contact.whatsappHref}
                variant="whatsapp"
                className="h-9 px-3.5 py-0"
              >
                WhatsApp
              </Button>
            ) : (
              <Button
                href={`#${SECTION_IDS.contatti}`}
                variant="primary"
                className="h-9 px-3.5 py-0"
              >
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
      </header>
      {menu}
    </>
  );
}
