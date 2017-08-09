---
title: Search
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - lunr
  - search
---
The scaffold includes a client side search library for javascript by the name of [lunr](https://lunrjs.com/) that searches an index built by [metalsmith-lunr](https://github.com/TelenorFrontend/metalsmith-lunr).

Lunr is set up for the english language, so if you wish to write documentation in another language the search index must be built with a fitting language pack for lunr (the client should also have it). Otherwise, useful features like [stemming](https://nlp.stanford.edu/IR-book/html/htmledition/stemming-and-lemmatization-1.html) must be disabled.

To have a page show up in the search results, simply add `lunr: true` to the metadata. The search will match `tags`, `title` and content of the page.

Tags can be an array of strings if they should only match exactly, or a string (for example comma separated phrases) if they should be matched more loosely.
