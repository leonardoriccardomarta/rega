"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Calculator,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SECTION_IDS, SELL } from "@/lib/constants";
import { whatsappHrefWithMessage } from "@/lib/contact";
import {
  CAR_BRANDS,
  CONDITION_OPTIONS,
  FUEL_OPTIONS,
  TRANSMISSION_OPTIONS,
  estimateCarValue,
  formatEuro,
  valuationWhatsAppMessage,
  type ValuationInput,
  type ValuationResult,
} from "@/lib/valuation";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";

export function SellCar() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(String(CURRENT_YEAR - 5));
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState<ValuationInput["fuel"]>("benzina");
  const [transmission, setTransmission] =
    useState<ValuationInput["transmission"]>("manual");
  const [condition, setCondition] =
    useState<ValuationInput["condition"]>("good");
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const input = useMemo((): ValuationInput | null => {
    const yearNum = Number(year);
    const mileageNum = Number(mileage.replace(/\D/g, ""));
    if (!brand || !model.trim() || !yearNum || !mileageNum) return null;
    return {
      brand,
      model: model.trim(),
      year: yearNum,
      mileage: mileageNum,
      fuel,
      transmission,
      condition,
    };
  }, [brand, model, year, mileage, fuel, transmission, condition]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!input) {
      setError("Compila marca, modello, anno e chilometri.");
      setResult(null);
      return;
    }
    if (input.mileage < 500 || input.mileage > 500000) {
      setError("Inserisci un chilometraggio realistico.");
      setResult(null);
      return;
    }
    setResult(estimateCarValue(input));
  }

  const waHref = useMemo(() => {
    if (!input || !result) return null;
    return whatsappHrefWithMessage(valuationWhatsAppMessage(input, result));
  }, [input, result]);

  return (
    <section
      id={SECTION_IDS.stima}
      className="border-y border-slate-200/80 bg-white py-10 md:py-16"
    >
      <SectionContainer>
        <FadeIn>
          <SectionHeading
            eyebrow={SELL.eyebrow}
            title={SELL.title}
            subtitle={SELL.subtitle}
          />
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <FadeIn>
            <form
              onSubmit={onSubmit}
              className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 shadow-sm md:p-6"
            >
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Calculator className="h-4 w-4" />
                </span>
                Dati del veicolo
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="brand" className={labelClass}>
                    Marca
                  </label>
                  <select
                    id="brand"
                    className={fieldClass}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  >
                    <option value="">Seleziona marca</option>
                    {CAR_BRANDS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="model" className={labelClass}>
                    Modello
                  </label>
                  <input
                    id="model"
                    className={fieldClass}
                    placeholder="Es. Golf 1.6 TDI"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="year" className={labelClass}>
                    Anno
                  </label>
                  <select
                    id="year"
                    className={fieldClass}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mileage" className={labelClass}>
                    Chilometri
                  </label>
                  <input
                    id="mileage"
                    inputMode="numeric"
                    className={fieldClass}
                    placeholder="Es. 120000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="fuel" className={labelClass}>
                    Alimentazione
                  </label>
                  <select
                    id="fuel"
                    className={fieldClass}
                    value={fuel}
                    onChange={(e) =>
                      setFuel(e.target.value as ValuationInput["fuel"])
                    }
                  >
                    {FUEL_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="transmission" className={labelClass}>
                    Cambio
                  </label>
                  <select
                    id="transmission"
                    className={fieldClass}
                    value={transmission}
                    onChange={(e) =>
                      setTransmission(
                        e.target.value as ValuationInput["transmission"],
                      )
                    }
                  >
                    {TRANSMISSION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <fieldset className="mt-5">
                <legend className={labelClass}>Condizioni generali</legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {CONDITION_OPTIONS.map((opt) => {
                    const active = condition === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCondition(opt.value)}
                        className={`rounded-lg border px-3 py-2.5 text-left transition ${
                          active
                            ? "border-primary bg-primary-soft shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`block text-sm font-semibold ${
                            active ? "text-primary-dark" : "text-slate-900"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-slate-500">
                          {opt.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {error && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}

              <Button type="submit" variant="primary" className="mt-5 w-full py-3 sm:w-auto">
                Calcola stima
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                {!result ? (
                  <div className="flex h-full min-h-[220px] flex-col justify-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Risultato
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-900">
                      La tua stima comparirà qui
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Compila il form e ottieni una forbice di valore. Poi puoi
                      inviarmi i dati su WhatsApp per una proposta concreta.
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Nessun obbligo e nessun costo
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Risposta diretta da Alberto
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Valutazione finale dopo verifica
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Stima indicativa · affidabilità{" "}
                      {result.confidence}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Fascia di ritiro stimata
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      {formatEuro(result.low)} a {formatEuro(result.high)}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Valore medio di riferimento:{" "}
                      <span className="font-semibold text-slate-800">
                        {formatEuro(result.mid)}
                      </span>
                    </p>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-[72%] rounded-full bg-primary" />
                    </div>

                    {waHref ? (
                      <Button
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="whatsapp"
                        className="mt-5 w-full py-3"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Invia stima su WhatsApp
                      </Button>
                    ) : (
                      <p className="mt-5 text-sm text-amber-700">
                        Contatto WhatsApp non configurato. Scrivi ad Alberto con
                        i dati dell’auto.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
                {SELL.disclaimer}
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>
    </section>
  );
}
