# MyBlog Project Structure

This document explains the structure and design patterns used in the MyBlog project built with Svelte 4 and vanilla CSS.

## Project Overview

MyBlog is a modern blog application built using:
- **Svelte 4** for the component framework
- **Vanilla CSS** for styling (no CSS frameworks)
- **page.js** for client-side routing

The project aims to create a clean, responsive blog similar to the [Tailwind Nextjs Starter Blog](https://tailwind-nextjs-starter-blog.vercel.app/) but without using Tailwind or Next.js.

## Directory Structure

```
frontend/
├── public/               # Static assets and resources
├── src/
│   ├── components/       # Svelte components
│   │   ├── Header.svelte # Navigation header with theme switching
│   │   └── blog/         # Blog-specific components
│   │       ├── HomePage.svelte       # Homepage with recent posts
│   │       ├── BlogListPage.svelte   # Blog listing with sidebar
│   │       ├── BlogPostPage.svelte   # Individual blog post display
│   │       ├── TagsPage.svelte       # All tags overview
│   │       └── TagPage.svelte        # Posts filtered by tag
│   ├── data/             # Data files
│   │   └── blog-data.js  # Blog post data
│   ├── App.svelte        # Main application shell
│   ├── main.js           # Entry point with routing
│   └── global.css        # Global CSS variables and styles
├── docs/                 # Project documentation
├── package.json          # Dependencies and scripts
└── rollup.config.js      # Build configuration
```

## Design Patterns

### Component Architecture

The project follows these component design principles:

1. **Container Components**: Handle data and state (BlogListPage, TagPage)
2. **Presentational Components**: Render UI based on props (could be extracted for reuse)
3. **Composition**: Components are composed together for complex UI
4. **Single Responsibility**: Each component has a specific purpose

### CSS Architecture

The project uses a custom CSS architecture:

1. **CSS Variables**: Global variables for colors, spacing, etc. in `global.css`
2. **Scoped Styles**: Component-specific styles encapsulated within each Svelte component
3. **Mobile-First**: Responsive design using media queries
4. **Themeable**: Light/dark mode support using CSS variables and class toggling

### Routing System

Routing is implemented with page.js:

1. **Client-Side**: All routing happens in the browser
2. **Route Mapping**: Routes defined in `main.js` map to Svelte components
3. **Parameterized Routes**: Dynamic routes with parameters for blog posts and tags
4. **Scroll Behavior**: Auto-scroll to top on navigation

## Key Components

### App.svelte
- The application shell that manages routing
- Conditionally renders different page components based on current route

### Header.svelte
- Contains navigation menu and theme switching
- Shows active links based on current route
- Implements light/dark/system theme options

### HomePage.svelte
- Displays the 5 most recent blog posts
- Shows a "Latest" heading with subtitle
- Includes an "All Posts" link to the full blog listing

### BlogListPage.svelte
- Two-column layout with 25% sidebar and 75% content
- Sidebar shows all available tags with post counts
- Main content shows all blog posts with metadata

### BlogPostPage.svelte
- Displays a single blog post with full content
- Shows post metadata (date, tags, authors)
- Includes navigation to previous/next posts

### TagsPage.svelte
- Shows all available tags with post counts
- Links to individual tag pages

### TagPage.svelte
- Shows all posts with a specific tag
- Includes filter metadata and styling

## Data Management

Blog data is stored in `src/data/blog-data.js` as a JavaScript array of post objects. Each post has:

- `title`: The post title
- `date`: Publication date
- `slug`: URL-friendly identifier
- `summary`: Brief overview of the post
- `content`: Full post content in Markdown format
- `tags`: Array of relevant tags
- `authors`: Array of author objects with name, avatar, and social links

## Theme System

The theme system uses:
- CSS variables to define color themes
- Local storage to persist user preference
- Media query to detect system preference
- Class toggling to switch between themes

## Future Enhancements

Planned improvements to the project include:
1. Mobile navigation menu
2. Code syntax highlighting
3. Search functionality
4. Pagination for blog listing
5. Enhanced footer with more information
6. Markdown processing for blog content

## Contributing

To contribute to this project:
1. Understand the component and CSS architecture
2. Create or modify components following the established patterns
3. Ensure components are responsive and work with the theming system
4. Use vanilla CSS for styling (no external CSS frameworks)
5. Test on both light and dark modes 