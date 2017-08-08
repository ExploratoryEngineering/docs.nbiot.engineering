---
title: Deploying
lunr: true
nav_sort: 4
nav_groups:
  - primary
tags:
  - deploy
  - travis
---
After building, the `build` folder contains standalone, static html files that can be published to any web server.

## Automatic deployment using travis-ci

The scaffold includes a `.travis.yml` configuration that automatically builds the master branch on change and publishes the `build` folder to the `gh-pages` branch. To use it set up the repository on [travis-ci](https://travis-ci.org/) and add an environment variable named `GITHUB_TOKEN` that has push access to the repository.
