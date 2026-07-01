---
title: Introduction
description: What E-Doc is, why it exists, and how it differs from a CMS.
sidebar_label: Introduction
sidebar_position: 1
translation_key: docs.start.introduction
---

# Introduction

E-Doc helps you publish project documentation without a heavy CMS, a separate database, or a browser-based editor. Documents stay as regular files: you can keep them in the repository, review them in pull requests, update them together with code, and move them between environments without exporting anything from an admin panel.

It is a good fit when documentation is written by developers, technical writers, or a project team that already works through git.

## What E-Doc does

E-Doc takes Markdown and MDX files from the local project structure and turns them into a documentation site:

- home and standalone pages live separately;
- project documentation opens under `/docs`;
- the left sidebar is built from files and directories;
- images and additional files are stored next to documentation;
- React components can be added through MDX and plugins.

The main idea is simple: content belongs to the project, while E-Doc handles rendering, navigation, and page extension.

## How it differs from a CMS

In a CMS, content usually lives in a database and publishing depends on an admin interface. That is useful for editorial workflows, but it is often too heavy for project documentation.

E-Doc works the other way around:

- text lives in files;
- change history is visible in git;
- documentation can be changed through the same process as code;
- updating the engine should not touch user content.

This makes E-Doc closer to the Docusaurus or GitBook approach, but as a self-hosted PHP application that can gradually extend pages with React components.

## When E-Doc fits

E-Doc works well for projects where:

- documentation should live next to code;
- the team wants to review documentation changes through pull requests;
- a self-hosted site is preferred over an external SaaS;
- Markdown is enough most of the time, but MDX blocks are sometimes needed;
- OpenAPI, changelog, tabs, cards, or other React components should be easy to add.

The first practical scenario is straightforward: start the site, add a few Markdown files, create a home page, and grow the structure over time.

## When to choose another tool

E-Doc does not try to replace a full CMS or a site builder. If you need a visual editor, complex permissions, editorial scheduling, versions for dozens of products, or publishing without git, a dedicated platform will be a better choice.

E-Doc is aimed at teams that value simple storage, change control, and predictable updates of a self-hosted installation.

## Next step

If you want to see a working result first, go to [Quick start](/docs/start/quick-start). It creates the first page and shows where it appears on the site.
