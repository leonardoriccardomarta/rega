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

## Hosting

I dati stanno in `data/cars.json` e le foto in `public/uploads/cars/`.

- **Ok** su server con disco persistente (VPS, Railway volume, ecc.)
- Su **Vercel serverless** i file non restano dopo il redeploy: per produzione Vercel serve storage esterno (Blob/DB). Per una consegna semplice, meglio un host con filesystem.

## Consegna

Tu setti telefono + password admin, raggiungi dominio, e Alberto gestisce le auto da solo.
