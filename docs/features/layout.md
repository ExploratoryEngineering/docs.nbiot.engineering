---
title: Layout
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - layout
  - handlebars
---
The scaffold applies a standard layout to your documentation using [handlebars](http://handlebarsjs.com/) and [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts).

The layout applied is determined by the `layout` metadata tag of the file.

If no `layout` metadata tag is present, the default layout will be used. To change the default layout, change the  `default` option passed to the `metalsmith-layouts` plugin in `lib/build-docs.js` to a valid handlebars layout.

To modify the look and feel of the default layout, simply modify the appropriate scss in the `style` folder. The scaffold scss uses [the 7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern).
