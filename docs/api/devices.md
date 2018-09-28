---
title: Devices
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

## Device data model

Devices are identified by the `deviceId` property.

The `imei` and `imsi` properties must be set to the [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) and [IMSI](https://en.wikipedia.org/wiki/International_mobile_subscriber_identity) matching your device. The IMEI is usually printed on the device while the IMSI can be found by querying the SIM card (or chip) on your device. The device won't operate correctly if the IMSI or IMEI is set to the wrong value. These fields are used to identify your device when it connects to the backend.

The [tags](tags.md) structure is optional.

```json
{
  "deviceId": "17dh0cf43jfgl8",
  "collectionId": "17dh0cf43jfgl8",
  "imei": "1234567890",
  "imsi": "1234567890",
  "tags": {
    "name": "The device",
  }
}
```

## Devices : `/collections/{collectionId}/devices`

### List of devices

You can retrieve a list of the devices in the collection by querying the `devices` resource:

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/devices
{
  "collectionId": "17dh0cf43jfglk",
  "devices": []
}
```

A list of devices is returned by the server. All collections are initially empty.

### Add a new device

Add a new device by `POST`ing to the `devices` resource. The [IMSI](https://en.wikipedia.org/wiki/International_mobile_subscriber_identity) and [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) fields are required. It is recommended to add a `name` attribute to the [tags](tags.md) of the device.

```bash
$ curl -HX-API-Token:${TOKEN} -XPOST -d'{"imsi": "123456789", "imei": "123456789", "tags":{"name":"My first device"}}' \
    https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/devices
{
  "deviceId": "17dh0cf43jfgl8",
  "collectionId": "17dh0cf43jfglk",
  "imei": "123456789",
  "imsi": "123456789",
  "tags": {
    "name": "My first device"
  }
}
```

The server will respond with the newly created device. You can't create two devices with the same IMSI or IMEI.

## Device details: `/collections/{collectionId}/devices/{deviceId}`

Details on a particular device can be seen by querying the device:

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/devices/17dh0cf43jfgl8
{
  "deviceId": "17dh0cf43jfgl8",
  "collectionId": "17dh0cf43jfglk",
  "imei": "123456789",
  "imsi": "123456789",
  "tags": {
    "name": "My first device"
  }
}
```

### Modify device

Devices can be modified with the `PATCH` method. The `imei`, `imsi` and `tags` fields can be updated:

```bash
$ curl -HX-API-Token:${TOKEN} -XPATCH -d'{"imei": "111222333444"}' \
    https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/devices/17dh0cf43jfgl8
{
  "deviceId": "17dh0cf43jfgl8",
  "collectionId": "17dh0cf43jfglk",
  "imei": "111222333444",
  "imsi": "123456789",
  "tags": {
    "name": "My first device"
  }
}
```

### Delete device

Devices can be removed with the `DELETE` method:

```bash
$ curl -HX-API-Token:${TOKEN} -XDELETE http://localhost:8080/collections/17dh0cf43jfglk/devices/17dh0cf43jfgl8
```

The server responds with a `204 NO CONTENT` when the device is deleted.

## Device data stream: `/collections/{collectionId}/devices/{deviceId}/from`

Like the WebSocket on the [collection](collection.md) you can monitor the data received from the device
on a WebSocket. The format is identical to the collection's WebSocket but you'll only
see data from a single device:

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

