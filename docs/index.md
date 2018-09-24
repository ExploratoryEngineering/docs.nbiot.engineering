---
title: Congress LoRa server
description: Documentation for Congress LoRa server
lunr: true
index: true
priority: 0.8
tags:
  - index
  - home
---

## Overview
The LoRa backend server is called *Congress* (as in "a congress of ravens"). 

The backend combines both a network server, application server and customer server in the LoRaWAN architecture, making it easy to run projects without the need for additional server. 

The server itself does not retain data for longer periods of time. If you want to aggregate data over several days or weeks it is recommended to configure an [application output](api/api-app-output.html) for your application.
Note that the API is entirely optional. You can perform all operations through the [front end UI](https://lora.engineering/) but if you are going to provision devices or manage applications through another service the REST API will be useful.

