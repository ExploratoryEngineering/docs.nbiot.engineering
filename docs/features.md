---
title: Features
description: Details on how to add and remove features from the documentation scaffold.
lunr: true
nav_sort: 2
nav_groups:
  - primary
nav_group: true
tags:
  - features
---
The docs-scaffold comes with a limited number of features, but they can easily be expanded upon by modifying the [Metalsmith](http://www.metalsmith.io/) build pipe.

## Adding a feature

The easiest way of adding a feature is probably to add a metalsmith plugin. To do this, simply install it as a dependency and add it to the build pipeline in `lib/build-docs.js`. Note that the order of the plugins do matter.

## Removing a feature

Most of the features of the docs scaffold can be removed by removing or modifying the corresponding metalsmith plugin.
