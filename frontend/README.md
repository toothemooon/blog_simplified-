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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
