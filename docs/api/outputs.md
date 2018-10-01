---
title: Outputs
lunr: true
nav_sort: 30
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

**Outputs** are used to forward data from [devices](devices.md) to external systems.

The outputs have three common elements
* `type` -- a string that tells which type of output this is
* `enabled` -- a flag that can be used to temporarily deactivate an output
* `config` -- the output configuration. The contents depend on the output type.

## Output list
The currently listed outputs
```bash
$ curl -HX-API-Token:${TOKEN} http://localhost:8080/collections/17dh0cf43jfglk/outputs
{
  "collectionId": "17dh0cf43jfglk",
  "outputs": []
}
```

### Create a new output

A new output can be created by `POST`ing to the `outputs` resource:

```bash
$ curl -HX-API-Token:${TOKEN} -XPOST \
     -d'{"type":"webhook", "config":{"url": "https://webhooks.example.com/webhook/receiver"}}' \
     https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/outputs

{
  "outputId": "17dh0cf43jfgl9",
  "collectionId": "17dh0cf43jfglk",
  "type": "webhook",
  "config": {
    "url": "https://webhooks.example.com/webhook/receiver"
  },
  "enabled": true,
  "tags": {}
}
```

The server will respond with the output when it is created. Note that the URL for the output must point to a valid host. If the host resolves to a private IP range or an unreachable host you'll get an error message from the server:

```json
{
    "status":400,
    "message":"Invalid config",
    "additionalInfo":{
        "url":"Invalid host name"
    }
}
```

## Logs and Status resource

All of the outputs have a `logs` and `status` resource that can be used to
diagnose the state of the output.

## The `logs` resource (at `/collections/{coolectionId}/outputs/{outpuId}/logs`)

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/outputs/17dh0cf43jfgl9/logs
{
  "logs": [
    {
      "message": "Output started",
      "timestamp": 1538163685141,
      "repeated": 0
    }
  ]
}
```

The logs will be reset each time the output is reconfigured or reenabled. The logs are unavailable if the output is disabled.
The timestamp is in ms, epoch is 1970-01-01 00:00:00. The `repeated` field shows how many times the message have been repeated.

## The `status` resource

The status resource shows counters for the output

```bash
$ curl -HX-API-Token:${TOKEN} https://api.nbiot.telenor.io/collections/17dh0cf43jfglk/outputs/17dh0cf43jfgl9/status
{
  "errorCount": 0,
  "forwarded": 559,
  "received": 559,
  "retries": 0
}
```

The counters are as follows:
  * `errorCount` -- number of errors sending messages
  * `forwarded` -- number of messages successfully forwarded
  * `received` -- number of messages received
  * `retries` -- number of retries

The counters are reset when the output is reconfigured or reenabled.

## Webhook output

The Webhook output sends a `POST` request to a web server. The contents of the body is a a JSON containing data messages.
The data messages are identical in structure to the [data structure used in the collection and device WebSocket](collections.md).

The array of messages might contain more than one message if there's a lot of messages received by the backend.

```json
{
    "messages": [{
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
        "type": "data"
    }]
}
```

### Configuration
```json
{
    "url": "<server URL, required>",
    "basicAuthUser": "<user name if basic auth is used, optional>",
    "basicAuthPass": "<password for basic auth, optional>",
    "customHeaderName": "<name of custom header, optional>",
    "customHeaderValue": "<value of custom header, optional>"
}
```

Just the `url` parameter is required.

## MQTT output

The MQTT output sends data to a MQTT broker.

### Configuration

```json
{
    "endpoint": "<endpoint for broker, required>",
    "certCheck": <flag for certificate check, optional>,
    "username": "<user name for broker, optional>",
    "password": "<password for broker, optional>",
    "clientId": "<client id to use when connecting to broker, required>",
    "topicName": "<topic to use, required>"
}
```
The endpoint must be formatted as `tcp://<host>:<port>` for unencrypted connections, `ssl://<host>:<port>` for TLS connections. TLS connections is highly recommended. If you use a self-signed certificate you can disable the certificate check by setting the check flag.

The host name must be valid and reachable. The port must *always* be included in the endpoint.

The payload is a JSON structure identical to the [WebSocket](devices.md) output:
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
    "type": "data
}
```

## IFTTT output
The IFTTT output is a custom webhook integration with IFTTT. The output isn't
very suited to high volumes of data and the delivery is on a best effort.

### Configuration

The following parameters is used to configure the IFTTT output

```json
{
    "key": "<key for the IFTTT webhook, required>",
    "eventName": "<event name to use, required>",
    "asIsPayload": <boolean flag, if set to true the payload is sent as is, optional>
}
```

### Format of output

The request body in the webhook has the `value1` field set to the device data and `value2` as the device ID.
