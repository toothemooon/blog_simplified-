<script>
  import { onMount } from 'svelte';
  
  // Props: accept currentRoute from App.svelte
  export let currentRoute = '/';

  // Navigation links
  const navLinks = [
    { text: 'Blog', href: '/blog', route: '/blog-list' },
    { text: 'Tags', href: '/tags', route: '/tags-list' },
    { text: 'Projects', href: '/projects', route: '/projects' },
    { text: 'About', href: '/about', route: '/about' }
  ];
  
  // Check if a navigation link is active
  function isActive(link) {
    if (currentRoute === '/') {
      return link.href === '/';
    }
    
    if (currentRoute === '/blog-post') {
      return link.route === '/blog-list';
    }
    
    if (currentRoute === '/tag') {
      return link.route === '/tags-list';
    }
    
    return currentRoute === link.route;
  }
  
  // Theme state
  let theme = 'light';
  let showThemeMenu = false;
  
  // Initialize theme from localStorage on mount
  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme = savedTheme;
      applyTheme(theme);
    }
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
  
  // Add click outside listener
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<header class="header">
  <div class="container flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="logo">
      <span class="logo-icon"></span>
      <span class="logo-text">MyBlog</span>
    </a>
    
    <!-- Navigation -->
    <nav class="nav">
      <ul class="nav-list">
        {#each navLinks as link}
          <li class="nav-item">
            <a 
              href={link.href} 
              class="nav-link" 
              class:active={isActive(link)}
              aria-current={isActive(link) ? 'page' : undefined}
            >
              {link.text}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
    
    <!-- Actions -->
    <div class="actions flex items-center gap-4">
      <!-- Search Button -->
      <button class="search-button" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      
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
</header>

<style>
  .header {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg);
  }
  
  .logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--color-text);
    text-decoration: none;
  }
  
  .logo:hover {
    text-decoration: none;
  }
  
  .logo-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
  }
  
  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }
  
  .nav-link {
    color: var(--color-text);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
    padding-bottom: 0.25rem;
    position: relative;
  }
  
  .nav-link:hover {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .nav-link.active {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-primary);
    border-radius: 1px;
  }
  
  .search-button, .theme-button {
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
  
  .search-button:hover, .theme-button:hover {
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
    z-index: 10;
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
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .nav-list {
      gap: 1rem;
    }
  }
  
  @media (max-width: 640px) {
    .nav {
      display: none;
    }
  }
</style> 