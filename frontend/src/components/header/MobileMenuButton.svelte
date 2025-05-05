<script>
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let isOpen = false;
  
  // Event dispatcher
  const dispatch = createEventDispatcher();
  
  // Handle click event
  function handleClick() {
    dispatch('click');
  }
</script>

<button 
  class="mobile-menu-button" 
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
  aria-expanded={isOpen}
  on:click={handleClick}
>
  <span class="hamburger-icon" class:open={isOpen}>
    <span class="bar bar-1"></span>
    <span class="bar bar-2"></span>
    <span class="bar bar-3"></span>
  </span>
</button>

<style>
  .mobile-menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: var(--z-index-sticky);
    color: var(--color-text);
    transition: color 0.2s ease;
  }
  
  .mobile-menu-button:hover {
    color: var(--color-primary);
  }
  
  .hamburger-icon {
    position: relative;
    width: 24px;
    height: 20px;
  }
  
  .bar {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentColor;
    transition: transform 0.25s ease, opacity 0.2s ease;
  }
  
  .bar-1 {
    top: 0;
  }
  
  .bar-2 {
    top: 9px;
  }
  
  .bar-3 {
    bottom: 0;
  }
  
  /* Animation for the hamburger icon */
  .open .bar-1 {
    transform: translateY(9px) rotate(45deg);
  }
  
  .open .bar-2 {
    opacity: 0;
  }
  
  .open .bar-3 {
    transform: translateY(-9px) rotate(-45deg);
  }
</style> 