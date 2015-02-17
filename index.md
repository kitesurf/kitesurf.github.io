---
layout: archive
title: Home
css_id: home
lang: en
image:
  feature:
  teaser: flying-friends/submarine.png
  thumb: 
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

<div class="myteaser">
        <div class="space"></div>
        <span class="doble"><h2>{{ page.t.teaser }}</h2></span>
</div>  

<div class="tiles">
{% for post in site.en %}
	{% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

<p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
