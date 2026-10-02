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

export function Inventory({
  initialCars = [],
}: {
  initialCars?: CarListing[];
}) {
  const [cars, setCars] = useState<CarListing[]>(initialCars);
  const [loading, setLoading] = useState(initialCars.length === 0);

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
    if (initialCars.length === 0) {
      void load();
    }
    const tick = () => {
      if (document.visibilityState === "visible") void load();
    };
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, [load, initialCars.length]);

  return (
    <section id={SECTION_IDS.inventario} className="py-10 md:py-16">
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow="In vetrina"
            title="Auto disponibili ora"
            subtitle="Scorri le foto, leggi i dati, apri l’annuncio Subito o scrivimi su WhatsApp."
          />
        </FadeIn>

        {loading && (
          <p className="text-center text-sm text-slate-500">Caricamento auto…</p>
        )}

        {!loading && cars.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500 shadow-sm">
            Al momento non ci sono auto in vetrina. Scrivimi su WhatsApp: ti
            aggiorno su cosa sta arrivando.
          </p>
        )}

        <div className="space-y-5 md:space-y-6">
          {cars.map((car, index) => {
            const wa = whatsappHrefForCar(car.title);
            const specs = carSpecs(car).slice(0, 6);
            const cover = coverPhoto(car);
            const photos = car.photos?.length
              ? car.photos
              : cover
                ? [cover]
                : [];

            return (
              <FadeIn key={`${car.id}-${car.updatedAt}`} delay={index * 30}>
                <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                  <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                    <PhotoCarousel
                      photos={photos}
                      alt={car.title}
                      priceLabel={formatPrice(car.price)}
                      badge={car.badge}
                      priority={index === 0}
                    />

                    <div className="flex flex-col p-4 md:p-6">
                      <p className="text-xs font-medium text-slate-500">
                        {car.location}
                      </p>
                      <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                        {car.title}
                      </h3>
                      {car.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 md:line-clamp-4">
                          {car.description}
                        </p>
                      )}

                      {specs.length > 0 && (
                        <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                          {specs.map((spec) => (
                            <div
                              key={`${car.id}-${spec.label}`}
                              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                            >
                              <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                {spec.label}
                              </dt>
                              <dd className="mt-0.5 font-semibold text-slate-900">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
                        {wa && (
                          <a
                            href={wa}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1fb855]"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Interessato · WhatsApp
                          </a>
                        )}
                        <a
                          href={car.subitoUrl || SITE.subitoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
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
