import { writable, derived } from 'svelte/store';

// Initialize with browser language or saved preference
const getBrowserLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  
  const savedLang = localStorage.getItem('language');
  if (savedLang) return savedLang;
  
  const browserLang = navigator.language.split('-')[0];
  return ['en', 'ja', 'zh'].includes(browserLang) ? browserLang : 'en';
};

// Create writable store
export const language = writable(getBrowserLanguage());

// Save language preference when it changes
language.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', value);
  }
});

// Function to change language
export function setLanguage(lang) {
  if (['en', 'ja', 'zh'].includes(lang)) {
    language.set(lang);
    console.log(`Language changed to: ${lang} (store.js)`);
  }
}

// Get current language code as a derived store
export const currentLangCode = derived(
  language,
  $language => $language
);

// Get language name from code
export function getLanguageName(code) {
  const languages = {
    'en': 'English',
    'ja': '日本語',
    'zh': '简体中文'
  };
  return languages[code] || 'English';
} 