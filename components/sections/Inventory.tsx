"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { carSpecs, coverPhoto, type CarListing } from "@/lib/cars";
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
    const id = window.setInterval(() => void load(), 20000);
    return () => window.clearInterval(id);
  }, [load]);

  return (
    <section id={SECTION_IDS.inventario} className="bg-slate-50 py-16 md:py-24">
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow="In vetrina"
            title="Auto disponibili ora"
            subtitle="Scorri le foto, leggi i dati, apri l’annuncio Subito o scrivimi su WhatsApp se una macchina ti convince."
          />
        </FadeIn>

        {loading && (
          <p className="text-center text-sm text-slate-500">Caricamento auto…</p>
        )}

        {!loading && cars.length === 0 && (
          <p className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-slate-500">
            Al momento non ci sono auto in vetrina. Scrivimi su WhatsApp: ti
            aggiorno su cosa sta arrivando.
          </p>
        )}

        <div className="space-y-7 md:space-y-9">
          {cars.map((car, index) => {
            const wa = whatsappHrefForCar(car.title);
            const specs = carSpecs(car).slice(0, 9);
            const photos = car.photos?.length
              ? car.photos
              : coverPhoto(car)
                ? [coverPhoto(car)!]
                : [];

            return (
              <FadeIn key={`${car.id}-${car.updatedAt}`} delay={index * 50}>
                <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
                    <PhotoCarousel
                      photos={photos}
                      alt={car.title}
                      priceLabel={formatPrice(car.price)}
                      badge={car.badge}
                    />

                    <div className="flex flex-col p-5 sm:p-7 md:p-8">
                      <p className="text-sm text-slate-500">{car.location}</p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 md:text-[1.75rem]">
                        {car.title}
                      </h3>
                      {car.description && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-[15px]">
                          {car.description}
                        </p>
                      )}

                      {specs.length > 0 && (
                        <div className="mt-5">
                          <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
                            Dati principali
                          </p>
                          <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                            {specs.map((spec) => (
                              <div
                                key={`${car.id}-${spec.label}`}
                                className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                              >
                                <dt className="text-[10px] uppercase tracking-wide text-slate-400">
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

                      <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row">
                        {wa && (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[#1fb855]"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Interessato · WhatsApp
                          </a>
                        )}
                        <a
                          href={car.subitoUrl || SITE.subitoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Annuncio Subito
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
