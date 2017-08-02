---
title: Open API Spec
nav_sort: 2
nav_groups:
  - primary
---
Files with `.json`, `.yml`, `.yaml` or `.openapi` extensions will be parsed by [metalsmith-swagger-ui](https://github.com/TelenorFrontend/metalsmith-swagger-ui) and displayed in the browser with the help of [SwaggerUi](https://github.com/swagger-api/swagger-ui) with a custom skin found at [swagger-ui-docs-preset on github](https://github.com/TelenorFrontend/swagger-ui-docs-preset).

`.json`, `.yml` and `.yaml` files should simply include the appropriate front matter followed by the spec. `.openapi` files should only contain front matter including a `openApiUrl` value that is an url pointing to the specification.
