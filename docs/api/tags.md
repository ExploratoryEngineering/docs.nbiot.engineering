---
title: Tags on resources
lunr: true
nav_sort: 60
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

## Introduction

**Tags** are user-defined attributes for [collections](devices.md), [teams](teams.md), [devices](devices.md), [outputs](outputs.md) and [tokens](tokens.md). All tags are strings and must be unique for each item, ie you can't have two attributes called "name". The examples uses `/teams/{teamId}/tags` but the same methods applies to tags on

* Collections at `/collections/{collectionId}/devices/{deviceId}/tags`
* Teams found at `/teams/{teamId}/tags`
* Outputs at `/collections/{collectionId}/outputs/{outputId}/tags`
* Tokens at `/tokens/{token}/tags`

## List tags: `.../tags`

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/teams/17dh0cf43jfgl8/tags
{
  "name": "My private team"
}
```

The server responds with all of the defined tags for that resource.

### Add a new tag
The tags are modified with the `PATCH` method:

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"new":"value"}' https://api.nbiot.telenor.io/teams/17dh0cf43jfgl8/tags
{
  "name": "My private team",
  "new": "value"
}
```

The server responds with the new list of defined tags.

### Retrieve a single tag
You can retrieve a single tag by querying the tag name:

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/teams/17dh0cf43jfgl8/tags/name
{
  "value": "My private team"
}
```

The server will respond with a JSON struct with a field named `value` that contains the tag value.

### Update tag

Tags are updated in the same fashion as creating a new attribute:

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"new": "updated value"}' \
    https://api.nbiot.telenor.io/teams/17dh0cf43jfgl8/tags
{
  "name": "My private team",
  "new": "updated value"
}
```

You can also `PATCH` the resource directly and update the tag there.

### Remove tag

Rather than using `DELETE` the tags can removed by setting the value to a blank string.
Multiple tags can be removed at once:

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"new": ""}' \
    https://api.nbiot.telenor.io/teams/17dh0cf43jfgl8/tags
{
  "name": "My private team"
}
```
