---
title: Tokens
lunr: true
nav_sort: 70
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

The token resource is used to manage tokens. You can only access this resource
whenever you are logged in through CONNECT ID, not via another API token.

## Token structure

```json
{
  "resource": "/",
  "write": true,
  "token": "583b2503f03e5ca2d1032e3e906e55cbb178a6025019606d917660c027661e64",
  "tags": {
    "name": "value"
  }
}
```

Tokens have two fields -- `resource` and `write`. The `resource` field shows
what resource you have access through via the token. You have access to the
resource itself and all resources under it; if the resource is `/teams` you
will have access to *all* teams but if it is `/teams/17dh0cf43jfgl8` you
will only be able to access that particular team via the API token.

The `write` flag is simply a read/write flag. If the flag is set to `true` the
token will grant read and write access to all resources covered by the `resource`
field. If the `write` flag is set to `false` the token will only grand read-only
access.

The `tags` element contains [user-defined attributes](tags.md). If there's no tags set on the
token the element will be omitted.


## Token list: `/tokens`

The list of available tokens can be queried via GET requests. New tokens can be created by POSTing to the resource.

### List tokens

```bash
$ curl https://api.nbiot.telenor.io/tokens
{
  "tokens": [
    {
      "resource": "/",
      "write": true,
      "token": "583b2503f03e5ca2d1032e3e906e55cbb178a6025019606d917660c027661e64"
    }
  ]
}
```

### Create token

`POST` to the `/tokens` resource to create a new token. The fields `resource` and `write` are required.

```bash
$ curl -XPOST -d'{"resource":"/teams", "write": false, "tags":{"name": "the read-only team token"}}' \
    https:/api.nbiot.telenor.io/tokens
{
  "resource": "/teams",
  "write": false,
  "token": "7c7a20322b726931bbdee283f41286adc25ce38bd5b0ab0dbf1517cbcd58d70d",
  "tags": {
    "name": "the read-only team token"
  }
}
```

## Token detail: `/tokens/{token}`

The token detail resource works similar to the token list but operates on a single token at a time.

### Updating a token

Use `PATCH` to update the token:

```bash
$ curl -XPATCH -d'{"tags":{"new":"attribute"}}' \
  https://api.nbiot.telenor.io/tokens/7c7a20322b726931bbdee283f41286adc25ce38bd5b0ab0dbf1517cbcd58d70d
{
  "resource": "/teams",
  "write": false,
  "token": "7c7a20322b726931bbdee283f41286adc25ce38bd5b0ab0dbf1517cbcd58d70d",
  "tags": {
    "name": "the read-only team token",
    "new": "attribute"
  }
}
```
The server responds with the updated token.

### Removing a token

Use `DELETE` to remove a token:

```bash
$ curl -XDELETE \
  https://api.nbiot.telenor.io/tokens/7c7a20322b726931bbdee283f41286adc25ce38bd5b0ab0dbf1517cbcd58d70d
```

The server responds with `204 NO CONTENT` when the token is removed.
