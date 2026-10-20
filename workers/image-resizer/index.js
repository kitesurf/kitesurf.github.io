/**
 * Cloudflare Worker: Image Resizing & Format Optimization for kite-mallorca.com
 * Handles: /cdn-cgi/image/<OPTIONS>/<IMAGE-PATH>
 * Uses Cloudflare Workers Paid cf.image engine (AVIF, WebP, dynamic resize).
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const prefix = "/cdn-cgi/image/";

    if (!url.pathname.startsWith(prefix)) {
      return new Response("Not Found", { status: 404 });
    }

    // Extract options and source image path
    // Example: /cdn-cgi/image/width=1200,quality=85,format=auto/images/flying-friends/foto.jpg
    const rest = url.pathname.slice(prefix.length);
    const slashIdx = rest.indexOf("/");

    if (slashIdx === -1) {
      return new Response("Invalid image URL structure", { status: 400 });
    }

    const optionsStr = rest.slice(0, slashIdx);
    const imagePath = rest.slice(slashIdx); // e.g. /images/flying-friends/foto.jpg

    // Parse options with safe defaults
    const imageOptions = {
      format: "auto",
      fit: "scale-down",
      quality: 85,
    };

    const optionsList = optionsStr.split(",");
    for (const opt of optionsList) {
      const parts = opt.split("=");
      if (parts.length !== 2) continue;
      const key = parts[0].trim().toLowerCase();
      const val = parts[1].trim().toLowerCase();

      if (key === "width" || key === "w") {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 3840) {
          imageOptions.width = parsed;
        }
      } else if (key === "height" || key === "h") {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 3840) {
          imageOptions.height = parsed;
        }
      } else if (key === "quality" || key === "q") {
        const parsed = parseInt(val, 10);
        if (!isNaN(parsed) && parsed >= 20 && parsed <= 100) {
          imageOptions.quality = parsed;
        }
      } else if (key === "format" || key === "f") {
        if (["auto", "avif", "webp", "jpeg", "png"].includes(val)) {
          imageOptions.format = val;
        }
      } else if (key === "fit") {
        if (["scale-down", "contain", "cover", "crop", "pad"].includes(val)) {
          imageOptions.fit = val;
        }
      }
    }

    // Smart format negotiation: Ensure PageSpeed/Lighthouse & modern browsers ALWAYS get AVIF/WebP
    // Even if headless crawlers or image preloads send a generic Accept header (*/*)
    const accept = request.headers.get("accept") || "";
    const ua = request.headers.get("user-agent") || "";

    if (imageOptions.format === "auto") {
      if (accept.includes("image/avif")) {
        imageOptions.format = "avif";
      } else if (accept.includes("image/webp")) {
        imageOptions.format = "webp";
      } else if (/Chrome|Chromium|CriOS|Googlebot|Lighthouse/i.test(ua)) {
        // Modern Chrome / Google Lighthouse / Googlebot always support AVIF
        imageOptions.format = "avif";
      } else if (/Firefox/i.test(ua)) {
        imageOptions.format = "avif";
      } else if (/Safari/i.test(ua)) {
        imageOptions.format = "webp";
      }
    }

    // Security check: only allow images from origin domain (prevent open proxy)
    const originUrl = new URL(imagePath, url.origin);
    if (originUrl.hostname !== url.hostname) {
      return new Response("Forbidden: only origin images can be transformed", { status: 403 });
    }

    try {
      const subHeaders = new Headers(request.headers);
      if (imageOptions.format === "avif") {
        subHeaders.set("Accept", "image/avif,image/webp,*/*");
      } else if (imageOptions.format === "webp") {
        subHeaders.set("Accept", "image/webp,*/*");
      }

      // Execute Cloudflare Image Resizing transformation
      const imageRequest = new Request(originUrl.toString(), {
        headers: subHeaders,
        cf: {
          image: imageOptions,
        },
      });

      const response = await fetch(imageRequest);

      // Add long-term immutable caching headers for successful transformations
      const newHeaders = new Headers(response.headers);
      if (response.ok) {
        newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
        newHeaders.set("Vary", "Accept");
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch (err) {
      // Graceful fallback: return original asset directly
      return fetch(originUrl.toString(), request);
    }
  },
};
