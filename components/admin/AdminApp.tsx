"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  Car,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { coverPhoto, normalizePhotos, type CarListing } from "@/lib/cars";
import { compressImageFile } from "@/lib/compress-image";

type Draft = {
  id?: string;
  title: string;
  description: string;
  subitoUrl: string;
  price: string;
  year: string;
  kmLabel: string;
  fuel: string;
  transmission: string;
  location: string;
  brand: string;
  model: string;
  version: string;
  bodyType: string;
  doors: string;
  seats: string;
  color: string;
  emissionClass: string;
  condition: string;
  registration: string;
  badge: string;
  photos: string[];
  published: boolean;
  sortOrder: string;
};

const MAX_PHOTOS = 8;

const emptyDraft = (): Draft => ({
  title: "",
  description: "",
  subitoUrl: "",
  price: "",
  year: String(new Date().getFullYear()),
  kmLabel: "",
  fuel: "Diesel",
  transmission: "Manuale",
  location: "Treviglio (BG)",
  brand: "",
  model: "",
  version: "",
  bodyType: "Berlina",
  doors: "4/5",
  seats: "5",
  color: "",
  emissionClass: "",
  condition: "Usato",
  registration: "",
  badge: "Disponibile",
  photos: [],
  published: true,
  sortOrder: "1",
});

function toDraft(car: CarListing): Draft {
  return {
    id: car.id,
    title: car.title,
    description: car.description ?? "",
    subitoUrl: car.subitoUrl ?? "",
    price: String(car.price),
    year: String(car.year),
    kmLabel: car.kmLabel,
    fuel: car.fuel,
    transmission: car.transmission,
    location: car.location,
    brand: car.brand ?? "",
    model: car.model ?? "",
    version: car.version ?? "",
    bodyType: car.bodyType ?? "",
    doors: car.doors ?? "",
    seats: car.seats ?? "",
    color: car.color ?? "",
    emissionClass: car.emissionClass ?? "",
    condition: car.condition ?? "Usato",
    registration: car.registration ?? "",
    badge: car.badge ?? "",
    photos: normalizePhotos(car.photos, car.photoUrl),
    published: car.published,
    sortOrder: String(car.sortOrder),
  };
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-primary-dark disabled:opacity-50";

const btnIcon =
  "rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30";

export function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [photoDirty, setPhotoDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/cars?all=1", { credentials: "include" });
    if (!res.ok) {
      return { ok: false as const, status: res.status };
    }
    const data = (await res.json()) as { cars: CarListing[] };
    setCars(data.cars);
    setAuthed(true);
    return { ok: true as const };
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        const result = await refresh();
        if (!result.ok) setAuthed(false);
      } finally {
        setChecking(false);
      }
    })();
  }, [refresh]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError(null);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: password.trim() }),
    });
    if (!res.ok) {
      setAuthError(
        "Password non valida. Deve coincidere con ADMIN_PASSWORD su Vercel.",
      );
      return;
    }
    window.location.assign("/admin");
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE", credentials: "include" });
    setAuthed(false);
    setCars([]);
    setDraft(emptyDraft());
    window.location.assign("/admin");
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      if (draft.photos.length >= MAX_PHOTOS) {
        throw new Error(`Massimo ${MAX_PHOTOS} foto per auto`);
      }
      const compressed = await compressImageFile(file);
      const form = new FormData();
      form.append("file", compressed);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = (await res.json()) as { photoUrl?: string; error?: string };
      if (!res.ok || !data.photoUrl) {
        throw new Error(data.error ?? "Upload fallito");
      }
      setDraft((prev) => ({
        ...prev,
        photos: [...prev.photos, data.photoUrl!].slice(0, MAX_PHOTOS),
      }));
      setPhotoDirty(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fallito");
    } finally {
      setUploading(false);
    }
  }

  function movePhoto(index: number, direction: -1 | 1) {
    setDraft((prev) => {
      const next = [...prev.photos];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      const tmp = next[index]!;
      next[index] = next[target]!;
      next[target] = tmp;
      return { ...prev, photos: next };
    });
    setPhotoDirty(true);
  }

  function removePhoto(index: number) {
    setDraft((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPhotoDirty(true);
  }

  function startEdit(car: CarListing) {
    setDraft(toDraft(car));
    setPhotoDirty(false);
    setMessage(null);
    setError(null);
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const payload: Record<string, unknown> = {
        title: draft.title,
        description: draft.description,
        subitoUrl: draft.subitoUrl,
        price: Number(draft.price),
        year: Number(draft.year),
        kmLabel: draft.kmLabel,
        fuel: draft.fuel,
        transmission: draft.transmission,
        location: draft.location,
        brand: draft.brand,
        model: draft.model,
        version: draft.version,
        bodyType: draft.bodyType,
        doors: draft.doors,
        seats: draft.seats,
        color: draft.color,
        emissionClass: draft.emissionClass,
        condition: draft.condition,
        registration: draft.registration,
        badge: draft.badge,
        published: draft.published,
        sortOrder: Number(draft.sortOrder) || 1,
      };

      if (!draft.id || photoDirty) {
        payload.photos = draft.photos;
        payload.photoUrl = draft.photos[0];
      }

      const res = await fetch(draft.id ? `/api/cars/${draft.id}` : "/api/cars", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Salvataggio fallito");

      setMessage(
        draft.id
          ? "Modifiche salvate: la landing si aggiorna subito."
          : "Auto aggiunta allo showcase.",
      );
      setDraft(emptyDraft());
      setPhotoDirty(false);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Salvataggio fallito");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Eliminare questa auto dallo showcase?")) return;
    await fetch(`/api/cars/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (draft.id === id) {
      setDraft(emptyDraft());
      setPhotoDirty(false);
    }
    await refresh();
  }

  async function togglePublished(car: CarListing) {
    await fetch(`/api/cars/${car.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ published: !car.published }),
    });
    await refresh();
  }

  async function setFeatured(car: CarListing) {
    await fetch(`/api/cars/${car.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ setFeatured: true }),
    });
    setMessage(`“${car.title}” è ora in evidenza sull’hero.`);
    await refresh();
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Car className="h-[18px] w-[18px]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Area riservata
          </p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">
            Gestione vetrina
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Alberto Regantini — aggiungi, modifica e pubblica le auto.
          </p>
          <label className="mt-6 block text-xs font-semibold text-slate-600">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1.5 ${inputClass}`}
              autoFocus
            />
          </label>
          {authError && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {authError}
            </p>
          )}
          <button type="submit" className={`mt-5 w-full ${btnPrimary}`}>
            Entra
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Car className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Admin
              </p>
              <h1 className="truncate text-sm font-bold text-slate-900 md:text-base">
                Showcase auto
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className={`${btnSecondary} hidden sm:inline-flex`}
            >
              Vedi landing
            </a>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className={btnSecondary}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-5 md:px-6 md:py-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
        {/* On mobile: list first so Alberto can pick a car quickly */}
        <aside className="order-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:order-2 lg:p-5">
          <h3 className="text-base font-bold text-slate-900">Auto nello showcase</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500 md:text-sm">
            <strong className="font-semibold text-slate-700">Modifica</strong> ·
            stella = hero · occhio = pubblica/nascondi
          </p>
          <ul className="mt-4 space-y-3">
            {cars.length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-200 px-3 py-6 text-center text-sm text-slate-500">
                Nessuna auto ancora.
              </li>
            )}
            {cars.map((car) => (
              <li
                key={car.id}
                className={`rounded-xl border bg-slate-50/80 p-3 ${
                  draft.id === car.id
                    ? "border-primary ring-2 ring-primary/15"
                    : car.featured
                      ? "border-amber-300"
                      : "border-slate-200"
                }`}
              >
                <div className="flex gap-3">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                    {(() => {
                      const cover = coverPhoto(car);
                      return cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cover}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null;
                    })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {car.featured ? "★ " : ""}
                      {car.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {car.price.toLocaleString("it-IT")} € ·{" "}
                      {car.published ? "online" : "nascosta"}
                      {car.featured ? " · in evidenza" : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => startEdit(car)}
                        className="inline-flex items-center gap-1 rounded-lg border border-primary/25 bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-dark"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Modifica
                      </button>
                      <button
                        type="button"
                        onClick={() => void setFeatured(car)}
                        className={`${btnIcon} ${
                          car.featured ? "text-amber-500" : ""
                        }`}
                        aria-label="Metti in evidenza"
                        title="In evidenza sull’hero"
                      >
                        <Star
                          className={`h-4 w-4 ${car.featured ? "fill-current" : ""}`}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => void togglePublished(car)}
                        className={btnIcon}
                        aria-label={car.published ? "Nascondi" : "Pubblica"}
                      >
                        {car.published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(car.id)}
                        className={`${btnIcon} hover:text-rose-600`}
                        aria-label="Elimina"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="order-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 lg:order-1">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900 md:text-xl">
              {draft.id ? "Modifica auto" : "Nuova auto"}
            </h2>
            {draft.id && (
              <button
                type="button"
                onClick={() => {
                  setDraft(emptyDraft());
                  setPhotoDirty(false);
                }}
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                Annulla
              </button>
            )}
          </div>

          <form ref={formRef} onSubmit={handleSave} className="mt-5 space-y-4">
            <Field label="Titolo annuncio *">
              <input
                required
                value={draft.title}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="es. BMW 730d cat"
                className={inputClass}
              />
            </Field>

            <Field label="Descrizione">
              <textarea
                rows={4}
                value={draft.description}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Testo libero stile annuncio Subito…"
                className={inputClass}
              />
            </Field>

            <Field label="Link annuncio Subito (pagina della singola auto)">
              <input
                type="url"
                value={draft.subitoUrl}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, subitoUrl: e.target.value }))
                }
                placeholder="https://www.subito.it/auto/...htm"
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-slate-500">
                Non usare il link dello shop: apri l&apos;annuncio e copia
                l&apos;URL della singola auto.
              </span>
            </Field>

            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Prezzo (€)">
                <input
                  required
                  type="number"
                  min={0}
                  value={draft.price}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, price: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Anno">
                <input
                  required
                  type="number"
                  value={draft.year}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, year: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Ordine in vetrina">
                <input
                  type="number"
                  value={draft.sortOrder}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, sortOrder: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <p className="pt-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Informazioni di base
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Marca">
                <input
                  value={draft.brand}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, brand: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Modello">
                <input
                  value={draft.model}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, model: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Versione">
                <input
                  value={draft.version}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, version: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Carburante">
                <input
                  value={draft.fuel}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, fuel: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Carrozzeria">
                <input
                  value={draft.bodyType}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, bodyType: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Cambio">
                <input
                  value={draft.transmission}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, transmission: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Km">
                <input
                  required
                  value={draft.kmLabel}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, kmLabel: e.target.value }))
                  }
                  placeholder="258.000 km"
                  className={inputClass}
                />
              </Field>
              <Field label="Immatricolazione">
                <input
                  value={draft.registration}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, registration: e.target.value }))
                  }
                  placeholder="09/2003"
                  className={inputClass}
                />
              </Field>
              <Field label="Colore">
                <input
                  value={draft.color}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, color: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Classe emissioni">
                <input
                  value={draft.emissionClass}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, emissionClass: e.target.value }))
                  }
                  placeholder="Euro 3"
                  className={inputClass}
                />
              </Field>
              <Field label="Porte">
                <input
                  value={draft.doors}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, doors: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Posti">
                <input
                  value={draft.seats}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, seats: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Condizioni">
                <input
                  value={draft.condition}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, condition: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Località">
                <input
                  value={draft.location}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, location: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Badge">
              <input
                value={draft.badge}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, badge: e.target.value }))
                }
                className={inputClass}
              />
            </Field>

            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">
                Foto ({draft.photos.length}/{MAX_PHOTOS}) — la prima è la
                copertina
              </p>
              <div className="flex flex-col gap-3">
                <label className={`w-fit cursor-pointer ${btnSecondary}`}>
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Aggiungi foto
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      void (async () => {
                        for (const file of files) {
                          await handleUpload(file);
                        }
                        e.target.value = "";
                      })();
                    }}
                  />
                </label>
                {draft.photos.length > 0 && (
                  <ul className="space-y-2">
                    {draft.photos.map((photo, index) => (
                      <li
                        key={`${index}-${photo.slice(0, 24)}`}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt={`Foto ${index + 1}`}
                          className="h-14 w-20 rounded-md object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-600">
                            {index === 0 ? "Copertina" : `Foto ${index + 1}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => movePhoto(index, -1)}
                            disabled={index === 0}
                            className={btnIcon}
                            aria-label="Sposta su"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => movePhoto(index, 1)}
                            disabled={index === draft.photos.length - 1}
                            className={btnIcon}
                            aria-label="Sposta giù"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className={`${btnIcon} hover:text-rose-600`}
                            aria-label="Rimuovi foto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-slate-500">
                  Max 2.5 MB per foto. Su mobile nella landing si scorrono con
                  swipe.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, published: e.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              Pubblica nello showcase della landing
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            {message && (
              <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className={`w-full py-3 ${btnPrimary}`}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : draft.id ? (
                <Save className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {draft.id ? "Salva modifiche" : "Aggiungi allo stock"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-semibold text-slate-600">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
