---
title: NB-IoT server doc and tutorials
description: Documentation for Horde NB-IoT server
lunr: true
index: true
priority: 0.8
tags:
  - index
  - home
---

Welcome! This is the documentation site for the Telenor NB-IoT service.

![Welcome to tutorials](undraw_programming_2svr.png)

# Getting started

Start by going through the [interactive terminal](tutorials/interactive-terminal.md)
tutorial, then [Getting started with Telenor NB-IoT Developer Platform](tutorials/getting-started.md)
to get a quick feel for how the devices and console works.

If you want to implement a service that receives data you can have a quick look at the documentation
for the [outputs](api/outputs.md) which shows you how the data is sent to f.e. MQTT.

We have several client libraries available that you can experiment with:

* [Python](https://github.com/telenordigital/nbiot-python)
* [Go](https://github.com/telenordigital/nbiot-go)
* [Java](https://github.com/telenordigital/nbiot-java)
* [C#](https://github.com/telenordigital/nbiot-csharp)

# Backend IP address and APN

This is the **official address** for the NB-IoT backend:

Send data to `172.16.15.14` on port `1234`

The APN on your device **must** be set to `mda.ee` if you want to send data to
the IoT backend. Other APNs does not work.

# SARA N2 AT command cheat sheet

## Send UDP packet on device

Create socket (NSOCR), send package (NSOST) and close socket (NSOCL)

```text
AT+NSOCR="DGRAM",17,8888,1
AT+NSOST=0,"172.16.15.14",1234,12,"48656C6C6F20576F726C6421"
AT+NSOCL=0
```

## Check IMSI and IMEI

```text
AT+CIMI
AT+CGSN=1
```

## Check IP address

If the module has an assigned IP address it is online and ready to use

```text
AT+CGPADDR
```

## Check APN setup

It should say "mda.ee" if the correct APN is selected

```text
AT+CGDCONT?
```

## Ping an external host

```text
AT+NPING="172.16.0.100"
```

It should say `+NPING: "172.16.0.100",<number>,<number>` if successful.

## Set up for EE APN

Turn off autoconnect for the module, then reboot

```text
AT+NCONFIG="AUTOCONNECT","FALSE"
AT+NRB
```

Set the MDA/APN name

```text
AT+CGDCONT=0,"IP","mda.ee"
```

Set autoconnect on and reboot

```text
AT+NCONFIG="AUTOCONNECT","TRUE"
AT+NRB
```

Get IMSI and IMEI

```text
AT+CIMI
AT+CGSN=1
```

Register device in Horde, then reboot

```text
AT+NRB
```

Verify that the MDA/APN is set and that you get an IP address

```text
AT+CGDCONT?
AT+CGPADDR
```
