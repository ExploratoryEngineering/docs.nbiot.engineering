---
title: Outputs
lunr: true
nav_sort: 2
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---
## Logs and Status resource

All of the outputs have a `logs` and `status` resource that can be used to
diagnose the state of the output.

The `logs` resource (at `/collections/{id}/outputs/{id}/logs`)
## Webhook output
The webhook output

### Configuration parameters

### Format of output

The body of the POST request is an array of messages. Depending on the number of
messages received by the backend there might be more than one message in the array.

```json
{
    "messages": [
        {
            "payload": "<base64-encoded payload>",
            "device": {
                "imsi": "<device IMSI>",
                "imei": "<device IMEI>",
                "tags": {
                    "name": "value"
                }
            },
            "received": <received timestamp, ms>
        }
    ]
}
```

## MQTT output

### Configuration parameters


## IFTTT output
The IFTTT output is a custom webhook integration with IFTTT. The output isn't
very suited to high volumes of data and the delivery is on a best effort.

### Configuration parameters

The following parameters can be used to configure the IFTTT output

| Parameter   | Type   | Description
| ----------- | ------ | ---------
| key         | string | The key for the IFTTT webhook. This parameter is required.
| eventName   | string |  The event name to use in IFTTT. This parameter is required.
| asIsPayload | bool   | If set to true the payload will be converted to a string and sent as is. This parameter is optional.

### Format of output

The fields used in the IFTTT output are as follows:

| Field  | Contents
| ------ | ---------
| value1 | The data from the device, either as-is plain text or base64 encoded
| value2 | The device ID of the device that sent the data.
| value3 | This field is empty