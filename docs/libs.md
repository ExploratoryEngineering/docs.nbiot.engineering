---
title: Client libraries
lunr: true
nav_sort: 3
nav_groups:
  - primary
nav_subgroup: true
tags:
  - client
  - library
  - api
  - rest
  - http
---

We provide several client libraries that you can use to manage your devices programmatically:

* [C#](https://www.nuget.org/packages/TelenorNBIoT/)
* [Go](https://github.com/telenordigital/nbiot-go)
* [Java](https://search.maven.org/artifact/engineering.exploratory/nbiot-java/)
* [Python](https://pypi.org/project/telenor-nbiot/)

If your language is not yet supported, you can access the [REST API](api.md) directly.

## Configuration

All of the clients require an API token for authorization.
This token can be set in a configuration file, in an environment variable, or directly in program code.

The configuration file is located at `${HOME}/.telenor-nbiot`. The file is a simple
list of key/value pairs. Additional values are ignored. Comments must start
with a `#`:

    #
    # This is the URL of the Telenor NB-IoT REST API. The default value is
    # https://api.nbiot.telenor.io and can usually be omitted.
    address=https://api.nbiot.telenor.io

    #
    # This is the API token. Create new token by logging in to the Telenor NB-IoT
    # front-end at https://nbiot.engineering and create a new token there.
    token=<your api token goes here>


The configuration file settings can be overridden by setting the environment
variables `TELENOR_NBIOT_ADDRESS` and `TELENOR_NBIOT_TOKEN`. If you only use environment variables
the configuration file can be ignored.  Finally, there is a Client constructor that
accepts the address and token directly.
