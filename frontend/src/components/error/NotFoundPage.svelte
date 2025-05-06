<script>
  import { onMount } from 'svelte';
  
  // Set page title on mount
  onMount(() => {
    document.title = "404 - Page Not Found | SvelteBlog";
    console.log("NotFoundPage component mounted");
  });
</script>

<div class="not-found-page container">
  <div class="not-found-content">
    <h1 class="not-found-title">404</h1>
    <p class="not-found-subtitle">Page Not Found</p>
    <p class="not-found-message">
      The page you're looking for doesn't exist or has been moved.
    </p>
    
    <div class="not-found-actions">
      <a href="/" class="primary-button">Return Home</a>
      <a href="/blog" class="secondary-button">Browse Blog</a>
    </div>
    
    <div class="not-found-suggestions">
      <h2>You might be interested in:</h2>
      <ul>
        <li><a href="/blog">Latest blog posts</a></li>
        <li><a href="/projects">My projects</a></li>
        <li><a href="/about">About me</a></li>
      </ul>
    </div>
  </div>

  <div class="not-found-illustration">
    <!-- SVG illustration - a confused face emoticon -->
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="not-found-svg">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
  </div>
</div>

<style>
  .not-found-page {
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .not-found-content {
    max-width: 600px;
  }
  
  .not-found-title {
    font-size: 8rem;
    font-weight: 700;
    line-height: 1;
    color: var(--color-primary);
    margin-bottom: 0;
    opacity: 0.7;
  }
  
  .not-found-subtitle {
    font-size: 2rem;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 2rem;
  }
  
  .not-found-message {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
  }
  
  .not-found-actions {
    margin-bottom: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .primary-button, .secondary-button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .primary-button {
    background-color: var(--color-primary);
    color: white;
  }
  
  .primary-button:hover {
    background-color: var(--color-secondary);
    text-decoration: none;
  }
  
  .secondary-button {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
  }
  
  .secondary-button:hover {
    background-color: rgba(var(--color-primary-rgb), 0.1);
    text-decoration: none;
  }
  
  .not-found-suggestions {
    margin-top: 2rem;
  }
  
  .not-found-suggestions h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .not-found-suggestions ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .not-found-illustration {
    margin-top: 2rem;
  }
  
  .not-found-svg {
    color: var(--color-primary);
    opacity: 0.7;
  }
  
  @media (min-width: 768px) {
    .not-found-page {
      flex-direction: row;
      text-align: left;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }
    
    .not-found-actions, .not-found-suggestions ul {
      justify-content: flex-start;
    }
    
    .not-found-illustration {
      margin-top: 0;
    }
  }
</style> 