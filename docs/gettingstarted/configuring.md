---
title: Configuring
description: Detailed information on the documentation scaffold configuration process.
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - config
  - configuring
collection: gettingstarted
order: 2
---
Configuring your new documentation project is as simple as altering the configuration files in the `config` folder.

Make sure that your `config/config.js` variable `webRoot` matches the root folder of where the documentation will be hosted. For example: if you plan on hosting the documentation at `https://you.github.io/your-documentation`, the `webRoot` should be `/your-documentation/`.

If you would like to use a logo of a different aspect ratio than the example logo `144x40px` you might have to adjust the margins in `style/layout/_nav.scss`.
