/**
 * Intelligent Lazy-Loaded Analytics & GTM
 * Defers loading until first user interaction (scroll, click, touch, mouse)
 * or idle fallback to achieve optimal Core Web Vitals and 0ms initial CPU blocking.
 */
(function () {
  var loaded = false;
  var gtmId = 'GTM-5J849CQ'; // GTM Container ID

  function loadGTM() {
    if (loaded) return;
    loaded = true;

    // Clean up all interaction listeners
    ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(function (e) {
      window.removeEventListener(e, loadGTM, { passive: true });
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtmId;
    document.head.appendChild(script);

    window.dataLayer.push({
      'fireGtm': true
    });
  }

  // Trigger on user interaction
  ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(function (e) {
    window.addEventListener(e, loadGTM, { passive: true, once: true });
  });

  // Fallback: Trigger after idle time if no interaction occurred
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(function () {
      setTimeout(loadGTM, 3000);
    });
  } else {
    setTimeout(loadGTM, 3500);
  }
})();