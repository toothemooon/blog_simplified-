<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Logo from './Logo.svelte';
  import { language, setLanguage, getSupportedLanguages, getLanguageName, t } from '../../i18n';
  
  // Get language options from shared function
  const languages = getSupportedLanguages();
  
  function selectLanguage(code) {
    setLanguage(code);
  }
  
  // Current language info
  $: currentLanguageCode = $language.toUpperCase();
  $: sectionTitle = $t('ui.language') + ` (Current: ${currentLanguageCode})`;
  
  // Props
  export let currentRoute = '/';
  export let isOpen = false;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Navigation items with translation keys
  const navLinks = [
    { key: 'nav.blog', href: '/blog', route: '/blog-list' },
    { key: 'nav.tags', href: '/tags', route: '/tags-list' },
    { key: 'nav.projects', href: '/projects', route: '/projects' },
    { key: 'nav.about', href: '/about', route: '/about' }
  ];
  
  // Check if a link is active
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
  
  // Handle link click
  function handleLinkClick() {
    dispatch('linkClick');
  }
  
  // Handle keyboard navigation
  function handleKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      dispatch('close');
    }
  }
  
  // Add keyboard event listener
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

{#if isOpen}
  <div 
    class="mobile-menu-backdrop" 
    on:click={() => dispatch('close')}
    transition:fade={{ duration: 200 }}
    role="presentation"
  ></div>
  
  <div 
    class="mobile-menu" 
    class:open={isOpen}
    role="dialog" 
    aria-label="Mobile navigation"
  >
    <div class="mobile-menu-header">
      <Logo size="small" />
      <button 
        class="close-button"
        aria-label="Close menu"
        on:click={() => dispatch('close')}
      >
        ×
      </button>
    </div>
    
    <nav class="mobile-nav">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="mobile-nav-link" 
          class:active={isActive(link)}
          on:click={handleLinkClick}
          aria-current={isActive(link) ? 'page' : undefined}
        >
          {$t(link.key)}
        </a>
      {/each}
      
      <!-- Language Section (UPDATED) -->
      <div class="mobile-section">
        <h3 class="mobile-section-title">{sectionTitle}</h3>
        <div class="language-options">
          {#each languages as lang}
            <button 
              class="language-option"
              class:active={$language === lang.code}
              on:click={() => selectLanguage(lang.code)}
            >
              {lang.name}
            </button>
          {/each}
        </div>
      </div>
    </nav>
  </div>
{/if}

<style>
  .mobile-menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: var(--z-index-fixed);
    backdrop-filter: blur(2px);
  }
  
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--color-bg);
    z-index: var(--z-index-modal);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  
  .mobile-menu.open {
    transform: translateX(0);
  }
  
  .mobile-menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.75rem;
    color: var(--color-text);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }
  
  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: var(--space-md);
  }
  
  .mobile-nav-link {
    font-size: var(--font-size-lg);
    padding: var(--space-md) 0;
    min-height: 44px;
    display: flex;
    align-items: center;
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
    transition: color 0.2s ease;
  }
  
  .mobile-nav-link:last-child {
    border-bottom: none;
  }
  
  .mobile-nav-link.active {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .mobile-section {
    padding: var(--space-md) 0;
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-md);
  }
  
  .mobile-section-title {
    font-size: var(--font-size-sm);
    margin-bottom: var(--space-sm);
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 500;
  }
  
  .language-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  
  .language-option {
    text-align: left;
    padding: var(--space-sm);
    border-radius: 0.25rem;
    background: none;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: var(--font-size-base);
  }
  
  .language-option.active {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
</style> 