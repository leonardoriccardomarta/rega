import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

function getDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) {
    throw new Error("DATABASE_URL non configurata");
  }
  // channel_binding can break some serverless drivers
  return raw
    .replace(/([?&])channel_binding=require&?/, "$1")
    .replace(/[?&]$/, "");
}

let sqlClient: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function sql() {
  if (!sqlClient) {
    sqlClient = neon(getDatabaseUrl());
  }
  return sqlClient;
}

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = sql();
      await db`
        CREATE TABLE IF NOT EXISTS cars (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          subito_url TEXT,
          price INTEGER NOT NULL DEFAULT 0,
          year INTEGER NOT NULL,
          km_label TEXT NOT NULL DEFAULT '',
          fuel TEXT NOT NULL DEFAULT '',
          transmission TEXT NOT NULL DEFAULT '',
          location TEXT NOT NULL DEFAULT 'Treviglio (BG)',
          brand TEXT,
          model TEXT,
          version TEXT,
          body_type TEXT,
          doors TEXT,
          seats TEXT,
          color TEXT,
          emission_class TEXT,
          condition TEXT,
          registration TEXT,
          badge TEXT,
          photo_url TEXT,
          published BOOLEAN NOT NULL DEFAULT TRUE,
          sort_order INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })();
  }
  await schemaReady;
}
