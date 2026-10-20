# Cloudflare Worker: Image Resizing & Format Optimization

Dieser Worker nutzt Cloudflare Workers Paid (`cf.image`), um Bilder für `kite-mallorca.com` dynamisch zu skalieren und automatisch in **AVIF** oder **WebP** umzuwandeln.

## URL-Format
```text
https://kite-mallorca.com/cdn-cgi/image/width=1200,quality=85,format=auto/images/flying-friends/foto.jpg
```

### Unterstützte Optionen
- `width` / `w`: Zielbreite in Pixeln (z. B. `480`, `800`, `1200`, `1600`)
- `height` / `h`: Zielhöhe in Pixeln (optional)
- `quality` / `q`: Kompressionsqualität (Standard: `85`)
- `format` / `f`: `auto` (liefert AVIF für unterstützende Browser, sonst WebP, sonst JPEG)
- `fit`: `scale-down` (Standard), `cover`, `contain`

---

## Deployment-Möglichkeiten

### Option A: Über die Kommandozeile (Wrangler)
Im Verzeichnis `workers/image-resizer/`:
```bash
npx wrangler deploy
```

### Option B: Über das Cloudflare Dashboard
1. Öffne das [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Compute (Workers) -> Workers & Pages**.
2. Klicke auf **Create application** -> **Create Worker**.
3. Nenne den Worker `kite-mallorca-images` und speichere.
4. Klicke auf **Quick Edit** und ersetze den Code durch den Inhalt aus `index.js`. Klicke auf **Save and Deploy**.
5. Gehe zu den Worker-Einstellungen: **Settings -> Triggers -> Routes -> Add Route**:
   - **Route:** `kite-mallorca.com/cdn-cgi/image/*`
   - **Zone:** `kite-mallorca.com`
