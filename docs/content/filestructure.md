---
title: File Structure
description: Details on the documentation scaffold file structure.
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - file
  - structure
  - folders
---

## Folders

### build
The destination folder for the build process.

### config
Contains configuration files for the build process.

### docs
All actual documentation should be placed in the `docs` folder. All other folders contain files related to the build process. The file structure of the `docs` folder is preserved in the output folder (`build`).

### layouts
Contains handlebars layouts.

### lib
Contains node scripts for building the page.

### scripts
Contains the source javascript for the browser.

### style
Contains the stylesheet source.
