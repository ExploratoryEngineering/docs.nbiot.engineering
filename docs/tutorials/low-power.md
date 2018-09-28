---
title: Conserving battery power
lunr: true
nav_groups:
  - primary
tags:
  - tutorial
  - low-power
  - ee-nbiot-01
---

This is an advanced topic! To be able to run a device on batteries for several years, everything on the device needs to use as little power as possible. The [EE-NBIOT-01][1] is only for prototyping, so this guide will only focus on reducing power consumption on the u-blox SARA-N210 to make it run on batteries for a few weeks and maybe a couple of months.

## Skip the voltage regulator
First thing you want to do is to bypass the voltage regulator on the [EE-NBIOT-01][1]. The regulator will always draw ~5 mA - even when the SARA-N210 is in power saving mode. The output from the voltage regulator is 3.3V, which is connected to the 3v3-pin. SARA-N210 is specified to work in the range 3.1V-4.0V. Which means you can connect a battery to the 3v3-pin as long as it's in the right voltage range. A 3.7V lithium-ion battery is at 4.2V when fully charged, but if you make sure it's no higher than 4.0V it should work fine - for prototyping.

## PSM - Power Saving Mode
To save power, you should keep the SARA-N210 always powered. Maybe a surprise to many, but every time you power on the module it has to do a registration process to the network - which draws a lot of power. By using the power saving mode on the SARA-N210 it will only draw a few µA in between transmissions.

Power saving mode is disabled by default on the SARA-N210. With PSM disabled it will consumes a few milliamps even in idle mode. This might not sound like much power consumption, but it's around 1000 times more power than in deep sleep, and will drastically reduce battery life. If you enable PSM, everything on the SARA-N210 except the real time clock will power down between sending data. You can still communicate with it over the serial connection, since it will wake up when receiving serial data.

Power consumption in power saving mode is specified as ~4 µA. Lower than the Fluke 175 is able to measure. Below you can see the current consumption during send, and that it uses very little power before and after (when in PSM).
![Power save mode demo](img/psm.gif)

When enabling PSM you can also set two timer values, which each have their special 3GPP encoding:
* Requested Periodic TAU (Tracking Area Update) T3412 - How often the device will wake up from PSM and listen for updates from the network. If new downstream data is available, you'll get a `+NSONMI:` message indicating what socket and how many bytes are available. To conserve battery set this to a high value - hours/days between each TAU. 70 hours is encoded as `01000111`. See table T3412 below for encoding information.
* Requested Active Time T3324 - How long to stay in active mode after sending before going into PSM. Set to as low as possible to conserve battery - `00000000` means as soon as possible. See table T3324 below for coding information.

To enable PSM with most conservative power settings:

    AT+CPSMS=1,,,"11111111","00000000"
    > OK

### T3412 encoding
The 3 most significant bits define the timer unit, while the 5 least significant bits define the timer value.

| Bits 6-8 | Timer value unit  |
|---------:|-------------------|
|      000 | 10 minutes        |
|      001 | 1 hour            |
|      010 | 10 hours          |
|      011 | 2 seconds         |
|      100 | 30 seconds        |
|      101 | 1 minute          |
|      110 | 320 hours         |
|      111 | timer deactivated |

Example: `00100110`. Unit: 1 hour. Value: `00110` = 6. Result: 1 hour * 6 = 6 hours.

### T3323 encoding
The 3 most significant bits define the timer unit, while the 5 least significant bits define the timer value.

| Bits 6-8 | Timer value unit  |
|---------:|-------------------|
|      000 | 2 seconds         |
|      001 | 1 minute          |
|      010 | 6 minutes         |
|      111 | timer deactivated |

Example: `00000010`. Unit: 2 seconds. Value `00010` = 2. Result: 2 seconds * 2 = 4 seconds.

## sendTo command with flags
When using PSM, it's important to use a release indicator when sending data to let the SARA-N210 know when it can go into deep sleep. `AT+NSOSTF` is almost the same as `AT+NSOST` that we showed above, except that we can provide a flag.

The syntax is: `AT+NSOSTF=<socket>,<remote_ip_address>,<remote_port>,<flag>,<length>,<data>` (see `AT+NSOST` parameters table under “Hello world!”).

Valid `<flag>` values (`Number` type)

| Flag  | Description |
|------:|-------------|
| 0x000 | No flags    |
| 0x200 | Indicate release after next message (enter PSM after send) |
| 0x400 | Indicate release after next message has been replied to (enter PSM after response) |

Example:

    AT+NSOSTF=0,"172.16.7.197",31415,0x200,1,"77"
    > OK

## eDRX
Extended discontinuous reception (eDRX) is a feature to save power when you expect downstream messages (to the device from the network). Instead of listening all the time, the device can tell the network when it's sleeping and when it's listening (receive windows).

If you're only sending data upstream (from the device) (we don't support downstream in our Developer Platform just yet), you should disable eDRX to increase battery life:

    AT+CEDRXS=3,5

[1]: https://shop.exploratory.engineering/collections/frontpage/products/ee-nbiot-01-v1-1-breakout-module
