---
title: Teams
lunr: true
nav_sort: 5
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

The team resources are used to manage teams.

## Team list: `/teams`

The team list resource shows all teams you are a member of.  You might not have administrative access to all of the teams in the list.

Team management have some simple rules:

Admins are the only ones allowed to manage teams. As an admin you can't administer you **own** membership in the team. If you want to be removed from the team you have to assign another administrator and get him/her to remove you from the team.

When you create a new team you are automatically set as an admin for that team

By default you will have a private team that only you can use. You can't invite
people into your own team.

### Query for a list of teams

```bash
curl https://api.nbiot.telenor.io
{
  "teams": [
    {
      "teamId": "17dh0cf43jfgl8",
      "tags": {
        "name": "My private team"
      }
    }
  ]
}
```

### Team details: `/teams/{teamId}`

```bash
curl https://api.nbiot.telenor.no/teams/17dh0cf43jfgl9
{
  "teamId": "17dh0cf43jfgl8",
  "members": [
    {
      "userId": "17dh0cf43jfgl8",
      "role": "Admin",
      "name": "Mr Robot",
      "email": "doe@example.com",
      "phone": "555-999-88",
      "verifiedEmail": true,
      "verifiedPhone": true,
      "connectId": "999"
    }
  ],
  "tags": {
    "name": "My private team"
  }
}
```

### Create a new team

```bash
curl -XPOST -d'{"tags":{"name": "This is the new team"}}' https://api.nbiot.telenor.io/teams
{
  "teamId": "17dh0cf43jfgl9",
  "members": [
    {
      "userId": "17dh0cf43jfgl8",
      "role": "Admin",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "555-479999",
      "verifiedEmail": false,
      "verifiedPhone": false,
      "connectId": "1234567890123456789"
    }
  ],
  "tags": {
    "name": "This is a new team"
  }
}
```

### Update team

`PATCH` updates the team:

```bash
curl -XPATCH -d'{"tags":{"something":"other"}}' https://api.nbiot.telenor.no/teams/17dh0cf43jfgl9
{
  "teamId": "17dh0cf43jfgl8",
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
    "name": "My private team",
    "something": "other"
  }
}
```

### Delete team

`DELETE` removes the team. There is no response and the status is `204 NO CONTENT`:

```bash
curl -XDELETE https://api.nbiot.telenor.no/teams/17dh0cf43jfgl9
```


## Adding members to a team

You can't add members to a team directly but you can invite other users by sending
an **invite**. Invites can be accepted by anyone and the one accepting the invite will be set as a regular member of the team. Only admins can generate invites and you can only see and administer invites you have created.



