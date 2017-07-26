---
title: Getting started
nav_sort: 1
nav_groups:
  - primary
nav_group: true
---
To start a new documentation project, start by cloning or forking the [docs-scaffold](https://github.com/TelenorFrontend/docs-scaffold) repository.

Fork using the graphical interface on GitHub, or run the following command.

> $ git clone https://github.com/TelenorFrontend/docs-scaffold.git

The docs-scaffold includes build scripts, templates, layouts, example pages and a little javascript that you can use as-is or modify to your liking.

Make sure you install all dependencies by running

> $ npm install

Start by modifying the config files in the `config` folder, and the documentation itself in the `docs` folder.

To build the documentation, all you have to do is run the npm script `build`. This will package all the assets and generate static html pages from the documentation in the `docs` folder.

> $ npm run build

To deploy the newly generated documentation, simply publish the `build` folder to any web server.
