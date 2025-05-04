<script>
  import { posts } from './sampleData.js';
  
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
</script>

<div class="blog-list-page">
  <div class="blog-list-header">
    <h1 class="page-title">All Posts</h1>
  </div>
  
  <div class="blog-list-content">
    <!-- Tags sidebar -->
    <aside class="tags-sidebar">
      <div class="tags-header">All Posts</div>
      
      <ul class="tags-list">
        {#each Object.entries(tags) as [tag, count]}
          <li class="tag-item">
            <a href="/tags/{tag}" class="tag-link">{tag} ({count})</a>
          </li>
        {/each}
      </ul>
    </aside>
    
    <!-- Posts list -->
    <div class="posts-container">
      {#each sortedPosts as post}
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
    </div>
  </div>
</div>

<style>
  .blog-list-page {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .blog-list-header {
    margin-bottom: 3rem;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  
  .blog-list-content {
    display: flex;
    gap: 3rem;
  }
  
  /* Tags Sidebar */
  .tags-sidebar {
    width: 25%;
    flex-shrink: 0;
  }
  
  .tags-header {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  
  .tags-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .tag-item {
    margin-bottom: 0.75rem;
  }
  
  .tag-link {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .tag-link:hover {
    color: var(--color-primary);
  }
  
  /* Posts List */
  .posts-container {
    flex: 1;
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
  
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .blog-list-content {
      flex-direction: column;
    }
    
    .tags-sidebar {
      width: 100%;
      margin-bottom: 2rem;
    }
    
    .post-title {
      font-size: 1.5rem;
    }
  }
</style> 