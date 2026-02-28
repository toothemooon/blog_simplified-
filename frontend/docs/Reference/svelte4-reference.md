# Svelte 4 — Project Quick Reference

> General Svelte docs: [v4.svelte.dev/docs](https://v4.svelte.dev/docs) | [Tutorial](https://v4.svelte.dev/tutorial)
>
> This file covers **project-specific** setup decisions and common pitfalls only.

## Why Svelte 4 (not SvelteKit or Svelte 5)

- **No SvelteKit**: This is a pure client-side SPA. SvelteKit adds server-side rendering and a file-based router we don't need. We use `page.js` instead.
- **No Svelte 5**: Svelte 5 introduces "runes" which use a different reactivity syntax (`$state`, `$derived`). This project uses Svelte 4's `$:` reactive declarations and `writable`/`derived` stores throughout. Migrating would require touching every component.

## Key Svelte 4 APIs Used in This Project

| API | Where used |
|---|---|
| `export let` | Props on every component |
| `$:` reactive declarations | Derived values in page components |
| `writable` / `derived` store | i18n (`src/i18n/store.js`), theme, language |
| `onMount` | Data loading in page components |
| `{#if}` / `{#each}` / `{#await}` | Conditional rendering throughout |
| `on:click`, `on:keydown` | Event handlers in interactive components |

## Routing (page.js, not SvelteKit)

Routes are defined in `src/main.js` and rendered conditionally in `App.svelte`:

```javascript
// main.js — define routes
page('/blog/:slug', (ctx) => setRoute('/blog-post', { slug: ctx.params.slug }));

// App.svelte — render by route
{#if currentRoute === '/blog-post'}
  <BlogPostPage slug={params.slug} />
{/if}
```

## SPA Routing — Development vs Production

```bash
# Development: --single flag makes sirv serve index.html for all routes
npm run dev-single
```

```json
// vercel.json — production: rewrite all paths to index.html
{ "routes": [{ "handle": "filesystem" }, { "src": "/(.*)", "dest": "/index.html" }] }
```

Without this, refreshing on `/blog/my-post` returns a 404.

## Common Challenges

**Stores for cross-component state** (theme, language):
```javascript
import { writable } from 'svelte/store';
export const theme = writable('system'); // use $theme in templates
```

**Component communication**:
- Parent → Child: `export let prop`
- Child → Parent: `dispatch('event', data)` via `createEventDispatcher`
- Any → Any: shared Svelte store

**Theme implementation**:
- CSS variables defined in `global.css` for all color tokens
- Theme class toggled on `<body>` and persisted in `localStorage`
- System preference via `window.matchMedia('(prefers-color-scheme: dark)')`
