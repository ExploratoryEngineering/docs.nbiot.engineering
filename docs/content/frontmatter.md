---
title: Front Matter
description: Details on how metalsmith and the documentation scaffold handles metadata.
lunr: true
nav_sort: 2
nav_groups:
  - primary
tags:
  - front
  - matter
  - metadata
---
Front matter allows you to attach metadata to files by prepending a yaml document to it. Metalsmith parses this yaml document and passes it along to the plugins that transform the content into beautiful documentation.

If you see mentions of metadata other places in this documentation, it is usually synonymous with front matter ie. yaml that precede the actual content in a file.

## Common tags
| name| type | required | default | details |
|---|---|-----|---|---|
| title | string | yes | `null` | Every page must have a title that appears on top of the page and in the navigation (if the page is listed there) |
| description | string | no | `null` | (**Strongly recommended**) A concise summary of the page. Will appear in search results. No longer than 155 characters |
| thumbnail | string | no | `config.thumbnail` | Open Graph thumbnail image for the page, if not set it will default to the image set in `config/config.js`. Minimum 250x250px  |
| resolveLinks | bool | no | `true` | Toggles if links to source files in this file should be resolved (ie. translated to processed files). From this file `../index.md` would become `/web-root/index.html` |
| index | bool | no | `false` | The home/index page must be tagged with `index: true` |

## Plugin tags
### Layout
| name| type | required | default | details |
|---|---|-----|---|---|
| layout | string | no | `../layouts/default.hbs` | The page will use the specified layout instead of the default. For more info see [the layout documentation](../features/layout.md) |

### Navigation
| name| type | required | default | details |
|---|---|-----|---|---|
| nav_groups | string[] | no | `null` | A list of navigations the page should appear in. For more info see [the navigation documentation](../features/navigation.md) |
| nav_sort | int | no | `null` | Specifies the order the element should be ordered in the navigation. Overrides the default alphabetical order |
| nav_group | bool | no | `false` | Specifies that the file should appear as an emphasized group in the navigation |
| nav_category | bool | no | `false` | Specifies that the file should appear only as an category in the navigation (cannot be clicked itself) |

### Search
| name| type | required | default | details |
|---|---|-----|---|---|
| lunr | bool | no | `false` | Toggles if the page should show up in search results. For more info see the [search documentation](../features/search.md) |
| tags | string or string[] | no | `null` | Tags that the page should show up as a search result for. Tags have twice the weight of the title, and 10 times the weight of page content in the ordering of results. If an array of strings is used, matching will be less forgiving |

### Swagger UI
| name| type | required | default | details |
|---|---|-----|---|---|
| openApiUrl | string | no | `null` | An url pointing to a Open API spec |

### Sitemap
| name| type | required | default | details |
|---|---|-----|---|---|
| changefreq | string | no | `weekly` | How frequently the page is likely to change |
| lastmod | string | no | `null` | The date of the last modification of the file |
| priority | decimal | no | `0.5` | The priority of this page relative to other pages |
| private | bool | no | `false` | Private pages will be omitted from the sitemap |


See [https://www.sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html) for valid values.

## Example
In the following example the metadata tag `title` is set to `Example page`, and the page content is `This is the example page`.
```
---
title: Example page
---
This is the example page
```
