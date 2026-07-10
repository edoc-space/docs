---
title: Site pages
description: How to create standalone pages, add them to the menu, and use MDX blocks.
sidebar_label: Site pages
sidebar_position: 2
---

# Site pages

Site pages are materials outside the main `/docs` section. They are useful for the home page, project overview, plugin pages, changelog, or any page that should live in the top navigation.

These files live in:

```text
local/storage/edoc/en/pages
```

## Markdown or MDX

For regular text, `.md` is enough:

```text
pages/about.md
```

If a page needs React components, use `.mdx`:

```text
pages/index.mdx
```

Simple rule:

- `.md` - text, headings, lists, links, images, and code blocks;
- `.mdx` - all of the above plus components such as `Hero`, `Grid`, `Feature`, `OpenApi`, and `Changelog`.

Do not start with MDX when a page is just plain text.

## Front matter

At the beginning of the page, you can provide settings:

```markdown
---
title: About
description: A short overview of the project and its documentation.
slug: about
nav_label: About
nav_position: 10
---
```

This part is called front matter. It is not rendered as page text. E-Doc uses it to understand how to name the page and where to show it.

## Create a simple page

Create a file:

```text
local/storage/edoc/en/pages/about.md
```

Content:

```markdown
---
title: About
description: What this project is and where to find documentation.
slug: about
nav_label: About
nav_position: 10
---

# About

Briefly explain who this project is for and where the reader should start.
```

After refresh, the page is available at:

```text
/about
```

The `About` item appears in the top navigation.

## Hide a page from the menu

If a page should be available by URL but should not appear in navigation, omit `nav_label` or add:

```yaml
nav_hidden: true
```

This is useful for service pages, drafts, or pages linked only from other content.

## Menu order

Order is controlled by `nav_position`:

```yaml
nav_position: 20
```

The lower the number, the earlier the item appears in navigation.

If several pages have no position, they are sorted by title.

## Home page

The home page is:

```text
local/storage/edoc/en/pages/index.mdx
```

It does not need a `slug`: `index.mdx` automatically maps to `/`.

The home page usually uses MDX because it needs blocks:

```mdx
import { Hero, Section, Grid, Feature } from '@/Components/Mdx'

<Hero
  title="E-Doc"
  subtitle="Documentation as code for self-hosted projects."
  href="/docs"
  label="Get started"
/>

<Section title="What it is for">
  E-Doc helps store documentation in files and publish it as a site.
</Section>

<Grid columns={3}>
  <Feature title="Markdown">Write text in regular `.md` files.</Feature>
  <Feature title="MDX">Add React blocks where Markdown is too limited.</Feature>
  <Feature title="Git">Update documentation together with the project.</Feature>
</Grid>
```

## Page with a plugin

An MDX page can import a plugin component:

```mdx
---
title: API
slug: api
nav_label: API
nav_position: 30
---

import { OpenApi } from '@edoc-space/plugin-openapi'

# API

<OpenApi source="/storage/edoc/static/openapi.json" />
```

This is how you build pages that would be inconvenient to maintain manually in Markdown.

## Common mistakes

### Page does not open

Check:

- the file is inside `local/storage/edoc/en/pages`;
- the extension is `.md` or `.mdx`;
- `slug` does not start with `/`;
- YAML front matter has no indentation errors.

### Page did not appear in the menu

Check:

- `nav_label` is set;
- `nav_hidden: true` is not set;
- `site.json` includes navigation source `pages`.

### MDX import does not work

Check:

- the package is installed in `local/plugins`, not in the core `package.json`;
- Vite dev server was restarted after installing a new package;
- the import name matches the package name.

## Next step

After standalone pages, move to project documentation: sections, directories, and `index.json`.
