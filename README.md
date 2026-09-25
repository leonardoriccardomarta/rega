# Alberto Regantini — sito vetrina auto

Landing + **pannello admin** per gestire lo showcase.

Shop Subito: https://impresapiu.subito.it/shops/60152-regantini

## Cosa include

- Landing: hero, inventario live, perché me, chi sono, WhatsApp
- **`/admin`**: Alberto aggiunge/modifica/nasconde auto, carica foto, salva → la landing si aggiorna (polling ogni 15s + fetch senza cache)
- Niente prenotazioni / Calendar

## Avvio

```bash
cd C:\Users\marta\Desktop\regantini
cp .env.example .env.local
# NEXT_PUBLIC_CONTACT_PHONE=39...
# ADMIN_PASSWORD=... (default: alberto)
npm install
npm run dev
```

- Sito: http://localhost:3000  
- Admin: http://localhost:3000/admin  

## Per Alberto

1. Entra in `/admin` con la password
2. Carica foto + dati auto
3. Spunta “Pubblica nello showcase”
4. Salva → in pochi secondi compare sulla home

## Database

Obbligatorio su Vercel:

```env
DATABASE_URL=postgresql://...@...neon.tech/neondb?sslmode=require
ADMIN_PASSWORD=...
NEXT_PUBLIC_CONTACT_PHONE=39...
```

Le auto e le foto (come data URL) stanno su **Neon Postgres**: restano dopo i redeploy.
La tabella `cars` viene creata automaticamente al primo avvio.