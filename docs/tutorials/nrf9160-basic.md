---
title: nRF9160 DK getting started
lunr: true
nav_sort: 37
nav_groups:
  - primary
tags:
  - tutorial
  - nRF9160
  - Nordic
---

This tutorial will show you how to send data over NB-IoT using the [nRF9160 DK][1] module from Nordic Semiconductor.  The guide relies on our self service NB-IoT Developer Platform.  See our separate tutorial on how to [setup a device in the NB-IoT Developer Platform](getting-started.html).  As of 1st October 2018 the platform is only enabled for Telenor Norway.

**Prerequisites**
- The [nRF9160 DK][1] module

## Development environment

Set up your development environment by following [the instructions here][2].  (Hint: Scroll down on that page and click 'Get Started').  The nRF Connect SDK provides all the tools necessary to develop with the nRF9160 DK.  It is your choice whether you work from the command line or the IDE (SEGGER Embedded Studio).  This tutorial delegates the details of setting up and using the tools to the Nordic documentation.

## Example application

Download and extract the [example application](nrf9160-basic/example.tar.gz).  Connect the nRF9160 DK to your computer via USB.

Before running the example application, you should follow the instructions from another of our tutorials to install a [serial terminal application](interactive-terminal.html#serial-terminal-application).  This way, you can see the serial output of the application – which is not only convenient for seeing log output but also necessary for you to obtain the IMEI and IMSI of the device, both of which are needed in order to register the device on the NB-IoT Developer Platform.

Once you have your serial terminal application open and connected, use your tools of choice (CMake/ninja/make or IDE) to build and flash the example application to the nRF9160 DK.  Once the application is flashed to the device, it will immediately begin running.  In your serial terminal application you will see a lot of output about Zephyr booting, and then you will see the following application output:

	Example application started.
	IMEI: <imei>
	IMSI: <imsi>

At this point, the application will try to connect to the IoT network, but it will not succeed because the device is not yet registered on the NB-IoT Developer Platform.  Now is the time to copy the IMEI and IMSI and register the device [as described here](getting-started.html).

After registering the device, restart the application by pressing the RESET button on the nRF9160 DK.  You will see the same output as before, but after some time (15-20 seconds, be patient!) you will additionally see that the device connected to the network and sent a message.  On the device page on the Developer Platform you will also see that the message has been successfully transmitted.

Well done!

[1]: https://shop.exploratory.engineering/collections/nb-iot/products/nrf9160-dev-kit
[2]: https://www.nordicsemi.com/Software-and-Tools/Software/nRF-Connect-SDK
