---
layout: default
title: es
lang: es
t:
  menutxt1: "cursos de kitesurf"
  menutxt2: "alquiler"
  menutxt3: "viento"
  menutxt4: "contacto"
  menutxt5: "fotos y videos"
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
