---
title: Blog
description: Publish Markdown and MDX with tag/year filters, pagination and safe metadata.
sidebar_label: Blog
sidebar_position: 7
---

# Blog

The blog is a separate, opt-in collection. It is disabled by default; pages, docs and an ordinary `/blog` page keep their existing behavior. Enable it in the root `site.json`:

```json
{
  "timezone": "UTC",
  "blog": { "enabled": true, "page_size": 10 }
}
```

`page_size` is a positive integer page size. With 13 public articles and a size of 5, the three pages contain 5, 5 and 3 articles. With a size of 6, a set of 17 articles occupies pages of 6/6/5; `?page=4` returns 404 and `?page=0` returns 400. List page size does not affect the latest-articles limit. RSS is available at `/blog/rss.xml`; [RSS details](rss.md) describe the feed contract. Move pages occupying `/blog` or its children before enabling the module: conflicting addresses fail content validation.

## Writing an article

Use `{locale}/blog/**/*.md` for text and `.mdx` for interactive content. The blog does not use documentation versions or its sidebar.

```markdown
---
title: First article
description: What changed and how to use it.
date: '2026-11-13T12:00:00Z'
draft: false
slug: first-post
tags: [php, edoc]
translation_key: first-post
---

## Getting started

Read the [documentation](/docs/content/markdown-and-mdx).
```

Ready articles, including future articles, require nonempty title, description and a valid date. `draft` is boolean and defaults to false; an incomplete draft may omit those three fields. Invalid YAML, dates, duplicate addresses and unsafe dependencies fail preparation even in drafts. Tags are a list of identifiers using letters, numbers, `_` and `-`; duplicates are removed.

Without an explicit slug, the relative path loses its extension and trailing `/index`: `en/blog/notes/first.md` becomes `/blog/notes/first` in the default locale, or `/en/blog/notes/first` when EN has prefix `/en`. Changing the date keeps the URL. Reserved first segments include `tags`, `archive`, `rss.xml`, `_modules`; `index`, hidden paths and traversal are rejected. Slugs are unique within each locale. `translation_key` links existing public translations; hidden translations are never advertised in head metadata.

The optional `image` accepts an existing, intentionally public `/storage/edoc/static/...` file or a safe HTTP(S) URL without credentials. Local availability is validated; remote availability belongs to its server. Its absolute URL is included in article metadata. Initial HTML contains title, description, canonical, language, OG type/url and publication time without JavaScript. The full MDX body requires JavaScript.


### Private card preview

Use a separate `preview` for a photograph or poster owned by an article. For `ru/blog/first-post.mdx`:

```yaml
preview: first-post/cover.jpg
```

The path is relative to the article source directory and restricted to its sidecar (`first-post/`, or the directory of `index.md(x)`). PNG, JPEG, WebP, GIF and AVIF are supported; the raster type must match its extension. Traversal, other sidecars, URLs, SVG and symlinks are rejected. Production builds validate the original and preserve its bytes in private blog output. Card requests never execute MDX.

Shared list and `LatestArticles` summaries add `preview`: a guarded URL of the current build, or `null`. Each whole card is one native link named by its heading, with no nested controls. Photos and posters fit completely inside the media header (`contain`); cards without an image omit that header. Priority: available `preview`, existing public `image`, then a card without an image.

GET/HEAD validate publication, site, locale, generation, metadata, dependencies and output hashes before conditional or Range handling. Draft/future/disabled changes revoke access on the next request. A missing, corrupt or stale build leaves the list readable without its private preview; rebuild the site to restore it. Invalid metadata remains an authoring error, and a missing original fails the build with a diagnostic. Changing `preview` requires a rebuild. Existing `image` and OG remain intentionally public; RSS keeps textual metadata without the private picture. Do not copy sidecars into `static` for cards.

## Tags, years and pages

Readers can choose one tag, one year or their AND intersection. The archive year uses the site timezone: `2025-12-31T23:30:00Z` belongs to 2026 in `Europe/Amsterdam`.

| URL | Result |
| --- | --- |
| `/blog` | First page of public articles |
| `/blog?page=2` | Second page |
| `/blog/tags/php` | Articles with the exact tag `php` |
| `/blog/tags/php?year=2026&page=2` | Second page of the intersection |
| `/blog/archive/2026?page=2` | Second page of the year archive |

Page 1 omits `page`. Changing either filter resets the page and keeps the other condition. “All tags” and “All years” clear their respective conditions. Pagination links retain both conditions. Direct entry, reload, Back and Forward restore the URL state. Tags are case sensitive; Unicode tags such as `заметки` use standard percent encoding in URLs.

Articles, tags and years share one current public view for the site and locale. Tag counts respect the selected year; year counts respect the selected tag. Existing conditions with zero matches remain selectable. Draft/future records cannot add options or counts. Sorting is always `date DESC, slug ASC`, including equal dates.

A zero, negative, fractional, empty or nonnumeric `page`, an array in `page`/`year`, or a malformed four-digit year returns **400**. Values use decimal digits without leading zeroes. Years range from 1000 to 9999; a well-formed year absent from the public archive returns 404. Repeated scalar query parameters follow PHP parsing: the last value wins; a resulting array returns 400. nginx may reject an oversized URL with 414 before the application. Unknown public tags/years and pages beyond the end return **404**, including arbitrarily large integer page numbers. An empty blog or an empty intersection of existing public conditions returns **200** with an empty message.

Initial HTML contains a distinct canonical, title/description, language and Open Graph URL for each page. `page=1` and unrelated query parameters are omitted from canonical; year-only selections use `/blog/archive/<year>`. Combined tag/year selections have `noindex,follow`. The list uses the first article’s public cover on the current page when set. Hidden metadata is excluded. List `hreflang` points only to a public selection/page that exists in the other locale: a missing English page 2 has no invented alternate. The current locale’s RSS alternate is included in the initial head; blog search is not included.

## Dates, drafts and cache

Visibility requires an enabled module, valid data, `draft: false` and `date <= now`. Before publication, direct article and private dependency requests return 404. Lists sort by date descending, then slug ascending. An empty blog returns 200.

The default timezone is UTC. Set an IANA timezone such as `Europe/Amsterdam` explicitly. Local dates use that zone, and a date without time means local midnight. DST gaps are rejected; overlapping local times require an offset, for example `2026-10-25T02:30:00+02:00`. Host timezone does not change publication semantics.

A prepared article becomes available on the first new request at its date, without cron, restart, rebuild or manual cache clearing. Moving the date forward or restoring `draft: true` closes subsequent requests. Metadata cache holds parsed records, while a single request policy evaluates the current clock. Blog and private-file responses use `Cache-Control: no-store`; conditional requests cannot return a stale 304, and Range does not bypass the policy. After publication and output hashes are verified, MP4 supports a single byte range (206), including suffix/open-ended ranges; an unsatisfiable range returns 416. HEAD reports the full length without a body. Other types, multiple ranges and If-Range receive the full response. Responses remain no-store; hidden articles and stale builds deny partial requests too. This cannot erase bytes already downloaded, an open tab or browser history.

## Interactive MDX and private attachments

MDX is trusted author code. It uses the application's React, MDXProvider and contexts, with no second copy of React.

```mdx
import { Counter } from './first-post/Counter.jsx'

## Example

<Counter />
```

```jsx
// en/blog/first-post/Counter.jsx
import { useState } from 'react';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(value => value + 1)}>{count}</button>;
}
```

For `first-post.mdx`, private helpers, CSS, fonts and media belong in its `first-post/` sidecar. For `notes/index.mdx`, use `notes/`; other articles and their assets remain forbidden. Shared private helpers may live in `{locale}/blog/_shared/` and are duplicated in each private graph. `_shared/*.mdx` files do not become articles.

Static imports, literal dynamic imports and finite `import.meta.glob` patterns are supported when their entire closure remains inside allowed roots. Computed or network imports, author `@vite-ignore`, arbitrary runtime deep imports, symlinks, workers/WASM and cross-article dependencies fail the build. Shared exports are `react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`, `@mdx-js/react` and `@edoc/mdx` (author blocks and common MDX contexts). Themes, pages/docs and the public app must not import private blog inputs.

Markdown attachments use the same gate:

```markdown
![Illustration](first-post/cover.svg)
[Download](first-post/notes.pdf)
[Another article](second-post.mdx)
[Page](../pages/about.md)
[Docs](../docs/start/cache.md)
```

Private local attachments require preparation in the article sidecar. `static/` is always public: linking to a static file from a draft does not protect it. Never place confidential content or sources there. Link resolution rejects traversal and dangerous URI schemes.

A relative link to an existing article keeps its canonical URL before its date and after publication is revoked. The source article remains available, while the closed target returns 404; its title, description and body are not added to the source response. Attachment fragments survive in Markdown and MDX, for example `first-post/cover.svg#diagram` or `first-post/notes.pdf#page=2`, including reference syntax. The fragment does not participate in file lookup or bypass publication checks. Valid `%HH` fragment encoding is preserved without double encoding; encoded file paths remain forbidden.

## Production preparation

Run the site's standard `yarn build` in its configured environment. It builds the public app and explicit ESM runtime facades, then a separate private graph for each article, including future articles and drafts. Private chunks never enter the public manifest, public/static or source maps.

Public outputs live in `public/build`. Persistent private artifacts live in `local/build/blog/<generation>/<article-key>/`, with a private `active.json`. They are separate from metadata cache and survive cache pruning. PHP needs read access; nginx must have no alias to this directory. Keep separate outputs for each site, together with their matching public build and sources. Inconsistent activation closes access; only a completed private generation becomes active.

A new MDX body, changed helper, CSS, media or private attachment requires a new build. Date/draft alone change visibility without rebuilding. Body/input digest mismatches require preparation rather than serving an old body under new metadata. Old generations, another site or locale, ABI mismatch and corrupt outputs are denied. The `/blog/_modules/...` namespace always passes through the guard, even with the module disabled or a matching file in public.

Themes may replace `BlogList` and `BlogArticle` through the [theme contract](themes), preserving engine policy and URLs. Missing slots fall back to default. Filters and pagination share the same contract in both themes. RSS is available at `/blog/rss.xml`; [RSS details](rss.md) describe the feed contract.

## Interface example

These screenshots show the default production theme with synthetic RU articles. They do not include the personal site or its private design.

![Blog list, default](/storage/edoc/static/examples/blog/default-list-desktop.png)

![Interactive MDX, default](/storage/edoc/static/examples/blog/default-mdx-desktop.png)

![Mobile MDX, default](/storage/edoc/static/examples/blog/default-mdx-mobile.png)

The following current screenshots show page 2 of `php` + 2026, the last unfiltered page, the mobile archive and an empty intersection. All use the synthetic 13/8/6 dataset in the default theme.

![Tag + year, page 2](/storage/edoc/static/examples/blog/default-filters-desktop.png)

![Last page](/storage/edoc/static/examples/blog/default-pagination-desktop.png)

![Year archive on mobile](/storage/edoc/static/examples/blog/default-archive-mobile.png)

![Empty intersection](/storage/edoc/static/examples/blog/default-filter-empty-mobile.png)

## RSS and latest articles

In the default theme, the RSS link in the list/article opens the current locale’s `/blog/rss.xml` feed. It contains every currently public summary in `date DESC, slug ASC` order, without pagination or tag/year selection. It uses the same date/draft policy as the list and [latest articles on pages](content-model.mdx#latest-articles-on-pages). Descriptions are metadata, never MDX bodies. There is no email form, address collection or delivery service. See [RSS](rss.md) for XML, locale and client behavior.


RSS link in the default theme using 13 synthetic Russian articles (production, mobile 390 × 520):

![Default blog and RSS link](/storage/edoc/static/examples/composition/default-blog-rss-mobile.png)

