/**
 * Intelligent Lazy-Loaded Google Analytics 4 (GA4)
 * Defers loading until first user interaction (scroll, click, touch, mouse)
 * or idle fallback to achieve optimal Core Web Vitals and 0ms initial CPU blocking.
 */
(function () {
  var loaded = false;
  var ga4Id = 'G-1G16K5QTLF';

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;

    // Clean up all interaction listeners
    ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(function (e) {
      window.removeEventListener(e, loadAnalytics, { passive: true });
    });

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', ga4Id, {
      'anonymize_ip': true,
      'send_page_view': true
    });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga4Id;
    document.head.appendChild(script);
  }

  // Trigger on user interaction
  ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'].forEach(function (e) {
    window.addEventListener(e, loadAnalytics, { passive: true, once: true });
  });

  // Fallback: Trigger after idle time if no interaction occurred
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(function () {
      setTimeout(loadAnalytics, 3000);
    });
  } else {
    setTimeout(loadAnalytics, 3500);
  }
})();