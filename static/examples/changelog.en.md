# Changelog

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
