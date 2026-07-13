# Changelog

## v1.2.0 - 2026-07-13

This release improves large documentation structures and standalone page layout control.

### Added

- Rich intro content for `generated-index` via `index.md`, `index.mdx`, or explicit `content.source`.
- Automatic generated lists after intro content without manually maintained links.
- `sidebar: true` for independent top-level documentation branches.
- `default_sidebar: true` for redirecting `/docs` to the selected branch.
- Scoped sidebar and `prev` / `next` navigation inside the active branch.
- Standalone page container modes via `container`: `fluid`, `constrained`, `wide`, `narrow`.

### Changed

- Markdown links inside intro content now resolve relative to the section directory.
- Search and table of contents include generated-index intro content.
- Standalone page breadcrumbs now align to the same container as page content.
- `container` documentation now explains practical usage and container widths.
- The infrastructure deploy default now targets the stable `v1.2.0` tag.

### Removed

- Temporary `rich-index` live example and empty test page were removed from user navigation.

## v1.1.0 - 2026-07-10

This release expands E-Doc from a documentation renderer into a richer documentation workspace: media previews, video embeds, and a Help Center entry point are now available in core components.

### Added

- Fullscreen image preview for Markdown and MDX images.
- Gallery grouping for images by `gallery` id, including images placed in different parts of a page.
- Lazy video embeds for YouTube, RuTube, and VK Video.
- `HelpCenter`, `HelpSection`, `HelpLink`, and `HelpFaq` MDX components.
- Provider-based search with `memory`, `static`, and API-ready provider modes.
- Static search index endpoint for lazy Help Center search.

### Changed

- Documentation images now render with captions, framing, and size limits for horizontal and vertical media.
- Media examples were added to Markdown/MDX documentation.
- Site page documentation now includes a Help Center example and the future `api` search provider shape.

### Fixed

- VK Video examples now use the `video_ext.php` URL from the iframe `src`.
- Single images open as single-image previews instead of being grouped implicitly.

## v1.0.0 - 2026-07-01

The first stable E-Doc release covers the base workflow: run a self-hosted documentation site, store content in Markdown/MDX files, and extend pages with React plugins without editing core code.

### Added

- Public documentation site with a home page, standalone pages, and `/docs`.
- File-based content model: language folders, `pages`, `docs`, `static`, and `site.json`.
- Markdown and MDX support for pages and documentation.
- Base MDX blocks for home pages and content sections.
- Local plugin layer without changing the core `package.json`.
- First plugins: OpenAPI reference, Changelog, and DirectoryTree.
- Documentation for installation, content structure, plugins, localization, and self-hosted usage.
