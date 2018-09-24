---
title: Tags
lunr: true
nav_groups:
  - primary
tags:
  - tags
---

<div class="tn-p tn-hint">
In these examples an application is used but the tag resource is identical for both applications, gateways and devices. Replace the URL as appropriate.
</div>

## `.../tags`
Listing the associated tags on the application is a simple `GET`:
```bash
$ curl -HX-API-Token:<your-token> https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/tags
{
    "bar": "baz",
    "foo": "bar"
}
```

Add a new tag to the application by `POST`ing to the resource:

```bash
$ curl -HX-API-Token:<your-token> -XPOST -d'{"The first name": "a value", "A second name": "another value"}' https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/tags
{
    "bar": "baz",
    "foo": "bar",
    "a second name": "another value",
    "the first name": "a value",
}
```

Note that all of the tags are returned when you create a new one. You can create multiple name:value pairs at the same time. The values are immutable so you can't overwrite an existing tag. The names and values are limited to the following characters: `A-Z`, `a-z`, `0-9` and `:_\-+@,.` plus space. 

<div class="tn-p tn-hint">
If you need UTF-8 storage you can base64 encode the name and value before storing it.
</div>

You can access a tag directly by accessing the tag by its name:

```bash
$ curl -HX-API-Token:<your-token>   https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/tags/a%20second%20name

another value
```

The returned value is `text/plain`

<div class="tn-p tn-hint">
You can use this feature if you want to include tag values in shell scripts
</div>

Remove the tag via the `DELETE` method:

```bash
$ curl -HX-API-Token:<your-token> -XDELETE  https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/tags/foo

$ curl -HX-API-Token:<your-token> -XDELETE  https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/tags/bar

$ curl -HX-API-Token:<your-token> https://api.lora.telenor.io/applications/00-09-09-00-00-00-00-29/tags
{
    "a second name": "another value",
    "the first name": "a value"
}
```
