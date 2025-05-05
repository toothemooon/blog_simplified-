# Getting Started with Blog Simplified

This guide will help you set up the Blog Simplified project on your local machine for development purposes.

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog_simplified.git
   cd blog_simplified
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

4. Visit `http://localhost:8080` in your browser to see the application running (the port might differ if 8080 is already in use).

## Project Structure Overview

The project follows a modular architecture with separate components for different parts of the blog:

```
frontend/src/
├── components/           # UI Components
│   ├── blog/             # Blog-specific components
│   ├── header/           # Header-related components
│   ├── projects/         # Project components
│   ├── search/           # Search functionality
│   └── ...
├── data/                 # Data management
│   ├── blog-data.js      # Legacy blog data structure
│   └── blog/             # New modular blog system
├── utils/                # Utility functions
├── App.svelte            # Application shell
├── global.css            # Global styles
└── main.js               # App initialization
```

For more detailed information about the project structure, see [project-structure.md](./project-structure.md).

## Development Workflow

### Running the Application

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the application for production
- `npm start` - Serve the built application

### Common Tasks

1. **Adding a new blog post**
   - Create a metadata file in `src/data/blog/posts/YYYY-MM-DD-slug.js`
   - Create a content file in `src/data/blog/content/slug.md`
   - Import and add the post to the array in `src/data/blog/index.js`

2. **Creating a new component**
   - Add the component file to the appropriate directory in `src/components/`
   - Follow the existing component patterns (see [code-patterns.md](./code-patterns.md))

3. **Updating styles**
   - Global styles are in `src/global.css`
   - Component-specific styles are scoped within each component's `<style>` block

## Common Issues and Solutions

### Horizontal Scrolling on Mobile
If you encounter horizontal scrolling on mobile devices, ensure:
- Container elements have `width: 100%` and `box-sizing: border-box`
- No fixed-width elements exceed viewport width
- `overflow-x: hidden` is applied where needed

### CSS Selector Warnings
Unused CSS selector warnings (like `.post-content h1`) are expected and can be safely ignored. These selectors are used for dynamic content rendering.

### Accessibility Warning
There's a known issue with the SearchDialog component where a non-interactive element has event listeners. This should be addressed by using a proper interactive element or adding appropriate ARIA roles.

## Additional Resources

- [Svelte Documentation](https://svelte.dev/docs)
- [Project Implementation Roadmap](./implementation-roadmap.md)
- [Code Patterns](./code-patterns.md)
- [File Architecture](./file-architecture.md)
- [Svelte 4 Reference](./svelte4-reference.md) 