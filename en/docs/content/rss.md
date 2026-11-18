---
title: RSS
description: Public locale-specific RSS 2.0 blog feeds without email subscriptions.
sidebar_position: 8
---

# RSS

With `blog.enabled=true` in the root `site.json`, the current locale’s feed is available at `/blog/rss.xml`, or `/en/blog/rss.xml` when its prefix is `/en`. Open **RSS** in the list or article and copy its address into your RSS reader. A browser may show XML source or offer a download; that depends on its viewer and is not a subscription form.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Example · Blog</title>
    <link>https://example.test/blog</link>
    <description>Site description</description>
    <language>en</language>
    <item>
      <title>First article</title>
      <link>https://example.test/blog/first-post</link>
      <guid isPermaLink="true">https://example.test/blog/first-post</guid>
      <pubDate>Fri, 13 Nov 2026 12:00:00 +0000</pubDate>
      <description>A short description &amp; next step.</description>
    </item>
  </channel>
</rss>
```

This is a synthetic structural example. Your site’s origin comes from the actual HTTP request through the shared SEO helper and configured trusted proxy boundary. Verify the external HTTPS origin in production so links do not point at an internal acceptance host.

The media type is `application/rss+xml; charset=UTF-8`. Channel `title`, `link`, `description` and `language` describe the site. Each item contains its title, absolute `link` and `guid`, RFC 822 date and description from article frontmatter. The GUID equals the article canonical and stays stable across date edits; changing the slug or origin changes URL identity. A standard XML writer escapes XML characters. MDX is never executed; full bodies, private descriptors and source paths are excluded.

## Visibility and freshness

A feed contains all currently public articles in its locale, without tag/year selection or pagination, ordered by `date DESC, slug ASC`. It shares the public set with the [blog](blog.md) and [opt-in page collection](content-model.mdx#latest-articles-on-pages). An article is absent before its publication date and appears on the first new request at that date. Setting draft or moving the date forward revokes it without rebuilding or clearing cache. An enabled empty blog returns a valid channel with no items; a disabled blog returns 404 for the feed.

GET and HEAD use `Cache-Control: no-store`, with no ETag/Last-Modified or stale 304. HEAD returns the same headers without a body. A server cannot erase copies already stored by a feed reader. Date, draft and enabled state do not need a build; MDX body or dependency changes still require a separate production build of that site.

The list and article in both themes expose an RSS link, and initial HTML head includes `<link rel="alternate" type="application/rss+xml">` for the current locale. Tag, year and page selections do not turn it into a different feed. [Locale rules](languages.mdx) remain in effect.

RSS collects no addresses and stores no subscribers. Email forms, email delivery, comments and subscriber management are outside this scenario.


RSS link in the default theme using 13 synthetic Russian articles (production, mobile 390 × 520):

![Default blog and RSS link](/storage/edoc/static/examples/composition/default-blog-rss-mobile.png)
