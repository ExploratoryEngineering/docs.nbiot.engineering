---
title: Errors
lunr: true
nav_sort: 100
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---


## Errors
Errors (4xx and 5xx status codes returns a JSON struct). The JSON struct looks like this:

```code:json
{
    "status":400,
    "message":"Missing collection ID"
}
```
In some instances there will be a field named `additionalInfo` that includes additional details. The
`status` field has the same value as the response code.
