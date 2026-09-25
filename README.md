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
