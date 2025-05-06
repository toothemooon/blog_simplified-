// Re-export everything from store.js
export { language, setLanguage, currentLangCode, getLanguageName } from './store.js';

// Export convenience function to get information about supported languages
export function getSupportedLanguages() {
  return [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '简体中文' }
  ];
} 