# SvelteBlog

A modern blog built with Svelte 4 and vanilla CSS, inspired by the [Tailwind Nextjs Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/).

## Live Demo

Visit the live site at [https://blog-simplified.vercel.app/](https://blog-simplified.vercel.app/)

## Features

### Implemented
- ✅ Client-side routing with page.js
- ✅ Light/dark/system theme toggle
- ✅ Blog post listing page with tag filtering
- ✅ Individual post pages with metadata
- ✅ Tags system with dedicated tag pages and variable font sizing
- ✅ Projects section with card layout and related projects
- ✅ Individual project detail pages with metadata display
- ✅ About page with custom SVG avatar
- ✅ Responsive design with vanilla CSS
- ✅ Theme variables for consistent styling
- ✅ Search functionality with keyboard shortcuts
- ✅ Mobile navigation with slide-in drawer
- ✅ Enhanced focus states with keyboard-only focus indicators
- ✅ Ravencoin blog series (9 posts)
- ✅ Improved content organization with separate data files
- ✅ Footer component with social links
- ✅ Comprehensive internationalization (i18n)
  - Language selector UI with auto-detection of browser language
  - Support for English, Japanese, and Chinese translations
  - JSON-based translation system with nested keys
  - Parameter substitution in translations
  - Locale-aware date formatting
  - Persistent language preferences via localStorage

### In Progress
- 🟡 UI refinements to match target site styling
- 🟡 Custom 404 page implementation
- 🟡 Translation content expansion

### Planned
- 📝 Newsletter subscription component
- 📝 Code block syntax highlighting
- 📝 Pagination for blog listings
- 📝 Series/collection landing pages
- 📝 SEO metadata improvements
- 📝 Page transitions and animations
- 📝 Performance optimizations

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/svelte-blog.git
   cd svelte-blog
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the development server (with SPA routing enabled):
   ```bash
   npm run dev-single
   ```

4. Open your browser and visit http://localhost:8080

## Documentation

### Architecture
- [System Architecture](docs/Architecture/system-architecture.md) — System design, directory structure, and patterns
- [Data Architecture](docs/Architecture/data-architecture.md) — How blog content is organized and lazy-loaded
- [Internationalization](docs/Architecture/internationalization.md) — Multi-language support (EN/JA/ZH)

### Guides
- [Getting Started](docs/Guides/getting-started.md) — Setup and common development tasks
- [Troubleshooting](docs/Guides/troubleshooting.md) — Solutions for common issues

### Reference
- [Code Patterns](docs/Reference/code-patterns.md) — Component templates and project conventions
- [Svelte 4 Reference](docs/Reference/svelte4-reference.md) — Project-specific Svelte 4 and SPA routing patterns
- [Responsive Design](docs/Reference/responsive-design.md) — Breakpoints, mobile-first CSS, touch targets

### Planning
- [Implementation Roadmap](docs/Planning/implementation-roadmap.md) — What's done and what's next
- [Scratchpad](docs/Planning/scratchpad.md) — Current active tasks and project state

## Building for Production

To create a production build, run:

```bash
npm run build
```

The built files will be in the `public/build` directory.

## Deployment

This project is configured for deployment on Vercel. SPA routing is handled by the `vercel.json` configuration file.

### Manual Deployment Steps

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `public` directory to your hosting provider

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the project configuration
3. Use the following settings:
   - Framework Preset: Other
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/public`
