// Utility functions for the blog component

import { posts, getPostContent, getPostBySlug, getRelatedPosts, getNextPost, getPreviousPost } from '../data/blog';
import { posts as legacyPosts } from '../data/blog-data';
import { language, t } from '../i18n';
import en from '../i18n/locales/en.json';
import ja from '../i18n/locales/ja.json';
import zh from '../i18n/locales/zh.json';

// Create a reference to translations
const translations = { en, ja, zh };

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
  console.log('[blog-utils.js] getAllPosts returning:', combinedPosts);
  return combinedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a post by slug from either the new or legacy system
 * Includes support for localized content
 * @param {String} slug - The post slug
 * @param {String} [lang] - Optional language code 
 * @returns {Object} - The post object with content
 */
export async function getPost(slug, lang) {
  // Try to get from new system first
  const newPost = getPostBySlug(slug);
  if (newPost) {
    // Get localized or default content
    const content = await getLocalizedContent(slug, lang);
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
 * Get localized content for a post
 * @param {String} slug - The post slug
 * @param {String} [lang] - Optional language code
 * @returns {Promise<String>} - The post content
 */
export async function getLocalizedContent(slug, lang) {
  const post = getPostBySlug(slug);
  if (!post) return null;
  
  // If language is not specified, get it from store
  let currentLang = lang;
  if (!currentLang) {
    // Use the language from store
    language.subscribe(value => {
      currentLang = value;
    })();
  }
  
  try {
    // First try to load language-specific content from post's getLocalizedContent method
    if (currentLang && currentLang !== 'en' && post.getLocalizedContent) {
      try {
        const localizedContent = await post.getLocalizedContent(currentLang);
        return localizedContent?.default || localizedContent;
      } catch (error) {
        console.warn(`Could not load localized content for [${slug}] in [${currentLang}]`, error);
        // Fall through to default content
      }
    }
    
    // If no localized content or language is English, use default content
    const content = await getPostContent(slug);
    return content;
  } catch (error) {
    console.error(`Error loading content for post: ${slug}`, error);
    return null;
  }
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
 * @param {String} [currentLang] - Optional language code to override current language
 * @returns {String} - The localized tag name
 */
export function getLocalizedTagName(tag, currentLang) {
  if (!tag) return '';
  
  // Set a default language if not provided
  let lang = currentLang;
  if (!lang) {
    // Try to get it from the language store subscription
    language.subscribe(value => {
      lang = value;
    })();
  }
  
  // First try direct access to translations for maximum reliability
  if (lang && translations[lang] && translations[lang].tags && translations[lang].tags[tag]) {
    return translations[lang].tags[tag];
  }
  
  // Fall back to English
  if (lang !== 'en' && translations.en.tags && translations.en.tags[tag]) {
    return translations.en.tags[tag];
  }
  
  // If still no translation, return the original tag
  return tag;
}

/**
 * Get localized field value based on current language
 * @param {Object} item - The object containing the field
 * @param {String} fieldName - The base field name
 * @param {String} [currentLang] - Optional language code, defaults to current language
 * @returns {String} - The localized field value or the default value
 */
export function getLocalizedField(item, fieldName, currentLang) {
  if (!item || !fieldName) return '';
  
  // Set a default language if not provided
  let lang = currentLang;
  if (!lang) {
    // Try to get it from the language store subscription
    language.subscribe(value => {
      lang = value;
    })();
  }
  
  // Try to get language-specific field (e.g., title_ja, summary_zh)
  const localizedKey = `${fieldName}_${lang}`;
  
  if (item[localizedKey]) {
    return item[localizedKey];
  }
  
  // Fall back to English version if specific language not found
  const englishKey = `${fieldName}_en`;
  if (item[englishKey]) {
    return item[englishKey];
  }
  
  // Fall back to default field name with no suffix as last resort
  // This supports older posts that don't use language suffixes
  if (item[fieldName]) {
    return item[fieldName];
  }
  
  // If nothing found, return empty string instead of undefined
  return '';
} 