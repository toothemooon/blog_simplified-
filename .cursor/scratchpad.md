# Modern Blog with Svelte 4 and Vanilla CSS

## Background and Motivation
The goal is to build a modern blog similar to https://tailwind-nextjs-starter-blog.vercel.app/blog but using Svelte 4 for the framework and vanilla CSS for styling instead of Next.js and Tailwind CSS. This approach will leverage the existing Svelte codebase while still creating a clean, responsive blog with good performance.

## Latest Codebase Review (2023-11-22)

After conducting a thorough review of the codebase, I've identified the current structure, implementation status, and areas for improvement.

### Project Structure
The project follows a clean, organized directory structure:
```
frontend/
├── docs/                   # Project documentation
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── Header.svelte   # Navigation and theme controls
│   │   └── blog/           # Blog-specific components
│   │       ├── HomePage.svelte
│   │       ├── BlogListPage.svelte
│   │       ├── BlogPostPage.svelte
│   │       ├── TagsPage.svelte
│   │       └── TagPage.svelte
│   ├── data/
│   │   └── blog-data.js    # Blog post data centralized in one file
│   ├── App.svelte          # Main app shell with route handling
│   ├── main.js             # Page.js routing and app initialization
│   └── global.css          # Global CSS variables and utilities
├── rollup.config.js        # Rollup bundler configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Comprehensive Source Code Review

Below is a detailed review of all files in the `src` directory, evaluating each file's purpose, implementation, strengths, and areas for improvement.

### 1. `frontend/src/main.js` (836 bytes, 46 lines)

```javascript
import App from './App.svelte';
import page from 'page';

const app = new App({
	target: document.body,
	props: {
		currentRoute: '/',
		params: {}
	}
});

// Helper function to set route and scroll to top
function setRoute(route, params = {}) {
	window.scrollTo(0, 0);
	app.$set({ currentRoute: route, params });
}

// Set up routing
page('/', () => {
	setRoute('/');
});

// Blog listing page
page('/blog', () => {
	setRoute('/blog-list');
});

// Individual blog post page
page('/blog/:slug', (ctx) => {
	setRoute('/blog-post', { slug: ctx.params.slug });
});

// Tags page showing all tags
page('/tags', () => {
	setRoute('/tags-list');
});

// Individual tag page showing posts with a specific tag
page('/tags/:tag', (ctx) => {
	setRoute('/tag', { tag: ctx.params.tag });
});

// Start the router
page.start();

export default app;
```

**Purpose**: Entry point for the application that initializes the Svelte app and sets up client-side routing with page.js.

**Key Features**:
- Instantiates the main Svelte App component
- Defines all route handlers for the blog application
- Implements a `setRoute` helper function that handles route changes and scrolls to top
- Exports the app instance

**Strengths**:
- Clean separation of routing logic from component code
- Well-organized with clear route definitions
- Good use of page.js for client-side routing
- Implements scroll-to-top on route change for better UX
- Route names follow a consistent pattern

**Areas for Improvement**:
- Missing routes for Projects and About pages
- No 404 fallback route for invalid URLs
- No route grouping as the application grows
- Limited comments for explaining the routing strategy
- No type definitions for route parameters
- No code splitting or lazy loading of routes

**Recommendations**:
1. Add routes for the Projects section (`/projects` and `/projects/:id`)
2. Add a route for the About page (`/about`)
3. Implement a catch-all route for 404 errors
4. Consider organizing routes by feature area
5. Add TypeScript for type safety in route parameters

### 2. `frontend/src/App.svelte` (1.4KB, 60 lines)

```svelte
<script>
	import Header from './components/Header.svelte';
	import HomePage from './components/blog/HomePage.svelte';
	import BlogPostPage from './components/blog/BlogPostPage.svelte';
	import BlogListPage from './components/blog/BlogListPage.svelte';
	import TagsPage from './components/blog/TagsPage.svelte';
	import TagPage from './components/blog/TagPage.svelte';
	import './global.css';
	
	// Props from router
	export let currentRoute = '/';
	export let params = {};
</script>

<div class="app">
	<Header {currentRoute} />
	
	<main class="container main-content">
		{#if currentRoute === '/'}
			<HomePage />
		{:else if currentRoute === '/blog-list'}
			<BlogListPage />
		{:else if currentRoute === '/blog-post'}
			<BlogPostPage slug={params.slug} />
		{:else if currentRoute === '/tags-list'}
			<TagsPage />
		{:else if currentRoute === '/tag'}
			<TagPage tag={params.tag} />
		{/if}
	</main>

	<!-- Simple footer - will be implemented properly later -->
	<footer class="footer">
		<div class="container">
			<p>&copy; {new Date().getFullYear()} • MyBlog • Built by サラダ</p>
		</div>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	
	.main-content {
		flex: 1;
		padding: 2rem 0;
	}
	
	.footer {
		padding: 1.5rem 0;
		text-align: center;
		border-top: 1px solid var(--color-border);
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.7;
	}
</style>
```

**Purpose**: Main application shell that orchestrates the application's structure and conditional rendering based on the current route.

**Key Features**:
- Imports and renders all page components
- Handles route-based conditional rendering
- Includes header and minimal footer
- Applies global CSS
- Passes route information to components

**Strengths**:
- Clean, minimal app shell with good separation of concerns
- Proper flex layout for sticky footer
- Good use of CSS variables for theming
- Clear conditional rendering based on routes
- Passes current route to Header for active state indicators

**Areas for Improvement**:
- Missing conditions for Projects, About, and 404 pages
- Uses a series of if/else statements that could become unwieldy
- Footer implementation is minimal
- No transition animations between route changes
- No loading states during navigation
- No error boundary for handling component errors

**Recommendations**:
1. Add conditionals for missing pages (Projects, About, 404)
2. Consider using a map or switch pattern for route handling
3. Implement a proper Footer component
4. Add page transition animations
5. Implement loading indicators
6. Consider adding an error boundary for catching errors

### 3. `frontend/src/global.css` (1.8KB, 82 lines)

```css
:root {
  /* Light theme colors */
  --color-bg: #ffffff;
  --color-text: #1a202c;
  --color-primary: #3b82f6;
  --color-secondary: #6b7280;
  --color-border: #e2e8f0;
  --color-muted: #f9fafb;
  --color-highlight: #f7fafc;
  
  /* Fonts */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  
  /* Sizes */
  --container-width: 1024px;
  --header-height: 4rem;
}

/* Dark theme */
.dark-theme {
  --color-bg: #1a202c;
  --color-text: #f7fafc;
  --color-primary: #63b3ed;
  --color-secondary: #a0aec0;
  --color-border: #2d3748;
  --color-muted: #2d3748;
  --color-highlight: #2d3748;
}

/* Global styles */
body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  box-sizing: border-box;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1rem;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.2;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-4 {
  gap: 1rem;
}

code {
  font-family: var(--font-mono);
  background-color: var(--color-muted);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
```

**Purpose**: Global CSS styles that define theme variables, base styles, and utility classes.

**Key Features**:
- CSS custom properties for theming
- Light and dark theme color variables
- Typography settings
- Layout utilities
- Reset styles
- Utility classes

**Strengths**:
- Well-organized with clear, semantic variable names
- Good separation of light and dark theme colors
- Smooth transitions for theme changes
- Clean reset styles for consistent rendering
- Good base typography styles
- Well-defined utility classes

**Areas for Improvement**:
- Limited responsive design variables
- No media query breakpoints defined as variables
- Could use more utility classes for common patterns
- Missing focus styles for accessibility
- No print styles
- No CSS variables for spacing/sizing system
- Limited animation variables

**Recommendations**:
1. Add responsive breakpoint variables
2. Implement a consistent spacing scale with variables
3. Add focus styles for accessibility
4. Create print styles for better print experience
5. Expand utility classes
6. Add CSS variables for animations and transitions
7. Consider adding more semantic color variables (success, error, warning)

### 4. `frontend/src/components/Header.svelte` (9.8KB, 325 lines)

This is a large component, so I'll focus on the key aspects.

**Purpose**: Navigation header with site branding, navigation links, theme switching, and search functionality.

**Key Features**:
- Site logo and branding
- Navigation menu with links to main sections
- Theme switching (light/dark/system) with persistent preference
- Active state indicators for current page
- Search button (placeholder)
- Responsive styling

**Strengths**:
- Well-implemented theme switching with system preference detection
- Clean, responsive navigation design
- Good use of SVG icons for buttons
- Proper state management for theme menu
- Active route indicators for better UX
- ARIA attributes for accessibility
- Event listeners properly cleaned up on component destruction

**Areas for Improvement**:
- Mobile menu is missing for smaller screens
- Search button is non-functional
- Some duplication in SVG code
- Dropdown positioning could be improved for mobile
- Complex component that could be broken down
- Limited animations and transitions
- No keyboard navigation for theme menu

**Recommendations**:
1. Implement a hamburger menu for mobile screens
2. Extract SVG icons to separate components
3. Add keyboard navigation for the theme menu
4. Implement the search functionality or remove the button
5. Add smooth transitions for interactive elements
6. Split into smaller sub-components
7. Enhance accessibility features

### 5. `frontend/src/components/blog/HomePage.svelte` (3.7KB, 185 lines)

**Purpose**: Main landing page component that displays the latest blog posts.

**Key Features**:
- "Latest" heading with subtitle
- Displays the 5 most recent blog posts
- Formats and displays post dates
- Shows post tags with links
- "Read more" links for each post
- "All Posts" link to the full blog listing

**Strengths**:
- Properly limits to 5 most recent posts
- Clean, focused design matching reference site
- Good date formatting
- Well-styled post cards
- Responsive layout
- Proper handling of optional tags
- Clear link to all posts

**Areas for Improvement**:
- Date formatting function duplicated across components
- No loading state or error handling
- No image handling for featured post images
- No reading time indicator
- Limited animations or transitions
- No skeleton loading state

**Recommendations**:
1. Extract date formatting to a utility function
2. Add loading and error states
3. Implement post image support
4. Add reading time estimation
5. Extract post card to a reusable component
6. Add subtle animations for interactions
7. Implement skeleton loading for better UX

### 6. `frontend/src/components/blog/BlogListPage.svelte` (4.5KB, 233 lines)

**Purpose**: Displays the full blog listing with a tag filtering sidebar.

**Key Features**:
- Two-column layout (tag sidebar + post listing)
- Shows all blog posts
- Tag filtering functionality
- Post count by tag
- Same post card design as homepage

**Strengths**:
- Clean two-column layout
- Good tag sidebar with post counts
- Effective post filtering by tags
- Consistent post card styling
- Responsive design

**Areas for Improvement**:
- Significant code duplication with HomePage for post cards
- No pagination for large numbers of posts
- Limited mobile optimization for the sidebar
- No loading states during filtering
- Limited animations for filtering actions
- No sorting options for posts
- No empty state for when no posts match filters

**Recommendations**:
1. Extract post card to a shared component
2. Implement pagination for post listings
3. Add sorting options (date, popularity, etc.)
4. Improve mobile view for the two-column layout
5. Add transition animations for filtering
6. Create empty state for no matching posts
7. Add loading indicators during filter operations

### 7. `frontend/src/components/blog/BlogPostPage.svelte` (9.9KB, 437 lines)

**Purpose**: Displays an individual blog post with content, metadata, and navigation.

**Key Features**:
- Full blog post content display
- Post metadata (date, author, tags)
- Previous/next post navigation
- Author information section
- Share functionality (placeholder)
- Related posts section (basic implementation)

**Strengths**:
- Comprehensive blog post layout
- Good navigation between posts
- Well-structured content sections
- Author information display
- Good tag implementation
- Clean typography for content

**Areas for Improvement**:
- Very large component that could be broken down
- No table of contents for long posts
- Code blocks lack syntax highlighting
- Limited social sharing functionality
- Basic image handling
- No loading state during post fetching
- No comment system
- No estimated reading time

**Recommendations**:
1. Split into smaller sub-components
2. Implement a table of contents for long posts
3. Add code syntax highlighting
4. Enhance social sharing capabilities
5. Improve image handling with lazy loading
6. Add reading time estimation
7. Consider adding a comment system
8. Implement loading states

### 8. `frontend/src/components/blog/TagsPage.svelte` (1.5KB, 80 lines)

**Purpose**: Displays all available tags with post counts.

**Key Features**:
- Grid layout of all tags
- Post count for each tag
- Alphabetical sorting of tags
- Links to filtered post views by tag

**Strengths**:
- Clean tag listing with post counts
- Good use of grid for responsive layout
- Consistent styling with rest of site
- Proper alphabetical sorting

**Areas for Improvement**:
- Limited visual differentiation between tags
- No filtering or search for tags
- No categorization of tags
- Limited visual indication of tag popularity
- No animation or hover effects
- No empty state handling

**Recommendations**:
1. Add visual weighting based on post count
2. Implement tag search/filtering
3. Add hover effects for better interaction
4. Consider tag categorization or grouping
5. Enhance visual hierarchy of tag counts
6. Add subtle animations for better UX

### 9. `frontend/src/components/blog/TagPage.svelte` (4.0KB, 195 lines)

**Purpose**: Displays posts filtered by a specific tag.

**Key Features**:
- Heading showing the current tag
- Filtered list of posts by tag
- Same post card design as other pages
- Link back to all tags

**Strengths**:
- Clear filtered view of posts by tag
- Consistent post card styling
- Good heading with tag name
- Navigation back to tags page

**Areas for Improvement**:
- Code duplication with BlogListPage
- No indication of total posts vs. filtered count
- No related tags suggestions
- No sorting options
- Limited filtering options
- No animation for tag transitions

**Recommendations**:
1. Extract post card to a shared component
2. Add post count indicators
3. Implement related tags suggestions
4. Add sorting options
5. Enhance with additional filtering options
6. Add transition animations
7. Improve mobile layout optimization

### 10. `frontend/src/data/blog-data.js` (8.4KB, 304 lines)

**Purpose**: Provides the blog post data for the application.

**Key Features**:
- Array of blog post objects
- Each post contains title, date, slug, summary, content, author, and tags
- Sample posts for testing and development
- Exports the data for use in components

**Strengths**:
- Well-structured post objects
- Good sample content
- Comprehensive post properties
- Clean data structure

**Areas for Improvement**:
- Static data with no external loading
- No schema validation
- No TypeScript types for data structure
- Limited metadata for SEO
- No utility functions for common operations
- No caching or performance optimizations
- No error handling for missing fields

**Recommendations**:
1. Implement data loading from external sources
2. Add schema validation for post data
3. Create TypeScript interfaces for data structures
4. Enhance with SEO metadata
5. Add utility functions for common data operations
6. Implement caching for better performance
7. Add error handling for missing or malformed data

### 11. `frontend/src/lib/components/` (Empty Directory)

**Purpose**: Appears to be intended for shared/library components but is currently empty.

**Recommendations**:
1. Move shared components here (extract post card, tag component, etc.)
2. Implement utility components like Button, Input, etc.
3. Create layout components for reuse
4. Add a README.md to document the purpose of this directory
5. Consider removing if not intended for use

## Overall Assessment of the Source Code

### Strengths
1. **Clean Component Architecture**: Well-organized components with clear responsibilities
2. **CSS Implementation**: Excellent use of CSS variables and component-scoped styles
3. **Routing**: Solid implementation with page.js
4. **Theming**: Well-implemented light/dark/system theme switching
5. **Data Structure**: Clean, consistent blog post data structure
6. **Performance**: Minimal dependencies and efficient HTML structure

### Weaknesses
1. **Code Duplication**: Significant duplication of code patterns (post cards, date formatting)
2. **Component Size**: Several large components that could be broken down
3. **Mobile Experience**: Limited mobile-specific optimizations and navigation
4. **Missing Features**: Projects section, About page, and 404 handling not implemented
5. **Error Handling**: Limited error states and fallbacks
6. **Utility Functions**: No shared utility functions for common operations

### Technical Debt Items
1. **Extract Shared Components**: Post card, tag chips, and other repeated UI elements
2. **Create Utility Functions**: Date formatting, tag handling, and other repeated logic
3. **Enhance Mobile Experience**: Add mobile menu and improve responsive layouts
4. **Implement Missing Pages**: Projects, About, and 404 pages
5. **Add Type Safety**: Consider TypeScript or PropType validation
6. **Improve Accessibility**: Add keyboard navigation, focus management, and ARIA attributes

### Immediate Improvement Opportunities
1. **Create a Utils Directory**: For shared helper functions
2. **Extract Common Components**: Move repeated UI elements to shared components
3. **Implement Projects Section**: Complete the planned functionality
4. **Add Mobile Menu**: Implement hamburger menu for mobile devices
5. **Create 404 Page**: Add fallback for invalid routes

## Implementation Plan for Source Code Improvements

### Phase 1: Code Organization and Cleanup
1. Create `src/utils` directory for shared functions
   - Extract date formatting to a utility function
   - Create tag utilities for counting and filtering
   - Add URL handling utilities
2. Extract shared components to `src/lib/components`
   - Create PostCard component
   - Extract Tag component
   - Implement Button and other UI primitives
3. Improve folder structure
   - Organize by feature or component type
   - Add README files to document directory purposes

### Phase 2: Missing Features Implementation
1. Implement Projects Section
   - Create project data structure
   - Implement ProjectsPage component
   - Add individual project detail page
   - Update routing in main.js
2. Create About Page
   - Implement AboutPage component
   - Add route in main.js
3. Add 404 Page
   - Create NotFoundPage component
   - Add catch-all route in main.js

### Phase 3: Enhancement and Optimization
1. Improve Mobile Experience
   - Implement hamburger menu
   - Optimize layouts for small screens
   - Enhance touch targets
2. Add Page Transitions
   - Implement transition animations between routes
   - Add loading indicators
3. Enhance Accessibility
   - Add keyboard navigation
   - Improve focus management
   - Enhance ARIA attributes

These improvements will significantly enhance the maintainability, user experience, and completeness of the blog application while preserving its clean architecture and performance benefits.

## Project Status Board
- [x] Phase 1: Project Setup and Configuration
  - [x] Task 1.1: Ensure correct Svelte 4 setup
  - [x] Task 1.2: Create CSS architecture
  - [x] Task 1.3: Set up ES module configuration
  - [x] Task 1.4: Add Svelte 4 documentation reference
- [x] Phase 2: Page Structure Implementation
  - [x] Task 2.1: Create header component
    - [x] Subtask 2.1.1: Add active state indicators for navigation
  - [x] Task 2.2: Create HomePage component
    - [x] Subtask 2.2.1: Limit homepage to 5 most recent posts
    - [x] Subtask 2.2.2: Enhance "All Posts" link styling
  - [x] Task 2.3: Create BlogPage component
  - [ ] Task 2.4: Create footer component
- [x] Phase 3: Blog Content Components
  - [x] Task 3.1: Create BlogCard component (integrated in page components)
  - [x] Task 3.2: Create BlogList component (integrated in page components)
  - [x] Task 3.3: Create TagList component (integrated in page components)
  - [x] Task 3.4: Create BlogPost component
- [x] Phase 4: Routing Implementation
  - [x] Task 4.1: Implement client-side routing
  - [x] Task 4.2: Create route handlers
  - [x] Task 4.3: Set up dynamic routes
  - [x] Task 4.4: Add scroll-to-top on navigation
  - [ ] Task 4.5: Create a 404 page component
- [x] Phase 5: Documentation
  - [x] Task 5.1: Create Svelte 4 reference documentation
  - [x] Task 5.2: Document project structure and architecture
  - [x] Task 5.3: Document code patterns and examples
- [ ] Phase 6: Projects Section Implementation
  - [ ] Task 6.1: Create projects data structure
  - [ ] Task 6.2: Implement ProjectsPage component
  - [ ] Task 6.3: Create ProjectCard component
  - [ ] Task 6.4: Implement ProjectDetailPage component
  - [ ] Task 6.5: Add projects routing
- [ ] Phase 7: Code Organization and Cleanup
  - [ ] Task 7.1: Create utils directory for shared functions
  - [ ] Task 7.2: Extract shared components
  - [ ] Task 7.3: Improve mobile experience

## Component Implementation Analysis

### HomePage.svelte
- **Strengths**: 
  - Properly limits to 5 most recent posts
  - Clean, focused UI matching reference site
  - Well-styled "All Posts" link
  - Responsive layout
- **Areas for Improvement**:
  - Consider adding estimated reading time
  - Could benefit from subtle animations on hover
  - Add lazy loading for better performance

### Header.svelte
- **Strengths**:
  - Well-implemented theme switching
  - Active state indicators for navigation links
  - Clean, responsive design
  - ARIA attributes for accessibility
- **Areas for Improvement**:
  - Missing mobile menu for smaller screens
  - Search button is non-functional
  - Could use subtle animations for interactions

### BlogListPage.svelte
- **Strengths**:
  - Two-column layout matching reference site
  - Tag sidebar with post counts
  - Proper filtering functionality
  - Consistent post card styling
- **Areas for Improvement**:
  - No pagination for large numbers of posts
  - Could benefit from filtering animations
  - Mobile layout needs optimization

### BlogPostPage.svelte
- **Strengths**:
  - Clean article layout
  - Previous/next post navigation
  - Author information display
  - Tag linking
- **Areas for Improvement**:
  - No table of contents for long posts
  - Code blocks lack syntax highlighting
  - No social sharing functionality
  - No related posts section

## Next Steps for Project Development

For the next phase of development, I recommend focusing on implementing the Projects section as outlined in the previous analysis. This will involve:

1. **Project Data Structure**
   - Create a project-data.js file in the data directory
   - Define schema for projects with fields for title, description, image, etc.
   - Add sample project data

2. **Component Implementation**
   - Create components/projects/ directory
   - Implement ProjectsPage.svelte for the main listing page
   - Create ProjectCard.svelte for individual project cards
   - Implement ProjectDetailPage.svelte for individual project details

3. **Routing Configuration**
   - Add routes in main.js for /projects and /projects/:id
   - Update App.svelte to render the new components
   - Ensure active state in Header.svelte works with these routes

4. **UI/UX Design**
   - Create a grid layout for project cards
   - Implement consistent styling with the blog
   - Add hover effects and animations
   - Ensure responsive design across all screen sizes

This implementation will complete the core content sections of the blog site, making it more closely match the reference site while maintaining the clean Svelte 4 and vanilla CSS approach.

## Executor's Feedback or Assistance Requests
We've fixed the ES module configuration issue in the Rollup build setup but encountered multiple failures when trying to implement blog post components. We also realized we were mixing concepts between the homepage and blog page. We need to create separate components for these distinct page types, each with their own layout, while still reusing common components like BlogCard.

## Lessons
- Vanilla CSS requires more planning for maintainability than utility-first frameworks
- Component-scoped CSS in Svelte helps maintain style isolation
- Custom CSS properties (variables) are essential for building a themeable site
- Media queries require careful planning for responsive breakpoints
- When using Svelte 4, be careful not to use Svelte 5 or SvelteKit features
- Always check the version compatibility of any Svelte plugins or libraries
- When working with ES modules:
  - Always add `"type": "module"` to package.json for clarity
  - Use ES module imports/exports syntax consistently (import/export) rather than CommonJS (require/module.exports)
  - When migrating from CommonJS to ES modules, check for instances of `require()` and replace with `import`
  - Update bundler configurations to properly handle ES modules
- Component implementation failures taught us:
  - Start extremely simple and add complexity gradually
  - Test components in isolation before integration
  - Avoid circular dependencies between components
  - Don't implement routing until basic components work
  - Mock data locally before using complex stores
  - Configure bundler properly for external dependencies
  - When a component doesn't work, revert to simplest possible version
  - Document errors encountered for future reference
- Page structure lessons:
  - Keep separate pages as separate components
  - Don't mix homepage and blog page content/layouts
  - Don't add UI demonstration elements (like toggle buttons) in the middle of pages
  - Study the reference site carefully to understand the distinct layout needs of each page 