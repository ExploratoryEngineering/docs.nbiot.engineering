---
title: Markdown
description: Example of a markdown file.
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - markdown
  - marked
  - md
---
Files with `.md` or `.markdown` extensions will be parsed by [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown), which is essentially a wrapper for [Marked](https://github.com/chjj/marked).

## Images

Images should usually be located in the `img` folder, and should be referenced using relative paths. The image will be displayed with its native resolution unless it is too big to fit the container (in which case it will be downsized).

```markdown
![Stock Photo](../img/pexels-photo-272887.jpeg)
```

![Stock Photo](../img/pexels-photo-272887.jpeg)

If the image should be resized, a little bit of inline html is necessary.

``` html
<img src="../img/pexels-photo-272887.jpeg" alt="Small Stock Photo" width="100" />
```

<img src="../img/pexels-photo-272887.jpeg" alt="Small Stock Photo" width="100" />

## Inline html

Inline html can be written anywhere in a markdown file if advanced components are needed.

### Example inline html component

The following component is from [the Telenor Frontend component library](https://github.com/TelenorFrontend/component-library).

```html
<ol class="tn-steps">
 <li class="tn-step tn-step--active">Identify problem</li>
 <li class="tn-step">Propose solution</li>
 <li class="tn-step">Review</li>
</ol>
```
<ol class="tn-steps">
 <li class="tn-step tn-step--active">Identify problem</li>
 <li class="tn-step">Propose solution</li>
 <li class="tn-step">Review</li>
</ol>
