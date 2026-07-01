---
title: Project documentation
description: How to create sections and documents in /docs, control order, and link pages.
sidebar_label: Project documentation
sidebar_position: 3
---

# Project documentation

The `/docs` section is for main project documentation: introduction, installation, guides, references, and internal agreements.

Unlike standalone site pages, documentation usually grows as a tree. It has sections, nested documents, links between pages, and ordering in the left sidebar.

## Minimal example

You can start with one file:

```text
local/storage/edoc/en/docs/start/introduction.md
```

```markdown
---
title: Introduction
description: Where to start working with the project.
sidebar_position: 1
---

# Introduction

Briefly explain what this project is and where to go next.
```

After saving, the document opens at:

```text
/docs/start/introduction
```

## Create a section

When there are more documents, group them into directories:

```text
local/storage/edoc/en/docs/
  start/
    index.json
    installation.md
    configuration.md
```

The `index.json` file describes the section:

```json
{
  "label": "Getting started",
  "description": "First steps after installing the project.",
  "position": 10,
  "collapsed": false,
  "link": { "type": "generated-index" }
}
```

This tells E-Doc:

- how to name the section in the left sidebar;
- where to place it among other items;
- whether the section should be collapsed by default;
- whether to create a generated index page for the directory.

## Create a document inside a section

A document inside a directory has the same structure as a root document:

```text
local/storage/edoc/en/docs/start/installation.md
```

```markdown
---
title: Installation
description: How to prepare the environment and open the site locally.
sidebar_position: 1
---

# Installation

Describe installation steps so the reader sees a result after each step.
```

The page opens at:

```text
/docs/start/installation
```

## Sidebar order

Documents use `sidebar_position`:

```yaml
sidebar_position: 20
```

Sections use `position` in `index.json`:

```json
{
  "label": "Configuration",
  "position": 30
}
```

The lower the number, the higher the item appears in the sidebar. If no position is provided, E-Doc sorts items by title.

## Page descriptions

`description` helps readers understand why they should open a page. It is used in generated section indexes and search results:

```yaml
description: How to connect an OpenAPI specification to a documentation page.
```

A good description answers "what will I find here" instead of repeating the title.

## Generated section index

If `index.json` contains a generated index link:

```json
{
  "label": "Content",
  "link": { "type": "generated-index" }
}
```

the directory itself becomes a page. E-Doc shows nested documents and their descriptions there.

This is useful for larger sections: the reader opens the section and sees what topics it contains.

## Links between documents

Use regular Markdown links:

```markdown
[Go to configuration](configuration.md)
```

If pages are in the same directory, a relative link is usually clearer than an absolute one. Relative links are also easier to keep when moving a section.

You can link to a heading inside a document:

```markdown
[Check the result](installation.md#check-the-result)
```

## When to create a new section

Create a section when:

- it already contains several related pages;
- the topic needs its own overview;
- users will look for it as an independent part of the documentation.

If a page is alone and does not need grouping, keep it as a regular document in `/docs`.

## Next step

When the structure is ready, review content formats: [Markdown and MDX](/docs/content/markdown-and-mdx) explains when plain text is enough and when React components are useful.
