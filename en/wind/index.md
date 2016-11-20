---
layout: article
title: "Kite-Mallorca - Wind - Phone +34-696-264729"
subtitle: "Wind and weather forecast"
date: 2015-11-23
modified: 2016-11-20T00:00:00.000Z
author: daniel
description: "Aktuelle Informationen über die Windbedingungen in Mallorca."
image:
  background: 6.jpg
  feature:
  teaser:
  thumb: flying-friends/l_kite-mallorca_042.jpg
  picnum: 42
snippets:
shortsnippets: true
lang: en
en-url: "en/wind"
es-url: "es/viento"
de-url: "de/wind"
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
  menutxt6: "Disclaimer"
  link6: "disclaimer"
  menutxt7: "Contact us"
  link7: "contact-us"
  teaser:
---

### WIND FORECAST

<script type="text/javascript">
//doesn't block the load event
function windIframe(){
  var i = document.createElement("iframe");
  i.src = "http://widgets.ikitesurf.com/widgets/web/forecastTable?lat=39.87&lon=3.0884&units_wind=kts&units_height=m&units_temp=C&days=4&width=450&height=250&color=2799d1&name=Sa Marina&app=ikitesurf";
  i.style = "border:none; overflow:hidden; height:250px; width:100%;";
  i.scrolling = "no";
  i.frameborder = "0";
  i.allowTransparency = "true";
  document.getElementById("windframe").appendChild(i);
};

// Check for browser support of event handling capability
if (window.addEventListener)
window.addEventListener("load", windIframe, false);
else if (window.attachEvent)
window.attachEvent("onload", windIframe);
else window.onload = windIframe;
</script>
<div id="windframe"><noscript><iframe src="http://widgets.ikitesurf.com/widgets/web/forecastTable?lat=39.87&lon=3.0884&units_wind=kts&units_height=m&units_temp=C&days=4&width=450&height=250&color=2799d1&name=Sa Marina&app=ikitesurf"></iframe></noscript></div>
