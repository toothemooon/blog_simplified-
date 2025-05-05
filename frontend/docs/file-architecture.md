# SvelteBlog File Architecture Guide

This document provides an overview of the file architecture and organization patterns used in the SvelteBlog project.

## File Organization Philosophy

The SvelteBlog project follows these organization principles:

1. **Feature-based Organization**: Files are grouped by feature/domain (blog, projects) rather than by type
2. **Component Encapsulation**: Each component handles its own styling and logic
3. **Data Centralization**: Core data files are kept in a dedicated data directory
4. **Clear Entry Points**: Main app entry points are at the root of the src directory
5. **Static Asset Management**: Assets are organized by type in the public directory

## Key Directories and Files

```
frontend/
├── public/                 # Static assets and build output
│   ├── build/              # Build output directory (generated)
│   ├── images/             # Image assets
│   │   ├── avatar/         # Avatar SVG files
│   │   └── projects/       # Project-related images
│   ├── index.html          # HTML entry point
│   └── global.css          # Public global CSS
├── src/
│   ├── components/         # All Svelte components
│   │   ├── Header.svelte   # Main navigation component
│   │   ├── AboutPage.svelte# About page component
│   │   ├── blog/           # Blog-specific components
│   │   └── projects/       # Project-specific components
│   ├── data/               # Data files
│   │   ├── blog-data.js    # Blog post data
│   │   └── project-data.js # Projects data
│   ├── App.svelte          # Main application shell
│   ├── main.js             # App entry point with routing
│   └── global.css          # Global CSS variables and styles
├── docs/                   # Project documentation
├── package.json            # Dependencies and scripts
├── rollup.config.js        # Build configuration
└── vercel.json             # Vercel deployment configuration
```

## Component Organization

Components are organized into feature-specific directories:

### Blog Components

- `HomePage.svelte`: Main landing page with recent posts
- `BlogListPage.svelte`: Complete listing of blog posts with tag filtering
- `BlogPostPage.svelte`: Individual blog post display
- `TagsPage.svelte`: Overview of all available tags
- `TagPage.svelte`: Posts filtered by specific tag

### Project Components

- `ProjectsPage.svelte`: Grid layout of project cards
- `ProjectCard.svelte`: Individual project preview card
- `ProjectDetailPage.svelte`: Detailed view of a single project

### Top-level Components

- `Header.svelte`: Main navigation and theme controls
- `AboutPage.svelte`: Author profile and information
- `App.svelte`: Main application shell that manages routing

## Naming Conventions

The project follows these naming conventions:

1. **Component Files**: Pascal case (e.g., `BlogPostPage.svelte`)
2. **JavaScript Files**: Kebab case for files, camel case for variables (e.g., `blog-data.js`, `blogPosts`)
3. **CSS Classes**: Kebab case (e.g., `post-card`, `tag-list`)
4. **Image Files**: Kebab case (e.g., `scenery-avatar.svg`)

## Data Management Approach

Data is stored in dedicated JavaScript files:

- `blog-data.js`: Contains all blog post data
- `project-data.js`: Contains all project data

This approach keeps data centralized and easy to manage while allowing for future migration to external data sources if needed.

## Styling Architecture

The project uses a hybrid styling approach:

1. **Global Variables**: Defined in `src/global.css` for consistent colors, spacing, and typography
2. **Component-scoped Styles**: Each Svelte component includes its own scoped CSS
3. **Responsive Design**: Media queries used within component styles

## Entry Point Flow

1. `index.html`: The initial HTML file loaded by the browser
2. `main.js`: The JavaScript entry point that initializes routing and the app
3. `App.svelte`: The main component that renders the appropriate page based on the current route

## Build Configuration

The project uses Rollup for bundling:

- `rollup.config.js`: Configures the build process
- Plugins for Svelte, CSS, and other dependencies
- Development server configuration

## Deployment Configuration

- `vercel.json`: Configures Vercel for SPA routing
- Ensures proper handling of client-side routes in production

## Component Directory Structure Patterns

Each feature directory follows a consistent pattern:

```
blog/
├── HomePage.svelte         # Main landing page
├── BlogListPage.svelte     # All posts with filtering
├── BlogPostPage.svelte     # Single post view
├── TagsPage.svelte         # All tags
└── TagPage.svelte          # Tag-filtered posts

projects/
├── ProjectsPage.svelte     # Projects overview
├── ProjectCard.svelte      # Project preview
└── ProjectDetailPage.svelte # Single project view
```

## Asset Organization

Static assets follow this pattern:

```
public/
├── images/
│   ├── avatar/            # Profile avatars
│   │   ├── scenery-avatar.svg
│   │   ├── tech-avatar.svg
│   │   └── ...
│   └── projects/         # Project images
│       ├── project1.jpg
│       └── ...
└── ...
```

## Future Directory Structure Evolution

As the project grows, we anticipate evolving to include:

```
src/
├── lib/                  # Shared utility components
│   └── components/       # Reusable UI components
│       ├── PostCard.svelte
│       ├── TagChip.svelte
│       └── ...
├── utils/                # Utility functions
│   ├── date.js           # Date formatting functions
│   ├── tags.js           # Tag handling utilities
│   └── ...
```

## Importing Guidelines

- Use relative paths for imports within the same feature directory
- Use absolute paths from `src/` for cross-feature imports
- Keep import paths as short as possible

## Documentation Philosophy

Documentation is organized into specific guides:

- `project-structure.md`: Overall project structure and design patterns
- `code-patterns.md`: Reusable code patterns with examples
- `svelte4-reference.md`: Svelte 4 documentation references
- `file-architecture.md`: File organization and conventions (this file)

Each guide serves a specific purpose to help maintain consistency and provide guidance for development. 