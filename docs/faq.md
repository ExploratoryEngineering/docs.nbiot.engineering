---
title: FAQ
description: Frequently Asked Questions
lunr: true
nav_sort: 1
nav_groups:
  - secondary
tags:
  - faq
  - questions
---

![Frequently Asked Questions](undraw_faq.png)

## What IP and port should I send the data to?

The default IP for the backend server is **172.16.15.14** and the port should be set to **1234**.

## What local port should I use?

You can use any port you like for the local port (the `AT+NSOCR` command).

## What commands do I need to send data from the SARA N2 module?

This will send "Hello world" ("48656C6C6F20576F726C6421") to the backend server:

```text
AT+NSOCR="DGRAM",17,8888,1
AT+NSOST=0,"172.16.15.14",1234,12,"48656C6C6F20576F726C6421"
AT+NSOCL=0
```

## NB-IoT and LTE Cat M1 (LTE-M)

### What is NarrowBand-IoT (NB-IoT)?

First release was in release 13 of 3GPP standards. It's also called Cat-M2, but most widely referred to as NB-IoT. It's not using LTE radio, like 4G and LTE Cat M1, but is rather based on direct-sequence spread spectrum (DSSS) modulation.

The duplex mode is half duplex, and the bandwidth is 250 Kbps downlink and 20 Kbps (single-tone) / 250 Kbps (multi-tone) uplink. The latency is between 1.6s and 10s.

### What is LTE Cat M1, LTE-M or eMTC?

First relase was in release 13 of 3GPP standards, much like NB-IoT. It seems like the term LTE-M is getting more adoption in the industry, but the official names are LTE Cat M1 and eMTC. Some also refer to the as Cat-M1.

The duplex mode is full duplex, and the bandwidth is 1Mbps downlink and 1Mbps uplink. The latency is between 10ms and 15ms.
