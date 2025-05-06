<!-- LanguageSelector.svelte -->
<script>
  import { language, setLanguage, getSupportedLanguages } from '../../i18n';
  
  // Get language options from shared function
  const languages = getSupportedLanguages();
  
  // Dropdown state
  let isOpen = false;
  
  function toggleDropdown() {
    isOpen = !isOpen;
  }
  
  function selectLanguage(code) {
    setLanguage(code);
    isOpen = false;
  }
  
  // Close dropdown when clicking outside
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.language-selector')) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-selector">
  <button 
    id="language-button"
    class="language-button" 
    on:click={toggleDropdown}
    aria-haspopup="true"
    aria-expanded={isOpen}
    aria-label="Select language"
  >
    <!-- Globe Icon SVG -->
    <svg class="globe-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.1" />
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" fill="currentColor" />
      <path d="M12 2a10 10 0 0 0-10 10h20a10 10 0 0 0-10-10z" fill="currentColor" fill-opacity="0.3" />
      <path d="M2 12a10 10 0 0 0 10 10V2a10 10 0 0 0-10 10z" fill="currentColor" fill-opacity="0.2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" fill-opacity="0.2" />
    </svg>
    <span class="language-text">Language</span>
  </button>
  
  {#if isOpen}
    <div id="language-menu" class="language-menu" role="menu">
      {#each languages as lang}
        <button 
          class="language-option" 
          class:active={$language === lang.code}
          on:click={() => selectLanguage(lang.code)}
          role="menuitem"
        >
          {lang.name}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .language-selector {
    position: relative;
  }
  
  .language-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    height: 44px;
  }
  
  .language-button:hover {
    background-color: var(--color-border);
  }
  
  .globe-icon {
    width: 20px;
    height: 20px;
  }
  
  .language-text {
    font-size: var(--font-size-base);
  }
  
  .language-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: var(--z-index-dropdown);
    min-width: 10rem;
  }
  
  .language-option {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.75rem 0.5rem;
    min-height: 44px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;
  }
  
  .language-option:hover {
    background-color: var(--color-border);
  }
  
  .language-option.active {
    background-color: rgba(var(--color-primary-rgb), 0.15);
    font-weight: 500;
  }
  
  /* For mobile, hide the text and just show the icon */
  @media (max-width: 640px) {
    .language-text {
      display: none;
    }
  }
</style> 