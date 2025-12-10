# Nextra v4 Setup Notes (RaidGuild Cohort DM Guide)

A quick reference for the issues we hit while wiring up Nextra v4 (Next 16 App Router), the docs theme, and Pagefind search.

## Theme / MDX wiring
- **MDX components alias**: App Router needs `next-mdx-import-source-file` to resolve to the docs theme MDX bundle; we set this via `next.config.mjs` aliases pointing to `mdx-components.js`, which re-exports `useMDXComponents` from `nextra-theme-docs`.
- **Webpack build**: `next build --webpack` avoids Turbopack hangs we saw in this repo.
- **Sidebar/TOC visibility**: ensure `_meta.json` exists at `app/_meta.json` and per section (e.g., `app/guide/_meta.json`) so the docs theme renders sidebar navigation and TOC. Theme switch uses the built-in `themeSwitch` + `nextThemes` props in `app/layout.jsx`.

## Search (Pagefind)
- **Correct output path**: The docs theme expects Pagefind assets under `public/_pagefind`. Using another folder (e.g., `public/pagefind`) causes `Failed to fetch dynamically imported module …/_pagefind/pagefind.js`.
- **Postbuild command (server build)**:
  ```bash
  pagefind --site .next/server/app --output-path public/_pagefind
  ```
  This matches the Nextra docs “server builds” example. No static export is required.
- **HTML availability**: Pagefind needs HTML to crawl. In restricted sandboxes, `.next/server/app` may not contain `.html` (or port binding may be blocked), leading to “did not contain any html files.” On a normal build (local or Vercel), the server output includes HTML and Pagefind indexes successfully.
- **Static vs. server**: We dropped `output: 'export'`; standard server build + Pagefind over `.next/server/app` works with Next 16 App Router.

## Local gotchas encountered
- Port binding was blocked in the sandbox, so crawling a running `next start` server failed; use the static `.next/server/app` approach instead.
- Turbopack builds hung; forcing webpack resolved it.
- Missing HTML in `.next/server/app` led to empty Pagefind output; this was a sandbox artifact. Locally (where HTML is emitted), Pagefind indexed 9 pages successfully.
