import { test, expect } from '@playwright/test';

test.describe('Kite Mallorca Site Verification', () => {
  const pagesToTest = [
    { path: '/', titleMatch: /kite/i },
    { path: '/de/', titleMatch: /kitesurf|kiten|mallorca/i },
    { path: '/en/', titleMatch: /kitesurf|kiteboarding|mallorca/i },
    { path: '/es/', titleMatch: /kitesurf|mallorca/i },
    
    // German (DE)
    { path: '/de/kitekurse/', titleMatch: /kitekurse|kiten|kitesurf/i },
    { path: '/de/kitekurse/anfaengerkurse/', titleMatch: /anfänger|grundkurs|kitesurf/i },
    { path: '/de/kitekurse/schnupperkurse/', titleMatch: /schnupper|kitesurf/i },
    { path: '/de/kitekurse/fortgeschritten/', titleMatch: /aufsteiger|fortgeschritten|kitesurf/i },
    { path: '/de/kitekurse/privatstunden/', titleMatch: /privat|coaching|kitesurf/i },
    { path: '/de/kitekurse/hydrofoil/', titleMatch: /hydrofoil|foil|kitesurf/i },
    { path: '/de/wingfoiling/', titleMatch: /wingfoil/i },
    { path: '/de/vermietung/', titleMatch: /vermietung|miete|kite/i },
    { path: '/de/vermietung/pro-stunde-oder-tag/', titleMatch: /stunde|tag|miete|kite/i },
    { path: '/de/vermietung/langzeit/', titleMatch: /langzeit|paket|miete|kite/i },
    { path: '/de/wind/', titleMatch: /wind|wetter|mallorca/i },
    { path: '/de/kontakt/', titleMatch: /kontakt|kitesurf/i },
    { path: '/de/flying-friends/', titleMatch: /bilder|fotos|friends|kite/i },

    // English (EN)
    { path: '/en/kitesurfing-lessons/', titleMatch: /kitesurf|kiteboarding|lessons/i },
    { path: '/en/kitesurfing-lessons/beginner/', titleMatch: /beginner|kitesurf/i },
    { path: '/en/kitesurfing-lessons/tryout/', titleMatch: /taster|trial|tryout|kitesurf/i },
    { path: '/en/kitesurfing-lessons/advanced/', titleMatch: /advanced|coaching|kitesurf/i },
    { path: '/en/kitesurfing-lessons/privatlessons/', titleMatch: /private|coaching|kitesurf/i },
    { path: '/en/kitesurfing-lessons/hydrofoil/', titleMatch: /hydrofoil|foil|kitesurf/i },
    { path: '/en/wingfoiling/', titleMatch: /wingfoil/i },
    { path: '/en/renting/', titleMatch: /rental|renting|gear/i },
    { path: '/en/renting/per-hour-or-day/', titleMatch: /hourly|daily|rental|kite/i },
    { path: '/en/renting/long-term/', titleMatch: /long-term|weekly|rental|kite/i },
    { path: '/en/contact/', titleMatch: /contact|location|kitesurf/i },
    { path: '/en/flying-friends/', titleMatch: /pictures|photos|friends|kite/i },

    // Spanish (ES)
    { path: '/es/cursos-de-kitesurf/', titleMatch: /cursos|kitesurf/i },
    { path: '/es/cursos-de-kitesurf/principiante/', titleMatch: /iniciación|principiante|kitesurf/i },
    { path: '/es/cursos-de-kitesurf/iniciacion/', titleMatch: /bautismo|iniciacion|prueba|kitesurf/i },
    { path: '/es/cursos-de-kitesurf/avanzado/', titleMatch: /avanzado|perfeccionamiento|kitesurf/i },
    { path: '/es/cursos-de-kitesurf/privado/', titleMatch: /particulares|privadas|kitesurf/i },
    { path: '/es/cursos-de-kitesurf/hidrofoil/', titleMatch: /hidrofoil|foil|kitesurf/i },
    { path: '/es/wingfoiling/', titleMatch: /wingfoil/i },
    { path: '/es/alquiler/', titleMatch: /alquiler|material|kitesurf/i },
    { path: '/es/alquiler/por-hora-y-dia/', titleMatch: /horas|días|alquiler|kitesurf/i },
    { path: '/es/alquiler/largo-plazo/', titleMatch: /bonos|semanas|alquiler|kitesurf/i },
    { path: '/es/contacto/', titleMatch: /contacto|ubicación|kitesurf/i },
    { path: '/es/flying-friends/', titleMatch: /fotos|videos|friends|kite/i },

    // Italian (IT)
    { path: '/it/', titleMatch: /kitesurf|wingfoil|maiorca/i },
    { path: '/it/corsi-kitesurf/', titleMatch: /corsi|kitesurf|maiorca/i },
    { path: '/it/corsi-kitesurf/principianti/', titleMatch: /principianti|corso|kitesurf/i },
    { path: '/it/corsi-kitesurf/prova/', titleMatch: /prova|battesimo|kitesurf/i },
    { path: '/it/corsi-kitesurf/avanzati/', titleMatch: /avanzati|bolina|kitesurf/i },
    { path: '/it/corsi-kitesurf/lezioni-private/', titleMatch: /private|lezioni|kitesurf/i },
    { path: '/it/corsi-kitesurf/hydrofoil/', titleMatch: /hydrofoil|foil|kitesurf/i },
    { path: '/it/wingfoiling/', titleMatch: /wingfoil|maiorca/i },
    { path: '/it/noleggio/', titleMatch: /noleggio|materiale|kitesurf/i },
    { path: '/it/noleggio/ore-o-giorno/', titleMatch: /ore|giorno|noleggio|kitesurf/i },
    { path: '/it/noleggio/lungo-termine/', titleMatch: /settimanali|lungo termine|noleggio/i },
    { path: '/it/contatto/', titleMatch: /contatto|posizione|kitesurf/i },

    // French (FR)
    { path: '/fr/', titleMatch: /kitesurf|wingfoil|majorque/i },
    { path: '/fr/cours-kitesurf/', titleMatch: /cours|kitesurf|majorque/i },
    { path: '/fr/cours-kitesurf/debutant/', titleMatch: /débutant|stage|kitesurf/i },
    { path: '/fr/cours-kitesurf/initiation/', titleMatch: /initiation|baptême|kitesurf/i },
    { path: '/fr/cours-kitesurf/perfectionnement/', titleMatch: /perfectionnement|remontée au vent|kitesurf/i },
    { path: '/fr/cours-kitesurf/cours-particuliers/', titleMatch: /particuliers|cours|kitesurf/i },
    { path: '/fr/cours-kitesurf/hydrofoil/', titleMatch: /hydrofoil|foil|kitesurf/i },
    { path: '/fr/wingfoiling/', titleMatch: /wingfoil|majorque/i },
    { path: '/fr/location/', titleMatch: /location|matériel|kitesurf/i },
    { path: '/fr/location/heure-ou-journee/', titleMatch: /heure|journée|location|kitesurf/i },
    { path: '/fr/location/longue-duree/', titleMatch: /semaine|longue durée|location/i },
    { path: '/fr/contact/', titleMatch: /contact|accès|kitesurf/i },
  ];

  for (const pageItem of pagesToTest) {
    test(`renders ${pageItem.path} with status 200 and valid HTML`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('pageerror', (err) => {
        // Ignore known third-party embedded widget errors
        if (!err.message.includes('hello is not defined')) {
          consoleErrors.push(err.message);
        }
      });

      const response = await page.goto(pageItem.path);
      expect(response).not.toBeNull();
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(pageItem.titleMatch);

      // Check canonical link
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);

      // Check structured data if present
      const jsonLdElements = await page.locator('script[type="application/ld+json"]').all();
      for (const el of jsonLdElements) {
        const text = await el.innerText();
        expect(() => JSON.parse(text)).not.toThrow();
      }

      expect(consoleErrors).toHaveLength(0);
    });
  }

  test('navigation, menu toggle, flags and language switching work without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await page.goto('/de/');
    
    // Check hreflang tags
    const hreflangs = await page.locator('link[rel="alternate"][hreflang]').all();
    expect(hreflangs.length).toBeGreaterThan(0);
    
    // Check logo
    const logo = page.locator('.logo');
    await expect(logo.first()).toBeVisible();

    // Toggle menu
    const navTrigger = page.locator('#nav-trigger');
    await expect(navTrigger).toBeAttached();
    await navTrigger.check();
    expect(await navTrigger.isChecked()).toBeTruthy();

    // Check that flag links exist
    const englishFlagLink = page.locator('.flags a[title="English"]');
    await expect(englishFlagLink).toBeVisible();
    
    // Click English flag
    await Promise.all([
      page.waitForURL(/.*\/en\/?/),
      englishFlagLink.click()
    ]);

    expect(page.url()).toContain('/en/');
    expect(consoleErrors).toHaveLength(0);
  });
});
