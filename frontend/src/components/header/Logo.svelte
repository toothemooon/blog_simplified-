<script>
  // Props
  export let size = 'default'; // default, small, large
</script>

<a href="/" class="logo {size}">
  <span class="logo-icon"></span>
  <span class="logo-text">MyBlog</span>
</a>

<style>
  .logo {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: var(--font-size-xl);
    color: var(--color-text);
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  
  .logo:hover {
    opacity: 0.9;
    text-decoration: none;
  }
  
  .logo.small {
    font-size: var(--font-size-base);
  }
  
  .logo.large {
    font-size: var(--font-size-2xl);
  }
  
  .logo-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%);
  }
  
  .logo.small .logo-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .logo.large .logo-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  @media (max-width: 480px) {
    .logo-text {
      font-size: var(--font-size-lg);
    }
    
    .logo-icon {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
</style> 