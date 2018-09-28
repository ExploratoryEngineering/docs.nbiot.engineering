---
title: Team invites
lunr: true
nav_sort: 5
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

Invites are used to share **collections** of **devices** and the corresponding **outputs** with
other users. Invites are represented with a **code** that can be shared via email, SMS, QR-codes
or [avian carriers](https://tools.ietf.org/html/rfc1149) - in other words the medium of your choice.

## Generating invite for team

An invite can be created by `POST`ing to the `invites` resource under the team.

```bash
$ curl -HX-API-Token:${TOKEN} -XPOST -d'{}' https://api.nbiot.telenor.io/teams/17dh0cf43jfgl9/invites
{
  "code": "a78b8acade999fc065a24e6cfb371e69",
  "createdAt": 1538172714158
}
```

The `code` field contains the required invite code. The invite codes can be used only once; each new member
will need their own invite.

## Listing invites

Invites can be listed by querying the `/team/{teamId}/invites` resource with a `GET``
request:

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/teams/17dh0cf43jfgl9/invites
{
  "invites": [
    {
      "code": "2d1b5031a8a44557035561fefcaa2dd1",
      "createdAt": 1538173822713
    },
    {
      "code": "f930a0c027b8c1002fea9643ef0798bd",
      "createdAt": 1538173823674
    },
    {
      "code": "b0c054ccd26e3277432fe4e628987693",
      "createdAt": 1538173824304
    }
  ]
}
```
You will only see invites that you have created yourself. Only team administrators can generate invites.

## Accepting invite for team

As the recipient of an invite you accept the invite by sending a `POST` request to the `/teams/accept` resource:

```bash
$ curl -HX-API-Token:${TOKEN} -XPOST -d'{"code":"f930a0c027b8c1002fea9643ef0798bd"}' \
  https://api.nbiot.telenor.io/teams/accept
{
  "teamId": "17dh0cf43jfgl9",
  "tags": {
    "name": "The B-Team"
  }
}
```

When the invite has been processed the server responds with the team you've joined. The team will now be visible
when you query the `/teams` resource. Your initial membership role will be as a **member** of the team.

```bash
$ curl  -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/teams
{
  "teams": [
    {
      "teamId": "17dh0cf43jfgl9",
      "tags": {
        "name": "The B-Team"
      }
    },
    {
      "teamId": "17dh0cf43jfglc",
      "tags": {
        "name": "My private team"
      }
    }
  ]
}
```
