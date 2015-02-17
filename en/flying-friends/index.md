---
layout: archive
title: {{ title }}
modified:
categories: {{ dir }}
excerpt:
tags: []
image:
  feature:
  teaser: flying-friends/cabin.png
  thumb:
title: Kite-Mallorca - Tel. +34-696-264729 - Pictures & Videos
lang: en
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

<div class="home">

  <h1>Posts</h1>

  <ul class="posts">
    {% for post in site.posts %}
      <li>
        <span class="post-date">{{ post.date | date: "%b %-d, %Y" }}</span>
        <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

</div>
