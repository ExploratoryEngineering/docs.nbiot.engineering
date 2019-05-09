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

This tutorial will show you how to send data over NB-IoT using the [nRF9160 DK][1] module from Nordic Semiconductor.  The guide relies on our [self service NB-IoT Developer Platform](https://nbiot.engineering/) which, as of 1st October 2018, is only enabled for Telenor Norway.

**Prerequisites**
- The [nRF9160 DK][1] module with Telenor SIM card
- Micro USB cable

## Development environment

At the time of the writing of this tutorial, concise and reliable instructions for setting up one's development environment were hard to come by.  You are welcome to follow Nordic's [instructions][2] for setting up the nRF Connect SDK, but we recommend following ours instead.

### Windows

Windows users should follow the Ubuntu instructions after setting up the Windows Subsystem for Linux, as follows:

Run this command in PowerShell as administrator:

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

Then, reboot your computer.

Next, we need to install a Linux distro.  For this tutorial we will use Ubuntu.  Open PowerShell as administrator and run these commands:

```powershell
Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1804 -OutFile Ubuntu.appx -UseBasicParsing
./Ubuntu.appx
```

You will then be prompted to install Ubuntu.  Follow the steps in the wizard, including setting up user and password.

### Install packages

#### Mac OS X

Follow the instructions [here](https://brew.sh/) to install the Homebrew package manager, if you haven't already.  Then, run the following command:

```sh
brew install git cmake ninja gperf ccache dfu-util dtc python3 px4/px4/gcc-arm-none-eabi \
             homebrew/cask-drivers/nordic-nrf5x-command-line-tools	
```

This command may take quite some time to complete.

#### Ubuntu

On Ubuntu, run the following commands to install the necessary packages:

```sh
sudo apt install git ninja-build gperf ccache dfu-util device-tree-compiler python3-pip \
                 python3-setuptools python3-wheel make gdb-multiarch gcc-arm-none-eabi
pip3 install cmake
ln -s ~/.local/bin/cmake /usr/bin/
wget http://no.archive.ubuntu.com/ubuntu/pool/main/d/device-tree-compiler/device-tree-compiler_1.4.7-1_amd64.deb
sudo apt install ./device-tree-compiler_1.4.7-1_amd64.deb
```

### nRF Connect SDK

The nRF Connect SDK includes several Git repositories and Python modules, which you should install with the following commands:

```sh
cd ~
mkdir ncs
cd ncs
git clone https://github.com/NordicPlayground/fw-nrfconnect-zephyr.git -b v1.13.99-ncs2 zephyr
git clone https://github.com/NordicPlayground/fw-nrfconnect-mcuboot.git -b v1.2.99-ncs2 mcuboot
git clone https://github.com/NordicPlayground/fw-nrfconnect-nrf.git -b v0.3.0 nrf
git clone https://github.com/NordicPlayground/nrfxlib.git -b v0.3.0 nrfxlib
pip3 install --user -r zephyr/scripts/requirements.txt
pip3 install --user -r nrf/scripts/requirements.txt
```

### .zephyrrc

Finally, to configure the Zephyr environment, you must create a `.zephyrrc` file as follows:

#### Mac OS X

```sh
cd ~
touch .zephyrrc
echo "export ZEPHYR_TOOLCHAIN_VARIANT=gnuarmemb" >> ~/.zephyrrc
echo "export GNUARMEMB_TOOLCHAIN_PATH=/usr/local/opt/gcc-arm-none-eabi/" >> ~/.zephyrrc
```

#### Ubuntu

```sh
cd ~
touch .zephyrrc
echo "export ZEPHYR_TOOLCHAIN_VARIANT=gnuarmemb" >> ~/.zephyrrc
echo "export GNUARMEMB_TOOLCHAIN_PATH=/usr/" >> ~/.zephyrrc
```

On all platforms, you must run the following command to configure the Zephyr environment whenever you open a new terminal.

```sh
source ~/ncs/zephyr/zephyr-env.sh
```

## Secure Boot

Before your nRF9160 DK can run user applications in the non-secure domain, you must install the [Secure Boot](https://developer.nordicsemi.com/nRF_Connect_SDK/doc/0.3.0/nrf/samples/nrf9160/secure_boot/README.html) firmware.  Connect the nRF9160 DK to your computer via USB, and run the following commands:

```sh
source ~/ncs/zephyr/zephyr-env.sh
cd ~/ncs/nrf/samples/nrf9160/secure_boot
mkdir build
cd build
cmake -GNinja -DBOARD=nrf9160_pca10090 ..
ninja flash
```

## Example application

Finally, we can get down to the business of sending data over NB-IoT.  We have created an [example application](https://github.com/ExploratoryEngineering/nrf9160-example) for this purpose.

Before running the example application, you should follow the instructions from another of our tutorials to install a [serial terminal application](interactive-terminal.html#serial-terminal-application).  This way, you can see the serial output of the application – which is not only convenient for seeing log output but also necessary for you to obtain the IMEI and IMSI of the device, both of which are needed in order to register the device on the NB-IoT Developer Platform.

Once you have your serial terminal application open and connected, and you have connected the nRF9160 DK to your computer via USB, use CMake and ninja to build and flash the example application to the nRF9160 DK, as follows:

```sh
git clone git@github.com:ExploratoryEngineering/nrf9160-example.git
cd nr9160-example
mkdir build
cd build
cmake -GNinja -DBOARD=nrf9160_pca10090 ..
ninja flash
```

Once the application is flashed to the device, it will immediately begin running.  In your serial terminal application you will see a lot of output about Zephyr booting, and then you will see the following application output:

	Example application started.
	IMEI: <imei>
	IMSI: <imsi>

At this point, the application will try to connect to the IoT network, but it will not succeed because the device is not yet registered on the NB-IoT Developer Platform.  Now is the time to copy the IMEI and IMSI and register the device [as described here](getting-started.html).

After registering the device, restart the application by pressing the RESET button on the nRF9160 DK.  You will see the same output as before, but after some time (15-20 seconds, be patient!) you will additionally see that the device connected to the network and sent a message.  On the device page on the Developer Platform you will also see that the message has been successfully transmitted.

Well done!

[1]: https://shop.exploratory.engineering/collections/nb-iot/products/nrf9160-dev-kit
[2]: https://www.nordicsemi.com/Software-and-Tools/Software/nRF-Connect-SDK
