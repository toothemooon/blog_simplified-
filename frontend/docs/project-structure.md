# SvelteBlog Project Structure

This document explains the structure and design patterns used in the SvelteBlog project built with Svelte 4 and vanilla CSS.

## Project Overview

SvelteBlog is a modern blog application built using:
- **Svelte 4** for the component framework
- **Vanilla CSS** for styling (no CSS frameworks)
- **page.js** for client-side routing

The project aims to create a clean, responsive blog similar to the [Tailwind Nextjs Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/) but using Svelte and vanilla CSS instead of Next.js and Tailwind.

## Directory Structure

```
frontend/
├── public/                 # Static assets and build output
│   ├── build/              # Build output directory
│   ├── images/             # Image assets
│   │   └── avatar/         # SVG avatar files for About page
│   │   └── projects/       # Project images
│   ├── index.html          # HTML entry point
│   └── global.css          # Public global CSS
├── src/
│   ├── components/         # Svelte components
│   │   ├── Header.svelte   # Navigation header with theme switching
│   │   ├── AboutPage.svelte# About page with author profile
│   │   ├── blog/           # Blog-specific components
│   │   │   ├── HomePage.svelte       # Homepage with recent posts
│   │   │   ├── BlogListPage.svelte   # Blog listing with sidebar
│   │   │   ├── BlogPostPage.svelte   # Individual blog post display
│   │   │   ├── TagsPage.svelte       # All tags overview
│   │   │   └── TagPage.svelte        # Posts filtered by tag
│   │   └── projects/       # Project-specific components
│   │       ├── ProjectsPage.svelte   # Projects listing with grid
│   │       ├── ProjectCard.svelte    # Individual project card
│   │       └── ProjectDetailPage.svelte # Project detail view
│   ├── data/               # Data files
│   │   ├── blog-data.js    # Blog post data
│   │   └── project-data.js # Projects data
│   ├── App.svelte          # Main application shell
│   ├── main.js             # Entry point with routing
│   └── global.css          # Global CSS variables and styles
├── docs/                   # Project documentation
├── package.json            # Dependencies and scripts
├── rollup.config.js        # Build configuration
└── vercel.json             # Vercel deployment configuration for SPA routing
```

## Design Patterns

### Component Architecture

The project follows these component design principles:

1. **Container Components**: Handle data and state (BlogListPage, TagPage)
2. **Presentational Components**: Render UI based on props (ProjectCard, could extract more)
3. **Composition**: Components are composed together for complex UI
4. **Single Responsibility**: Each component has a specific purpose

### CSS Architecture

The project uses a custom CSS architecture:

1. **CSS Variables**: Global variables for colors, spacing, etc. in `global.css`
2. **Scoped Styles**: Component-specific styles encapsulated within each Svelte component
3. **Mobile-First**: Responsive design using media queries
4. **Themeable**: Light/dark/system mode support using CSS variables and class toggling

### Routing System

Routing is implemented with page.js:

1. **Client-Side**: All routing happens in the browser
2. **Route Mapping**: Routes defined in `main.js` map to Svelte components
3. **Parameterized Routes**: Dynamic routes with parameters for blog posts, tags, and projects
4. **Scroll Behavior**: Auto-scroll to top on navigation
5. **SPA Configuration**: Special handling for SPA routing in deployment

## Key Components

### App.svelte
- The application shell that manages routing
- Conditionally renders different page components based on current route
- Includes basic site header and footer

### Header.svelte
- Contains navigation menu and theme switching
- Shows active links based on current route
- Implements light/dark/system theme options

### HomePage.svelte
- Displays recent blog posts
- Shows a "Latest" heading with subtitle
- Includes an "All Posts" link to the full blog listing

### BlogListPage.svelte
- Two-column layout with tag sidebar and post listing
- Sidebar shows all available tags with post counts
- Main content shows all blog posts with metadata

### BlogPostPage.svelte
- Displays a single blog post with full content
- Shows post metadata (date, tags, authors)
- Includes navigation to previous/next posts

### AboutPage.svelte
- Displays author profile with custom SVG avatar
- Shows author information and social links
- Presents biography content

### ProjectsPage.svelte
- Presents a grid layout of project cards
- Each card shows project image, title, and description
- Links to individual project details

### ProjectDetailPage.svelte
- Shows detailed view of a single project
- Includes project metadata and full description
- Provides navigation between projects

## Data Management

### Blog Data
Blog data is stored in `src/data/blog-data.js` as a JavaScript array of post objects. Each post has:

- `title`: The post title
- `date`: Publication date
- `slug`: URL-friendly identifier
- `summary`: Brief overview of the post
- `content`: Full post content in HTML format
- `tags`: Array of relevant tags
- `author`: Author information

### Project Data
Project data is stored in `src/data/project-data.js` with similar structure to blog posts.

## Theme System

The theme system uses:
- CSS variables to define color themes
- Local storage to persist user preference
- Media query to detect system preference
- Class toggling to switch between themes

## SPA Routing Configuration

The project uses specific configuration to handle Single Page Application (SPA) routing:

1. **Development**: The sirv server is configured with the `--single` flag to handle SPA routing in development
2. **Production**: The `vercel.json` file configures Vercel to handle SPA routing in production

## Future Enhancements

Planned improvements to the project include:
1. Extract reusable components (PostCard, TagChip, etc.)
2. Mobile navigation menu with hamburger icon
3. Code syntax highlighting with copy functionality
4. Table of contents for long articles
5. Search functionality
6. Newsletter subscription
7. Pagination for blog listing
8. Reading time estimation
9. Social sharing buttons

## Contributing

To contribute to this project:
1. Understand the component and CSS architecture
2. Create or modify components following the established patterns
3. Ensure components are responsive and work with the theming system
4. Use vanilla CSS for styling (no external CSS frameworks)
5. Test on both light and dark modes 