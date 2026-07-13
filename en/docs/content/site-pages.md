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
container: constrained
nav_label: About
nav_position: 10
---
```

This part is called front matter. It is not rendered as page text. E-Doc uses it to understand how to name the page and where to show it.

## Page container width

A standalone page can choose its container mode with `container`:

```yaml
container: constrained
```

Available values:

- `fluid` - the container takes the available page width. Use it for home pages, help centers, tables, grids, dashboards, and pages with wide MDX components.
- `constrained` - the standard constrained container up to `1080px`. This is a good default for regular pages with text, several blocks, and moderately wide components.
- `wide` - a wider container up to `1280px`. Use it when cards, comparison tables, OpenAPI blocks, or larger examples need more room without stretching across the whole viewport.
- `narrow` - a narrow container up to `760px`. Use it for text-heavy pages, notes, legal text, and changelogs where comfortable line length matters most.

Breadcrumbs use the same container as the page content, so their left edge aligns with the document start.

On small screens, the modes look almost the same: the container still fills the available width with inner padding. The difference is visible on desktop and wide monitors.

Text page example:

```markdown
---
title: About
slug: about
container: narrow
nav_label: About
---
```

Wide component page example:

```markdown
---
title: API
slug: api
container: wide
nav_label: API
---
```

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
container: constrained
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

If the home page should be a help center, use `HelpCenter`. By default it lazily loads the static `/docs/search-index.json` index only after search is opened:

> `HelpCenter` and `searchProvider` are available since E-Doc v1.1.0.

```mdx
import {
  HelpCenter,
  HelpFaq,
  HelpLink,
  HelpSection,
} from '@/Components/Mdx'

<HelpCenter
  title="Knowledge Base"
  subtitle="How can we help?"
  searchProvider="static"
  searchPlaceholder="Search the knowledge base"
>
  <HelpSection title="Popular tasks" columns={4}>
    <HelpLink href="/docs/receiving" icon="📦">Receiving</HelpLink>
    <HelpLink href="/docs/shipping" icon="📤">Shipping</HelpLink>
    <HelpLink href="/docs/inventory" icon="📋">Inventory</HelpLink>
    <HelpLink href="/docs/labels" icon="🏷">Print a label</HelpLink>
  </HelpSection>

  <HelpSection title="By role">
    <HelpLink href="/docs/roles/employee" icon="👷">Employee</HelpLink>
    <HelpLink href="/docs/roles/manager" icon="👨‍💼">Manager</HelpLink>
    <HelpLink href="/docs/roles/admin" icon="🛠">Administrator</HelpLink>
  </HelpSection>

  <HelpSection title="FAQ" columns={2}>
    <HelpFaq question="How do I choose a warehouse?" href="/docs/start/warehouse" />
    <HelpFaq question="How do I reprint a label?" href="/docs/labels/reprint" />
  </HelpSection>
</HelpCenter>
```

For large projects, switch the same component to a backend search provider later:

```mdx
<HelpCenter
  title="Knowledge Base"
  subtitle="How can we help?"
  searchProvider={{ type: 'api', endpoint: '/api/docs/search' }}
/>
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
