import { projects, getProjectBySlug, getProjectContent, getRelatedProjects } from '../data/projects';
import { language, t } from '../i18n';

// Import translations
import en from '../i18n/locales/en.json';
import ja from '../i18n/locales/ja.json';
import zh from '../i18n/locales/zh.json';

// Create a translations object
const translations = { en, ja, zh };

/**
 * Get all projects
 */
export function getAllProjects() {
  return projects;
}

/**
 * Get a specific project by slug
 */
export async function getProject(slug) {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  
  return project;
}

/**
 * Format a project period for display
 * Example: "Jan 2018 – Present" -> "January 2018 – Present"
 */
export function formatProjectPeriod(period) {
  if (!period) return '';
  
  // Map of short month names to full month names
  const monthMap = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December'
  };
  
  // Replace short month names with full month names
  let formattedPeriod = period;
  Object.entries(monthMap).forEach(([short, full]) => {
    const regex = new RegExp(`\\b${short}\\b`, 'g');
    formattedPeriod = formattedPeriod.replace(regex, full);
  });
  
  return formattedPeriod;
}

/**
 * Get related projects for a given project
 */
export function getRelatedProjectsBySlug(slug, limit = 2) {
  const project = getProjectBySlug(slug);
  if (!project) return [];
  
  return getRelatedProjects(project, limit);
}

/**
 * Get localized field value based on current language
 * @param {Object} item - The object containing the field
 * @param {String} fieldName - The base field name
 * @param {String} lang - The language code (en, ja, zh)
 * @returns {String} - The localized field value or the default value
 */
export function getLocalizedField(item, fieldName, lang) {
  if (!item || !fieldName) return '';
  
  // Try to get language-specific field (e.g., title_ja, summary_zh)
  const localizedKey = `${fieldName}_${lang}`;
  if (item[localizedKey]) {
    return item[localizedKey];
  }
  
  // Fall back to default field
  return item[fieldName] || '';
}

/**
 * Get localized field with reactive language support
 * Creates a derived store that updates when language changes
 * @param {Object} item - The object containing the field
 * @param {String} fieldName - The base field name
 * @returns {Function} - Function that returns the localized value
 */
export function getLocalizedFieldReactive(item, fieldName) {
  let currentLang = 'en';
  
  // Get current language
  language.subscribe(value => {
    currentLang = value;
  })();
  
  return getLocalizedField(item, fieldName, currentLang);
}

/**
 * Get localized tag name
 * @param {String} tag - The original tag name
 * @param {String} lang - The language code (en, ja, zh)
 * @returns {String} - The localized tag name
 */
export function getLocalizedTagName(tag, lang) {
  if (!tag) return '';
  
  // Create tag translation key
  const tagKey = `tags.${tag}`;
  
  // If language is specified, try to get translation from that language
  if (lang && translations[lang] && translations[lang].tags && translations[lang].tags[tag]) {
    return translations[lang].tags[tag];
  }
  
  // Fall back to English
  if (lang !== 'en' && translations.en.tags && translations.en.tags[tag]) {
    return translations.en.tags[tag];
  }
  
  // Last resort: return original tag
  return tag;
} 