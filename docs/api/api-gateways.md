---
title: Gateways
lunr: true
nav_groups:
  - primary
tags:
  - gateway
---


If you want Congress to process data from your gateway you have to register it in Congress. Either use the [management UI](https://lora.engineering/) or do it via the REST API.
## Packet forwarder

The only packet forwarder supported by the Congress backend is the reference packet forwarder from Semtech. Source code is available at https://github.com/Lora-net/packet_forwarder.

## Gateway configuration

Set up the gateway with the following parameters in the `local_conf.json` file
```json
{
    "gateway_conf": {
        "gateway_ID": "<your gateway's EUI, derived from the MAC address>",
        "server_address":"api.lora.telenor.io",
        "serv_port_up": 8000,
        "serv_port_down": 8000,
        "keepalive_interval": 10,
        "stat_interval": 30,
        "push_timeout_ms": 100,
        "forward_crc_valid": true,
        "forward_crc_error": false,
        "forward_crc_disabled": false
    }
}
```

The frequency plan must match the plan Congress uses. Currently Congress only supports the EU-868 frequency plan. This plan is set up as follows (your global_conf.json file might contain additional directives, depending on its configuration):
```json
{
    "SX1301_conf": {
        "radio_0": {
            "enable": true,
            "type": "SX1257",
            "freq": 867500000,
            "rssi_offset": -166.0,
            "tx_enable": true,
            "tx_freq_min": 863000000,
            "tx_freq_max": 870000000
        },
        "radio_1": {
            "enable": true,
            "type": "SX1257",
            "freq": 868500000,
            "rssi_offset": -166.0,
            "tx_enable": false
        },
        "chan_multiSF_0": {
            /* Lora MAC channel, 125kHz, all SF, 868.1 MHz */
            "enable": true,
            "radio": 1,
            "if": -400000
        },
        "chan_multiSF_1": {
            /* Lora MAC channel, 125kHz, all SF, 868.3 MHz */
            "enable": true,
            "radio": 1,
            "if": -200000
        },
        "chan_multiSF_2": {
            /* Lora MAC channel, 125kHz, all SF, 868.5 MHz */
            "enable": true,
            "radio": 1,
            "if": 0
        },
        "chan_multiSF_3": {
            /* Lora MAC channel, 125kHz, all SF, 867.1 MHz */
            "enable": true,
            "radio": 0,
            "if": -400000
        },
        "chan_multiSF_4": {
            /* Lora MAC channel, 125kHz, all SF, 867.3 MHz */
            "enable": true,
            "radio": 0,
            "if": -200000
        },
        "chan_multiSF_5": {
            /* Lora MAC channel, 125kHz, all SF, 867.5 MHz */
            "enable": true,
            "radio": 0,
            "if": 0
        },
        "chan_multiSF_6": {
            /* Lora MAC channel, 125kHz, all SF, 867.7 MHz */
            "enable": true,
            "radio": 0,
            "if": 200000
        },
        "chan_multiSF_7": {
            /* Lora MAC channel, 125kHz, all SF, 867.9 MHz */
            "enable": true,
            "radio": 0,
            "if": 400000
        },
        "chan_Lora_std": {
            /* Lora MAC channel, 250kHz, SF7, 868.3 MHz */
            "enable": true,
            "radio": 1,
            "if": -200000,
            "bandwidth": 250000,
            "spread_factor": 7
        },
        "chan_FSK": {
            /* FSK 50kbps channel, 868.8 MHz */
            "enable": true,
            "radio": 1,
            "if": 300000,
            "bandwidth": 125000,
            "datarate": 50000
        }
    }
}
```

Do note that the order of the channels are important.

Create a new gateway with the specified EUI (aka the `gateway_ID` field in the configuration file, formatted as an EUI-64), restart the packet forwarder and you should be connected.

## `/gateways`
The list of your gateways can be retrieved via the `/gateways` resource:
```bash
$ curl -HX-API-Token:<your token> https://api.lora.telenor.io/gateways
{
    "gateways": [
    {
        "gatewayEUI": "00-09-09-00-00-00-00-03",
        "ip": "127.0.0.1",
        "strictIP": false,
        "latitude": 0,
        "longitude": 0,
        "altitude": 0,
        "tags": {}
    },
    {
        "gatewayEUI": "01-02-03-04-05-06-07-08",
        "ip": "127.0.0.1",
        "strictIP": false,
        "latitude": 0,
        "longitude": 0,
        "altitude": 0,
        "tags": {}
    }
    ],
    "templates": {
    "gateway-info": "/gateways/{geui}",
    "gateway-list": "/gateways"
    }
}
```

Each gateway is identified with an EUI. 

<div class="tn-p tn-tips">
If you are using the basic packet forwarder this EUI is configured on the gateway.
{{</note>}}
</div>

Add a new gateway by `POST`ing to the `/gateways` resource:

```bash
$ curl -XPOST -d'{"gatewayEUI": "01-02-03-04-05-06-07-10", "ip": "127.0.0.1", "strictIP": false}' -HX-API-Token:<your token> https://api.lora.telenor.io/gateways
{
  "gatewayEUI": "01-02-03-04-05-06-07-10",
  "ip": "127.0.0.1",
  "strictIP": false,
  "latitude": 0,
  "longitude": 0,
  "altitude": 0,
  "tags": {}
}
```

The fields `gatewayEUI` and `ip` is required and the rest of the fields are optional. The `strictIP` flag turns on and off strict IP checks. If your gateway uses DHCP the IP address of the gateway might change. 

<div class="tn-p tn-tips">
Gateways have to have unique EUIs. You cannot register a gateway with the same EUI as another gateway.
</div>

## `/gateways/{geui}`
You can retrieve individual gateways by querying the `/gateways/{geui}` resource:

```bash
$ curl -HX-API-Token:<your token> https://api.lora.telenor.io/gateways/01-02-03-04-05-06-07-10
{
    "gatewayEUI": "01-02-03-04-05-06-07-10",
    "ip": "127.0.0.1",
    "strictIP": false,
    "latitude": 0,
    "longitude": 0,
    "altitude": 0,
    "tags": {}
}
```

Gateways can be removed by using `DELETE`:

```bash
$ curl -XDELETE -HX-API-Token:<your token> https://api.lora.telenor.io/gateways/01-02-03-04-05-06-07-10
```

Successful deletes yields a `204 NO CONTENT` response. 

### `/gateways/{geui}/stream`
The `/gateways/{geui}/stream` endpoint provides a web socket that emits OOB
events for the gateway which is useful when debugging the connection.

Events are emitted when the gateway sends a keepalive call to the backend server
and when there's data transmitted between congress and the gateway.

If the gateway is connected to Congress and sends a keepalive packet you'll
see the *KeepAlive* event:

```json
{
    "event": "KeepAlive"
}
```

If you see a *KeepAlive* event on the web socket the gateway is active and connected.

If on the other hand the gateway isn't connected you'll see the *Inactive* event.
This event is emitted every 60 seconds for as long as the gateway isn't connected
to Congress.

```json
{
    "event": "Inactive"
}
```

When a message is sent *from* the gateway you'll see the *Rx* event:

```json
{
    "event": "Rx",
    "data": "{\"rxpk\":[ /* JSON-encoded message from gateway */ }"
}
```

The *data* field contains the JSON that was sent by the gateway.

Similarly, when there's a message going from Congress to the gateway you'll see
a *Tx* event on the web socket:

```json
{
    "event": "Tx",
    "data": "{\"txpk\":[ /* JSON-encoded message from congress */ }"
}
```

### `/gateways/{geui}/tags`
You can add your own labels to gateways by using the `tags` resource. Tags are simple maps of strings where you can put your own metadata like environments, serial numbers or local identifiers. 

Read more on tags [here]({{<relref "api-tags.md">}}).

