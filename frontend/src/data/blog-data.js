// Blog data store (combines both legacy posts and modular structure)
import { posts as blogPosts } from './blog/index.js';

// Expose posts array for search functionality
export const posts = blogPosts;

// Log the available posts count for debugging
console.log(`Loaded ${posts.length} blog posts for search`);