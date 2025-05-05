# Troubleshooting Guide

This document provides solutions for common issues that may be encountered when working with the Blog Simplified project.

## Build and Development Issues

### 1. Node Module Resolution Errors

**Symptoms**: Error messages related to missing modules or dependencies.

**Solution**:
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` to reinstall dependencies
3. If problems persist, check your Node.js version (v14+ required)

```bash
# Check node version
node -v

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### 2. Build Warnings: Unused CSS Selectors

**Symptoms**: Warnings about unused CSS selectors in `BlogPostPage.svelte`:

```
(!) Plugin svelte: Unused CSS selector ".post-content h1"
(!) Plugin svelte: Unused CSS selector ".post-content h2"
```

**Solution**: These warnings are expected and can be safely ignored. These selectors are used for styling dynamically loaded Markdown content.

### 3. Accessibility Warning for SearchDialog

**Symptoms**: Warning about non-interactive element with mouse/keyboard event listeners:

```
(!) Plugin svelte: A11y: Non-interactive element <div> should not be assigned mouse or keyboard event listeners.
```

**Solution**: This should be addressed by changing the element to a button or adding ARIA roles:

```svelte
<!-- Instead of this: -->
<div class="search-dialog-backdrop" on:click={handleClickOutside}>

<!-- Use this: -->
<div 
  class="search-dialog-backdrop" 
  on:click={handleClickOutside}
  role="button"
  tabindex="-1"
  aria-label="Close search dialog"
>
```

### 4. Port Already in Use

**Symptoms**: Error message: `Port 8080 is taken; using [different port] instead`

**Solution**: This is normal behavior when the default port is in use. The development server will automatically choose an alternative port. You can access the application at the URL displayed in the terminal.

If you specifically need to use port 8080:
1. Find the process using port 8080 and terminate it
2. Restart the development server

```bash
# On macOS/Linux
lsof -i :8080
kill -9 [PID]

# On Windows
netstat -ano | findstr :8080
taskkill /PID [PID] /F
```

## Runtime Issues

### 1. Horizontal Scrolling on Mobile

**Symptoms**: Unwanted horizontal scrollbar appears on mobile devices, or the page extends beyond the viewport width.

**Solution**:
1. Check that container elements have proper width constraints
2. Ensure `box-sizing: border-box` is applied to elements with padding
3. Add `overflow-x: hidden` to problematic containers
4. Make sure no fixed-width elements exceed viewport width

Key CSS fixes to apply:

```css
/* Global fixes */
html, body {
  overflow-x: hidden;
  max-width: 100%;
}

/* Component fixes */
.container {
  width: 100%;
  box-sizing: border-box;
}
```

### 2. Images Not Loading or Displaying Incorrectly

**Symptoms**: Images fail to load, appear distorted, or break page layout.

**Solution**:
1. Ensure correct paths in image references
2. Add responsive image styling:

```css
img {
  max-width: 100%;
  height: auto;
}
```

3. Check image format compatibility (WebP may not work on older browsers)
4. Optimize large images to reduce file size

### 3. Theme Switching Not Working

**Symptoms**: Theme doesn't change when toggling light/dark mode.

**Solution**:
1. Check browser localStorage access (private browsing may restrict it)
2. Verify that theme class is properly applied to the document body
3. Ensure CSS variables are correctly defined for both themes

Debug with:
```javascript
// Check stored theme
console.log('Stored theme:', localStorage.getItem('theme'));

// Check if dark theme class is applied
console.log('Dark theme applied:', document.body.classList.contains('dark-theme'));
```

### 4. Search Functionality Issues

**Symptoms**: Search returns incorrect results or doesn't work at all.

**Solution**:
1. Check browser console for JavaScript errors
2. Verify that search utility functions are properly imported
3. Ensure content is properly indexed in the search function

## Content Management Issues

### 1. New Blog Posts Not Appearing

**Symptoms**: Newly added blog posts don't show up in the blog listing.

**Solution**:
1. Verify that the post metadata is correctly added to the posts array in `src/data/blog/index.js`
2. Check that the Markdown content file exists in the correct location
3. Ensure proper naming conventions are followed
4. Clear browser cache or use incognito mode to test

### 2. Markdown Content Not Rendering Properly

**Symptoms**: Blog post content appears as raw Markdown or with formatting issues.

**Solution**:
1. Verify Markdown syntax is correct
2. Check if any special characters need escaping
3. Ensure the Markdown processor is correctly importing the content
4. For code blocks, ensure proper language identifiers are used

Example of correctly formatted Markdown code block:
```markdown
```javascript
function example() {
  console.log('This is a code block');
}
```
```

### 3. Tags Not Working Correctly

**Symptoms**: Tags don't filter content properly or tag links lead to errors.

**Solution**:
1. Check for case sensitivity issues (tags should be consistent in casing)
2. Verify that tag links use the correct route format
3. Ensure the tag filtering function is working correctly

## Deployment Issues

### 1. Failed Builds on Vercel/Netlify

**Symptoms**: Deployment fails with build errors.

**Solution**:
1. Check build logs for specific error messages
2. Verify dependencies are specified correctly in package.json
3. Ensure build commands are correct
4. Test build locally first:

```bash
npm run build
```

### 2. Routing Issues in Production

**Symptoms**: 404 errors when navigating directly to a specific URL.

**Solution**:
This is typically an issue with SPA routing in production environments. You need to configure your hosting provider to redirect all requests to index.html:

#### Vercel
A `vercel.json` file at the project root:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

#### Netlify
A `_redirects` file in the `public` folder:
```
/* /index.html 200
```

## Performance Issues

### 1. Slow Initial Load Time

**Symptoms**: Blog takes too long to load initially.

**Solution**:
1. Optimize bundle size using code splitting
2. Minimize and compress images
3. Implement lazy loading for non-critical resources
4. Enable gzip/Brotli compression on the server

### 2. High Memory Usage

**Symptoms**: Application becomes unresponsive over time, especially on mobile devices.

**Solution**:
1. Check for memory leaks in event listeners
2. Implement proper cleanup in Svelte component onDestroy
3. Optimize large data structures

Example of proper event listener cleanup:
```javascript
import { onMount, onDestroy } from 'svelte';

let listener = null;

onMount(() => {
  listener = window.addEventListener('resize', handleResize);
});

onDestroy(() => {
  if (listener) {
    window.removeEventListener('resize', handleResize);
  }
});
```

## Getting Additional Help

If you encounter issues not covered in this guide:

1. Check the browser console for error messages
2. Review the relevant component code for potential issues
3. Search for similar issues in Svelte documentation
4. Create a detailed report with steps to reproduce the issue and error messages

For bugs or feature requests, please open an issue on the project repository with a clear description of the problem. 