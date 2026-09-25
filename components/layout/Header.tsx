"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { NAV_LINKS, SECTION_IDS, SITE } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const contact = getContactLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-200/80 bg-white/95 py-3 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <SectionContainer className="flex items-center justify-between gap-4">
        <a href="#" className="min-w-0" onClick={() => setOpen(false)}>
          <p className="truncate text-base font-semibold text-midnight sm:text-lg">
            {SITE.name}
          </p>
          <p className="truncate text-[11px] text-black/50 sm:text-xs">
            {SITE.title}
          </p>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black/70 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          {contact ? (
            <Button href={contact.whatsappHref} variant="whatsapp" className="py-2.5">
              WhatsApp
            </Button>
          ) : (
            <Button href={`#${SECTION_IDS.contatti}`} variant="primary" className="py-2.5">
              Contatti
            </Button>
          )}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-midnight md:hidden"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </SectionContainer>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-slate-100 px-1 py-3.5 text-base font-medium text-midnight"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {contact && (
            <Button
              href={contact.whatsappHref}
              variant="whatsapp"
              className="mt-4 w-full py-3.5"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
