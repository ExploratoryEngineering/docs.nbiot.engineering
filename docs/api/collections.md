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

Fields with potentially sensitive data can be masked (i.e. removed) from the API responses.
These fields can be toggled on and off individually and the fields won't show up
outside of the API or in the data outputs from the collections.  A value of `true` for a
field mask indicates that the field will _not_ appear in API responses.

Even if IMSI or IMEI are masked, the fields are still required when creating a
new device.

A field mask for a collection applies to all devices in that collection.

There is a fixed field mask configuration for the entire system, which can be retrieved by querying the `/system` url:

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

The `defaultFieldMask` shows the default mask applied to new collections when `fieldMask` is not specified when creating a new collection.

The `forcedFieldMask` shows the system's field mask settings.  A value of `true` in `forcedFieldMask` means the field will never appear in API responses, even if the `fieldMask` for a collection has `false` for that field.

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
  "received":1538163685141,
  "type": "data",
  "transport": "<transport used by the device to deliver the data>",
  "coapMetaData": {
    "method": "POST",
    "path": "<path used by device">
  },
  "udpMetaData": {
    "localPort": "<the backend's local port>",
    "remotePort": "<the port used on the device>"
  }
}
```

The `transport` field is set to one of the supported transports for upstream
messages -- currently this is `udp` and `coap-push`. The `coapMetaData` struct
is only included if the `transport` field is set to `coap-push` and the
`udpMetaData` struct is only included if the `transport` field is set to `udp`.

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

If you want to send data **to** the devices `POST` to this resource.
There are three kinds of transports that can be selected via the `transport` field:

1) `udp` which will send a regular udp packet to the device on the specified
   port immediately. The `port` field is required and the device must be listening
   on the port to receive the message.
2) `coap-pull` which will queue the message and send it as a response to a
   CoAP `GET` request from the device. The device is responsible for polling the
   backend.
3) `coap-push` which will send the message to the device immediately as a CoAP
   `POST` to the path specified in the `path` parameter. The device must be
   running a CoAP server for this to work.

The `payload` field is required for all types. If the `transport` field is
blank it will use the `udp` transport by default.

```json
{
  "transport": "<udp, coap-push, coap-pull>",
  "port": <port number, required for udp, optional for coap-push, ignored for coap-pull>,
  "payload": "<base 64 encoded bytes>",
  "path": "<path for coap-pull transport>"
}
```

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
