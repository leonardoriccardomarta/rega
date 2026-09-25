"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { carSpecs, type CarListing } from "@/lib/cars";
import { SECTION_IDS, SITE } from "@/lib/constants";
import { whatsappHrefForCar } from "@/lib/contact";

function formatPrice(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Inventory() {
  const [cars, setCars] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/cars", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { cars: CarListing[] };
      setCars(data.cars);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 15000);
    return () => window.clearInterval(id);
  }, [load]);

  return (
    <section id={SECTION_IDS.inventario} className="bg-white py-20 md:py-28">
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow="Inventario"
            title="Auto in vendita"
            subtitle="Vetrina aggiornata da Alberto: titolo, descrizione, dati principali e link all'annuncio Subito."
          />
        </FadeIn>

        {loading && (
          <p className="text-center text-sm text-slate-500">Caricamento auto…</p>
        )}

        {!loading && cars.length === 0 && (
          <p className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
            Nessuna auto in vetrina al momento. Torna a breve o scrivimi su
            WhatsApp.
          </p>
        )}

        <div className="space-y-8">
          {cars.map((car, index) => {
            const wa = whatsappHrefForCar(car.title);
            const specs = carSpecs(car);
            return (
              <FadeIn key={`${car.id}-${car.updatedAt}`} delay={index * 60}>
                <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
                  <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                    <div className="relative min-h-[240px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 lg:min-h-full">
                      {car.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={car.photoUrl}
                          alt={car.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.25),transparent_45%)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        {car.badge && (
                          <span className="mb-2 inline-block rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-950">
                            {car.badge}
                          </span>
                        )}
                        <p className="text-3xl font-semibold text-white">
                          {formatPrice(car.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col p-6 md:p-8">
                      <p className="text-sm text-slate-500">{car.location}</p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                        {car.title}
                      </h3>
                      {car.description && (
                        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                          {car.description}
                        </p>
                      )}

                      {specs.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-700">
                            Informazioni di base
                          </p>
                          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-3">
                            {specs.map((spec) => (
                              <div
                                key={`${car.id}-${spec.label}`}
                                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                              >
                                <dt className="text-[11px] uppercase tracking-wide text-slate-400">
                                  {spec.label}
                                </dt>
                                <dd className="mt-0.5 font-medium text-slate-800">
                                  {spec.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      )}

                      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                        {wa ? (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1fb855]"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Interessato · WhatsApp
                          </a>
                        ) : null}
                        <a
                          href={car.subitoUrl || SITE.subitoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Vedi su Subito
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={200}>
          <p className="mt-10 text-center text-sm text-slate-500">
            Shop completo anche su{" "}
            <a
              href={SITE.subitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 hover:underline"
            >
              Subito Impresa+ Regantini
            </a>
            .
          </p>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}
