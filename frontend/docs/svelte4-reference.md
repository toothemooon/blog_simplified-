# Svelte 4 Documentation Reference

This document provides links to the official Svelte 4 documentation and other resources relevant to the SvelteBlog project.

## Main Resources

- [Svelte 4 Documentation](https://v4.svelte.dev/docs)
- [Svelte 4 Tutorial](https://v4.svelte.dev/tutorial)
- [Svelte 4 Examples](https://v4.svelte.dev/examples)
- [Svelte 4 API Reference](https://v4.svelte.dev/docs#run-time)

## Component Format

- [Component Format](https://v4.svelte.dev/docs#component-format)
- [script](https://v4.svelte.dev/docs#component-format-script)
- [script context="module"](https://v4.svelte.dev/docs#component-format-script-context-module)
- [style](https://v4.svelte.dev/docs#component-format-style)

## Template Syntax

- [Text expressions](https://v4.svelte.dev/docs#template-syntax-text-expressions)
- [Comments](https://v4.svelte.dev/docs#template-syntax-comments)
- [if](https://v4.svelte.dev/docs#template-syntax-if)
- [each](https://v4.svelte.dev/docs#template-syntax-each)
- [await](https://v4.svelte.dev/docs#template-syntax-await)
- [key](https://v4.svelte.dev/docs#template-syntax-key)
- [html](https://v4.svelte.dev/docs#template-syntax-html)
- [debug](https://v4.svelte.dev/docs#template-syntax-debug)

## Lifecycle Hooks

- [onMount](https://v4.svelte.dev/docs#run-time-svelte-onmount)
- [beforeUpdate](https://v4.svelte.dev/docs#run-time-svelte-beforeupdate)
- [afterUpdate](https://v4.svelte.dev/docs#run-time-svelte-afterupdate)
- [onDestroy](https://v4.svelte.dev/docs#run-time-svelte-ondestroy)
- [tick](https://v4.svelte.dev/docs#run-time-svelte-tick)

## Stores

- [writable](https://v4.svelte.dev/docs#run-time-svelte-store-writable)
- [readable](https://v4.svelte.dev/docs#run-time-svelte-store-readable)
- [derived](https://v4.svelte.dev/docs#run-time-svelte-store-derived)
- [get](https://v4.svelte.dev/docs#run-time-svelte-store-get)

## Special Elements

- [svelte:self](https://v4.svelte.dev/docs#template-syntax-svelte-self)
- [svelte:component](https://v4.svelte.dev/docs#template-syntax-svelte-component)
- [svelte:element](https://v4.svelte.dev/docs#template-syntax-svelte-element)
- [svelte:window](https://v4.svelte.dev/docs#template-syntax-svelte-window)
- [svelte:body](https://v4.svelte.dev/docs#template-syntax-svelte-body)
- [svelte:head](https://v4.svelte.dev/docs#template-syntax-svelte-head)
- [svelte:options](https://v4.svelte.dev/docs#template-syntax-svelte-options)
- [svelte:fragment](https://v4.svelte.dev/docs#template-syntax-svelte-fragment)

## Transitions and Animations

- [Transitions](https://v4.svelte.dev/docs#run-time-svelte-transition)
- [Animations](https://v4.svelte.dev/docs#run-time-svelte-animate)
- [Actions](https://v4.svelte.dev/docs#run-time-svelte-action)

## Compiler Options

- [Compile Options](https://v4.svelte.dev/docs#compile-time-svelte-compile)
- [Client-side Component API](https://v4.svelte.dev/docs#run-time-client-side-component-api)
- [Server-side Component API](https://v4.svelte.dev/docs#run-time-server-side-component-api)

## Routing with page.js (used in this project)

- [page.js Documentation](https://github.com/visionmedia/page.js#readme)
- [API Reference](https://github.com/visionmedia/page.js#api)
- [Context](https://github.com/visionmedia/page.js#context)
- [Routing](https://github.com/visionmedia/page.js#routing)
- [Middleware](https://github.com/visionmedia/page.js#middleware)
- [Navigation](https://github.com/visionmedia/page.js#plugins)

## SPA Routing in Production and Development

- [Sirv Documentation](https://github.com/lukeed/sirv/tree/master/packages/sirv-cli) - Used for development server
- [Sirv CLI Options](https://github.com/lukeed/sirv/tree/master/packages/sirv-cli#cli) - Command line options including --single flag
- [Vercel SPA Configuration](https://vercel.com/docs/concepts/projects/project-configuration#routes) - For configuring SPA routing in production

## SVG Resources for Avatar Creation

- [MDN SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [SVG on CSS-Tricks](https://css-tricks.com/using-svg/)
- [SVG Styling Properties](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)
- [SVG Gradient Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Gradients)

## CSS and Styling Resources

- [CSS Variables (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [CSS Dark Mode](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)

## Additional Resources for Svelte 4

- [Svelte Society - Community Resources](https://sveltesociety.dev/recipes)
- [Svelte 4 Release Notes](https://svelte.dev/blog/svelte-4)
- [Svelte REPL](https://v4.svelte.dev/repl)
- [svelte/store Contract](https://v4.svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values)
- [Event Handling](https://v4.svelte.dev/docs#template-syntax-element-directives-on-eventname)

## Key Differences from Svelte 5

- Svelte 4 uses the traditional component format, while Svelte 5 introduces "runes"
- Svelte 4 requires explicit reactivity declarations, while Svelte 5 has more automatic reactivity
- Svelte 4 has a smaller API surface compared to Svelte 5
- Svelte 4 uses `$:` for reactive declarations, which differs from Svelte 5's rune system
- Svelte 4's store pattern differs from Svelte 5's signals approach

## Key Differences from SvelteKit

- This project uses a standalone Svelte 4 setup with page.js for routing
- SvelteKit provides a full-stack framework with server-side rendering
- Our project handles routing client-side only, while SvelteKit handles both client and server routing
- SvelteKit provides features like API routes, which we handle differently
- Our CSS is manually managed, while SvelteKit has more built-in styling options

## Common Challenges and Solutions

### SPA Routing Issues
When refreshing on non-root routes shows blank pages:
- Use the `--single` flag with sirv in development
- Configure Vercel properly for production with proper routes to index.html

### Component Communication
- Props for parent-to-child communication
- Events for child-to-parent communication
- Stores for cross-component communication

### Theme Implementation
- Use CSS variables for theme colors
- Store theme preference in localStorage
- Use `window.matchMedia` for system theme detection 