import { writable, derived, get } from 'svelte/store';

// Direct imports instead of dynamic loading
import en from './locales/en.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';

// Pre-loaded translations with fallbacks
const translations = { en, ja, zh };

// Browser language detection
function getBrowserLanguage() {
  if (typeof window === 'undefined') return 'en';
  
  try {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['en', 'ja', 'zh'].includes(savedLang)) return savedLang;
    
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'ja', 'zh'].includes(browserLang) ? browserLang : 'en';
  } catch (e) {
    return 'en'; // Safe fallback
  }
}

// Create language store
export const language = writable(getBrowserLanguage());

// Save language preference when it changes
language.subscribe(value => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('language', value);
    } catch (e) {
      console.warn('Could not save language preference to localStorage');
    }
  }
});

// Simple language setter
export function setLanguage(lang) {
  if (['en', 'ja', 'zh'].includes(lang)) {
    language.set(lang);
    console.log(`Language changed to: ${lang}`);
  }
}

// Helper functions
export const currentLangCode = derived(language, $language => $language);

export function getLanguageName(code) {
  const languages = {
    'en': 'English',
    'ja': '日本語',
    'zh': '简体中文'
  };
  return languages[code] || 'English';
}

// FIXING EXPORT: Direct export with non-reactive function
// Instead of derived store, export a plain function that gets current language from store
export function t(key, params = {}) {
  // Get current language synchronously
  const lang = get(language);
  
  // Handle empty keys
  if (!key) return '';
  
  // Navigate through nested keys (e.g., "nav.blog")
  const keys = key.split('.');
  let value = translations[lang];
  
  // Find translation in current language
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  // Fallback to English if not found
  if (!value && lang !== 'en') {
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
  }
  
  // If still no translation, return the key itself
  if (!value) return key;
  
  // Replace parameters
  return value.replace(/\{\{(\w+)\}\}/g, (_, paramName) => 
    params[paramName] !== undefined ? params[paramName] : `{{${paramName}}}`
  );
}

// Export supported languages
export function getSupportedLanguages() {
  return [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '简体中文' }
  ];
} 