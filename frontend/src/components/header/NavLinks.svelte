<script>
  import { createEventDispatcher } from 'svelte';
  import { t } from '../../i18n';
  
  // Props
  export let currentRoute = '/';
  
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
</script>

<nav class="nav">
  <ul class="nav-list">
    {#each navLinks as link}
      <li class="nav-item">
        <a 
          href={link.href} 
          class="nav-link" 
          class:active={isActive(link)}
          aria-current={isActive(link) ? 'page' : undefined}
          on:click={handleLinkClick}
        >
          {$t(link.key)}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1.5rem; /* Reduced default gap */
  }
  
  @media (min-width: 768px) {
    .nav-list {
      gap: 1.75rem; /* Slightly more space on medium screens */
    }
  }
  
  @media (min-width: 1024px) {
    .nav-list {
      gap: 2rem; /* Maximum gap on large screens */
    }
  }
  
  .nav-item {
    white-space: nowrap; /* Prevent text wrapping */
  }
  
  .nav-link {
    color: var(--color-text);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
    padding-bottom: 0.25rem;
    position: relative;
    font-size: var(--font-size-sm); /* Slightly smaller font */
  }
  
  @media (min-width: 768px) {
    .nav-link {
      font-size: var(--font-size-base); /* Normal font on larger screens */
    }
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
</style> 