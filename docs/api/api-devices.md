---
title: Devices
lunr: true
nav_groups:
  - primary
tags:
  - devices
---

Each application can contain zero or more devices. Devices can be either 
**OTAA** devices or **ABP** devices. APB devices are provisioned with the 
fields `devAddr`, `appSKey` and `nwkSKey` set while OTAA devices are provisioned
with the `deviceEUI`, `appEUI` and `appKey`fields. The last two fields in OTAA
 devices are pulled from the application. 

Devices can also be managed from the [management UI](https://lora.engineering/).

## `/applications/{aeui}/devices`
List the devices by querying the `devices` resource. 
```bash
$ curl -HX-API-Token:<your token> https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/devices
{
  "devices": [
    {
      "deviceEUI": "00-09-09-00-00-00-00-02",
      "devAddr": "00000042",
      "appSKey": "30974544164456566934730477596154",
      "nwkSKey": "f07b0ebb203775be63f075adbe32f035",
      "fCntUp": 0,
      "fCntDn": 0,
      "relaxedCounter": true,
      "deviceType": "ABP",
      "tags": {}
    },
    {
      "deviceEUI": "00-09-09-00-00-00-00-19",
      "devAddr": "00000034",
      "appSKey": "30974544164456566934730477596154",
      "nwkSKey": "f07b0ebb203775be63f075adbe32f035",
      "fCntUp": 0,
      "fCntDn": 0,
      "relaxedCounter": true,
      "deviceType": "ABP",
      "tags": {}
    }
  ],
  "templates": {
    "application-collection": "/applications",
    "application-data": "/applications/{aeui}/data{?limit\u0026since}",
    "application-stream": "/applications/{aeui}/stream",
    "device-collection": "/applications/{aeui}/devices",
    "device-data": "/applications/{aeui}/devices/{deui}/data{?limit\u0026since}",
    "gateway-info": "/gateways/{geui}",
    "gateways": "/gateways"
  }
}
```

All of the parameters on the device is optional so when you create a new device you can just use an empty JSON structure:

```bash
$ curl -XPOST -d'{}' -HX-API-Token:<your token> https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/devices
{
  "deviceEUI": "00-09-09-00-00-00-00-c9",
  "devAddr": "000000c9",
  "appSKey": "00000000000000000000000000000000",
  "nwkSKey": "00000000000000000000000000000000",
  "fCntUp": 0,
  "fCntDn": 0,
  "relaxedCounter": false,
  "deviceType": "OTAA",
  "tags": {}
}
```

The default type of device is OTAA and the appSKey and nwkSKey are set to all zeroes until it has negotiated a new set of keys with Congress. The keys will be negoitated during the join procedure.

<div class="tn-p tn-hint tn-hint--brand">
Set `relaxedCounter` to true while you are developing the firmware. That makes Congress ignore the frame counter field in the device and accept messages from the device when the frame counter resets. If `relaxedCounter` is set to `false` any message with a frame counter *lower* than the current registered frame counter (`fCntUp`) will be ignored and Congress will silently drop messages from your device until the frame counter is in sync again.
</div>

If you already have a device with keys and a device address you can override the defaults when creating a new one:

```bash
$ curl -XPOST -d'{"deviceType":"ABP", "appSKey":"ff00ff00ff00ff00ff00ff00ff00ff00", "nwkSkey":  "ff00ff00ff00ff00ff00ff00ff00ff00", "devAddr": "01020304" }' h-HX-API-Token:<your token>         https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/devices
{
  "deviceEUI": "00-09-09-00-00-00-00-ca",
  "devAddr": "01020304",
  "appSKey": "ff00ff00ff00ff00ff00ff00ff00ff00",
  "nwkSKey": "ff00ff00ff00ff00ff00ff00ff00ff00",
  "fCntUp": 0,
  "fCntDn": 0,
  "relaxedCounter": false,
  "deviceType": "ABP",
  "tags": {}
}
```

## `/applications/{aeui}/devices/{deui}/data`
The data sent by the device to Congress can be retrieved through the `data` resource:

```bash
$ curl -HX-API-Token:<your token>   https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/devices/00-09-09-00-00-00-00-25/data
{
  "messages": [
    {
      "devAddr": "00000025",
      "timestamp": 1497264584,
      "data": "4974207365656d656420",
      "keepAlive": false,
      "appEUI": "00-09-09-00-00-00-00-29",
      "deviceEUI": "00-09-09-00-00-00-00-25",
      "rssi": 12,
      "snr": 20,
      "frequency": 868.3,
      "gatewayEUI": "00-09-09-00-00-00-00-03",
      "dataRate": "SF12BW125"
    },
    {
      "devAddr": "00000025",
      "timestamp": 1497264583,
      "data": "4974207365656d656420746f206d",
      "keepAlive": false,
      "appEUI": "00-09-09-00-00-00-00-29",
      "deviceEUI": "00-09-09-00-00-00-00-25",
      "rssi": 12,
      "snr": 20,
      "frequency": 868.3,
      "gatewayEUI": "00-09-09-00-00-00-00-03",
      "dataRate": "SF12BW125"
    }
}
```

You can limit the number of messages by setting the `limit` parameter. The default for the `limit` parameter is **50**. You can also control which messages you get by setting the `since` parameter. The `since` parameter is the unix timestamp and only messages newer than then specified timestamp will be returned.

## `/applications/{aeui}/devices/{deui}/message`

Sending messages is fairly simple - `POST` the message to the `message` resource:

```bash
$ curl -XPOST -d'{"port": 42, "data": "aabbccdd", "ack": true}' -HX-API-Token:<your token>      https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/devices/00-09-09-00-00-00-00-25/message
{
  "deviceEUI": "00-09-09-00-00-00-00-25",
  "appEUI": "00-09-09-00-00-00-00-29",
  "data": "aabbccdd",
  "port": 42,
  "ack": true
}
```

The `port` and `data` fields are required. The `port` field must be in the range 1-223. Port number 0 is reserved for network management messages and port 224- is reserved for future use.

The `data` fields contains a hex-encoded byte buffer.

If the `ack` field is set to true the message will be set to `Confirmed Data Down`. The default is to use `Unconfirmed Data Down`, ie. with no acknowledgement from the device.

## `/applications/{aeui}/devices/{deui}/source`
If you are developing new device firmware it can be tedious to type in the device parameters for the various devices. Use the `source` resource to get source code ready to be pasted into your firmware:

```bash
$ curl  -HX-API-Token:<your token>      https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/devices/00-09-09-00-00-00-00-25/source
```

The response can be pasted into your code:

```c
#define LORAWAN_OTAA 0

/* ==========================================================================
  * OTAA provisioning. This includes the device EUI, application EUI and
  * application key. The application and network session keys will be
  * negotiated when the device joins the network.
  * ========================================================================== */
#define LORAWAN_DEVICE_EUI { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }
#define LORAWAN_APP_KEY { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }
#define LORAWAN_APP_EUI { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 }

/* ==========================================================================
  * ABP (activation by personalisation) parameters. Rather than negotiating
  * the application and network session keys these are set directly. This
  * eliminates the need for a join request and the device can transmit data
  * directly. The downside is that the device should keep track of the frame
  * counters when it is powered down but you won't share the application key.
  * ========================================================================== */
#define LORAWAN_DEVICE_ADDRESS (uint32_t) 0x00000025
#define LORAWAN_NWKSKEY { 0xf0, 0x7b, 0x0e, 0xbb, 0x20, 0x37, 0x75, 0xbe, 0x63, 0xf0, 0x75, 0xad, 0xbe, 0x32, 0xf0, 0x35 }
#define LORAWAN_APPSKEY { 0x30, 0x97, 0x45, 0x44, 0x16, 0x44, 0x56, 0x56, 0x69, 0x34, 0x73, 0x04, 0x77, 0x59, 0x61, 0x54 }
```

The source code is a set of `#define` statements that will configure your device in the [ee0x-firmware].(https://github.com/telenordigital/ee0x-firmware). Copy and paste the source code in the appropriate spot in your source and you are ready to go.

<div class="tn-p tn-hint tn-hint--brand">
If you are going to provision more than two or three devices it will be quite tedious (and error prone) to copy and paste the same section over and over again. Automate with a shell script if you just have a few devices to provision.
</div>

The following shell script will create a new device in Congress, grab the configuration, build the firmware and prepare the device:

```bash
#!/bin/bash
TOKEN=<insert your token here>
APP_EUI=<insert your app id here>

# Provision a new device and grab the EUI
DEVICE_EUI=$(curl -s -XPOST -d'{}' -HX-API-Token:${TOKEN} https://api.lora.telenor.io/applications/${APP_EUI}/devices|jq -r .deviceEUI)

# Grab the generated source for the device
curl -s -HX-API-Token:${TOKEN} https://api.lora.telenor.io/applications/${APP_EUI}/devices/${DEVICE_EUI}/source > src.tmp

# Create header and footer 
cat >head.tmp <<HEAD
#ifndef LORA_CONFIG_H
#define LORA_CONFIG_H
HEAD
cat >foot.tmp <<END
#endif
END

# Concatenate header, source and footer
cat head.tmp src.tmp foot.tmp > config/lora_config.h

# ...and remove temp files
rm head.tmp src.tmp foot.tmp
```

<div class="tn-p tn-hint tn-hint--brand">
You'll need the `curl` and `jq` command line utilities for this to work.
</div>

## `/applications/{aeui}/devices/{deui}/tags`

You can add your own labels to gateways by using the `tags` resource. Tags are simple maps of strings where you can put your own metadata like environments, serial numbers, local identifiers or geographical locations. 

Read more on tags [here]({{< relref "api-tags.md" >}}).
