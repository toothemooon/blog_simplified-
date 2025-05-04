<script>
  import { posts } from '../../data/blog-data.js';
  
  // Sort posts by date (newest first) and limit to 5 most recent
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  
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
</script>

<div class="home-page">
  <div class="page-header">
    <h1 class="page-title">Latest</h1>
    <p class="page-subtitle">A blog created with Svelte 4 and vanilla CSS</p>
  </div>
  
  <div class="posts-list">
    {#each recentPosts as post}
      <div class="post-item">
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
      </div>
    {/each}
    
    <div class="all-posts-link">
      <a href="/blog">All Posts →</a>
    </div>
  </div>
</div>

<style>
  .home-page {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .page-header {
    margin-bottom: 3rem;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.8;
  }
  
  .posts-list {
    width: 100%;
  }
  
  .post-item {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--color-border);
  }
  
  .post-date {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
  
  .post-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
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
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tag {
    font-size: 0.8rem;
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
    margin: 0.75rem 0;
    line-height: 1.6;
  }
  
  .read-more {
    margin-top: 1rem;
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
  
  .all-posts-link {
    margin-top: 2rem;
    text-align: center;
    padding: 1rem 0;
  }
  
  .all-posts-link a {
    color: var(--color-primary);
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    transition: opacity 0.2s ease;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
  
  .all-posts-link a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
</style> 