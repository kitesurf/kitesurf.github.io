---
layout: article
title: "Kite-Mallorca - Your International Kitesurf Center - Tel. +34-696-264729"
subtitle: 
date: 
modified:
description: "Willkommen bei KITE-MALLORCA. Komm und lern mit uns die ersten Schritte im Kitesurfen! Ob Kitesurfkurse oder Vermietung von Material, wir sind der richtige Ansprechpartner für dich."
image:
  feature:
  teaser:
  thumb:
snippets: true
lang: en
en-url: "en"
es-url: "es"
de-url: "de"
t:
  menutxt1: "kitesurfing lessons"
  link1:    "kitesurfing-lessons"
  menutxt2: "rental"
  link2:    "renting"
  menutxt3: "wind"
  link3:    "wind"
  menutxt4: "contact"
  link4:    "contact"
  menutxt5: "pictures & videos"
  link5:    "flying-friends"
  teaser: "Come and learn with us the first steps in kitesurfing..."
---

<div id="main" role="main">     
  <div class="wrap">
    {% if page.image.feature %}
    <div class="page-feature">
      <div class="page-image">
        <img src="{{ site.url }}/images/{{ page.image.feature }}" class="page-feature-image" alt="{{ page.title }}">
        {% if page.image.credit %}{% include image-credit.html %}{% endif %}
      </div><!-- /.page-image -->
    </div><!-- /.page-feature -->
    {% endif %}
<div class="tiles">
{% for post in site.categories.en %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
    <div class="archive-wrap">
      <div class="page-content">
        {{ content }}
      </div><!-- /.page-content -->
    </div class="archive-wrap"><!-- /.archive-wrap -->
  </div><!-- /.wrap -->
</div><!-- /#main -->

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>
