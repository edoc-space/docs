---
title: OpenAPI plugin
description: How to connect @edoc-space/plugin-openapi and render an API reference on an MDX page.
sidebar_label: OpenAPI plugin
sidebar_position: 2
---

# OpenAPI plugin

`@edoc-space/plugin-openapi` renders an OpenAPI specification inside an MDX page: it groups endpoints, shows methods, paths, parameters, request body, and responses.

Use it for an "API" page when the documentation should read a specification from one file instead of repeating it manually.

## Installation

Install the package in the user plugin layer:

```bash
cd local/plugins
yarn add @edoc-space/plugin-openapi
```

or with npm:

```bash
cd local/plugins
npm install @edoc-space/plugin-openapi
```

Package on npm: [@edoc-space/plugin-openapi](https://www.npmjs.com/package/@edoc-space/plugin-openapi)

## Prepare the specification

Place the OpenAPI file in `static`:

```text
local/storage/edoc/static/openapi.json
```

Minimal example:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Project API",
    "version": "1.0.0"
  },
  "paths": {
    "/health": {
      "get": {
        "summary": "Check service health",
        "tags": ["system"],
        "responses": {
          "200": {
            "description": "The application responds"
          }
        }
      }
    }
  }
}
```

The public file path is:

```text
/storage/edoc/static/openapi.json
```

## Create an MDX page

Create a page:

```text
local/storage/edoc/en/pages/api.mdx
```

```mdx
---
title: API
slug: api
nav_label: API
nav_position: 30
---

import { OpenApi } from '@edoc-space/plugin-openapi'

# API

<OpenApi
  source="/storage/edoc/static/openapi.json"
/>
```

After refresh, the page opens at:

```text
/api
```

## Useful props

Configure the component through props:

```mdx
<OpenApi
  title="Project API"
  source="/storage/edoc/static/openapi.json"
  groupBy="tag"
  showSearch={true}
  defaultExpanded={false}
/>
```

Main props:

- `title` - block title;
- `source` - JSON file URL;
- `groupBy` - grouping mode, usually `tag`;
- `showSearch` - whether to show endpoint search;
- `defaultExpanded` - whether operations are expanded by default.

## Check the result

Open the page and check:

- endpoints are grouped by tags;
- methods and paths are visible without expanding all details;
- parameters and responses open inside the correct operation;
- browser console has no `openapi.json` loading error.

If the specification does not load, the most common reason is an incorrect file path. The file should be in `local/storage/edoc/static`, and the component should use `/storage/edoc/static`.

If the package is not resolved, return to [Plugins](/docs/plugins/overview) and check installation in `local/plugins`.
