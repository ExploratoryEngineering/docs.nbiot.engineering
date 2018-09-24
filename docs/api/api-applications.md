---
title: Applications
lunr: true
nav_groups:
  - primary
tags:
  - application
---


## `/applications` 
The `/applications` resource manages your applications. If you `GET` the resource 
it will list all of your applications. Applications can also be managed by the
[management UI](https://lora.engineering/).

```bash
$ curl -HX-API-Token:<your token> https://api.lora.telenor.io/applications
{
    "applications": [
        {
            "name": "Another app",
            "applicationEUI": "00-09-09-00-00-00-00-01",
            "appKey": "84fed8c5c289c7936464fa89c2686416",
            "tags": {}
        },
        {
            "name": "An app",
            "applicationEUI": "00-09-09-00-00-00-00-02",
            "appKey": "8ae00c2229bfc73e95ef295b04d5d032",
            "tags": {}
        }
    ],
    "templates": {
        /* template links omitted */
    }
}
```

`POST` to the resource to create a new application. The new application is returned. The `applicationEUI`, `appKey` and `tags` fields are optional. You can override the application EUI but it cannot be the same EUI as another application in Congress. If you or another Congress user have created an application with the same EUI you'll get an error.

```bash
$ curl -HX-API-Token:<your token> -XPOST -d'{"Name":"Another app"}' https://api.lora.telenor.io/applications
{
    "name": "Another app",
    "applicationEUI": "00-09-09-00-00-00-00-01",
    "appKey": "84fed8c5c289c7936464fa89c2686416",
    "tags": {}
}
```

## `/applications/{aeui}` 
You can access applications individually via the application resource: 

```bash
$ curl -HX-API-Token:<your token> https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-01
{
    "name": "Another app",
    "applicationEUI": "00-09-09-00-00-00-00-01",
    "appKey": "84fed8c5c289c7936464fa89c2686416",
    "tags": {}
}
``` 

The contents are the same as each element returned by the `/applications` resource.

You can remove an application by calling `DELETE` on the application resource:

```bash
$ curl -HX-API-Token:<your token> -XDELETE https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-01
```

When successful the Congress server will return `204 NO CONTENT`. If you have created one or more devices in your application you'll get a `409 CONFLICT`. Delete all of the devices before deleting the application.

## `/applications/{aeui}/data` 
You can retrieve the latest data sent by the devices by accessing the `/applications/{eui}/data` resource. It will return a list of messages sent by the devices: 

```bash
$ curl -HX-API-Token:<your-token> https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/data
```

The response will be a JSON-formatted list of messages:

```json
{
    "messages": [
    {
        "devAddr": "00000013",
        "timestamp": 1497264584,
        "data":   "4974207365656d656420746f206d652c20736169642048616e73204ac3b87267656e207468652053616e652c207468617420616e792063697669",
        "appEUI": "00-09-09-00-00-00-00-29",
        "deviceEUI": "00-09-09-00-00-00-00-13",
        "rssi": 12,
        "snr": 20,
        "frequency": 868.3,
        "gatewayEUI": "00-09-09-00-00-00-00-03",
        "dataRate": "SF12BW125"
    },    
    {
        "devAddr": "00000001",
        "timestamp": 1497264584,
        "data": "4974207365656d656420746f206d652c20736169642048616e73204ac3b872",
        "appEUI": "00-09-09-00-00-00-00-29",
        "deviceEUI": "00-09-09-00-00-00-00-01",
        "rssi": 12,
        "snr": 20,
        "frequency": 868.3,
        "gatewayEUI": "00-09-09-00-00-00-00-03",
        "dataRate": "SF12BW125"
    }
    ]
}
```

Each element in the `messages` array corresponds to a message from the application's devices. The `data` field is a hex-encoded array of bytes.

The `timestamp` field contains an unix time stamp with epoch @ 1970-01-01 00:00:00. 

Use the `limit` parameter to limit the number of messages and the `since` parameter to specify a starting timestamp for messages. 

## `/applications/{aeui}/stream` 
You can monitor the data from the devices in real time by opening a websocket pointing to the `/applications/{aeui}/stream` resource. The websocket will send messages as they arrive. If no message have been received for the last 60 seconds a keepalive-message is sent on the websocket.

A typical sequence of messages would look like this when there's no messages for the first 120 seconds, then a message is received from one of the devices:

| Time            | Message 
| --------------- | ------ 
| 60 seconds      | { "type": "KeepAlive" } 
| 120 seconds     | { "type": "keepAlive" } 
| 120 + n seconds | { "type": "", "data": {"devAddr": "00000001",... }} 

The `data` field is identical to the data you get from the `/applications/{aeui}/data` resource. If there's an
error somewhere you'll get a message with the field `type` set to "Error" and the error message in a field named `message`.

## `/applications/{aeui}/tags`
You can add your own labels to applications by using the `tags` resource. Tags are simple maps of strings where you can put your own metadata like environments or local identifiers.  

Read more on tags [here]({{< relref "api-tags.md" >}}).

