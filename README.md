# HappyAssa

A minimal, English-only personal site built with Eleventy. Static HTML and CSS, system fonts, no browser JavaScript, animations, shadows, accounts, or external font services.

## Develop

Use Node.js 22 or newer.

```sh
npm install
npm start
```

Open the local URL printed by Eleventy (normally http://localhost:8080). Changes to content, templates, and CSS rebuild automatically. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

```sh
npm run build
```

The generated website is in `_site/`. Edit source files in `src/`, not generated files.

## Make it yours

- `src/_data/site.json`: site name, description, and about text.
- `src/_data/projects.json`: project order, titles, categories, descriptions, and destinations.
- `src/projects/`: Markdown pages explaining individual projects.
- `src/assets/css/site.css`: typography, colors, layout, and spacing.

Update the three project entries with their final descriptions and destinations as the work develops. An empty `url` renders a non-clickable project box.

Each project box is a single accessible link. Set `url` to an internal path (`/projects/my-project/`), an external HTTPS URL, or a Google Maps share link. Set `external` to `true` for an outward arrow; links open in the same tab. `linkLabel` describes the destination.

To add a detail page, create `src/projects/my-project.md`:

```md
---
layout: layouts/project.njk
title: My project
category: Writing & ideas
description: A short introduction to the project.
---

Explain the project here using Markdown.

## Why I’m making it

Add your story and useful links.
```

Then add an entry to `projects.json` pointing to `/projects/my-project/`. Pages and project listings are separate so external destinations need no placeholder pages.

## Cloudflare Pages

Push this folder to a Git repository and connect it to a Cloudflare Pages project. Use:

| Setting | Value |
| --- | --- |
| Framework preset | Eleventy |
| Build command | `npm run build` |
| Build output directory | `_site` |
| Root directory | Repository root |
| Environment variable | `NODE_VERSION=22` |

No Functions, runtime bindings, or secrets are needed. The root `404.html` provides the custom not-found page. Cloudflare handles HTTPS and hosting; deployment is not performed by local builds.

Reference: [Cloudflare’s Eleventy deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/).
