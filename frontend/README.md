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

### In Progress
- 🟡 Footer component with social links
- 🟡 UI refinements to match target site styling
- 🟡 Custom 404 page implementation

### Planned
- 📝 Newsletter subscription component
- 📝 Code block syntax highlighting
- 📝 Pagination for blog listings
- 📝 Series/collection landing pages
- 📝 SEO metadata improvements
- 📝 Page transitions and animations
- 📝 Performance optimizations
- 📝 Language translation support

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

- Theme variables are defined in `src/global.css`
- Theme toggling is implemented in `Header.svelte`
- Theme preference is stored in localStorage

### Data Management

The project uses a modular approach to data management:

- Blog posts are organized in separate files under `src/data/blog/`
- Projects data is structured in `src/data/projects/`
- Utility functions in the `utils/` directory handle data retrieval and manipulation

### Component Design

Components follow a Svelte pattern with:
- Script section for JavaScript logic
- HTML template
- Scoped CSS styles that leverage global variables

## Development Guidelines

### Component Development Approach

When creating or modifying components:

1. Start with a simple implementation
2. Test in isolation before integration
3. Use component-scoped CSS
4. Leverage global CSS variables for consistency
5. Follow existing code patterns and naming conventions

### Common Tasks

#### Adding a New Blog Post

1. Create a new metadata file in `src/data/blog/posts/`
2. Create a new content file in `src/data/blog/content/`
3. Add necessary fields following the existing pattern:
   - `title`: Post title
   - `date`: Publication date string
   - `slug`: URL-friendly identifier
   - `summary`: Brief description
   - `tags`: Array of tag strings
   - `content`: Reference to content file
   - `author`: Author information

#### Adding a New Project

1. Create a new metadata file in `src/data/projects/projects/`
2. Create a new content file in `src/data/projects/content/`
3. Add the project to the array in `src/data/projects/index.js`

#### Adding a New Route

1. Add a new route handler in `src/main.js`
2. Create the corresponding component in `src/components/`
3. Add conditional rendering in `App.svelte`
4. Update navigation in `Header.svelte` if needed

## Troubleshooting

### SPA Routing Issues

If refreshing on non-root routes shows a blank page in development:

1. Use `npm run dev-single` instead of `npm run dev`
2. Ensure the Vercel configuration includes SPA routing settings

### CSS Styling Issues

If styles aren't applying correctly:

1. Check if styles are properly scoped in the component
2. Verify CSS variable names match those in `global.css`
3. Inspect DOM to ensure styles aren't being overridden

### Focus Visibility Issues

If focus outlines are not displaying correctly:

1. Check the `:focus` and `:focus-visible` selectors in `global.css`
2. Ensure proper contrast between focused elements and backgrounds

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [Tailwind Nextjs Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/)
- Built with [Svelte](https://svelte.dev/)
- Routing powered by [page.js](https://github.com/visionmedia/page.js)
