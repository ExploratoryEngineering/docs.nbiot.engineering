---
title: Collections
lunr: true
nav_sort: 1
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

Collections makes it easier to manage large and small sets of devices and to
group devices into logical groups. By default you'll have a single collection
where all devices you create will be put into. A device can't be a member of
more than one collection at a time.

Devices can be shared between team members by having a shared collection owned
by the team.

## List of collections: `/collections`

The list of collections contains a list of all collections you have access to,
both read-only and read-write (ie you can administer). New collections can
be created by POSTing to this resource.

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections
{
  "collections": [
    {
      "collectionId": "17dh0cf43jfgl8",
      "teamId": "17dh0cf43jfgl8",
      "tags": {
        "name": "My default collection"
      }
    }
  ]
}
```

### Creating a new collection

Send a `POST` request to the `/collections` resource to create a new collection. There is
no required fields so an empty JSON object is sufficient. It is recommended to use the [tags](tags.md)
resource and add an attribute named `name` to identify the collection. The console will use this attribute
when displaying the list of collections.

```bash
$ curl -HX-API-Token:${TOKEN} -XPOST -d'{"tags":{"name": "My first collection"}}' \
    https://api.nbiot.telenor.io/collections
{
  "collectionId": "17dh0cf43jfgli",
  "teamId": "17dh0cf43jfgl8",
  "tags": {
    "name": "My first collection"
  }
}
```

## Collection detail: `/collections/{collectionId}`
Details for each collection is available at the detail resource:

```bash
curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections/17dh0cf43jfgli
{
  "collectionId": "17dh0cf43jfgli",
  "teamId": "17dh0cf43jfgl8",
  "tags": {
    "name": "My first collection"
  }
}
```

### Updating a collection

Use `PATCH` to update the collection. You must be the administrator of the team owning the
collection *and* and administrator of the team you assign the collection to if you change the ownership
of an collection.

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"teamId": "17dh0cf43jfgl9"}' \
    https://api.nbiot.telenor.io/collections/17dh0cf43jfgli
{
  "collectionId": "17dh0cf43jfgli",
  "teamId": "17dh0cf43jfgl9",
  "tags": {
    "name": "My first collection"
  }
}
```

The server responds with the updated collectino when successful.

### Removing a collection

Use `DELETE` to remove a collection. The collection can't contain any devices or outputs when it is deleted.

```bash
$ curl -HX-API-Token:${TOKEN} -XDELETE https://api.nbiot.telenor.io/collections/17dh0cf43jfgli
```

The server responds with a `204 NO CONTENT` when a collection is removed.
