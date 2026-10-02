"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoCarouselProps = {
  photos: string[];
  alt: string;
  priceLabel: string;
  badge?: string;
  priority?: boolean;
};

export function PhotoCarousel({
  photos,
  alt,
  priceLabel,
  badge,
  priority = false,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const list = photos.filter(Boolean);
  const current = list[index];

  function go(delta: number) {
    if (list.length < 2) return;
    setIndex((prev) => (prev + delta + list.length) % list.length);
  }

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden bg-slate-900 sm:aspect-[16/11] lg:aspect-auto lg:min-h-[360px] lg:h-full"
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchX.current == null || list.length < 2) return;
        const endX = e.changedTouches[0]?.clientX ?? touchX.current;
        const dx = endX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
      }}
    >
      {current ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={current}
          alt={`${alt} — foto ${index + 1}`}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading={priority && index === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority && index === 0 ? "high" : "auto"}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

      {list.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-white/95 text-slate-900 shadow-sm sm:h-9 sm:w-9"
            aria-label="Foto precedente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-white/95 text-slate-900 shadow-sm sm:h-9 sm:w-9"
            aria-label="Foto successiva"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-14 left-0 right-0 z-10 flex justify-center gap-1.5 px-4">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/45"
                }`}
                aria-label={`Vai alla foto ${i + 1}`}
              />
            ))}
          </div>

          <div className="absolute right-2 top-2 z-10 rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white">
            {index + 1}/{list.length}
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4">
        {badge && (
          <span className="mb-1.5 inline-block rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
        <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {priceLabel}
        </p>
      </div>
    </div>
  );
}
