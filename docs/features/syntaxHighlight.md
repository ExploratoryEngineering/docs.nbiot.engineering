---
title: Syntax Highlighting
description: The documentation scaffold uses metalsmith-metallic to highlight code in markdown files.
lunr: true
nav_sort: 4
nav_groups:
  - primary
tags: syntax highlighting
---
[metalsmith-metallic](https://github.com/weswigham/metalsmith-metallic) will highlight code in markdown files. The color scheme can be selected from any [highlight.js theme](https://github.com/isagalaev/highlight.js/tree/master/src/styles), and set in `style/vendors`. Supported languages can be found in the [highlight.js documentation](http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html#language-names-and-aliases).

Markup can include the name of, or an alias of, a language with or without a space in front of it. For examples, see the source of this page.

```
local var = "untyped code"
```

```js
var t = 'javascript code'
```

``` http
POST /task?id=1 HTTP/1.1
Host: example.org
Content-Type: application/json; charset=utf-8
Content-Length: 137

{
  "status": "ok",
  "extended": true,
  "results": [
    {"value": 0, "type": "int64"},
    {"value": 1.0e+3, "type": "decimal"}
  ]
}
```
