// Directly import and re-export each item individually for clarity
import { 
  language,
  setLanguage, 
  currentLangCode, 
  getLanguageName, 
  t as translationStore,
  translate,
  getSupportedLanguages
} from './store.js';

// Re-export everything explicitly
export const t = translationStore;
export { 
  language, 
  setLanguage, 
  currentLangCode, 
  getLanguageName, 
  translate,
  getSupportedLanguages
}; 