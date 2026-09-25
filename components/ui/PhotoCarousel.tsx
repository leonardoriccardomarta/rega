"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoCarouselProps = {
  photos: string[];
  alt: string;
  priceLabel: string;
  badge?: string;
};

export function PhotoCarousel({
  photos,
  alt,
  priceLabel,
  badge,
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
      className="relative min-h-[260px] overflow-hidden bg-slate-900 sm:min-h-[320px] lg:h-full lg:min-h-[420px]"
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
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.28),transparent_45%),linear-gradient(160deg,#0f172a,#1e293b)]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

      {list.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md"
            aria-label="Foto precedente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md"
            aria-label="Foto successiva"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-[4.75rem] left-0 right-0 z-10 flex justify-center gap-1.5 px-4">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/45"
                }`}
                aria-label={`Vai alla foto ${i + 1}`}
              />
            ))}
          </div>

          <div className="absolute right-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white">
            {index + 1}/{list.length}
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
        {badge && (
          <span className="mb-2 inline-block rounded-full bg-sky-600 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
        <p className="text-3xl font-semibold tracking-tight text-white">
          {priceLabel}
        </p>
      </div>
    </div>
  );
}
