# Design Doc: Cloudflare Edge Image Optimization & Resizing

- **Datum:** 2026-10-20
- **Status:** Entwurf / Genehmigt im Brainstorming
- **Projekt:** `kite-mallorca.com`
- **Ziel:** Vollautomatische Bildoptimierung (AVIF, WebP, responsive Dimensionen) an der Cloudflare-Edge über den vorhandenen Cloudflare Workers Paid Plan ohne zusätzliche Hosting-Kosten.

---

## 1. Problemstellung & Motivation

Aktuell werden auf `kite-mallorca.com` Bilder auf unterschiedliche Weise ausgeliefert:
1. **Hero-Slider:** Manuelle `<picture>`-Tags mit statischen `.webp`- und `.jpeg`-Dateien, die vorab separat erstellt und gepflegt werden mussten.
2. **Content- und Review-Bilder:** Teils reine `<img>`-Tags mit unskalierten Master-JPGs.
3. **Mehrsprachigkeit & Redundanz:** Obwohl die Bilddateien im Ordner `/images/` zentral liegen, suggerierten unterschiedliche Template-Pfade und Alt-Texte eine Fragmentierung.
4. **Fehlende moderne Formate (AVIF):** Moderne Browser unterstützen AVIF für bis zu 30–50 % kleinere Dateigrößen gegenüber WebP bei gleicher visueller Qualität.
5. **Ressourcen:** Der bestehende Cloudflare Workers Paid Plan ($5/Monat) deckt Edge-Transformationen bereits ab, wird für diese Domain jedoch noch nicht genutzt.

---

## 2. Zielarchitektur

```
[Browser / Besucher]
        │
        ▼ (Anfrage an https://kite-mallorca.com/cdn-cgi/image/width=...,quality=85,format=auto/images/...)
[Cloudflare Edge Network]
        │
        ├── Ist transformiertes Bild im Edge-Cache?
        │     ├── JA ──> Sofortige Auslieferung (cf-cache-status: HIT, AVIF/WebP, Millisekunden)
        │     └── NEIN ──> [Cloudflare Worker: kite-images]
        │                         │
        │                         ▼
        │                  Ruft Originalbild ab (origin: https://kite-mallorca.com/images/...)
        │                         │
        │                         ▼
        │                  Cloudflare cf.image Engine
        │                  - Format-Konvertierung (AVIF > WebP > JPG je nach Accept-Header)
        │                  - Skalierung auf angeforderte Pixelbreite (fit: scale-down)
        │                  - Kompression (quality: 85)
        │                         │
        │                         ▼
        │                  Im Edge-Cache speichern & an Client senden
```

---

## 3. Komponenten

### 3.1 Cloudflare Worker (`workers/image-resizer/`)
- **Ablageort:** Direkt im Projekt-Repository unter `workers/image-resizer/` (enthält `index.js` und `wrangler.toml`).
- **Laufzeitumgebung:** Cloudflare Serverless Edge (Workers Paid).
- **Route:** `kite-mallorca.com/cdn-cgi/image/*`
- **Logik:**
  - Extrahiert Optionen aus dem Pfad (`width`, `height`, `quality`, `format`).
  - Setzt Standardwerte (`format: "auto"`, `quality: 85`, `fit: "scale-down"`).
  - Ruft die Ursprungsdatei via `fetch(originUrl, { cf: { image: options } })` ab.
  - Setzt Cache-Header (`Cache-Control: public, max-age=31536000, immutable`).
  - Fallback bei Fehlern: Bei ungültigen Anfragen oder fehlenden Parametern wird das Originalbild unverändert durchgereicht.

### 3.2 Jekyll Helper Include (`_includes/cf-img.html`)
Zentrales Include für responsive Bildausgabe im gesamten Jekyll-Projekt:
- **Parameter:**
  - `src`: Pfad zum Bild (z. B. `/images/flying-friends/foto.jpg`)
  - `alt`: Alt-Text für Barrierefreiheit und SEO
  - `widths`: Kommagetrennte Liste von Bildbreiten (Standard: `480,800,1200,1600`)
  - `default_width`: Standardbreite für das `src`-Attribut (Standard: `1200`)
  - `sizes`: CSS-Sizes-Attribut (Standard: `(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px`)
  - `class`: Optionale CSS-Klassen (z. B. `lazyload`)
  - `loading`: `lazy` oder `eager` (Standard: `lazy`)
  - `width` / `height`: Intrinsische Dimensionen zur CLS-Vermeidung
- **Localhost-Erkennung:**
  Wenn `site.url` `localhost` oder `127.0.0.1` enthält, wird der Cloudflare-Präfix automatisch weggelassen, sodass die Entwicklung offline und lokal ohne Fehler funktioniert.

### 3.3 Anpassung der bestehenden Komponenten

1. **Hero-Swiper (`_includes/swiper.html`) & PageSpeed-Optimierung:**
   - **PageSpeed-Target:** Google PageSpeed testet Desktop mit einem 1200px-Viewport. Statt ein überdimensioniertes 1600px-Bild auszuliefern (was zu Punktabzug bei *„Properly size images“* führt), liefern wir für Standard-Desktop exakt **1200px** aus.
   - **Granulare Breakpoints für Slide 1:**
     - Mobil (< 600px): `width=480,quality=85,format=auto`
     - Tablet (600px – 1023px): `width=800,quality=85,format=auto`
     - Desktop / PageSpeed-Benchmark (1024px – 1440px): `width=1200,quality=85,format=auto`
     - Große Monitore (> 1440px): `width=1600,quality=85,format=auto`
   - **`<img>`-Attribute:** `width="1200" height="800"` (3:2 Aspect Ratio) zur Vermeidung von Layout Shifts (CLS = 0) und Erfüllung der PageSpeed-Erwartung.
   - **LCP-Preload (`_layouts/default.html`):**
     - Desktop: `<link rel="preload" as="image" href="/cdn-cgi/image/width=1200,quality=85,format=auto{{ first_slide.image }}" media="(min-width: 600px)" fetchpriority="high">`
     - Mobil: `<link rel="preload" as="image" href="/cdn-cgi/image/width=480,quality=85,format=auto{{ first_slide.image }}" media="(max-width: 599px)" fetchpriority="high">`
   - **Slides 2–5:** Nutzen dieselben optimierten Breakpoints über `lazyload` mit `data-srcset`.

2. **Fotogalerie (`_includes/gallery-thumbs.html`):**
   - Thumbnails: `width=320,quality=85,format=auto`
   - Vollbild-Lightbox: `width=1600,quality=85,format=auto`
   - Entfernung der Notwendigkeit für physisch duplizierte `s_`- und `l_`-Dateien.

3. **Kundenbewertungen & Avatare (`_includes/carousel.html`):**
   - 100×100px Avatare erhalten Retina-Transformation: `width=200,quality=85,format=auto`.

4. **AMP-Kompatibilität (`_includes/` & `_layouts/`):**
   - `<amp-img>` nutzt dieselben `/cdn-cgi/image/...`-URLs unter Beibehaltung von `layout="responsive"`, `width` und `height`.

---

## 4. Fehlerbehandlung & Fallback-Strategie

| Szenario | Verhalten |
| :--- | :--- |
| **Worker fällt aus oder Route nicht erreichbar** | Browser lädt bei Direktaufrufen das Originalbild; Cloudflare liefert im Fehlerfall das Ursprungs-Asset. |
| **Browser unterstützt weder AVIF noch WebP** | `format="auto"` liefert komprimiertes JPG in der angeforderten Größe. |
| **Lokale Entwicklung (`jekyll serve`)** | Helper erkennt `localhost` und generiert reguläre `/images/...`-Pfade. |
| **Extern verlinkte Bilder / fremde Domains** | Worker lehnt fremde Domains ab (Sicherheitsfilter gegen Open-Proxy-Missbrauch). |

---

## 5. Rollout- & Testschritte

1. **Worker-Bereitstellung:**
   - Worker-Dateien in `workers/image-resizer/` anlegen.
   - Deployment auf Cloudflare Workers Paid (`npx wrangler deploy` oder Dashboard).
   - Route `kite-mallorca.com/cdn-cgi/image/*` im Cloudflare Dashboard zuweisen.
2. **Funktionstest:**
   - Aufruf von `https://kite-mallorca.com/cdn-cgi/image/width=400,format=auto/images/flying-friends/bernardi_and_funny_dog_15x6_1600wide.jpg`.
   - Prüfung der HTTP-Response-Header:
     - `content-type: image/avif` (in Chrome/Safari)
     - `cf-resized: true` / `cf-cache-status: HIT`
3. **Template-Umstellung:**
   - Bereitstellung von `_includes/cf-img.html`.
   - Umstellung `_includes/swiper.html` und Preloads in `_layouts/default.html`.
   - Umstellung `_includes/carousel.html` und `_includes/gallery-thumbs.html`.
4. **Verifikation & Messung:**
   - Test mit Google PageSpeed Insights & WebPageTest: Validierung von LCP, Dateigrößenersparnis und AVIF-Auslieferung.
