---
title: Deploying
description: Tips and tricks to deploy the finished documentation.
lunr: true
nav_sort: 4
nav_groups:
  - primary
tags:
  - deploy
  - travis
collection: gettingstarted
order: 5
---
After building, the `build` folder contains standalone, static html files that can be published to any web server.

## Automatic deployment using travis-ci

The scaffold includes a `.travis.yml` configuration that automatically builds the master branch on change and publishes the `build` folder to the `gh-pages` branch. To use it set up the repository on [travis-ci](https://travis-ci.org/) and add an environment variable named `GITHUB_TOKEN` that has push access to the repository. You can read more on the [travis-ci documentation](https://docs.travis-ci.com/user/deployment/pages/).

### Security warning

Note that anyone that can push changes to the build script can print out the `GITHUB_TOKEN` added to travis-ci in the build log. The token can then be used to control all repositories that the user it came from has access to. It is therefore strongly advised to **create a github account that only has access to the documentation repository** and use it to generate the token rather than entering a token from a personal account.
