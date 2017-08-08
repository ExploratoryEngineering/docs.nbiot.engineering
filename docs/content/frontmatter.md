---
title: Front Matter
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

If you see mentions of metadata other places in this documentation, it is ususlly synonymous with front matter ie. yaml that precede the actual content in a file.

## Common tags
| name| type | required | default | details |
|---|---|-----|---|---|
| title | string | yes | `null` | Every page must have a title that appears on top of the page and in the navigation (if the page is listed there) |
| index | bool | no | `false` | The home/index page must be tagged with `index: true` |

## Plugin tags
| name| type | required | default | details |
|---|---|-----|---|---|
| layout | string | no | `null` | If present, the page layout will use the specified layout instead of the default. For more info see [the layout documentation](../features/layout.html) |
| nav_groups | string[] | no | `null` | A list of navigations the page should appear in. For more info see [the navigation documentation](../features/navigation.html) |
| nav_sort | int | no | `null` | Specifies the order the element should be ordered in the navigation. Overrides the default alphabetical order |
| nav_group | bool | no | `false` | Specifies that the file should appear as an emphasized group in the navigation |
| nav_category | bool | no | `false` | Specifies that the file should appear only as an category in the navigation (cannot be clicked itself) |
| openApiUrl | string | no | `null` | An url pointing to a Open API spec |
| lunr | bool | no | `false` | Toogles if the page should show up in search results. For more info see the [search documentation](../features/search.html) |
| tags | string or string[] | no | `null` | Tags that the page should show up as a search result for. Tags have twice the weight of the title, and 10 times the weight of page content in the ordering of results. If an array of strings is used, matching will be less forgiving |

## Example
In the following example the metadata tag `title` is set to `Example page`, and the page content is `This is the example page`.
```
---
title: Example page
---
This is the example page
```
