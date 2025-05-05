# SvelteBlog Code Patterns and Examples

This document provides common code patterns and examples used throughout the SvelteBlog project to help maintain consistency when implementing new features.

## Svelte Component Structure

### Basic Component Template

```svelte
<script>
  // Imports
  import { onMount } from 'svelte';
  
  // Props
  export let propName = defaultValue;
  
  // State variables
  let stateVar = initialValue;
  
  // Reactive declarations
  $: derivedValue = someCalculation(stateVar);
  
  // Lifecycle
  onMount(() => {
    // Component mounted logic
    
    return () => {
      // Cleanup logic
    };
  });
  
  // Event handlers
  function handleEvent() {
    // Handle event
  }
</script>

<!-- Template -->
<div class="component-name">
  <h2>{propName}</h2>
  <p>{derivedValue}</p>
  <button on:click={handleEvent}>Click me</button>
</div>

<!-- Styles -->
<style>
  .component-name {
    /* Component styles */
  }
</style>
```

## Routing Patterns

### Adding a New Route

In `main.js`:

```javascript
// Adding a static route
page('/route-path', () => {
  setRoute('/route-name');
});

// Adding a dynamic route with parameters
page('/route-path/:paramName', (ctx) => {
  setRoute('/route-name', { paramName: ctx.params.paramName });
});
```

In `App.svelte`:

```svelte
{#if currentRoute === '/route-name'}
  <YourComponent param={params.paramName} />
{/if}
```

### SPA Routing Configuration

For development, configure the sirv server in `package.json`:

```json
"scripts": {
  "dev-single": "sirv public --dev --single --port 8080 & rollup -c -w"
}
```

For production (Vercel), use `vercel.json`:

```json
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Data Handling

### Working with Blog Posts

```javascript
// Filter posts by tag
const filteredPosts = posts.filter(post => 
  post.tags && post.tags.includes(tagName)
);

// Sort posts by date (newest first)
const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

// Get recent posts
const recentPosts = sortedPosts.slice(0, 5);

// Find a post by slug
const post = posts.find(p => p.slug === slug);

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
```

### Project Data Management

```javascript
// Find project by ID
const project = projects.find(p => p.id === id);

// Get next and previous projects for navigation
const projectIndex = projects.findIndex(p => p.id === id);
const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
```

### Tag Management

```javascript
// Generate unique tags with counts
const tags = posts.reduce((acc, post) => {
  if (post.tags && post.tags.length) {
    post.tags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = 0;
      }
      acc[tag]++;
    });
  }
  return acc;
}, {});

// Sort tags alphabetically
const sortedTags = Object.entries(tags).sort(([a], [b]) => a.localeCompare(b));
```

## Styling Patterns

### Responsive Design

```css
/* Base styles for all screen sizes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  /* Styles for tablets and larger devices */
  .two-column-layout {
    display: flex;
  }
  
  .sidebar {
    width: 25%;
  }
  
  .content {
    width: 75%;
    padding-left: 2rem;
  }
}

@media (max-width: 640px) {
  /* Styles for mobile phones */
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

### Project Card Grid

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Avatar Implementation

```svelte
<div class="avatar-container">
  <img class="avatar" src="/images/avatar/scenery-avatar.svg" alt="Scenic landscape avatar with mountains and trees" />
</div>

<style>
  .avatar-container {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--color-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
</style>
```

### Theme Variables

```css
/* Using theme variables */
.element {
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
}

/* Handling theme transitions */
.element-with-transition {
  color: var(--color-text);
  transition: color 0.2s ease, background-color 0.2s ease;
}
```

## Theme Handling

### Accessing and Setting Theme

```javascript
// Reading theme preference
const savedTheme = localStorage.getItem('theme');

// Setting theme
function applyTheme(newTheme) {
  // Update theme variable
  theme = newTheme;
  
  // Apply theme to document
  if (newTheme === 'dark') {
    document.body.classList.add('dark-theme');
  } else if (newTheme === 'light') {
    document.body.classList.remove('dark-theme');
  } else if (newTheme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  // Store preference
  localStorage.setItem('theme', newTheme);
}
```

## Navigation Active State

### Determining Active Link

```javascript
// Determining if a navigation link is active
function isActive(link) {
  if (currentRoute === '/') {
    return link.href === '/';
  }
  
  if (currentRoute === '/blog-post') {
    return link.route === '/blog-list';
  }
  
  if (currentRoute === '/tag') {
    return link.route === '/tags-list';
  }
  
  if (currentRoute === '/project-detail') {
    return link.route === '/projects-list';
  }
  
  return currentRoute === link.route;
}
```

### Marking Active Links in Template

```svelte
<a 
  href={link.href} 
  class="nav-link" 
  class:active={isActive(link)}
  aria-current={isActive(link) ? 'page' : undefined}
>
  {link.text}
</a>
```

## Social Links Pattern

```svelte
<script>
  const socialLinks = [
    { name: 'Mail', url: 'mailto:hello@example.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'GitHub', url: 'https://github.com', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  ];
</script>

<div class="social-links">
  {#each socialLinks as link}
    <a href={link.url} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={link.name}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon">
        <path d={link.icon}></path>
      </svg>
      <span class="social-name">{link.name}</span>
    </a>
  {/each}
</div>
```

## CSS Utility Classes

### Common Utility Classes in global.css

```css
/* Flexbox utilities */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

/* Text utilities */
.text-center {
  text-align: center;
}

.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

/* Spacing utilities */
.mt-2 {
  margin-top: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.p-4 {
  padding: 1rem;
}
```

## Future Refactoring Patterns

### Extracting Reusable PostCard Component

```svelte
<!-- PostCard.svelte -->
<script>
  export let post;
  export let showReadMore = true;
  
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="post-card">
  <div class="post-meta">
    <span class="post-date">{formatDate(post.date)}</span>
  </div>
  
  <h2 class="post-title">
    <a href="/blog/{post.slug}">{post.title}</a>
  </h2>
  
  {#if post.tags && post.tags.length > 0}
    <div class="post-tags">
      {#each post.tags as tag}
        <a href="/tags/{tag}" class="tag">{tag}</a>
      {/each}
    </div>
  {/if}
  
  <p class="post-summary">{post.summary}</p>
  
  {#if showReadMore}
    <a href="/blog/{post.slug}" class="read-more">Read more →</a>
  {/if}
</div>

<style>
  /* Component styles */
</style>
```

### Example Component Usage

```svelte
<!-- In HomePage.svelte -->
<script>
  import PostCard from '../lib/components/PostCard.svelte';
  import { posts } from '../data/blog-data.js';
  
  // Get 5 most recent posts
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
</script>

<div class="recent-posts">
  <h1>Latest Posts</h1>
  
  {#each recentPosts as post}
    <PostCard {post} />
  {/each}
  
  <a href="/blog" class="all-posts-link">All Posts →</a>
</div>
```