This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

# Oscar gillar natur och fiske

En personlig natur- och fiskeblogg byggd med Next.js 15, TypeScript och Tailwind CSS.

---

## Snabbstart – köra lokalt

```bash
cd oscar-fishing
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

---

## Projektstruktur

```
oscar-fishing/
  src/
    app/                    ← Next.js App Router sidor + API-routes
      page.tsx              ← Startsida
      arkiv/page.tsx        ← Arkiv (alla år)
      arkiv/[year]/         ← Tur-år-sida
      arkiv/[year]/[month]/ ← Tur-månad-sida
      tur/[date]/           ← Enskild tursida
      karta/                ← Karta/platsöversikt
      om/                   ← Om Oscar
      api/comments/         ← API-route för kommentarer
    components/
      layout/               ← Header, Footer
      home/                 ← Hero, StatsBar, TripCard, GearSection...
      gallery/              ← PhotoGallery, Lightbox
      trip/                 ← TripDetail
      map/                  ← TripMap
      comments/             ← CommentForm, CommentList, CommentSection
    data/
      trips.ts              ← ← ← REDIGERA DENNA för att lägga till turer
    lib/
      supabase.ts           ← Supabase-klient
      utils.ts              ← Hjälpfunktioner, sanering, validering
    store/
      appStore.ts           ← Zustand (lightbox, filter)
    types/
      trips.ts              ← TypeScript-typer
  public/
    photos/                 ← Dina bilder (organisera per YYYY/MM/DD/)
```

---

## Lägga till en ny tur

### 1. Lägg till mediafiler

Placera dina filer i rätt mapp:

```
public/media/2026/05/12/gadda.jpg
public/media/2026/05/12/naturvideo.mp4
public/media/2026/05/12/solnedgang.webp
```

---

### Mediaformat — vad som rekommenderas

#### Bilder

| Format | Rekommendation |
|--------|---------------|
| `.webp` | ✅ Bästa valet – liten filstorlek, hög kvalitet |
| `.jpg` / `.jpeg` | ✅ Fungerar bra, komprimera till ~80-85% kvalitet |
| `.png` | ⚠️ Funkar, men undvik för foton (stor filstorlek) |
| `.heic` | ❌ Stöds inte i webbläsare – **konvertera till JPG eller WebP** |

**HEIC (iPhone):** Konvertera med ett av dessa alternativ:
- **macOS:** Öppna i Preview → Exportera som JPG/WebP
- **Windows:** [CopyTrans HEIC for Windows](https://www.copytrans.net/copytransheic/) eller ladda upp till Google Photos och exportera som JPG
- **Batch-konvertering:** `ffmpeg -i bild.heic bild.webp`

**Komprimering:** Sikta på max **400-800 KB per bild**. Använd [Squoosh](https://squoosh.app) (gratis webbverktyg) eller [ImageOptim](https://imageoptim.com).

#### Videos

| Format | Rekommendation |
|--------|---------------|
| `.mp4` (H.264) | ✅ Bästa valet – fungerar i alla webbläsare |
| `.mp4` (H.265/HEVC) | ⚠️ Bättre komprimering, men inte stödd överallt |
| `.mov` | ❌ Fungerar i Safari men inte i alla webbläsare – **konvertera till MP4** |

**MOV → MP4-konvertering:**
```bash
# Med FFmpeg (gratis, installera via https://ffmpeg.org)
ffmpeg -i video.mov -c:v libx264 -c:a aac -crf 23 video.mp4

# Eller med Handbrake (gratis GUI-verktyg)
```

**Storlek:** Sikta på max **30-50 MB per video**. Komprimera med Handbrake eller FFmpeg.  
För långa videos (>2 min), överväg att ladda upp till YouTube/Vimeo och bädda in istället.

---

### 2. Lägg till turen i data-filen

Öppna `src/data/trips.ts` och lägg till ett nytt objekt **överst** i `trips`-arrayen:

```typescript
{
  date: "2026-05-12",
  title: "Morgonfiske vid Lången",
  location: "Västra Götaland",    // Region – visas publikt
  area: "Borås-trakten",          // Valfritt, mer specifik plats
  summary: "En fin morgontur...",
  tags: ["Fiske", "Abborre", "Sjö"],
  coordinates: { lat: 57.71, lng: 12.9, approximate: true }, // ALLTID approximate: true
  media: [
    // ── Bild med fiskdata ──
    {
      type: "image",
      src: "/media/2026/05/12/abborre.jpg",
      alt: "Abborre fångad på morgonen",
      caption: "Fin abborre på pimpel.",
      fishSpecies: "Abborre",     // Fiskart
      fishWeightKg: 0.55,         // Vikt i kg (t.ex. 0.55 = 550 g)
      fishLengthCm: 29,           // Längd i cm
      caughtAndReleased: false,   // true = C&R, false = behöll
      caughtBy: "Oscar",          // Vem fångade fisken
      gear: "Pimpel",             // Bete/metod
    },
    // ── Naturbild utan fiskdata ──
    {
      type: "image",
      src: "/media/2026/05/12/sjoutsikt.webp",
      alt: "Utsikt över sjön i morgonsolens ljus",
      caption: "Perfekt spegelblank sjö.",
    },
    // ── Video ──
    {
      type: "video",
      src: "/media/2026/05/12/napp.mp4",
      title: "Nappet som kom",
      caption: "Abborren tog direkt under isen.",
      poster: "/media/2026/05/12/abborre.jpg",  // Valfri thumbnail
    },
  ],
},
```

#### Alla tillgängliga fält för ett media-objekt

| Fält | Typ | Obligatoriskt | Beskrivning |
|------|-----|--------------|-------------|
| `type` | `"image"` \| `"video"` | ✅ | Typ av media |
| `src` | string | ✅ | Sökväg från /public, t.ex. `/media/2026/05/12/bild.jpg` |
| `alt` | string | Rekommenderat | Alt-text för bilder (SEO + tillgänglighet) |
| `title` | string | – | Titel för videos |
| `caption` | string | – | Bildtext/beskrivning |
| `poster` | string | – | Thumbnail för videos |
| `fishSpecies` | string | – | Fiskart, t.ex. `"Gädda"` |
| `fishWeightKg` | number | – | Vikt i kg, t.ex. `4.2` |
| `fishLengthCm` | number | – | Längd i cm, t.ex. `88` |
| `caughtAndReleased` | boolean | – | `true` = återutsatt |
| `caughtBy` | string | – | Fångad av (namn), t.ex. `"Oscar"` eller `"Idil"` |
| `gear` | string | – | Bete/metod, t.ex. `"Jerkbait"` |
| `location` | string | – | Platsöverstyrning för detta objekt |
| `area` | string | – | Mer specifik plats för detta objekt |

### 3. Kör lokalt och kontrollera

```bash
npm run dev
```

Navigera till `http://localhost:3000/tur/2026-05-12`.

### 4. Driftsätt

```bash
npx vercel --prod
```

---

## Arkivstruktur (URL-schema)

| URL | Vad visas |
|-----|-----------|
| `/` | Startsida med senaste turer |
| `/arkiv` | Alla år |
| `/arkiv/2026` | Alla turer under 2026 |
| `/arkiv/2026/04` | Alla turer i april 2026 |
| `/tur/2026-04-28` | Enskild turdag med galleri och kommentarer |
| `/karta` | Platskarta (region-baserad) |
| `/om` | Om Oscar |

---

## Karta

Kartsidan visar turer grupperade efter region.

**Uppgradera till interaktiv karta med Leaflet:**

```bash
npm install leaflet react-leaflet @types/leaflet
```

Ersätt `src/components/map/TripMap.tsx` med en Leaflet-karta. Koordinaterna finns redan i trip-datan.

---

## Kommentarer – konfiguration

### Steg 1 – Skapa ett Supabase-projekt

1. Gå till [supabase.com](https://supabase.com) och skapa ett gratis konto
2. Skapa ett nytt projekt

### Steg 2 – Skapa tabellen

```sql
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_date   TEXT NOT NULL,
  name        TEXT NOT NULL,
  comment     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon kan skicka kommentarer"
  ON comments FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Bara godkända kommentarer visas publikt"
  ON comments FOR SELECT TO anon USING (status = 'approved');
```

### Steg 3 – Lägg till miljövariabler

```bash
cp .env.local.example .env.local
# Fyll i dina Supabase-uppgifter
```

På Vercel: **Settings → Environment Variables**.

### Hur du godkänner kommentarer

1. Gå till Supabase → **Table Editor → comments**
2. Filtrera på `status = pending`
3. Ändra `status` till `approved`

Eller via SQL:
```sql
UPDATE comments SET status = 'approved' WHERE id = 'uuid-här';
SELECT * FROM comments WHERE status = 'pending' ORDER BY created_at DESC;
```

### Säkerhet

- Honeypot-fält mot spam-botar
- Rate limiting: max 3/IP per 10 min
- Inmatningsvalidering + sanering
- Aldrig auto-godkänd
- Supabase RLS hindrar läsning av pending-kommentarer

---

## Driftsättning

### Kostnadsöversikt

| Tjänst | Gratisnivå | Kostnad vid tillväxt |
|--------|-----------|---------------------|
| **Cloudflare Pages** | ✅ Obegränsat antal förfrågningar, 500 byggen/mån | Gratis för personliga projekt |
| **Vercel** | ✅ Hobby-plan: 100 GB bandwidth/mån | ~$20/mån på Pro |
| **Supabase** | ✅ 500 MB databas, 2 GB fillagring | $25/mån på Pro |
| **Cloudflare R2** | ✅ 10 GB lagring, 1 miljon läsningar/mån | $0.015/GB/mån |
| **GitHub** | ✅ Gratis för publika och privata repos | Gratis |

**Rekommenderat upplägg:** Cloudflare Pages + Supabase Free + GitHub = **0 kr/mån** i början.

---

### Alternativ 1: Cloudflare Pages (rekommenderat)

**Fördelar:** Gratis, global CDN, edge-funktioner, ingen koldioxidkostnad per request, ingen bandbreddsgräns.

#### Steg 1 – Installera verktyg

```bash
npm install -D @cloudflare/next-on-pages wrangler
```

#### Steg 2 – Bygg för Cloudflare Pages

```bash
npm run build:cf
```

Det här kör `@cloudflare/next-on-pages` som transformerar Next.js-outputen till Cloudflare Workers-format.

#### Steg 3 – Driftsätt via Cloudflare dashboard (enklast)

1. Pusha koden till GitHub
2. Gå till [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages → Create a project**
3. Koppla ditt GitHub-repo
4. Ange bygginställningar:
   - **Build command:** `npx @cloudflare/next-on-pages@1`
   - **Build output directory:** `.vercel/output/static`
   - **Node.js version:** `20` (under Environment Variables, sätt `NODE_VERSION=20`)
5. Lägg till miljövariabler (se nedan)
6. Klicka **Save and Deploy**

#### Steg 4 – Alternativt: driftsätt via CLI

```bash
npx wrangler pages deploy .vercel/output/static --project-name oscar-fishing
```

---

### Alternativ 2: Vercel

```bash
npx vercel --prod
```

Lägg till miljövariablerna i **Vercel → Settings → Environment Variables**.

**När välja Vercel istället?** Om du vill ha automatisk bildoptimering via Next.js Image och enklare server-side rendering utan edge-begränsningar. Vercel Hobby är gratis men har 100 GB bandbreddsgräns.

---

### Miljövariabler

Kopiera `.env.local.example` till `.env.local` för lokal utveckling:

```bash
cp .env.local.example .env.local
```

| Variabel | Krävs? | Beskrivning |
|----------|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | För kommentarer | URL till ditt Supabase-projekt |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | För kommentarer | Anon-nyckel (publik, skyddas av RLS) |
| `NEXT_PUBLIC_SITE_URL` | Rekommenderat | Din produktions-URL (t.ex. `https://oscar.pages.dev`) |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | För R2 | Lämna tom tills du migrerar bilder till R2 |

**Ange aldrig** hemliga nycklar (service_role, admin-nycklar) som `NEXT_PUBLIC_*` – de exponeras i webbläsaren. Supabase `anon`-nyckeln är avsiktligt publik och skyddas av Row Level Security.

På **Cloudflare Pages**: sätt variablerna under **Settings → Environment Variables**.  
På **Vercel**: sätt dem under **Settings → Environment Variables**.

---

### Säkerhet – undvik att läcka hemligheter

- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` — **OK att vara publik**, skyddas av RLS
- ❌ Supabase `service_role`-nyckeln — **lägg aldrig till som `NEXT_PUBLIC_*`**, används bara server-side
- ✅ `.env.local` är med i `.gitignore` — **checka aldrig in den**
- ✅ Kontrollera att `.env.local` finns i `.gitignore` innan du pushar till GitHub

---

### Medialagring – lokal → Cloudflare R2

**Fas 1 (nu):** Bilder och videos i `/public/media/`. Enkelt, gratis, ingen konfiguration.

**Fas 2 (när du har > ~200 MB media):** Flytta till Cloudflare R2.

#### När ska du flytta till R2?

- När `/public/media/` gör att bygget tar lång tid
- När du har > 200–500 MB bilder/videos
- När du vill ladda upp nya bilder utan att bygga om och deployera sidan
- R2 ger **0 egress-kostnad** (gratis att servera bilder till webbläsare)

#### Hur du migrerar till R2

1. Skapa ett R2-bucket på Cloudflare: **Storage → R2 → Create bucket**
2. Aktivera **Public access** på bucketen → kopiera den publika URL:en (t.ex. `https://pub-abc123.r2.dev`)
3. Ladda upp alla filer från `/public/media/` till bucketen med samma mappstruktur (utan `/media`-prefixet):
   ```
   /public/media/2026/04/28/gadda.jpg  →  r2://bucket/2026/04/28/gadda.jpg
   ```
   Använd [rclone](https://rclone.org) eller Cloudflare dashboard:
   ```bash
   rclone copy public/media r2:oscar-fishing-media
   ```
4. Sätt miljövariabeln i Cloudflare Pages:
   ```
   NEXT_PUBLIC_MEDIA_BASE_URL = https://pub-abc123.r2.dev
   ```
5. Nytt bygge triggas automatiskt – inga kodändringar behövs!

Koden i `src/lib/mediaUrl.ts` hanterar URL-översättningen automatiskt.

---

## SEO

- `<title>` och `<meta description>` per sida
- Open Graph-taggar
- Sitemap på `/sitemap.xml`
- robots.txt på `/robots.txt`
- Lägg till `public/og-image.jpg` (1200×630 px) för social preview

---

## Säkerhetsnotes

- Ingen publik upload-endpoint – bilder läggs till lokalt
- Supabase anon-key är avsiktligt publik, RLS skyddar data
- En framtida admin-portal kräver autentisering (Supabase Auth + Cloudinary signed uploads)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Google AdSense / Annonser

Sidan är förberedd för Google AdSense-annonser men **visar inga riktiga annonser** förrän du aktiverar det manuellt. En diskret platshållare visas tills dess.

### Relevanta filer

| Fil | Syfte |
|-----|-------|
| `src/config/ads.ts` | Konfiguration — adsEnabled, publisher ID, slot IDs |
| `src/components/ads/AdPlaceholder.tsx` | Annonskomponent — visar placeholder tills AdSense är aktivt |

### Aktivera AdSense steg för steg

1. Skapa ett Google AdSense-konto på [adsense.google.com](https://adsense.google.com)
2. Lägg till din site och vänta på godkännande (kan ta dagar–veckor)
3. Skapa en `.env.local` i `oscar-fishing/`-mappen:
   ```
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_AD_SLOT_BANNER=XXXXXXXXXX
   NEXT_PUBLIC_AD_SLOT_SIDEBAR=XXXXXXXXXX
   ```
4. Sätt `adsEnabled: true` i `src/config/ads.ts`
5. Lägg till AdSense-skriptet i `src/app/layout.tsx` med Next.js `Script`-komponenten:
   ```tsx
   import Script from "next/script";
   // I <head> / layout body:
   <Script
     async
     src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.publisherId}`}
     crossOrigin="anonymous"
     strategy="lazyOnload"
   />
   ```
6. Byt ut `<AdPlaceholder />` mot `<ins className="adsbygoogle" ...>` i de komponenter där du vill visa annonser

### Vercel — lägg till miljövariabler

I Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
- `NEXT_PUBLIC_AD_SLOT_BANNER`
- `NEXT_PUBLIC_AD_SLOT_SIDEBAR`

> **OBS:** `.env.local` ska **inte** committeas till Git. Den är redan i `.gitignore`.

---

## Förbereda Google AdSense — checklista

Nedan hittar du en komplett checklista för att ansöka om Google AdSense och aktivera annonser på sidan.

> ⚠️ **Google måste godkänna sidan** innan riktiga annonser kan visas. Det är inte garanterat att du blir godkänd — men dessa steg ökar chansen betydligt.

---

### 1. Domän

- [ ] Köp en riktig domän — t.ex. `oscar-fishing.se` via Loopia, Namecheap eller Cloudflare Registrar
- [ ] Koppla domänen till din Vercel-deployment (Vercel Dashboard → Domains → Add)
- [ ] HTTPS fungerar automatiskt via Vercel när domänen är kopplad ✅

> 💡 Google föredrar sidor med egna domäner framför `xxx.vercel.app`. Det är inte ett krav, men ökar chansen för godkännande.

---

### 2. Innehåll

- [ ] Sidan har tillräckligt med **originalt, eget innehåll** — minst 10–15 turer med riktiga bilder och texter rekommenderas
- [ ] Varje tur har titel, datum och en beskrivning (summary)
- [ ] Bilder har alt-texter ✅ (redan gjort)
- [ ] Inga tomma sidor eller brutna placeholder-länkar

---

### 3. Obligatoriska sidor (redan skapade ✅)

- [x] **Integritetspolicy** — `/integritetspolicy` — nämner kakor och framtida AdSense
- [x] **Om sidan / Om Oscar** — `/om`
- [x] **Kontakt** — `/kontakt` — uppdatera e-postadressen i filen!
- [x] Alla sidor länkas från footern ✅

> **Viktig åtgärd:** Öppna `src/app/kontakt/page.tsx` och byt ut `din.email@exempel.se` mot din riktiga e-postadress.

---

### 4. Tekniska krav

- [ ] Sidan laddas snabbt — testa på [pagespeed.web.dev](https://pagespeed.web.dev)
- [ ] Inga 404-sidor eller trasiga interna länkar
- [ ] Mobilanpassad design ✅
- [ ] Inga felmeddelanden i webbläsarens console

---

### 5. Ansökan — steg för steg

1. Skapa konto på [adsense.google.com](https://adsense.google.com)
2. Lägg till din domän och verifiera ägarskap (Google ger dig en HTML-tag eller `<meta>`-tagg)
3. Klistra in verifieringskoden i `src/app/layout.tsx`:
   ```tsx
   // Lägg till i <head> via Next.js metadata eller direkt i layout:
   export const metadata: Metadata = {
     verification: { google: "DIN_VERIFIERINGSKOD" },
     // ...
   };
   ```
4. Deploya och vänta på Googles granskning — **kan ta dagar till veckor**
5. När godkänd: skapa annonsenheter i AdSense-dashboarden och notera deras slot IDs
6. Lägg in dina uppgifter i `.env.local` och Vercel (se avsnittet ovan)
7. Sätt `adsEnabled: true` i `src/config/ads.ts`
8. Lägg till AdSense-skriptet i `src/app/layout.tsx`:
   ```tsx
   import Script from "next/script";
   import { adsConfig } from "@/config/ads";
   // I layout-funktionen, innanför <body>:
   {adsConfig.adsEnabled && adsConfig.publisherId && (
     <Script
       async
       src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.publisherId}`}
       crossOrigin="anonymous"
       strategy="lazyOnload"
     />
   )}
   ```
9. Byt ut `<AdPlaceholder />` mot riktiga `<ins className="adsbygoogle" ...>` taggar

---

### 6. Var finns annonsplatserna?

| Komponent | Plats |
|-----------|-------|
| `src/app/page.tsx` | Banner mellan RecentMedia och GearSection |
| `src/components/ads/AdPlaceholder.tsx` | Återanvändbar komponent — lägg till fler platser med `variant="banner"` eller `variant="sidebar"` |
| `src/config/ads.ts` | Konfiguration och slot IDs |

---

### 7. Viktigt att tänka på

> ⛔ **Klicka ALDRIG på dina egna annonser.** Det är ett brott mot Googles villkor och leder till permanent avstängning av kontot.

> 💡 **Ju mer originalinnehåll desto bättre** — uppdatera sidan regelbundet med nya turer för att visa att sidan är aktiv.

> 💡 **Annonsplaceringar ska inte täcka innehåll** — se till att annonser visas i naturliga pausplatser, inte ovanpå text eller bilder.

