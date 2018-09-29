---
title: REST API
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - api
  - rest
  - http
---

The REST API is hosted at https://api.nbiot.telenor.io/.

## Introduction
The NB-IoT devices are - not surprisingly - called **devices**. Devices are
grouped into **collections**. A collection may contain zero or more devices.
Collections and devices are owned by **teams**. A team consists of one or more
**members**. As a user you are always part of a team, including your own private
one-person team. Data received by the backend are forwarded to external systems
via **outputs**.

To access the API you can use **API tokens**. Tokens are personal and can
be set up to access all or parts of the collections, devices and outputs

If you are the administrator of a team you will have administrative access to
all of the devices, collections, tokens and outputs owned by that team. If you
are a regular member of a team you will have read only access to devices,
collections, read-only tokens and outputs owned by that team.

## Get started with the API
API Token
The first thing you must do in order to access the REST API is create an API
token. Log in to https://nbiot.engineering/, then click the **API Tokens** link
in the navigation bar.  From this page you can create, update, and delete API tokens.

To create an API token, you must specify what the token gives access to and
what level of access it gives.  As a general rule, you should always give the
least access necessary for the task at hand.

After setting the appropriate access settings, click the Create button. Your
newly created token will then be listed along with any others that you created
before.

An API token must be provided in the `X-API-Token` header with every request. The examples
assumes an environment variable named `TOKEN` with the actual value.

You can f.e. use `cURL` or `wget` to query the API. All of the examples assumes an
environment variable with the token. If you prefer a local app the [Postman app](https://www.getpostman.com/) is an alternative.

```shell
$ export TOKEN=<your API token>
curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections
{
  "collections": [
    {
      "collectionId": "<id>",
      "teamId": "<id>",
      "tags": {
        "name": "My default collection"
      }
    },
    [..]
}
```

## General guidelines

### Authentication
Clients to the API are authenticated via tokens (or, in a browser, via CONNECT
ID). Tokens must be supplied via the X-API-Token header for each request.

### Content-Type
The API will only accept and reply with `application/json` data. POST and
PATCH verbs expect the body of the request to be `application/json` and not
`www-form-urlencoded` (which might be the default for clients using POST).

### Clients
There are several client libraries available in different languages. If you
want to save time typing you can check them out on our GitHub page.

### Frequently used data types
Identifiers (such as `teamId`, `collectionId`, `userId`, `outputId` and
`deviceId`) will be strings. `IMSI` and `IMEI` values will be specified as
strings even if they are numerical (some languages struggle with 64-bit
integers in JSON).

### Tags
Tags are user-selectable attributes for devices, collections, users, tokens,
teams and outputs. The tags are represented as an JSON object in the return
data. Field names and values are any valid combination of characters that make
up valid JSON strings. The strings must be escaped by the client. Invalid
strings will be rejected.

Tags can not contain empty values. Empty tags will be removed.

Tag names will be lowercased; "nAme", "name", "NAME" and "Name" will be
treated as the same tag.

### Hot tip
Clients are responsible for treating the output from the service appropriately,
ie running `eval()` on the output is a VERY VERY bad idea. Someone somewhere is
contemplating the possibility of putting JavaScript in the tags and if you
don't treat the output with care you just might fail on that security review
if your are lucky. Escape the output at all times and you will be fine.
