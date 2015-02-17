---
layout: default
title: es
lang: es
t:
  link1: "cursos de kitesurf"
  menutxt1:    "cursos de kitesurf"
  link2: "alquiler"
  menutxt2:    "alquiler"
  link3: "viento"
  menutxt3:    "viento"
  link4: "contacto"
  menutxt4:    "contacto"
  link5: "fotos y videos"
  menutxt5:    "flying-friends"
  teaser: "Ven y aprende con nosotros los primeros pasos en kitesurf..."
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
