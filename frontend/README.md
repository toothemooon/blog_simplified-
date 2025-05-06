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
- ✅ Ravencoin blog series (7 posts)
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

## Internationalization

The blog supports multiple languages with a custom internationalization (i18n) implementation.

### Currently Supported Languages

- English (default)
- Japanese (日本語)
- Chinese (简体中文)

### Implementation Details

The internationalization system uses JSON translation files stored in `src/i18n/locales/` with a Svelte store-based architecture:

```
frontend/src/
└── i18n/
    ├── index.js          # Re-exports from store.js
    ├── store.js          # Main i18n logic and translation function
    └── locales/          # Translation JSON files
        ├── en.json       # English (default)
        ├── ja.json       # Japanese
        └── zh.json       # Chinese
```

### How to Use Translations in Components

To add translation support to a component:

1. Import the translation function:

```javascript
import { t } from '../../i18n';
```

2. Use the `$t` store-derived function with translation keys:

```html
<h1>{$t('pages.home.title')}</h1>
<p>{$t('common.loading')}</p>
```

3. Use parameter substitution when needed:

```html
<p>{$t('pages.post.author', { name: post.author })}</p>
<span>{$t('footer.copyright', { year: currentYear })}</span>
```

### Adding a New Language

To add a new language:

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json` for French)
2. Copy the structure from `en.json` and translate all values
3. Add the language to the supported languages list in `store.js`:

```javascript
export function getSupportedLanguages() {
  return [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '简体中文' },
    { code: 'fr', name: 'Français' }  // Add the new language
  ];
}
```

4. Import the new language file in `store.js`:

```javascript
import en from './locales/en.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';
import fr from './locales/fr.json';  // Add import for new language

const translations = { en, ja, zh, fr };  // Add to translations object
```

### Translation JSON Structure

Translation files use a nested structure with dot notation for accessing nested keys:

```json
{
  "nav": {
    "blog": "Blog",
    "tags": "Tags",
    "projects": "Projects",
    "about": "About"
  },
  "ui": {
    "search": "Search",
    "theme": "Theme"
  }
}
```

Access these translations using dot notation: `$t('nav.blog')` or `$t('ui.search')`.

## Getting Started

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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit http://localhost:8080

### Development Server SPA Routing

To ensure SPA routing works correctly when refreshing on non-root routes:

```bash
# Use this script which enables SPA routing in development
npm run dev-single
```

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

## Project Structure

```
frontend/
├── public/                 # Static assets and build output
│   ├── build/              # Build output directory
│   ├── images/             # Image assets
│   │   └── avatar/         # Avatar SVG images
│   │   └── global.css      # Public global CSS
├── src/
│   ├── components/         # Svelte components
│   │   ├── Header.svelte   # Navigation header
│   │   ├── AboutPage.svelte# About page component
│   │   ├── blog/           # Blog-specific components
│   │   │   ├── HomePage.svelte
│   │   │   ├── BlogListPage.svelte
│   │   │   ├── BlogPostPage.svelte
│   │   │   ├── TagsPage.svelte
│   │   │   └── TagPage.svelte
│   │   ├── projects/       # Project-specific components
│   │   │   ├── ProjectsPage.svelte
│   │   │   ├── ProjectCard.svelte
│   │   │   └── ProjectDetailPage.svelte
│   │   ├── search/         # Search components
│   │   │   ├── SearchButton.svelte
│   │   │   └── SearchDialog.svelte
│   │   └── header/         # Header components
│   │       ├── Logo.svelte
│   │       ├── NavLinks.svelte
│   │       ├── MobileMenu.svelte
│   │       └── LanguageSelector.svelte
│   ├── data/               # Data files
│   │   ├── blog/           # Blog post content and metadata 
│   │   │   ├── posts/      # Individual post metadata
│   │   │   └── content/    # Post content files
│   │   └── projects/       # Projects data and content
│   │       ├── projects/   # Project metadata files
│   │       └── content/    # Project content files
│   ├── i18n/               # Internationalization (i18n) system
│   │   ├── index.js        # Re-exports from store.js
│   │   ├── store.js        # Main i18n logic and translation function
│   │   └── locales/        # Translation JSON files
│   │       ├── en.json     # English translations
│   │       ├── ja.json     # Japanese translations
│   │       └── zh.json     # Chinese translations
│   ├── utils/              # Utility functions
│   │   ├── blog-utils.js   # Blog data handling
│   │   ├── project-utils.js# Project data handling
│   │   └── search.js       # Search functionality
│   ├── App.svelte          # Main app shell
│   ├── main.js             # App entry point with routing
│   └── global.css          # Global CSS variables and styles
├── rollup.config.js        # Rollup configuration
├── package.json            # Dependencies and scripts
└── vercel.json             # Vercel deployment configuration
```

## Implementation Details

### Routing

The application uses [page.js](https://github.com/visionmedia/page.js) for client-side routing:

- Routes are defined in `src/main.js`
- The current route and parameters are passed to `App.svelte`
- `App.svelte` conditionally renders components based on the route

### Theming

The app supports light, dark, and system themes:

- Theme variables are defined in `