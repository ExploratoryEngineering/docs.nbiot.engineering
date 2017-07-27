---
title: Navigation
nav_sort: 2
nav_groups:
  - primary
---
The navigation is powered by [metalsmith-navigation](https://github.com/unstoppablecarl/metalsmith-navigation).

## Adding pages to the navigation
The `nav_groups` metadata of a file decides if/where it shoud appear in the navigation.

There are three available values: `primary`, `secondary`, `tertiary`. The primary nav appears at the top, the secondary in the middle, and the tertiary last.

The elements are nested according to where they appear in the file structure. To add children to a page, simply create a folder with the same name as the file, and place its child pages inside.

## Ordering pages in the navigation

Pages are ordered alphabetically, to override this: add a `nav_sort` metadata to the files.

## Special entries

To make a file appear as a **bold** group, simply give it the metadata `nav_group: true`.

To make a file appear only as a category (unclickable), you should give it the metadata `nav_category: true`.
