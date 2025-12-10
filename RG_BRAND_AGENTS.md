# RaidGuild Agent Handbook (Design & Brand)

Single-file brief for AI assistants. Keep this in your context when generating UI, styles, or assets.

Quick links: [live site](https://www.brand.raidguild.org/) | [repo](https://github.com/raid-guild/brand)

## Using This in Another Project
- Copy this file into the consuming repo (root recommended) or fetch it from the GitHub URL into your agent’s context.
- If the repo already has an `AGENTS.md`, merge this content into their file (or add as `RG_BRAND_AGENTS.md`) and include both in your agent context.
- Align paths: if your UI components aren’t under `@/components/ui/*`, update the import path note to match your structure.
- Apply setup: install the listed deps, add the fonts, include `globals.css`, and wire `fonts.ts` + `ThemeProvider` so tokens/utilities/components exist in your codebase.
- Keep in sync: when you change tokens, component APIs, or asset locations in your fork, update this file so agents stay accurate.

## How to Use With an Agent
- Always import components from `@/components/ui/*` instead of hand-rolling UI.
- Follow tokens and utilities from `src/app/globals.css` and fonts from `src/lib/fonts.ts`.
- Honor semantic colors (primary, background, foreground, etc.) rather than hardcoding hex unless specifying brand palette values.
- If you need something not listed, propose a combination of existing components first.

## Quick Start (Dev Setup)
- Install deps: `npm install class-variance-authority clsx lucide-react tailwind-merge` and `npm install -D @tailwindcss/postcss tw-animate-css`.
- Fonts: place `MAZIUSREVIEW20.09-Regular.woff`, `MaziusDisplay-Bold.otf`, `EBGaramond-VariableFont_wght.ttf`, `EBGaramond-Italic-VariableFont_wght.ttf` under `public/fonts/`.
- Layout: wrap `<body>` with font variables `maziusDisplay`, `ebGaramond`, `ubuntuMono` from `src/lib/fonts.ts` and the `<ThemeProvider>` from `src/lib/theme-context.tsx` (light/dark).
- Replace your `globals.css` with `src/app/globals.css` to get tokens, utilities, and Tailwind `@theme inline`.

## Brand Tokens & Semantics (from `src/app/globals.css`)
- **Palettes (hex)**:  
  - Moloch: 100 `#f1efee`, 200 `#efc5bb`, 300 `#e39b8b`, 400 `#d25c41`, 500 `#bd482d` (primary), 600 `#8b3521`, 700 `#5c2316`, 800 `#29100a`.  
  - Scroll: 100 `#f9f7e7`, 200 `#ece5ac`, 300 `#dccd6a`, 400 `#d2c141`, 500 `#b5a22c`, 600 `#837820`, 700 `#534a13`, 800 `#211e07`.  
  - Neutral: 100 `#f1efee`, 200 `#d5cecd`, 300 `#b9aeac`, 400 `#9e8e8a`, 500 `#806f6b`, 600 `#645754`, 700 `#433937`, 800 `#221d1c`, white `#fafafa`, black `#0d0d0d`.
- **Semantic map (light)**: background `scroll-100`, foreground `moloch-800`, card/popover `scroll-100`, primary `moloch-500` on `scroll-100`, secondary/muted `neutral-100` w/ `neutral-600` fg, accent `moloch-500`, destructive `moloch-300`, border/input `neutral-200`, ring `moloch-500`. Dark overrides background/foreground only; honor `ThemeProvider`.
- **Radius**: base `--radius: 0.625rem`; derived `radius-sm/md/lg/xl`.
- **Grid**: `container-custom` (max 1280px, responsive padding), `grid-custom` (4 cols mobile → 8 tablet → 12 desktop, 92px columns, 16px gaps).

## Typography
- Families: `--font-display` (Mazius Display), `--font-body` (EB Garamond), `--font-mono` (Ubuntu Mono).
- Utility classes (preferred): `type-display-lg/md/sm`, `type-heading-lg/md/sm`, `type-body-lg/md/sm`, `type-label`, `type-label-md`, `type-label-sm`, `type-code-lg/md/sm`. Uses weights, letter spacing, and line heights defined in globals.

## Components (must-use)
- Source of truth: `docs/ui-components.md`. Import path: `@/components/ui/<component>`.
- Highlights: Button (variants: primary, secondary, ghost, moloch), Form system (Form, FormField, FormLabel, FormControl, FormMessage, RequiredFieldIndicator) with React Hook Form, Card/Tabs/Accordion for structure, Dialog/Sheet/Drawer for overlays, Table/DataTable, Select/Combobox/Multiselect, Badge variants (default, secondary, destructive, outline, moloch, scroll), Tooltip/Popover/HoverCard, Wizard, Sidebar, Command palette, Progress, Slider, DatePicker/Calendar, Carousel, Breadcrumb/Pagination/NavigationMenu.
- Patterns: prefer composition over custom styling; keep accessibility (Radix primitives, focus-visible rings). Use `cn` from `src/lib/utils.ts` for class merging.

## Assets & References (pages under `src/app/`)
- Logos: `logos/page.tsx` + SVGs under `public/assets/logos`. Full logotype and crossed-sword logomark in Moloch/Scroll variants, floating and with backgrounds.
- Colors: `colors/page.tsx` shows palettes and hexes; developer note points to `globals.css`.
- Typography: `typography/page.tsx` shows specimens, usage guidance; font downloads link.
- Iconography: `iconography/page.tsx` references SVG sets in `public/assets/icon` (8bit roles, D&D service icons, magic set).
- Illustrations: `illustrations/page.tsx` uses gallery from `public/assets/webp`, both color (-c) and B&W (-bw), multiple aspect ratios.
- Home (`page.tsx`): quick links to PDF, Figma, GitHub; “For Archers” (design) and “For Warriors” (dev) navigation.

## Accessibility & UX Checklist
- Every input needs a label + `FormMessage` for errors; preserve focus-visible rings (`ring-2 ring-moloch-500 ring-offset-2` via tokens).
- Keep keyboard navigation; use Radix components’ ARIA defaults.
- Maintain contrast: primary `moloch-500` on `scroll-100`, dark mode switches background to `moloch-800` with `scroll-100` text.
- Use responsive layouts (`container-custom`, `grid-custom`) and test mobile/desktop.

## Suggested Prompt Snippet (for agents)
```text
You are building UI for RaidGuild. Use the official design system.
- Import components from @/components/ui/* (see docs/ui-components.md).
- Use brand tokens from src/app/globals.css (semantic colors, radius, typography utilities).
- Font variables: maziusDisplay (display), ebGaramond (body), ubuntuMono (mono) from src/lib/fonts.ts.
- Honor ThemeProvider light/dark and focus-visible rings.
- Prefer composition of existing components; no bespoke UI unless necessary.
- When styling, use semantic classes (primary, background, foreground) and utilities (type-*, container-custom, grid-custom).
```

## If You Need More Detail
- Deep component guidance: `docs/ui-components.md`.
- Setup and quick reference: `README.md`.
- Tokens and utilities source: `src/app/globals.css`.
- Fonts: `src/lib/fonts.ts`; theme toggling: `src/lib/theme-context.tsx`.

## Maintenance
- Update this file whenever brand tokens, component APIs, asset paths, or setup steps change. Keeping it accurate ensures AI agents stay aligned with the source of truth.
