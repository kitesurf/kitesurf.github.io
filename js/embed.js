/*!
 * FastHooked Embed & Booking Widget Library v1.2.0
 * Multi-tenant, Multilingual (DE, EN, ES, FR, IT)
 * Copyright (c) FastHooked SaaS
 */
(function(window, document) {
  // Verhindert doppelte Initialisierung
  if (window.FastHooked && window.FastHooked.initialized) return;

  // Basis-URL Ermittlung
  const currentScript = document.currentScript;
  const configuredBaseUrl = currentScript ? currentScript.getAttribute('data-base-url') : null;
  const STOREFRONT_BASE = configuredBaseUrl || "http://localhost:5175";

  // Unterstützte Sprachen
  const SUPPORTED_LANGS = ['de', 'en', 'es', 'fr', 'it', 'pt'];

  /**
   * Ermittelt die beste passende Sprache für das Element
   */
  function resolveLanguage(element) {
    if (element) {
      const explicit = element.getAttribute('data-fh-lang');
      if (explicit && SUPPORTED_LANGS.includes(explicit.toLowerCase())) {
        return explicit.toLowerCase();
      }
      const closestLangEl = element.closest('[lang]');
      if (closestLangEl) {
        const langCode = closestLangEl.getAttribute('lang').slice(0, 2).toLowerCase();
        if (SUPPORTED_LANGS.includes(langCode)) return langCode;
      }
    }
    const htmlLang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(htmlLang)) return htmlLang;

    const navLang = (navigator.language || '').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(navLang)) return navLang;

    return 'de';
  }

  /**
   * Baut die Ziel-URL für das Storefront-Iframe zusammen
   */
  function buildStorefrontUrl(params) {
    const slug = params.slug || 'kite-mallorca';
    const query = new URLSearchParams();
    query.set('mode', 'embed');

    if (params.lang) query.set('lang', params.lang);
    if (params.serviceId) query.set('serviceId', params.serviceId);
    if (params.view) query.set('view', params.view);

    return `${STOREFRONT_BASE.replace(/\/$/, '')}/${encodeURIComponent(slug)}?${query.toString()}`;
  }

  /**
   * Öffnet das Buchungs-Modal
   */
  function openModal(options) {
    // Existierendes Overlay schließen falls vorhanden
    closeModal();

    const targetUrl = buildStorefrontUrl(options);

    // 1. Overlay
    const overlay = document.createElement('div');
    overlay.id = 'fh-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Buchungskalender');

    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      zIndex: '999999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      opacity: '0',
      transition: 'opacity 0.25s ease',
      padding: '16px',
      boxSizing: 'border-box'
    });

    // 2. Modal Wrapper
    const modalBox = document.createElement('div');
    modalBox.id = 'fh-modal-box';
    Object.assign(modalBox.style, {
      position: 'relative',
      width: '100%',
      maxWidth: '1100px',
      height: '92vh',
      maxHeight: '880px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
      display: 'flex',
      flexDirection: 'column',
      transform: 'scale(0.96)',
      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    });

    // Mobile Vollbild
    if (window.innerWidth < 768) {
      modalBox.style.maxWidth = '100vw';
      modalBox.style.height = '100vh';
      modalBox.style.maxHeight = '100vh';
      modalBox.style.borderRadius = '0';
      overlay.style.padding = '0';
    }

    // 3. Schließen-Button
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Schließen');
    closeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '14px',
      right: '14px',
      zIndex: '10',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: '#0f172a',
      border: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      transition: 'transform 0.15s, background-color 0.15s'
    });
    closeBtn.onmouseenter = () => closeBtn.style.transform = 'scale(1.08)';
    closeBtn.onmouseleave = () => closeBtn.style.transform = 'scale(1)';
    closeBtn.onclick = closeModal;

    // 4. Lade-Indikator
    const spinner = document.createElement('div');
    spinner.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:12px;color:#64748b;font-family:sans-serif;font-size:14px;">
        <svg style="animation:fh-spin 1s linear infinite;" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Lade Buchungskalender...</span>
      </div>
    `;
    Object.assign(spinner.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      zIndex: '1'
    });

    // 5. Iframe
    const iframe = document.createElement('iframe');
    iframe.src = targetUrl;
    iframe.title = 'FastHooked Buchung';
    iframe.loading = 'eager';
    Object.assign(iframe.style, {
      width: '100%',
      height: '100%',
      border: 'none',
      position: 'relative',
      zIndex: '2',
      backgroundColor: 'transparent'
    });
    iframe.onload = () => {
      spinner.style.display = 'none';
    };

    modalBox.appendChild(closeBtn);
    modalBox.appendChild(spinner);
    modalBox.appendChild(iframe);
    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);

    // Fade-In
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      modalBox.style.transform = 'scale(1)';
    });

    // Klick auf Hintergrund
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // ESC Taste
    document.addEventListener('keydown', handleEscKey);
  }

  function handleEscKey(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      closeModal();
    }
  }

  /**
   * Schließt das Buchungs-Modal
   */
  function closeModal() {
    const overlay = document.getElementById('fh-overlay');
    if (overlay) {
      document.removeEventListener('keydown', handleEscKey);
      overlay.style.opacity = '0';
      const box = document.getElementById('fh-modal-box');
      if (box) box.style.transform = 'scale(0.96)';
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 250);
    }
  }

  /**
   * Initialisiert Inline-Container: [data-fh-target][data-fh-inline="true"]
   */
  function initInlineContainers() {
    const inlineContainers = document.querySelectorAll('[data-fh-target][data-fh-inline="true"]');
    inlineContainers.forEach(container => {
      if (container.getAttribute('data-fh-ready')) return;
      container.setAttribute('data-fh-ready', 'true');

      const slug = container.getAttribute('data-fh-target');
      const serviceId = container.getAttribute('data-fh-service');
      const lang = resolveLanguage(container);
      const view = container.getAttribute('data-fh-view') || 'all';
      const url = buildStorefrontUrl({ slug, serviceId, lang, view });

      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.title = 'FastHooked Buchung Inline';
      iframe.style.width = '100%';
      iframe.style.minHeight = container.getAttribute('data-fh-height') || '750px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      container.appendChild(iframe);
    });
  }

  /**
   * Event Listener für Buttons mit [data-fh-target]
   */
  function initButtons() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('[data-fh-target]');
      if (!btn) return;
      if (btn.getAttribute('data-fh-inline') === 'true') return; // Nicht für Inline-Container

      e.preventDefault();
      const slug = btn.getAttribute('data-fh-target');
      const serviceId = btn.getAttribute('data-fh-service') || undefined;
      const lang = resolveLanguage(btn);
      const view = btn.getAttribute('data-fh-view') || undefined;

      openModal({ slug, serviceId, lang, view });
    });
  }

  // Animation Styles für Spinner injecten
  const styleTag = document.createElement('style');
  styleTag.textContent = `@keyframes fh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(styleTag);

  // Message Listener für iFrame PostMessages (z.B. Schließen-Klick)
  window.addEventListener('message', (event) => {
    if (event.data === 'fh-close-modal') {
      closeModal();
    }
  });

  // Öffentliche API
  window.FastHooked = {
    initialized: true,
    baseUrl: STOREFRONT_BASE,
    open: openModal,
    close: closeModal,
    resolveLanguage: resolveLanguage
  };

  // Auto-Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initButtons();
      initInlineContainers();
    });
  } else {
    initButtons();
    initInlineContainers();
  }
})(window, document);
