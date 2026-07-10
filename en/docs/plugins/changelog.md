---
title: Changelog plugin
description: How to connect @edoc-space/plugin-changelog and render release history on an MDX page.
sidebar_label: Changelog plugin
sidebar_position: 3
---

# Changelog plugin

`@edoc-space/plugin-changelog` renders release history from Markdown or JSON. It is useful for a "Changelog" page, release notes, or a compact product history.

The plugin does not force you to maintain changes in a separate system. The source stays as a file in `static`.

## Installation

Install the package in the user plugin layer:

```bash
cd local/plugins
yarn add @edoc-space/plugin-changelog
```

or with npm:

```bash
cd local/plugins
npm install @edoc-space/plugin-changelog
```

Package on npm: [@edoc-space/plugin-changelog](https://www.npmjs.com/package/@edoc-space/plugin-changelog)

## Prepare a Markdown file

Create a file:

```text
local/storage/edoc/static/changelog.en.md
```

Minimal example:

```markdown
# Changelog

## v1.1.0 - 2026-07-10

### Added

- Added a public API page.
- Added documentation search.

### Fixed

- Fixed navigation between sections.
```

The public file path is:

```text
/storage/edoc/static/changelog.en.md
```

## Create an MDX page

Create a page:

```text
local/storage/edoc/en/pages/changelog.mdx
```

```mdx
---
title: Changelog
slug: changelog
nav_label: Changelog
nav_position: 40
---

import { Changelog } from '@edoc-space/plugin-changelog'

# Changelog

<Changelog
  source="/storage/edoc/static/changelog.en.md"
/>
```

After refresh, the page opens at:

```text
/changelog
```

## Useful props

Configure the component through props:

```mdx
<Changelog
  source="/storage/edoc/static/changelog.en.md"
  repositoryUrl="https://github.com/edoc-space/edoc"
  categoryLabels={{
    added: 'Added',
    fixed: 'Fixed',
    changed: 'Changed'
  }}
/>
```

Main props:

- `title` - block title;
- `source` - Markdown or JSON file URL;
- `repositoryUrl` - repository URL if tasks and changes should be linked;
- `categoryLabels` - labels for change categories.

## JSON source

If Markdown is inconvenient, use JSON:

```json
{
  "entries": [
    {
      "version": "1.1.0",
      "date": "2026-07-10",
      "changes": {
        "added": [
          "Added a public API page."
        ],
        "fixed": [
          "Fixed navigation between sections."
        ]
      }
    }
  ]
}
```

For most projects, Markdown is simpler: it is easy to read in the repository and edit without generation.

## Check the result

Open the page and check:

- releases appear in the expected order;
- categories have understandable labels;
- the Markdown file opens by direct URL;
- browser console has no `changelog.en.md` loading error.

If the package is not resolved, return to [Plugins](/docs/plugins/overview) and check installation in `local/plugins`.
