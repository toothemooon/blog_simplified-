// Utility functions for the blog component

import { posts, getPostContent, getPostBySlug, getRelatedPosts, getNextPost, getPreviousPost } from '../data/blog';
import { posts as legacyPosts } from '../data/blog-data';
import { language, t } from '../i18n';

/**
 * Get posts from both new and legacy sources
 * This allows for a gradual transition from the old blog-data.js to the new modular approach
 */
export function getAllPosts() {
  // Combine posts from both sources, with new posts taking precedence
  const allSlugs = new Set([...posts.map(p => p.slug), ...legacyPosts.map(p => p.slug)]);
  
  const combinedPosts = [];
  
  // Add posts from the new system first (highest priority)
  posts.forEach(post => {
    combinedPosts.push(post);
  });
  
  // Add legacy posts that don't overlap with new posts
  legacyPosts.forEach(post => {
    if (!posts.find(p => p.slug === post.slug)) {
      // Convert legacy post to new format
      combinedPosts.push({
        ...post,
        // Add a getContent method that returns the content directly
        getContent: () => Promise.resolve({ default: post.content })
      });
    }
  });
  
  // Sort by date (newest first)
  return combinedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a post by slug from either the new or legacy system
 */
export async function getPost(slug) {
  // Try to get from new system first
  const newPost = getPostBySlug(slug);
  if (newPost) {
    const content = await getPostContent(slug);
    return {
      ...newPost,
      content
    };
  }
  
  // Fall back to legacy system
  const legacyPost = legacyPosts.find(p => p.slug === slug);
  if (legacyPost) {
    return legacyPost;
  }
  
  return null;
}

/**
 * Get related posts for a specific post
 */
export function getRelatedPostsForSlug(slug, limit = 3) {
  const post = getPostBySlug(slug) || legacyPosts.find(p => p.slug === slug);
  if (!post || !post.tags || post.tags.length === 0) return [];
  
  // Use the first tag for finding related posts
  const primaryTag = post.tags[0];
  return getRelatedPosts(slug, primaryTag, limit);
}

/**
 * Get the next post in sequence (by date) for a specific post
 */
export function getNextPostForSlug(slug) {
  return getNextPost(slug);
}

/**
 * Get the previous post in sequence (by date) for a specific post
 */
export function getPreviousPostForSlug(slug) {
  return getPreviousPost(slug);
}

/**
 * Format a post date for display
 */
export function formatPostDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

/**
 * Calculate estimated reading time for a post
 */
export function getReadingTime(content) {
  if (!content) return '< 1 min read';
  
  // Average reading speed (words per minute)
  const wordsPerMinute = 200;
  
  // Count words in content (rough approximation)
  const wordCount = content.trim().split(/\s+/).length;
  
  // Calculate reading time
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime <= 1 ? '1 min read' : `${readingTime} min read`;
}

/**
 * Get localized tag name using the i18n system
 * @param {String} tag - The original tag name
 * @returns {String} - The localized tag name
 */
export function getLocalizedTagName(tag) {
  if (!tag) return '';
  
  // Create tag translation key
  const tagKey = `tags.${tag}`;
  
  // Try to get translation using t function
  try {
    const translated = t(tagKey);
    
    // If the translation key is returned unchanged, it means no translation was found
    if (translated === tagKey) {
      return tag; // Fallback to original tag
    }
    
    return translated;
  } catch (e) {
    // If any error occurs, return the original tag
    return tag;
  }
} 