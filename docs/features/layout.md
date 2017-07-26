---
title: Layout
nav_sort: 1
nav_groups:
  - primary
---
The scaffold applies a standard layout to your documentation using [handlebars](http://handlebarsjs.com/) and [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts).

To use a different layout, change the  `default` option passed to the `metalsmith-layouts` plugin in `lib/build-docs.js` to a valid handlebars layout.

To modify the look and feel, simply modify the appropriate scss in the `style` folder.
