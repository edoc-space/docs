---
title: Site themes
description: Select a complete site theme, override components and validate the production build.
sidebar_label: Site themes
sidebar_position: 3
---

# Site themes

A theme controls the shell, components and styles. Content, URLs, languages, documentation search and visibility belong to E-Doc. With no configuration, the built-in `default` theme preserves the existing site.

## Select a theme

Only the root `local/storage/edoc/site.json` selects a theme:

```json
{ "theme": { "id": "local" } }
```

| ID | Source |
| --- | --- |
| `default`, or omitted setting | Default theme shipped with the engine. |
| `local` | `theme/` inside the site's content root. |
| `@vendor/theme-name` or `theme-name` | An installed npm package containing `theme.json`. |

Localized site configuration, front matter, query strings and HTTP headers cannot choose an import path. Every locale uses the same site build.

A local theme contains `theme/theme.json`, `theme/index.tsx` and optional styles/assets. Its descriptor is:

```json
{ "contractVersion": 1, "entry": "index.tsx" }
```

The entry must be an existing JS/TS module inside the theme. NUL, control characters and URL/query syntax are rejected before filesystem operations. Absolute paths, traversal and internal symbolic links are rejected. The content or installed package root itself may be a symbolic link.

## Contract v1

```tsx
import React from 'react';
import { defaultSlots } from '@/Themes/api';
import type { SiteTheme, SiteHeaderProps } from '@/Themes/api';
import './theme.css';

function Header(props: SiteHeaderProps) {
  const DefaultHeader = defaultSlots.Header;
  return <DefaultHeader {...props} className={`${props.className} custom-header`} />;
}

export default {
  contractVersion: 1,
  slots: { Header },
} satisfies SiteTheme;
```

Missing slots fall back to the default implementation:

| Slot | Props |
| --- | --- |
| `SiteShell` | `SiteShellProps`: kind, children, HTML attributes. |
| `Header` | `SiteHeaderProps`: navigation, brand, locales, active URL, extra controls. |
| `Footer` | `SiteFooterProps`: site, configured footer and navigation. |
| `Page` | `PageProps`: complete standalone page. |
| `Documentation` | `DocumentationProps`: complete documentation view including search, tree and TOC. |
| `Error` | `ErrorProps`: status, title, message and request data. |

`@/Themes/api` exports all prop types, `defaultSlots`, `MarkdownDocument`, `MdxDocument`, `mergeLocaleAlternates` and `usePageScrollRestoration`. Other internal helpers are not a stable theme API. Default views use the selected shell/header/footer automatically. A completely custom Page/Documentation/Error view must compose those components itself.

Preserve `afterNav`, `mobileControls` and locale props in a replacement header: documentation uses them for search, versions and mobile navigation. Blog slots will arrive with the blog module; this iteration adds no blog routes.

## Placing search, version and language controls

Use the built-in controls independently in your `Documentation` template. This example places them beside the navigation tree in a sidebar:

```tsx
import { DocsSearch, DocsVersionDropdown, LanguageSwitcher, mergeLocaleAlternates } from '@/Themes/api';
import type { DocumentationProps } from '@/Themes/api';

function SidebarControls({ documentation, web, meta }: DocumentationProps) {
  const ui = web?.ui ?? {};
  const locales = mergeLocaleAlternates(web?.locales, meta?.alternates);

  return (
    <>
      {documentation.search.length > 0 && (
        <DocsSearch
          provider={{ type: 'memory', entries: documentation.search }}
          textLocale={web?.locale?.code ?? 'ru'}
          ui={ui}
        />
      )}
      <DocsVersionDropdown versions={documentation.versions} ui={ui} align="left" />
      <LanguageSwitcher locales={locales} ui={ui} align="left" />
    </>
  );
}
```

Each control can be moved to a different part of the template. On a regular page, the language switcher uses the same `web.locales` and `meta.alternates` data. The language switcher is hidden when only one language is configured. The version switcher is hidden when versions are disabled.

Leave enough room for the dropdown menus and keep the controls reachable on narrow screens. When CSS changes their placement, account for keyboard focus order. Search registers Ctrl/Cmd+K for the entire page. Render a single instance and reuse it at different viewport widths.

## CSS and accessibility

CSS order is ReactSoftBox foundations → common content/layout styles → default tokens → selected theme CSS. Import theme CSS from the entry. Override variables such as `--color-body-bg`, `--color-text`, `--color-muted`, `--color-line`, `--font-sans`, `--font-mono` and `--surface-card`. Use `:root, :root[data-theme="light"]` to override default tokens.

Check mobile navigation, Tab/Enter/Escape, visible focus, contrast, language switching, search, TOC, code, images and interactive MDX. An additional dark mode is not part of this contract.

## Installed packages and ownership

Each package contains `package.json`, `theme.json` and an entry module. Resolution checks the content root's `node_modules`, then the engine's `local/plugins/node_modules`, then its `node_modules`. Avoid duplicate installations with different versions.

Install and pin dependencies in the managed build profile before building. Runtime never downloads packages or Git repositories. The package must remain available on the PHP server for fingerprint validation. This feature does not add a package installer.

Default stays in the engine. Additional official themes are planned as packages in one shared repository; community themes remain with their authors. A separate Git repository per theme is unnecessary. Keep private site code and screenshots in the private content repository or private evidence.

## Build and diagnose

Run `yarn build` from the engine in the managed environment for that site. Mount the same content root at `local/storage/edoc` for the build and PHP. Every site requires separate outputs.

Vite writes schema 2 `public/build/theme.json` with `schemaVersion`, `id`, `source`, `contractVersion`, `fingerprint` and `inputs`. Inputs contain hashes of consumed files and shallow directory inventories, referenced relative to logical roots without absolute paths. Schema 1 manifests are stale and require a rebuild.

The fingerprint covers engine/theme sources, transitive JS/npm imports, imported assets (including `resources/images/logo.svg`), CSS `@import`/`url()`, dependency package.json files and build preparation sources. Directory inventories detect added resolution candidates, including packages within an existing scope (`@vendor`) at every nested or symlinked `node_modules` lookup location. Creation of engine runtime `local/cache`, `local/logs`, `local/tests` or build-cache does not change these inventories; explicitly imported files from them remain ordinary checked inputs. PHP checks recorded inputs without walking the entire `node_modules`; base theme traversal prunes `.git`/`node_modules` before descending.

Supported filesystem roots are the site, engine, selected theme and the three installed dependency locations described above. A helper or asset may live outside `theme/` within the site root. Package themes can use other installed packages and the engine API. An import outside these roots fails the build with safe `theme.invalid`; move the input into a supported root. Build plugins must declare extra dependencies through standard `addWatchFile`: an existing file or directory, using an absolute path or a path relative to the build process working directory, independently of Vite root. An explicitly watched directory covers its complete nested tree, including hidden directories: file contents, additions and removals. The manifest separately records declared path identity (`resolve`), file hashes and exact `watchdir` inventories; PHP checks those records without discovering new subtrees. Retargeting a symlink in a declared file, directory or intermediate path component makes the old build stale even when the old target stays on disk. Each alias resolution is captured before canonical target traversal is deduplicated. Diagnostics clear PHP’s realpath cache so a long-lived worker sees switches made by another process. Ordinary resolution-inventory exclusions do not apply to an explicit directory watch. Missing inputs, special files and symlinks outside the allowed roots fail with `theme.invalid` instead of being ignored; generated/virtual modules that omit this declaration cannot promise validation of hidden inputs. Runtime HTTP URLs and deliberately public static assets are not bundled imports, so remote response content is not fingerprinted.

Rebuild after changing any recorded input. Keep matching source, assets and dependencies together through the authorized publication workflow.

In `APP_ENV=prod`, PHP validates the manifest before serving the application. An invalid selection returns 503 with `Cache-Control: no-store` and a safe diagnostic instead of loading the wrong bundle:

| Code | Action |
| --- | --- |
| `theme.unknown` | Check the ID and install/provide the selected theme. |
| `theme.incompatible` | Use a theme with `contractVersion: 1`. |
| `theme.invalid` | Fix JSON, entry or forbidden filesystem links. |
| `theme.stale` | Rebuild the site and update its manifest/assets with the source. |

The production guard is disabled in dev/test; build-time resolution is always validated.


## Default theme examples

An ordinary page with synthetic content and the documentation share the `default` shell. A local theme can change the design while preserving these content workflows.

![An ordinary page in the E-Doc default theme](/storage/edoc/static/examples/themes/default-page-desktop.png)

![English documentation in the E-Doc default theme](/storage/edoc/static/examples/themes/default-docs-en-desktop.png)

These are actual production build captures at 1440 × 900. Private themes and their screenshots are kept outside this public guide.


## Shared blocks and states

Themes style the shared card regions (`markdown-card__media`, `markdown-card__metadata`, `markdown-card__content`, `markdown-card__actions`) and `collection-filters`. Data, canonical URLs, public summaries and server selection remain in the engine. Blog slots retain their props and real URLs. UI/head RSS use the current locale.

The [block catalog](block-catalog.mdx) shows fields and validation, buttons, badges, tabs, FAQ, feedback, dialogs, tooltips and media in the selected theme. Dialogs share the focus lifecycle; tabs support arrows/Home/End and independent instances. External video loads only on explicit intent. Forms do not send data. New animations respect reduced motion.

Keep local theme CSS/assets in its own repository, and public documentation screenshots in default. Clip decorative layers without increasing the document’s horizontal scroll area.


A home page fragment with a fresh article selection in default, a production build using synthetic data:

![Article selection on the home page](/storage/edoc/static/examples/composition/default-home-desktop.png)


### Documentation and shared block geometry

The docs shell measures the actual Header with ResizeObserver and shares `--docs-header-height` with the grid and sticky panels. A theme can change header height without maintaining a separate sidebar offset. The footer sits beside the sidebar action area. Its measured height is shared through `--docs-footer-height`; `--docs-bottom-height` sets the footer minimum.

Adjust card media through `--markdown-card-padding` rather than adding an inset image frame. A whole-card link receives focus on `.markdown-card-link`. MDX Tabs retains the UI-kit and keyboard behavior; `.markdown-tabs--ui` resolves legacy clipping/gap conflicts, joining the tabs to a rectangular panel. Gallery, Slider and Video are centered within the content column and limited to 860 px. On narrow screens they fill the available width, preserving captions, preview and navigation controls. Video only loads an external iframe after a click.


The documentation bottom area in the default theme, using the actual E-Doc tree:

![Docs footer](/storage/edoc/static/examples/composition/default-docs-footer.png)


MDX Tabs geometry and centered Video in the default theme:

![Tabs](/storage/edoc/static/examples/composition/default-tabs-desktop.png)

![Video](/storage/edoc/static/examples/composition/default-video-desktop.png)

The footer receives `footer.feedUrl`: the current locale RSS URL from server blog configuration, or `null` when disabled. It is available on pages, documentation, blog and errors independently of menu items. A theme may show a named RSS icon in its Footer and hide the default `.blog-rss` within its own shell. The default theme keeps the heading link. A theme also controls `.blog-card__description` visibility; descriptions remain in summaries, SEO and RSS.
