---
title: Markdown
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

## Inline html

Inline html can be written anywhere in a markdown file if advanced components are needed.

### Example inline html component
<ol class="tn-steps">
 <li class="tn-step tn-step--active">Identify problem</li>
 <li class="tn-step">Propose solution</li>
 <li class="tn-step">Review</li>
</ol>
