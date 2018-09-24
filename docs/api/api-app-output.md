---
title: Application output
lunr: true
nav_groups:
  - primary
tags:
  - output
  - application
  - mqtt
---

Applications may have zero or more outputs. The outputs can have different 
transports. The only currently supported transport is "mqtt"

## `/applications/{aeui}/outputs`
`POST` to the `/applications/{aeui}/outputs` endpoint to create a new output. The body of the request
must contain the configuration. EUI is optional, AppEUI is derived from path.
Config field is required and must contain a field named "type" to set the
type of output. 

```json
{
    "eui": "00-09-09-00-00-00-00-1f",
    "appEUI": "00-09-09-00-00-00-00-01",
    "config": {
        "endpoint": "localhost",
        "password": "user1",
        "port": 1883,
        "type": "mqtt",
        "username": "user1"
    }        
}
```

The outputs can be listed by sending a `GET` request to 
`/applications/{aeui}/outputs` endpoint. The body contains a list of the outputs
defined for the application.

```json
{
    "outputs": [ ... ]
}
```
Each output have a type, id, config and logs

```json
{
    "eui": "<output eui>",
    "config": {
        "endpoint": "my-mqtt.example.com",
        "port": 9400,
        "tls: false,
        "cert_check": true,
        "username": "john",
        "password": "doe"
    },
    "logs": [ list of log entries ],
    "status": "<idle|active>"
}
```

## `/applications/{aeui}/outputs/{eui}` 
The info endpoint shows information on a single output. `GET` the resource to list 
the info, send a `DELETE` request to remove it. When the endpoint is removed it 
will be automatically shut down.

## Logging

The log for the output is included in the output. If there's an issue connecting 
to the endpoint or the connection is dropped for some reason it will go down 
it will be noted in the log.

The log is JSON-formatted and contains a timestamp plus a text:

```json
{
    "logs": [
        {
            "time": "2017-01-01T12:00:00Z",
            "message: "Connected"
        },
        {
            "time": "2017-01-01T12:02:00Z",
            "message: "Disconnected"
        },
        {
            "time": "2017-01-01T12:05:00Z",
            "message: "Auth error"
        },
        {
            "time": "2017-01-01T12:09:00Z",
            "message: "Certificate error"
        }
    ]
}
```

A maximum of 10 entries are kept in the log. Log entries will only be retained in
memory.

## Status

The status of the endpoint can be retrieved by going directly to the output's 
endpoint `/applications/{aeui}/outputs/{eui}`:

```json
{
    "eui": "01-01-02-02-03-03-04-04",
    "queued": 0,
    "type": "mqtt",
    "config": {
        "endpoint": "my-mqtt.example.com",
        "port": 9400,
        "tls: false,
        "cert_check": true,
        "username": "john",
        "password": "doe"
    },
    "logs": [ list of log entries ],
    "status": "<status string>"
}
```

The *status* field can have the following values:

| Status       | Description
| ------------ | -----------
| active       | Output is connected and active
| idle         | Output have been connected but have timed out due to inactivity

### MQTT output

The following configuration fields may be used

| Field     | Description                                                                  | Required
| --------- | ---------------------------------------------------------------------------- | --------
| endpoint  | Host name/endpoint for MQTT broker                                           | yes
| port      | Port for MQTT broker                                                         | no, default is 1883
| username  | Username if broker requires authentication                                   | no
| password  | Password if broker requires authentication                                   | no
| tls       | Use TLS or not                                                               | no, default is false
| certCheck | Do a certificate check for the MQTT broker. Only applies for TLS connections | no, default is true
| clientid  | Client ID for the MQTT client                                                | no, default is "congress"
| topicName | Topic name to use                                                            | no, default is "congress"

## Message contents

Each message will be forwarded as a JSON structure like this (EUIs, device 
address and frequency information will of course be different):

```json   
{
    "Time": "2017-01-01T12:00:00",
    "ApplicationEUI": "01-02-03-04-05-06-07-08",
    "DeviceEUI": "01-02-03-04-05-06-07-08",
    "DevAddr": "01020304",
    "Payload": "0101010102020202",
    "Tags": { "TagName1": "TagValue1", [... ]},
    "RSSI": -90,
    "SNR": 9.1,
    "Frequency": 868.1
}
```

The output format is the same as the data messages forwarded on web sockets.

## Delivery attempts

The MQTT endpoint will attempt up to 10 attempts at delivering the messages. 
If the remote endpoint does not respond the message will be dropped when the 
number of queued elements exceeds the maximum. Messages that fail delivery 
will be re-queued.

<div class="tn-p tn-hint">
Note: There is no delivery or ordering guarantee.
</div>
