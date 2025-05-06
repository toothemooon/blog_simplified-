/**
 * Search utility functions for the blog
 */

/**
 * Search posts by query string
 * @param {Array} posts - The array of blog posts
 * @param {string} query - The search query
 * @returns {Array} - Scored and sorted search results
 */
export function searchPosts(posts, query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const normalizedQuery = normalizeText(query.toLowerCase());
  const terms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);

  if (terms.length === 0) {
    return [];
  }

  // Score and filter posts
  const results = posts
    .map(post => {
      const score = calculateScore(post, terms);
      return { post, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Calculate search relevance score for a post
 * @param {Object} post - The post object
 * @param {Array} terms - Array of search terms
 * @returns {number} - The relevance score
 */
function calculateScore(post, terms) {
  let score = 0;
  
  // Title has the highest weight
  const normalizedTitle = normalizeText(post.title.toLowerCase());
  terms.forEach(term => {
    if (normalizedTitle.includes(term)) {
      score += 10;
    }
  });
  
  // Summary has medium weight
  if (post.summary) {
    const normalizedSummary = normalizeText(post.summary.toLowerCase());
    terms.forEach(term => {
      if (normalizedSummary.includes(term)) {
        score += 5;
      }
    });
  }
  
  // Tags have medium weight
  if (post.tags && post.tags.length) {
    const normalizedTags = post.tags.map(tag => normalizeText(tag.toLowerCase()));
    terms.forEach(term => {
      if (normalizedTags.some(tag => tag.includes(term))) {
        score += 5;
      }
    });
  }
  
  // Content has lower weight but still important
  if (post.content) {
    const normalizedContent = normalizeText(post.content.toLowerCase());
    terms.forEach(term => {
      if (normalizedContent.includes(term)) {
        score += 3;
      }
    });
  }
  
  return score;
}

/**
 * Group search results by year
 * @param {Array} results - Array of search results
 * @returns {Object} - Results grouped by year
 */
export function groupResultsByYear(results) {
  return results.reduce((groups, result) => {
    const post = result.post;
    const date = new Date(post.date);
    const year = date.getFullYear();
    
    if (!groups[year]) {
      groups[year] = [];
    }
    
    groups[year].push(result);
    return groups;
  }, {});
}

/**
 * Normalize text for better search matching
 * @param {string} text - The text to normalize
 * @returns {string} - Normalized text
 */
function normalizeText(text) {
  return text
    .replace(/[^\w\s]/g, ' ') // Replace non-alphanumeric with spaces
    .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
    .trim();
}

/**
 * Highlight search terms in text
 * @param {string} text - The text to highlight in
 * @param {string} query - The search query
 * @returns {string} - Text with highlighted terms
 */
export function highlightTerms(text, query) {
  if (!query || query.trim() === '') {
    return text;
  }
  
  const normalizedQuery = normalizeText(query.toLowerCase());
  const terms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);
  
  let result = text;
  terms.forEach(term => {
    // Case insensitive replace with regex
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  
  return result;
}

/**
 * Escape string for use in regex
 * @param {string} string - String to escape
 * @returns {string} - Escaped string
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Format date from ISO string to Month DD, YYYY
 * @param {string} dateStr - ISO date string
 * @returns {string} - Formatted date
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  
  // Get current language from store
  let locale = 'en-US'; // Default fallback
  
  // Try to get current language from localStorage for SSR-safe approach
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      // Map language codes to locales
      const localeMap = {
        'en': 'en-US',
        'ja': 'ja-JP',
        'zh': 'zh-CN'
      };
      locale = localeMap[storedLang] || 'en-US';
    }
  }
  
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 