<script>
  import { getAllPosts } from '../../utils/blog-utils.js';
  
  // Get all posts
  const allPosts = getAllPosts();
  
  // Generate unique tags list with counts
  const tags = allPosts.reduce((acc, post) => {
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
  
  // Sort tags alphabetically
  const sortedTags = Object.entries(tags).sort(([a], [b]) => a.localeCompare(b));
</script>

<div class="tags-page">
  <h1 class="page-title">Tags</h1>
  
  <div class="tags-container">
    {#each sortedTags as [tag, count]}
      <a href="/tags/{tag}" class="tag-link">
        {tag} ({count})
      </a>
    {/each}
  </div>
</div>

<style>
  .tags-page {
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 3rem;
    color: var(--color-heading, var(--color-text));
  }
  
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .tag-link {
    display: inline-block;
    font-size: 1.25rem;
    color: var(--color-primary);
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  
  .tag-link:hover {
    opacity: 0.7;
  }
  
  @media (max-width: 640px) {
    .page-title {
      font-size: 2.5rem;
    }
    
    .tags-container {
      gap: 1rem;
    }
    
    .tag-link {
      font-size: 1.1rem;
    }
  }
</style> 