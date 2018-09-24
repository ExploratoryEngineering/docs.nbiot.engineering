---
title: Overview
lunr: true
nav_sort: 3
nav_groups:
  - primary
tags:
  - getting started
  - rest
  - api
---
## Overview

The Congress API contains three main resources: **Applications**, **devices** and **gateways**. 

<div class="tn-p tn-hint tn-hint--brand">The API endpoint is https://api.lora.telenor.io/.</div>

### Applications
Applications does not carry any particular semantic value apart from grouping devices into separate sets. Each applications can have zero or more devices associated with it. Applications use EUI identifiers.

[Read more](/api/api-applications.html)

### Application outputs
The backend server can forward data from devices associated with an application to one or more MQTT outputs, making it possible to consume the output in another service.

[Read more](/api/api-app-output.html)

### Devices
Devices are just what is says -- a representation of a single physical device. Each device have their two identifiers: An unique EUI and a **Device Address**. The device address (or DevAddr in LoRaWAN lingo) is the identifier for the device when it is broadcasting on air. The DevAddr is usually unqiue but there might be duplicate DevAddr values out in the wild.

A single device cannot be shared between applications.

[Read more](/api/api-devices.html)

## Gateways 

Gateways are the link between the radio network the devices operate on and the Internet. A gateway is in principle a simple networking bridge that forwards the packets from the devices to the Congress backend and vice versa. 

[Read more](/api/api-gateways.html)


## Application tokens
You'll need an application token to access the API outside of your browser. You can create new tokens in the [management UI](https://lora.engineering/). The token is set in the `X-API-Token` header:

```bash
$ curl -HX-API-Token:<your-token> https://api.lora.telenor.io/applications
{
    "applications": [
        {
        "name": "Foof",
        "applicationEUI": "00-00-00-00-00-00-00-00",
        "appKey": "00000000000000000000000000000000",
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

You can create multiple tokens with read-only or read/write access to specific applications and gateways or to all applications and gateways.

## The root resource `/`
The root resource itself isn't very useful but it provides a starting point if you prefer to explore the API yourself:

```bash
$ curl -HX-API-Token:<your-token> https://api.lora.telenor.io/
{
    "application-collection": "/applications",
    "application-data": "/applications/{aeui}/data{?limit\u0026since}",
    "application-stream": "/applications/{aeui}/stream",
    "device-collection": "/applications/{aeui}/devices",
    "device-data": "/applications/{aeui}/devices/{deui}/data{?limit\u0026since}",
    "gateway-info": "/gateways/{geui}",
    "gateways": "/gateways"
}
```

## Status codes 
The API uses the response codes to report success or failure. It follows the normal conventions with 2xx representing success, 4xx representing parameter or access errors and 5xx representing internal server errors.

The following status codes may be returned

| Code | Description
| ---- | ----------
| [200](http://http.cat/200)  | OK - operation is successfully completed
| [201](http://http.cat/201)  | Created - entity is created
| [204](http://http.cat/204)  | No content. Usually returned when an entity is removed.
| [400](http://http.cat/400)  | Bad request. Usually one or more of the user-specified parameters are missing or omitted. The error message gives more details.
| [401](http://http.cat/401)  | Unauthorized. The API token is missing or incorrect. 
| [403](http://http.cat/403)  | Forbidden. You do not have access to this resource.
| [404](http://http.cat/404)  | Not found. The resource doesn't exist.
| [409](http://http.cat/409)  | Conflict. The resource is in a state that conflicts with the requested operation.
| [500](http://http.cat/500)  | Server error. The server encountered an error and couldn't complete the request.
| [503](http://http.cat/503)  | Service unavailable. Service is currently unavailable but might be available later.
