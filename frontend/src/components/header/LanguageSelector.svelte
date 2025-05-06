<!-- LanguageSelector.svelte -->
<script>
  import { onMount } from 'svelte';
  import { language, setLanguage, getSupportedLanguages, getLanguageName } from '../../i18n';
  
  // Get language options from shared function
  const languages = getSupportedLanguages();
  
  // Dropdown state
  let isOpen = false;
  let isMobile = false;
  
  // Check if device supports hover on mount
  onMount(() => {
    checkMobileDevice();
    
    // Set up listener for changes (e.g., device orientation changes)
    const mediaQuery = window.matchMedia('(hover: none)');
    const handleMediaChange = (e) => {
      isMobile = e.matches;
    };
    
    // Use addEventListener with a named function so we can remove it properly
    mediaQuery.addEventListener('change', handleMediaChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  });
  
  function checkMobileDevice() {
    isMobile = window.matchMedia('(hover: none)').matches;
  }
  
  function toggleDropdown() {
    if (isMobile) {
      isOpen = !isOpen;
    }
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
  
  // Get current language label for the button
  $: currentLanguage = $language.toUpperCase();
  $: ariaLabel = `Select language, current language: ${getLanguageName($language)}`;
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-selector" class:is-mobile={isMobile}>
  <button 
    id="language-button"
    class="language-button" 
    on:click={toggleDropdown}
    aria-haspopup="true"
    aria-expanded={isOpen}
    aria-label={ariaLabel}
  >
    <!-- More detailed Globe Icon with grid lines and continents -->
    <svg class="globe-icon" viewBox="0 0 24 24" aria-hidden="true">
      <!-- Main globe circle -->
      <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-primary)" stroke-width="1.25" />
      
      <!-- Latitude lines -->
      <path d="M2 12h20" stroke="var(--color-primary)" stroke-width="0.5" fill="none" />
      <path d="M3 7h18" stroke="var(--color-primary)" stroke-width="0.5" fill="none" />
      <path d="M3 17h18" stroke="var(--color-primary)" stroke-width="0.5" fill="none" />
      
      <!-- Longitude lines -->
      <path d="M12 2v20" stroke="var(--color-primary)" stroke-width="0.5" fill="none" />
      <path d="M7 3v18" stroke="var(--color-primary)" stroke-width="0.5" fill="none" />
      <path d="M17 3v18" stroke="var(--color-primary)" stroke-width="0.5" fill="none" />
      
      <!-- Stylized continents (simplified shapes) -->
      <path d="M9 7.5c1-1 2-1.5 3-1s2 1 2.5 2 0.5 2 0 3-1 2-2 2.5-2 0-2.5-1-1-2-1-3 0-1.5 0-2.5z" fill="var(--color-primary)" />
      <path d="M16 15c0.5-0.5 1-1.5 1-2s-0.5-1-1-1.5-1-0.5-1.5 0-0.5 1-0.5 1.5 0.5 1 1 1.5 0.5 1 1 0.5z" fill="var(--color-primary)" />
      <path d="M8 17c0.5-0.5 1-1 1.5-1s1 0.5 1.5 0.5 0.5-0.5 0-1-1-0.5-1.5-0.5-1 0.5-1.5 1-0.5 1 0 1z" fill="var(--color-primary)" />
    </svg>
    <span class="language-code-container">
      <span class="language-code">{currentLanguage}</span>
      <span class="dropdown-indicator">▼</span>
    </span>
  </button>
  
  <div 
    id="language-menu" 
    class="language-menu" 
    class:open={isOpen}
    role="menu"
  >
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
</div>

<style>
  .language-selector {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  /* Improved hover bridge to prevent gap between button and menu */
  .language-selector::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 10px; /* Bridge height to cover the gap */
    opacity: 0; /* Invisible but captures hover */
    z-index: var(--z-index-dropdown);
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
    min-width: 44px; /* Ensure minimum touch target size */
    justify-content: center; /* Center items horizontally */
  }
  
  .language-button:hover {
    background-color: var(--color-border);
  }
  
  .globe-icon {
    width: 20px;
    height: 20px;
    stroke: var(--color-primary);
    fill: none;
    flex-shrink: 0; /* Prevent icon from shrinking */
  }
  
  .language-code-container {
    display: inline-flex;
    align-items: center;
    white-space: nowrap; /* Prevent text wrapping */
    flex-shrink: 0; /* Prevent text from shrinking */
  }
  
  .language-code {
    font-size: var(--font-size-base);
    font-weight: 500;
    display: inline-block; /* Keep text inline */
    letter-spacing: 0; /* Tighten letter spacing slightly */
  }
  
  .dropdown-indicator {
    font-size: 0.6em;
    margin-left: 2px;
    opacity: 0.7;
    color: var(--color-primary);
    display: inline-block; /* Keep indicator inline */
  }
  
  .language-menu {
    position: absolute;
    top: calc(100% + 5px); /* Slightly lower to make sure it doesn't overlap button */
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.375rem; /* Match other UI components */
    padding: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Match other dropdowns */
    z-index: var(--z-index-dropdown);
    min-width: 8rem; /* Slightly smaller to match other dropdowns */
    display: none;
  }
  
  /* For hover functionality on desktop with slight delay */
  @media (hover: hover) {
    .language-selector:hover .language-menu {
      display: block;
      animation: fadeIn 0.15s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  }
  
  /* For mobile devices that use click instead of hover */
  .language-menu.open {
    display: block;
  }
  
  .language-option {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.625rem 0.5rem; /* Slightly reduced padding */
    min-height: 40px; /* Slightly shorter than the 44px standard for compactness */
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;
    font-size: var(--font-size-sm); /* Slightly smaller text */
  }
  
  .language-option:hover {
    background-color: var(--color-border);
  }
  
  .language-option.active {
    background-color: rgba(var(--color-primary-rgb), 0.15);
    font-weight: 500;
  }
  
  /* Mobile-specific adjustments */
  @media (max-width: 640px) {
    .language-button {
      padding: 0.5rem 0.25rem; /* Reduce horizontal padding on mobile */
      gap: 0.25rem; /* Reduce gap between icon and text */
    }
    
    .dropdown-indicator {
      margin-left: 0;
    }
    
    .language-menu {
      min-width: 7rem; /* Even smaller on mobile */
    }
    
    .globe-icon {
      width: 18px; /* Slightly smaller icon on mobile */
      height: 18px;
    }
    
    .language-code {
      font-size: var(--font-size-sm); /* Smaller font on mobile */
    }
  }
  
  /* For very small screens */
  @media (max-width: 380px) {
    .language-button {
      padding: 0.5rem 0.125rem; /* Minimal padding for tiny screens */
    }
  }
</style> 