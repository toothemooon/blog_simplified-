<script>
  import { posts } from '../../data/blog-data.js';
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Generate unique tags list with counts
  const tags = sortedPosts.reduce((acc, post) => {
    if (post.tags && post.tags.length) {
      post.tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = 0;
        }
        acc[tag]++;
      });
    }
    return acc;
  }, {});
  
  // Format date to display as Month DD, YYYY
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // State
  let showMobileTags = false;
  
  // Toggle mobile tags visibility
  function toggleMobileTags() {
    showMobileTags = !showMobileTags;
  }
</script>

<div class="blog-list-page container">
  <div class="blog-list-header">
    <h1 class="page-title">All Posts</h1>
  </div>
  
  <!-- Mobile Tags Toggle Button -->
  <button class="mobile-tags-toggle hide-on-desktop" on:click={toggleMobileTags}>
    {showMobileTags ? 'Hide Tags' : 'Show Tags'} 
    <span class="toggle-icon">{showMobileTags ? '−' : '+'}</span>
  </button>
  
  <div class="blog-list-content">
    <!-- Tags sidebar -->
    <aside class="tags-sidebar" class:mobile-visible={showMobileTags}>
      <div class="tags-header">All Posts</div>
      
      <ul class="tags-list">
        {#each Object.entries(tags) as [tag, count]}
          <li class="tag-item">
            <a href="/tags/{tag}" class="tag-link">
              <span class="tag-name">{tag}</span>
              <span class="tag-count">({count})</span>
            </a>
          </li>
        {/each}
      </ul>
    </aside>
    
    <!-- Posts list -->
    <div class="posts-container">
      {#each sortedPosts as post}
        <article class="post-item">
          <div class="post-date">
            <span>Published on {formatDate(post.date)}</span>
          </div>
          
          <h2 class="post-title">
            <a href="/blog/{post.slug}">{post.title}</a>
          </h2>
          
          {#if post.tags && post.tags.length > 0}
            <div class="post-tags">
              {#each post.tags as tag}
                <a href="/tags/{tag}" class="tag">{tag}</a>
              {/each}
            </div>
          {/if}
          
          <p class="post-summary">{post.summary}</p>
          
          <div class="read-more">
            <a href="/blog/{post.slug}" class="read-more-link">Read more →</a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>

<style>
  .blog-list-page {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-2xl);
  }
  
  .blog-list-header {
    margin-bottom: var(--space-xl);
  }
  
  .page-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    margin-bottom: var(--space-md);
    line-height: 1.2;
  }
  
  .blog-list-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
  
  /* Mobile tags toggle */
  .mobile-tags-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-md);
    margin-bottom: var(--space-md);
    font-weight: 500;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    background-color: var(--color-bg);
    color: var(--color-text);
    cursor: pointer;
  }
  
  .toggle-icon {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  /* Tags Sidebar */
  .tags-sidebar {
    width: 100%;
    display: none;
  }
  
  .tags-sidebar.mobile-visible {
    display: block;
    margin-bottom: var(--space-lg);
  }
  
  .tags-header {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--space-md);
  }
  
  .tags-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .tag-item {
    margin-bottom: var(--space-sm);
  }
  
  .tag-link {
    display: flex;
    justify-content: space-between;
    color: var(--color-text);
    text-decoration: none;
    padding: var(--space-xs) 0;
    transition: color 0.2s ease;
  }
  
  .tag-link:hover {
    color: var(--color-primary);
  }
  
  .tag-count {
    color: var(--color-text);
    opacity: 0.7;
  }
  
  /* Posts List */
  .posts-container {
    flex: 1;
  }
  
  .post-item {
    margin-bottom: var(--space-xl);
    padding-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-border);
  }
  
  .post-date {
    font-size: var(--font-size-sm);
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: var(--space-xs);
  }
  
  .post-title {
    font-size: clamp(1.5rem, 4vw, 1.75rem);
    font-weight: 700;
    margin: 0 0 var(--space-sm) 0;
    line-height: 1.3;
  }
  
  .post-title a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .post-title a:hover {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    margin-bottom: var(--space-md);
  }
  
  .tag {
    font-size: var(--font-size-xs);
    padding: 0.2rem 0.75rem;
    border-radius: 0.25rem;
    background-color: var(--color-border);
    color: var(--color-text);
    text-decoration: none;
    transition: background-color 0.2s ease;
  }
  
  .tag:hover {
    background-color: var(--color-primary);
    color: white;
    text-decoration: none;
  }
  
  .post-summary {
    margin: var(--space-sm) 0;
    line-height: 1.6;
  }
  
  .read-more {
    margin-top: var(--space-md);
  }
  
  .read-more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease;
  }
  
  .read-more-link:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .mobile-tags-toggle {
      display: none;
    }
    
    .blog-list-content {
      flex-direction: row;
      gap: var(--space-xl);
    }
    
    .tags-sidebar {
      display: block;
      width: 250px;
      flex-shrink: 0;
    }
    
    .post-item {
      margin-bottom: var(--space-2xl);
      padding-bottom: var(--space-2xl);
    }
  }
</style> 