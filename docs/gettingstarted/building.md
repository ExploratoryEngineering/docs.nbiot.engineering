---
title: Building
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - build
  - npm
---
The npm build script will package assets and build the documentation.

```shell
$ npm run build
```

In order, the steps run are:
1. Delete the build folder to get rid of any previous builds
2. Run metalsmith to make static html from the documentation
3. Build the css style from the packaged scss
4. Uglify javascript
