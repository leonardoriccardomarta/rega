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
  modelsForBrand,
  valuationWhatsAppMessage,
  type ValuationInput,
  type ValuationResult,
} from "@/lib/valuation";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";

function confidenceBar(confidence: ValuationResult["confidence"]) {
  if (confidence === "alta") return "w-[85%] bg-emerald-500";
  if (confidence === "media") return "w-[60%] bg-primary";
  return "w-[35%] bg-amber-500";
}

function confidenceLabel(confidence: ValuationResult["confidence"]) {
  if (confidence === "alta") return "Affidabilità alta (modello in catalogo)";
  if (confidence === "media") return "Affidabilità media";
  return "Affidabilità indicativa";
}

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

  const catalogModels = useMemo(
    () => (brand ? modelsForBrand(brand) : []),
    [brand],
  );

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

  function resetResult() {
    setResult(null);
    setError(null);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!input) {
      setError("Compila marca, modello, anno e chilometri.");
      setResult(null);
      return;
    }
    if (input.year > CURRENT_YEAR || input.year < CURRENT_YEAR - 30) {
      setError("Anno non valido.");
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
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setModel("");
                      resetResult();
                    }}
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
                    list="model-catalog"
                    className={fieldClass}
                    placeholder={
                      brand
                        ? catalogModels[0]
                          ? `Es. ${catalogModels[0].name}`
                          : "Scrivi il modello"
                        : "Prima scegli la marca"
                    }
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      resetResult();
                    }}
                    required
                    disabled={!brand}
                  />
                  <datalist id="model-catalog">
                    {catalogModels.map((m) => (
                      <option key={m.name} value={m.name} />
                    ))}
                  </datalist>
                  {brand && catalogModels.length > 0 && (
                    <p className="mt-1.5 text-[11px] text-slate-500">
                      Suggeriti dal catalogo:{" "}
                      {catalogModels
                        .slice(0, 4)
                        .map((m) => m.name)
                        .join(", ")}
                      {catalogModels.length > 4 ? "…" : ""}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="year" className={labelClass}>
                    Anno
                  </label>
                  <select
                    id="year"
                    className={fieldClass}
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                      resetResult();
                    }}
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
                    onChange={(e) => {
                      setMileage(e.target.value);
                      resetResult();
                    }}
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
                    onChange={(e) => {
                      setFuel(e.target.value as ValuationInput["fuel"]);
                      resetResult();
                    }}
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
                    onChange={(e) => {
                      setTransmission(
                        e.target.value as ValuationInput["transmission"],
                      );
                      resetResult();
                    }}
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
                        onClick={() => {
                          setCondition(opt.value);
                          resetResult();
                        }}
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

              <Button
                type="submit"
                variant="primary"
                className="mt-5 w-full py-3 sm:w-auto"
              >
                Calcola fascia di ritiro
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
                      Fascia di ritiro indicativa
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Se il modello è in catalogo la stima è più precisa. Poi
                      invii tutto su WhatsApp e Alberto conferma.
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-slate-600">
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Catalogo modelli calibrato sul ritiro dealer
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Nessun obbligo, risposta diretta
                      </li>
                      <li className="flex gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Valore finale solo dopo verifica
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {confidenceLabel(result.confidence)}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Fascia di ritiro stimata
                      {result.matchedModel
                        ? ` · ${brand} ${result.matchedModel}`
                        : ""}
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      da {formatEuro(result.low)} a {formatEuro(result.high)}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                      Riferimento medio:{" "}
                      <span className="font-semibold text-slate-800">
                        {formatEuro(result.mid)}
                      </span>
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all ${confidenceBar(result.confidence)}`}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {result.note}
                    </p>

                    {waHref ? (
                      <Button
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="whatsapp"
                        className="mt-5 w-full py-3"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Conferma con Alberto su WhatsApp
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
