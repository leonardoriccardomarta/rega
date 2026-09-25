"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SECTION_IDS, SITE } from "@/lib/constants";
import { getContactLinks } from "@/lib/contact";

export function Header() {
  const [open, setOpen] = useState(false);
  const contact = getContactLinks();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-tight text-white">
            {SITE.name}
          </p>
          <p className="truncate text-xs text-white/50">{SITE.title}</p>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition hover:text-white"
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
          className="rounded-lg p-2 text-white md:hidden"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-white/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
