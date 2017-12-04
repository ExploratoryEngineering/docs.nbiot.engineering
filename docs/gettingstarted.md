---
title: Getting Started
description: The getting started page guides you through starting a new documentation project using the documentation scaffold.
lunr: true
nav_sort: 2
nav_groups:
  - primary
nav_subgroup: true
tags:
  - starting
  - setup
collection: gettingstarted
order: 1
---
To start a new documentation project, start by cloning or forking the [docs-scaffold](https://github.com/TelenorFrontend/docs-scaffold) repository.

Fork using the graphical interface on GitHub, or run the following command.

```shell
$ git clone https://github.com/TelenorFrontend/docs-scaffold.git
```

The docs-scaffold includes build scripts, templates, layouts, example pages and a little javascript that you can use as-is or modify to your liking.

Make sure you install all dependencies by running

```shell
$ npm install
```

Start by modifying the config files in the `config` folder, and the documentation itself in the `docs` folder.

To start the development server run the following command.

```shell
$ npm run dev
```

To build the documentation run the npm script `build`. This will package all the assets and generate static html pages from the documentation in the `docs` folder.

```shell
$ npm run build
```

To deploy the newly generated documentation, simply publish the `build` folder to any web server.
