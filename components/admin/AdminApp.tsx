"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import type { CarListing } from "@/lib/cars";

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
  photoUrl: string;
  published: boolean;
  sortOrder: string;
};

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
  photoUrl: "",
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
    photoUrl: car.photoUrl ?? "",
    published: car.published,
    sortOrder: String(car.sortOrder),
  };
}

export function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft());
  const [saving, setSaving] = useState(false);
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
    // Full reload so the auth cookie is definitely sent on the next requests.
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
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = (await res.json()) as { photoUrl?: string; error?: string };
      if (!res.ok || !data.photoUrl) {
        throw new Error(data.error ?? "Upload fallito");
      }
      setDraft((prev) => ({ ...prev, photoUrl: data.photoUrl! }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fallito");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const payload = {
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
        photoUrl: draft.photoUrl || undefined,
        published: draft.published,
        sortOrder: Number(draft.sortOrder) || 1,
      };

      const res = await fetch(draft.id ? `/api/cars/${draft.id}` : "/api/cars", {
        method: draft.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Salvataggio fallito");

      setMessage("Salvato: la landing si aggiorna subito.");
      setDraft(emptyDraft());
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Salvataggio fallito");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Eliminare questa auto dallo showcase?")) return;
    await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (draft.id === id) setDraft(emptyDraft());
    await refresh();
  }

  async function togglePublished(car: CarListing) {
    await fetch(`/api/cars/${car.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !car.published }),
    });
    await refresh();
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            Area riservata
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-white">
            Gestione vetrina
          </h1>
          <p className="mt-2 text-sm text-white/55">
            Alberto Regantini — titolo, descrizione, caratteristiche e link
            Subito.
          </p>
          <label className="mt-6 block text-sm text-white/70">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400"
              autoFocus
            />
          </label>
          {authError && (
            <p className="mt-3 text-sm text-rose-400">{authError}</p>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Entra
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Admin
            </p>
            <h1 className="text-lg font-semibold">Showcase auto</h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
            >
              Vedi landing
            </a>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Esci
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">
              {draft.id ? "Modifica auto" : "Nuova auto"}
            </h2>
            {draft.id && (
              <button
                type="button"
                onClick={() => setDraft(emptyDraft())}
                className="text-sm text-white/50 hover:text-white"
              >
                Annulla
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
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

            <Field label="Link annuncio Subito">
              <input
                type="url"
                value={draft.subitoUrl}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, subitoUrl: e.target.value }))
                }
                placeholder="https://www.subito.it/auto/..."
                className={inputClass}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
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

            <p className="pt-2 text-xs font-semibold uppercase tracking-widest text-amber-400/90">
              Informazioni di base
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
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
              <p className="mb-2 text-sm text-white/65">Foto principale</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm hover:bg-white/5">
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Carica foto
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleUpload(file);
                    }}
                  />
                </label>
                {draft.photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={draft.photoUrl}
                    alt="Anteprima"
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, published: e.target.checked }))
                }
                className="h-4 w-4 rounded border-white/20"
              />
              Pubblica nello showcase della landing
            </label>

            {error && <p className="text-sm text-rose-400">{error}</p>}
            {message && <p className="text-sm text-emerald-400">{message}</p>}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-400 disabled:opacity-50"
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

        <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h3 className="font-semibold">Auto nello showcase</h3>
          <p className="mt-1 text-sm text-white/45">
            Clicca per modificare. Occhio = pubblica / nascondi.
          </p>
          <ul className="mt-4 space-y-3">
            {cars.length === 0 && (
              <li className="text-sm text-white/45">Nessuna auto ancora.</li>
            )}
            {cars.map((car) => (
              <li
                key={car.id}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-3"
              >
                <div className="flex gap-3">
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-800">
                    {car.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={car.photoUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setDraft(toDraft(car))}
                      className="block w-full text-left"
                    >
                      <p className="truncate font-medium">{car.title}</p>
                      <p className="text-xs text-white/45">
                        {car.price.toLocaleString("it-IT")} € ·{" "}
                        {car.published ? "online" : "nascosta"}
                      </p>
                    </button>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => void togglePublished(car)}
                        className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-amber-300"
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
                        className="rounded-lg p-1.5 text-white/50 hover:bg-white/5 hover:text-rose-300"
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
    <label className="block text-sm text-white/65">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400";
