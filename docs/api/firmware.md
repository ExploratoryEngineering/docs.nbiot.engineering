---
title: Firmware Over the Air (FOTA)
lunr: true
nav_sort: 80
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

## Firmware management

Firmware management in the API uses LwM2M towards the devices. Please consult the examples for devices to see how this can be implemented and what objects and resources that the LwM2M client must support.

## Management scope

Firmware can either be managed individually, each device gets its own firmware version or on a collection level where all the devices have the same version of the firmware. When developing and testing devices you will most likely test the firmware on individual devices. The management scope can be set to `device`, `collection` or `disabled` on the collection resource. If the scope is set to `disabled` the firmware versions on the devices are ignored for the whole collection.

```shell
$ curl -HX-API-Token:[token] -XPATCH -d'{"firmware":{"management": "device"}}' https://api.nbiot.engineering/collections/[collectionId]
{
  "collectionId": "collectionId",
  "firmware": {
    "management": "device"
  },
}
```

### The firmware image collection

The firmware management collection is in the resource `/collections/{collectionid}/firmware`. It will contain a list of firmware versions uploaded to the backend:

```shell
$ curl -HX-API-Token:[token] https://api.nbiot.engineering/collections/[collectionId]/firmware
{
  "images": [
    {
      "imageId": "17dh0cf43jfgnk",
      "version": "1.0",
      "filename": "zephyr.signed.bin",
      "sha256": "030130c604726ff35ba6c2d8f6bf70d7df1b21c628fa8cae5547603dd8b176d5",
      "length": 144564,
      "collectionId": "[collectionId]",
      "created": 1559653611268,
      "tags": {}
    }
  ]
}
```

Each image have the following properties:

| Name | Description
| ---- | -----------
| imageId | The firmware image ID. This is auto-assigned by the API
| version | The version string that the device will report when the firmware is installed. The version is a string that must be unique for all images in the collection. Firmware updates might not work correctly if the string does not match what the image reports via LwM2M.
| filename | Name of the original file uploaded to the API
| sha256 | SHA256 checksum of the file. This must be unique for all firmware images in the collection, ie. there can't be any duplicate images.
| length | The length of the image file
| collectionId | The collection that the firmware image is associated with
| created | Time and date the firmware image was uploaded to the API. Time is in milliseconds since epoch.
| tags | A tag structure for custom attributes on the firmware image

The `sha256` checksum can be used to verify that the image has been correctly uploaded to the API.

#### Uploading a new image

A new firmware image can be uploaded via any tool that supports file uploads via HTTP:

```shell
$ curl -HX-API-Token:[token] -F image=@build/zephyr/zephyr.signed.bin \
     https://api.nbiot.engineering/collections/[collectionId]/firmware

{
    "imageId": "17dh0cf43jfgnk",
    "version": "fc8902c5221bb0cb077f54fbefd53b5a4be970384a1496dbb2b8f99be733dd1d",
    "filename": "zephyr.signed.bin",
    "sha256": "030130c604726ff35ba6c2d8f6bf70d7df1b21c628fa8cae5547603dd8b176d5",
    "length": 144564,
    "collectionId": "[collectionId]",
    "created": 1559653611268,
    "tags": {}
}
```

Note that the SHA256 checksum must be unique among the firmware images. You can't upload two firmware images with the same checksum.

Note also that the version number is set automatically to a random character string when the firmware is uploaded. This must be set afterwards:

```shell
$ curl -XPATCH -d'{"version":"1.0"}'  -HX-API-Token:[token] https://api.nbiot.engineering/collections/[collectionId]/firmware/17dh0cf43jfh08
{
  "imageId": "17dh0cf43jfh08",
  "version": "1.0",
  "filename": "initial-version.signed.bin",
  "sha256": "fc8902c5221bb0cb077f54fbefd53b5a4be970384a1496dbb2b8f99be733dd1d",
  "length": 9250,
  "collectionId": "17dh0cf43jfhig",
  "created": 1576083823998,
  "tags": {}
}
```

As with most other resources the `tags` property can be used to set custom properties for the firmware, f.e. an internal version, git hash for the build or something similar.


#### Upgrading a device

The current reported version is reported as "currentFirmwareId" and the targeted version is set as "targetFirmwareId"". The update process starts when the device is reporting its configuration. This is something set by the firmware itself and can range from seconds, minutes or hours. Once the device reports the firmware version and the target version is different from the current version the update process will start. You can change the firmware to both a newer and older version of the firmware.

```shell
$ curl -XPATCH -d'{"firmware":{"targetFirmwareId": "[id of new version]" }}'  -HX-API-Token: [token] https://api.nbiot.engineering/collections/[collectionId]
{
  "collectionId": "[collectionId]",
  "firmware": {
    "targetFirmwareId": "[id of new version]",
    "currentFirmwareId": "[id of current version]",
    "management": "collection"
  },
  "tags": {}
}
```

If you are managing firmware per device you must use the `firmware` property of the device.

### Listing firmware version on devices

You can get a list of which devices uses (and will use) the firmware by looking at the `/collections/{collectionid}/firmware/{firmwareid}/usage` resource. It will list all devices that either have the `currentFirmwareId` or `targetFirmwareId` property assigned to that particular firmware image:

```shell
$ curl -HX-API-Token:[token] https://api.nbiot.engineering/collections/[collectionId]/firmware/17dh0cf43jfh08/usage
{
  "firmwareId": "17dh0cf43jfh08",
  "targetedDevices": [
    "17dh0cf4465ae6"
  ],
  "currentDevices": []
}
```

In the example above a single device have that firmware as the target version and are either in the process of upgrading or haven't checked in yet. The `currentDevices` lists the devices with that firmware image applied.
