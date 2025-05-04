# SvelteBlog

A modern blog built with Svelte 4 and vanilla CSS.

## Features

- Header with navigation menu ✅
- Dark/light theme toggle ✅
- Search functionality (planned)
- Responsive design with vanilla CSS
- Blog post listing and individual post pages (coming soon)
- Tag filtering (coming soon)
- Projects page (coming soon)
- About page (coming soon)

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

4. Open your browser and visit http://localhost:5000

## Building for Production

To create a production build, run:

```bash
npm run build
```

The built files will be in the `public` directory.

## Project Structure

- `src/` - Source code
  - `lib/` - Reusable components and utilities
    - `components/` - Svelte components
      - `Header.svelte` - Main navigation header
      - (More components to be added)
  - `routes/` - Page components for blog, tags, etc. (to be implemented)
  - `App.svelte` - Main app component
  - `main.js` - App entry point
  - `global.css` - Global CSS variables and styles

## Implementation Status

### Completed
- Basic project structure
- Header component with navigation
- Theme switching (light/dark/system)
- Global CSS architecture
- ES modules configuration

### In Progress
- Client-side routing implementation
- Blog post components

### Planned Features
- Markdown blog posts with frontmatter
- Tag system and filtering
- Projects showcase
- About page
- Search functionality
- SEO optimizations

## Adding Blog Posts (Coming Soon)

This section will be updated with instructions for adding blog posts using Markdown.

## Adding a New Route

To add a new route:

1. Create a new component in `src/routes/`
2. Update the router configuration in `main.js`
3. Add a link to the Header component if needed

## Development Guidelines

### Component Development Approach

For best results when creating new components:

1. Start simple - implement basic functionality first without complex features
2. Test components in isolation before integrating them with other components
3. Mock data locally in the component before using external data sources
4. Add routing only after components are working correctly
5. Avoid circular dependencies between components

### CSS Guidelines

- Use component-scoped CSS with Svelte's `<style>` blocks
- Leverage CSS custom properties from `global.css` for consistency
- Follow the existing naming conventions for classes
- Use responsive design with appropriate media queries

## Common Issues & Troubleshooting

### ES Module Configuration

If you encounter `ReferenceError: require is not defined`, ensure:

1. `package.json` has `"type": "module"` set
2. Use ES module imports (`import x from 'y'`) instead of CommonJS (`require('y')`)
3. Update all imports in rollup.config.js to use ES module syntax

### Rollup External Dependencies

For "Unresolved dependencies" warnings:

1. Configure proper `globals` in rollup.config.js output options
2. Add `preferBuiltins: false` to the resolve plugin options

### Component Integration Issues

If components fail to integrate properly:

1. Check for circular dependencies between components
2. Verify props are correctly passed and initialized
3. Test each component in isolation before integration
4. Implement one feature at a time and test thoroughly

### Page.js Routing Issues

When implementing routing:

1. Ensure page.js is properly imported in both main.js and routes.js
2. Initialize routing after the DOM is fully loaded
3. Test routes with simple components before adding complex ones
4. Use consistent path formats in navigation links and route handlers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
