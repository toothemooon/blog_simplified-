<script>
  import { onMount } from 'svelte';
  import { t } from '../i18n';
  import SearchButton from './search/SearchButton.svelte';
  import SearchDialog from './search/SearchDialog.svelte';
  import Logo from './header/Logo.svelte';
  import NavLinks from './header/NavLinks.svelte';
  import MobileMenu from './header/MobileMenu.svelte';
  import MobileMenuButton from './header/MobileMenuButton.svelte';
  import LanguageSelector from './header/LanguageSelector.svelte';
  
  // Props: accept currentRoute from App.svelte
  export let currentRoute = '/';

  // State variables
  let theme = 'light';
  let showThemeMenu = false;
  let showSearchDialog = false;
  let mobileMenuOpen = false;
  let isMobile = false;
  let windowWidth;
  
  // Initialize theme and check screen size on mount
  onMount(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme = savedTheme;
      applyTheme(theme);
    }
    
    // Set up resize handler to detect mobile screens
    const handleResize = () => {
      windowWidth = window.innerWidth;
      isMobile = windowWidth < 640;
      
      // Auto-close mobile menu when resizing to desktop
      if (!isMobile && mobileMenuOpen) {
        mobileMenuOpen = false;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    // Set up click outside handler
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  });
  
  // Apply theme to document
  function applyTheme(newTheme) {
    theme = newTheme;
    
    if (newTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (newTheme === 'light') {
      document.body.classList.remove('dark-theme');
    } else if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
    
    localStorage.setItem('theme', newTheme);
  }
  
  // Toggle theme menu
  function toggleThemeMenu() {
    showThemeMenu = !showThemeMenu;
  }
  
  // Close theme menu on outside click
  function handleClickOutside(event) {
    const themeMenu = document.getElementById('theme-menu');
    const themeButton = document.getElementById('theme-button');
    
    if (showThemeMenu && themeMenu && !themeMenu.contains(event.target) && !themeButton.contains(event.target)) {
      showThemeMenu = false;
    }
  }
  
  // Handle search dialog open/close
  function handleOpenSearch() {
    showSearchDialog = true;
  }
  
  function handleCloseSearch() {
    showSearchDialog = false;
  }
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  // Handle navigation link click
  function handleLinkClick() {
    if (isMobile) {
      mobileMenuOpen = false;
    }
  }
</script>

<header class="header app-header">
  <div class="container header-container">
    <!-- Logo -->
    <div class="logo-container">
      <Logo size="default" />
    </div>
    
    <!-- Navigation and Actions -->
    <div class="nav-actions-container">
      <!-- Desktop Navigation -->
      <div class="desktop-nav hide-on-mobile">
        <NavLinks 
          {currentRoute}
          on:linkClick={handleLinkClick}
        />
      </div>
      
      <!-- Actions -->
      <div class="header-actions">
        <!-- Search Button -->
        <SearchButton on:opensearch={handleOpenSearch} />
        
        <!-- Language Selector -->
        <LanguageSelector />
        
        <!-- Theme Toggle -->
        <div class="theme-toggle">
          <button id="theme-button" on:click={toggleThemeMenu} aria-label="Toggle theme" class="theme-button theme-toggle">
            {#if theme === 'light'}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            {:else if theme === 'dark'}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            {/if}
          </button>
          
          {#if showThemeMenu}
            <div id="theme-menu" class="theme-menu">
              <button on:click={() => applyTheme('light')} class="theme-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span>{$t('ui.light')}</span>
              </button>
              
              <button on:click={() => applyTheme('dark')} class="theme-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>{$t('ui.dark')}</span>
              </button>
              
              <button on:click={() => applyTheme('system')} class="theme-option">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>{$t('ui.system')}</span>
              </button>
            </div>
          {/if}
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="hide-on-desktop">
          <MobileMenuButton 
            isOpen={mobileMenuOpen}
            on:click={toggleMobileMenu}
          />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  <MobileMenu 
    isOpen={mobileMenuOpen}
    {currentRoute}
    on:linkClick={handleLinkClick}
    on:close={() => mobileMenuOpen = false}
  />
</header>

<!-- Search Dialog -->
<SearchDialog 
  isOpen={showSearchDialog} 
  on:close={handleCloseSearch}
  on:open={handleOpenSearch}
/>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: var(--z-index-sticky);
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg);
    height: 60px;
    display: flex;
    align-items: center;
  }
  
  @media (min-width: 640px) {
    .header {
      height: 70px;
      padding: var(--space-sm) 0;
    }
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    max-width: var(--container-width-lg);
    margin: 0 auto;
    padding: 0 var(--space-md);
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .nav-actions-container {
    display: flex;
    align-items: center;
  }
  
  .desktop-nav {
    display: flex;
    align-items: center;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem; /* Reduced gap between utility buttons for better grouping */
    margin-left: 1rem; /* Add some space between nav links and utility buttons */
    background-color: var(--color-bg);
    padding: 0.25rem;
    border-radius: 0.5rem;
  }
  
  @media (min-width: 640px) {
    .header-actions {
      gap: 0.5rem; /* Slightly larger gap on desktop */
      border: 1px solid var(--color-border);
      padding: 0.25rem 0.5rem;
      border-radius: 2rem; /* Rounded pill shape for the button group */
    }
  }
  
  .theme-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    padding: 0;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }
  
  .theme-button:hover {
    background-color: var(--color-border);
  }
  
  .theme-toggle {
    position: relative;
  }
  
  .theme-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: var(--z-index-dropdown);
    min-width: 10rem;
  }
  
  .theme-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 0.5rem;
    min-height: 44px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
    text-align: left;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;
  }
  
  .theme-option:hover {
    background-color: var(--color-border);
  }
  
  @media (max-width: 480px) {
    .hide-on-mobile {
      display: none;
    }
    
    .hide-on-desktop {
      display: block;
    }
  }
  
  /* Mobile optimizations to prevent overflow */
  @media (max-width: 640px) {
    .header-actions {
      margin-left: 0.5rem; /* Less space on mobile */
      padding: 0.125rem; /* Minimal padding to save space */
    }
    
    .logo-container {
      flex-shrink: 1; /* Allow logo to shrink slightly if needed */
      max-width: 40%; /* Limit logo width on small screens */
    }
    
    .nav-actions-container {
      flex-grow: 1;
      justify-content: flex-end;
    }
    
    .header-container {
      padding: 0 0.625rem; /* Smaller padding on small screens */
    }
  }
  
  /* Very small screen optimizations */
  @media (max-width: 360px) {
    .header-actions {
      gap: 0.125rem; /* Minimal gap for tiny screens */
    }
    
    .header-container {
      padding: 0 0.375rem; /* Even smaller padding on tiny screens */
    }
  }
</style> 