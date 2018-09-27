---
title: Status codes
lunr: true
nav_sort: 90
nav_groups:
  - primary
tags:
  - http
  - rest
  - api
---

The API returns a standard set of error codes. As a general guideline these are
the reasons the status codes are returned:

| Status | Reason
| ------ | ------------
| 200    | Successful request, usually as a response to a GET method.
| 201    | Created; usually in response to a successful POST method.
| 204    | No content; usually in response to a successful DELETE method.
| 400    | Bad request; usually an incorrect parameter has been used.
| 401    | Unauthorized; usually a request without an appropriate token or authentication.
| 403    | Forbidden; usually because you do not have write access to an entity.
| 404    | Not found; usually because an entity can't be found.
| 409    | Conflict; usually becaus an entity can't be updated in its current state.
| 500    | Internal server error. Hopefully you won't see this error since it is our fault.
