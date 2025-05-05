<script>
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let currentRoute = '/';
  
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
          {link.text}
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
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .nav-list {
      gap: 1.5rem;
    }
  }
  
  .nav-link {
    color: var(--color-text);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease;
    padding-bottom: 0.25rem;
    position: relative;
    font-size: var(--font-size-base);
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