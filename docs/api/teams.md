---
title: Teams
lunr: true
nav_sort: 40
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

Teams are the main sharing mechanism. Each team have one or more *members*.
**Collections** are owned by **teams** and all members of the team can retrieve
the **devices** and **outputs** in the collection.

Team management have some simple rules:

Admins are the only ones allowed to manage teams. As an admin you can't
administer you **own** membership in the team. If you want to be removed
from the team you have to assign another administrator and get him/her to
remove you from the team.

When you create a new team you are automatically set as an admin for that team

By default you will have a private team that only you can use. You can't invite
people into your own team.

## Team list: `/teams`

The team list resource shows all teams you are a member of. You might not have
administrative access to all of the teams in the list.

### List teams

Use `GET` to retrieve a list of teams you have access to:

```bash
$ curl -HX-API-Token:${TOKEN} http://localhost:8080/teams
{
  "teams": [
    {
      "teamId": "17dh0cf43jfgl8",
      "tags": {
        "name": "My private team"
      },
      "private": true
    }
  ]
}
```

The `private` flag is set to true on your private team. The attribute is absent on all other teams.

### Create a new team

Use `POST` to create a new team. There are no required fields when creating a
new team but it is recommended to set the `name` attribute. The `name` attribute
is used throughout the console to show a readable name. Multiple teams can have
the same name.

```bash
$ curl -HX-API-Token:${TOKEN} -XPOST -d'{"tags":{"name": "The A-Team"}}' \
    https://api.nbiot.telenor.io/teams
{
  "teamId": "17dh0cf43jfgl9",
  "members": [
    {
      "userId": "17dh0cf43jfgl8",
      "role": "Admin",
      "name": "Mr Robot",
      "email": "doe1@example.com",
      "phone": "555-999-88",
      "verifiedEmail": true,
      "verifiedPhone": true,
      "connectId": "1"
    }
  ],
  "tags": {
    "name": "The A-Team"
  }
}
```

### Team detail: `/teams/{teamId}`

You can retrieve the team details by querying the team directly. This will include a list of the team members:

```bash
$ curl -HX-API-Token:${TOKEN} https:/api.nbiot.telenor.io/teams/17dh0cf43jfgl9
{
  "teamId": "17dh0cf43jfgl9",
  "members": [
    {
      "userId": "17dh0cf43jfgl8",
      "role": "Admin",
      "name": "Mr Robot",
      "email": "doe1@example.com",
      "phone": "555-999-88",
      "verifiedEmail": true,
      "verifiedPhone": true,
      "connectId": "1"
    }
  ],
  "tags": {
    "name": "The A-Team"
  }
}
```

### Update a team

A team can be updated by using the `PATCH` method:

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"tags": {"preferredVehicle":"Van"}}' \
    https://api.nbiot.telenor.io/teams/17dh0cf43jfgl9
{
  "teamId": "17dh0cf43jfgl9",
  "members": [
    {
      "userId": "17dh0cf43jfgl8",
      "role": "Admin",
      "name": "Mr Robot",
      "email": "doe1@example.com",
      "phone": "555-999-88",
      "verifiedEmail": true,
      "verifiedPhone": true,
      "connectId": "1"
    }
  ],
  "tags": {
    "name": "The A-Team",
    "preferredvehicle": "Van"
  }
}
```

### Delete a team

You can remove a team with the `DELETE` method:

```bash
$ curl -HX-API-Token:${TOKEN} -XDELETE https://api.telenor.io/teams/17dh0cf43jfgl9
```

The server responds with `204 NO CONTENT' when the team is removed.

## Managing members in a team: `/team/{teamId}/members

### Retrieving team members

The list of members is available in the `members` resource:

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/teams/17dh0cf43jfgl9/members
{
  "teamId": "17dh0cf43jfgl9",
  "members": [
    {
      "userId": "17dh0cf43jfgl8",
      "role": "Admin",
      "name": "Mr Robot",
      "email": "doe1@example.com",
      "phone": "555-999-88",
      "verifiedEmail": true,
      "verifiedPhone": true,
      "connectId": "1"
    },
    {
      "userId": "17dh0cf43jfgl9",
      "role": "Member",
      "name": "Mr Robot",
      "email": "doe2@example.com",
      "phone": "555-999-88",
      "verifiedEmail": true,
      "verifiedPhone": true,
      "connectId": "2"
    }
  ],
  "tags": {
    "name": "The B-Team"
  }
}
```

Individual team members can be accessed via the `/team/{teamId}/members/{userId} resource.

### Adding a team member

Team members can't be added directly but must accept an [invite](invites.md) to the team.

### Update a team member

Use `PATCH` to update a team member. The only field that can be modified is the `role` field. Only two
values are accepted -- `admin` and `member`. Only team administrators can update the role of the
other team members.

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"role":"admin"}' \
    https://api.nbiot.telenor.io/teams/17dh0cf43jfgl9/members/17dh0cf43jfgl9
{
  "userId": "17dh0cf43jfgl9",
  "role": "Admin",
  "name": "Mr Robot",
  "email": "doe2@example.com",
  "phone": "555-999-88",
  "verifiedEmail": true,
  "verifiedPhone": true,
  "connectId": "2"
}
```

The server responds with a `200 OK` and the updated team member.

### Remove a team member

Team members can be removed with the `DELETE` method:

```bash
$ curl -HX-API-Token:${TOKEN} -XDELETE \
  http://api.nbiot.telenor.io/teams/17dh0cf43jfgl9/members/17dh0cf43jfgl9
```

The server responds with a `204 NO CONTENT` when the member is deleted.
