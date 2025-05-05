<script>
  import { onMount } from 'svelte';
  import SearchButton from './search/SearchButton.svelte';
  import SearchDialog from './search/SearchDialog.svelte';
  import Logo from './header/Logo.svelte';
  import NavLinks from './header/NavLinks.svelte';
  import MobileMenu from './header/MobileMenu.svelte';
  import MobileMenuButton from './header/MobileMenuButton.svelte';
  
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

<header class="header">
  <div class="container header-container">
    <!-- Logo -->
    <Logo />
    
    <!-- Desktop Navigation -->
    <div class="hide-on-mobile">
      <NavLinks 
        {currentRoute}
        on:linkClick={handleLinkClick}
      />
    </div>
    
    <!-- Mobile Menu Button -->
    <div class="hide-on-desktop">
      <MobileMenuButton 
        isOpen={mobileMenuOpen}
        on:click={toggleMobileMenu}
      />
    </div>
    
    <!-- Actions -->
    <div class="header-actions">
      <!-- Search Button -->
      <SearchButton on:opensearch={handleOpenSearch} />
      
      <!-- Theme Toggle -->
      <div class="theme-toggle">
        <button id="theme-button" on:click={toggleThemeMenu} aria-label="Toggle theme" class="theme-button">
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
              <span>Light</span>
            </button>
            
            <button on:click={() => applyTheme('dark')} class="theme-option">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span>Dark</span>
            </button>
            
            <button on:click={() => applyTheme('system')} class="theme-option">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>System</span>
            </button>
          </div>
        {/if}
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
    padding: var(--space-sm) 0;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg);
    height: var(--mobile-header-height, 60px);
    display: flex;
    align-items: center;
  }
  
  @media (min-width: 640px) {
    .header {
      height: var(--desktop-header-height, 70px);
      padding: var(--space-md) 0;
    }
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  @media (min-width: 640px) {
    .header-actions {
      gap: 1rem;
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
    padding: 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s ease;
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
    padding: 0.5rem;
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
</style> 