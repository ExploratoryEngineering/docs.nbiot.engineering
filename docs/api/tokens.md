---
title: Tokens
lunr: true
nav_sort: 7
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

The token resource is used to manage tokens. You can only access this resource whenever you are logged in through CONNECT ID, not via tokens.

## Token list: `/tokens`

The list of available tokens can be queried via GET requests. New tokens can be created by POSTing to the resource.

### List tokens

```bash
curl https://api.nbiot.engineering/tokens
{
  "tokens": [
    {
      "token": "<token string>",
      "resource": "/",
      "write": true,
      "tags": { }
      "owner": "<team id>"
    }
  ]
}
```

### Create token

```bash
curl -XPOST -d'{"resource": "/", "write": true, "tags": {"name": "admin token"}}' \
    https://api.nbiot.engineering/tokens
{
  "token": "<token string>",
  "resource": "/",
  "write": true,
  "tags": {
    "name": "admin token"
  }
  "owner": "<your default team id>"
}
```

## Token detail: `/tokens/{token}`

The token detail resource works similar to the token list but operates on a single token at a time. Use `DELETE` to remove the token, `PATCH` to update the token and `GET` to inspect it.

## Updating a token

When you update a token the API will respond with the updated token.

```bash
curl -XPATH -d'{"resource": "/foo"}' https://api.nbiot.engineering/tokens/{token}
{
  "token": "<token string>",
  "resource": "/foo",
  "write": true,
  "tags": { }
  "owner": "<team id>"
}
```