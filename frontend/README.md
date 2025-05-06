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
- ✅ Language selector with support for English, Japanese, and Chinese
- ✅ Internationalization infrastructure with JSON-based translations

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
│   │   └── search/         # Search components
│   │       ├── SearchButton.svelte
│   │       └── SearchDialog.svelte
│   ├── data/               # Data files
│   │   ├── blog/           # Blog post content and metadata 
│   │   │   ├── posts/      # Individual post metadata
│   │   │   └── content/    # Post content files
│   │   └── projects/       # Projects data and content
│   │       ├── projects/   # Project metadata files
│   │       └── content/    # Project content files
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