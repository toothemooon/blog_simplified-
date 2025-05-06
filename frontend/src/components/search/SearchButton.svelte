<script>
  // Import event dispatcher
  import { createEventDispatcher } from 'svelte';
  import { t, language } from '../../i18n';
  
  // Create event dispatcher
  const dispatch = createEventDispatcher();
  
  // Function to handle click
  function handleClick() {
    dispatch('opensearch');
  }
  
  // Ensure proper translation function
  function getTranslation(key, params = {}) {
    try {
      return $t(key, params) || key;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
  }
  
  // Debug variable
  let currentLang = '';
  $: currentLang = $language;
</script>

<button 
  class="search-button" 
  aria-label={getTranslation('ui.search')} 
  on:click={handleClick}
  title={getTranslation('ui.search') + " (Press / to search)"}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
</button>

<style>
  .search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;
  }
  
  .search-button:hover {
    background-color: var(--color-border);
  }
</style> 