---
title: Collections
lunr: true
nav_sort: 10
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
      },
      "fieldMask": {
        "imsi": false,
        "imei": false,
        "location": true,
        "msisdn": false
      }
    }
  ]
}
```

### Field masks

Fields with potentially sensitive data can be masked from the API responses.
These fields can be toggled on and off individually and the fields won't show up
outside of the API or in the data outputs from the collections.

Even if IMSI and IMEI is masked the fields are still required when creating a
new device.

Field masks applies to all devices in the collection.

The field mask is configured for the entire system. The field mask configuration
can be retrieved by querying the `/system` url:

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/system
{
  "defaultFieldMask": {
    "imsi": false,
    "imei": false,
    "location": true,
    "msisdn": false
  },
  "forcedFieldMask": {
    "imsi": false,
    "imei": false,
    "location": false,
    "msisdn": false
  }
}
```

The `defaultFieldMask` mask parameters shows the default field mask for new collections and the `forcedFieldMask` shows the system's field mask settings.
The values in the `forcedFieldMask` setting can't be modified.

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
  },
  "fieldMask": {
    "imsi": false,
    "imei": false,
    "location": true,
    "msisdn": false
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
  },
  "fieldMask": {
    "imsi": false,
    "imei": false,
    "location": true,
    "msisdn": false
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
  },
  "fieldMask": {
    "imsi": false,
    "imei": false,
    "location": true,
    "msisdn": false
  }
}
```

The server responds with the updated collection when successful.

### Removing a collection

Use `DELETE` to remove a collection. The collection can't contain any devices or outputs when it is deleted.

```bash
$ curl -HX-API-Token:${TOKEN} -XDELETE https://api.nbiot.telenor.io/collections/17dh0cf43jfgli
```

The server responds with a `204 NO CONTENT` when a collection is removed.

## Collection data stream: `/collections/{collectionId}/from`

The server provides a WebSocket to monitor the output (ie the *upstream* data)
of the devices. All data transmitted by the devices will be forwarded to the
WebSocket.

The data sent by the devices are included in the field `payload` and is [base64-encoded](https://en.wikipedia.org/wiki/Base64).

```json
{
  "device": {
    "deviceId":"17dh0cf43jfgl8",
    "collectionId":"17dh0cf43jfgli",
    "imei":"111222333444",
    "imsi":"123456789",
    "tags":{
      "name":"My first device"
    }
  },
  "payload":"WXVwIHRoaXMgaXMgdGhlIHBheWxvYWQ=",
  "received":1538163685141
}
```

At regular intervals the server will send a keepAlive message on the WebSocket:

```json
{
  "keepAlive": true
}
```

The keep-alive message will only be sent if there has been no data for 30s.

### API key as query parameter

Most WebSocket libraries doesn't support headers in requests; the API token can
be supplied through the `api_token` parameter. The API token *must* be readonly.

## Downstream data: `/collections/{collectionId}/to`

If you want to send data **to** the devices `POST` to this resource. Both the
port number and the payload fields are required.

```json
{
  "port": <port number>,
  "payload": "<base 64 encoded bytes>"
}
```

Note that the devices *must* be listening on the specified port to receive
the message.

### Response

The response contains an array of error messages. The array might be empty. The
`sent` and `failed` fields shows how many messages have been sent and how many
messages failed to send.

```json
{
  "errors": [
    {
      "deviceId": "<the device ID>",
      "message": "<error message>"
    }
  ],
  "sent": <number of messages sent>,
  "failed": <number of failed messages>
}
```
