# MyBlog Code Patterns and Examples

This document provides common code patterns and examples used throughout the MyBlog project to help maintain consistency when implementing new features.

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
@media (max-width: 768px) {
  /* Styles for tablets and smaller devices */
}

@media (max-width: 640px) {
  /* Styles for mobile phones */
}
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

.gap-4 {
  gap: 1rem;
}

/* Container utility */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

## Markdown Processing

### Simple Markdown to HTML Converter

```javascript
function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  // Start with a container
  let html = '<div>';
  
  // Split the markdown by lines
  const lines = markdown.split('\n');
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      // h1 heading
      html += `<h1>${line.substring(2)}</h1>`;
    } else if (line.startsWith('## ')) {
      // h2 heading
      html += `<h2>${line.substring(3)}</h2>`;
    } else if (line.startsWith('* ')) {
      // List item
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${line.substring(2)}</li>`;
    } else if (line === '' && inList) {
      // End of list
      html += '</ul>';
      inList = false;
    } else if (line === '') {
      // Empty line, paragraph break
      html += '</p><p>';
    } else if (!inList) {
      // Regular paragraph text
      html += line + ' ';
    }
  }
  
  // Close any open lists
  if (inList) {
    html += '</ul>';
  }
  
  // Replace code blocks
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Wrap with final paragraph if needed
  if (!html.endsWith('</p>') && !html.endsWith('</ul>') && !html.endsWith('</h1>') && !html.endsWith('</h2>')) {
    html += '</p>';
  }
  
  // Close the container
  html += '</div>';
  
  // Fix any double paragraph tags
  html = html.replace(/<\/p><p><\/p><p>/g, '</p><p>');
  html = html.replace(/<p><\/p>/g, '');
  
  return html;
} 