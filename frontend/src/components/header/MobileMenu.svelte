<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  // Props
  export let currentRoute = '/';
  export let isOpen = false;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Navigation items
  const navLinks = [
    { text: 'Blog', href: '/blog', route: '/blog-list' },
    { text: 'Tags', href: '/tags', route: '/tags-list' },
    { text: 'Projects', href: '/projects', route: '/projects' },
    { text: 'About', href: '/about', route: '/about' }
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
  ></div>
  
  <div 
    class="mobile-menu" 
    transition:fly={{ y: -20, duration: 300, opacity: 1 }}
    role="dialog" 
    aria-label="Mobile navigation"
  >
    <nav class="mobile-nav">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="mobile-nav-link" 
          class:active={isActive(link)}
          on:click|preventDefault={handleLinkClick}
          aria-current={isActive(link) ? 'page' : undefined}
        >
          {link.text}
        </a>
      {/each}
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
    top: var(--mobile-header-height, 60px);
    left: 0;
    width: 100%;
    background-color: var(--color-bg);
    z-index: var(--z-index-modal);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - var(--mobile-header-height, 60px));
    overflow-y: auto;
  }
  
  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: var(--space-lg);
  }
  
  .mobile-nav-link {
    font-size: var(--font-size-xl);
    padding: var(--space-md) 0;
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 1px solid var(--color-border);
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
  }
  
  .mobile-nav-link:last-child {
    border-bottom: none;
  }
  
  .mobile-nav-link.active {
    color: var(--color-primary);
    font-weight: 600;
  }
</style> 