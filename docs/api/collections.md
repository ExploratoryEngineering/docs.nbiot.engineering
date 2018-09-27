---
title: Collections
lunr: true
nav_sort: 1
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

## List of collections: /collections

The list of collections contains a list of all collections you have access to,
both read-only and read-write (ie you can administer). New collections can
be created by POSTing to this resource.

### Sample request
```shell
curl https://api.nbiot.engineering/collections
{
  "collections": [
    { "collectionId": "<id>", "owner": "<team id>", "tags": {} },
    //... more collections
    { "collectionId": "<id>", "owner": "<team id>", "tags": {} }
  ]
}
```

## Collection detail: /collections/{collectionId}
Details for each collection is available at the detail resource. This resource
accepts GET, PATCH and DELETE verbs.

### Sample request
```shell
curl https://api.nbiot.engineering/collections/{collectionid}
{
  "collectionId": "<collectionid>",
  "tags": { },
  "devices": [ <list of devices> ],
  "owner": "<team id>"
}
```

Note that the list of devices might be truncated if there's a lot of devices
in the collection.

Updating the collection with a new owner requires a PATCH verb:

```shell
curl -XPATCH -d'{"owner": "<new team owner>"}' https://api.nbiot.engineering/collections/{id}
{ <updated collection as response> }
```

## Device list: /collections/{collectionId}/devices
The list of devices can be found in the devices resource:

```shell
curl https://api.nbiot.engineering/collections/{id}/devices
{
  "devices": [
    { "deviceId": "<id>", "imsi": "<imsi>", "imei": "<imei>", "tags":{}},
    // ... more devices
  ]
}
```

## Device detail: /collections/{collectionId}/devices/{deviceId}

You can access a single device by GETting the device resource. The device
can be removed by using the DELETE verb and transferred to another collection
using the PATCH verb.

### Reading a device
```shell
curl https://api.nbiot.engineering/collections/{collectionid}/devices/{deviceid}
{
  "deviceId": "<id>",
  "imsi": "<imsi>",
  "imei": "<imei>",
  "tags":{}
}
```
### Removing a device
```shell
curl -XDELETE https://api.nbiot.engineering/collections/{collectionid}/devices/{deviceid}
Transfer or update device
curl -XPATCH -d'{"collectionId": "<new collection>"}' https://api.nbiot.engineering/collections/{collectionid}/devices/{deviceId}
{
  "deviceId": "<id>",
  "imsi": "<imsi>",
  "imei": "<imei>",
  "tags":{},
  "collectionId": "<updated collection>"
}
```

## Data from devices in a collection: /collections/{collectionId}/from
This resource works identical to the device `from` resource but includes data
rom all devices in the collection.

