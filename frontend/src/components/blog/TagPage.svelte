<script>
  import { getAllPosts, formatPostDate, getLocalizedTagName, getLocalizedField } from '../../utils/blog-utils.js';
  import { language, t } from '../../i18n';
  
  // Tag parameter from URL
  export let tag = '';
  
  // Get all posts and sort by date (newest first)
  const allPosts = getAllPosts();
  
  // Filter posts by tag
  $: filteredPosts = allPosts.filter(post => post.tags && post.tags.includes(tag));
  
  // Get localized tag name for display
  $: localizedTag = getLocalizedTagName(tag);
</script>

<div class="tag-page">
  <h1 class="page-title">{localizedTag}</h1>
  
  <div class="posts-list">
    {#if filteredPosts.length > 0}
      {#each filteredPosts as post}
        <div class="post-item">
          <div class="post-date">
            <span>{$t('pages.tags.published_on')} {formatPostDate(post.date)}</span>
          </div>
          
          <h2 class="post-title">
            <a href="/blog/{post.slug}">{getLocalizedField(post, 'title')}</a>
          </h2>
          
          {#if post.tags && post.tags.length > 0}
            <div class="post-tags">
              {#each post.tags as postTag}
                <a href="/tags/{postTag}" class="tag" class:active={postTag === tag}>{getLocalizedTagName(postTag)}</a>
              {/each}
            </div>
          {/if}
          
          <p class="post-summary">{getLocalizedField(post, 'summary')}</p>
          
          <div class="read-more">
            <a href="/blog/{post.slug}" class="read-more-link">{$t('pages.tags.read_more')}</a>
          </div>
        </div>
      {/each}
    {:else}
      <div class="no-posts">
        <p>{$t('pages.tags.no_posts', { tag: localizedTag })}</p>
      </div>
    {/if}
  </div>
  
  <div class="back-link-container">
    <a href="/tags" class="back-link">{$t('pages.tags.back_to_all_tags')}</a>
  </div>
</div>

<style>
  .tag-page {
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 3rem;
    color: var(--color-primary);
    text-transform: capitalize;
    text-align: center;
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
  
  .tag.active {
    background-color: var(--color-primary);
    color: white;
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
  
  .no-posts {
    text-align: center;
    padding: 3rem 0;
    color: var(--color-text);
    opacity: 0.7;
  }
  
  .back-link-container {
    text-align: center;
    margin-top: 3rem;
  }
  
  .back-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.125rem;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 640px) {
    .page-title {
      font-size: 2.5rem;
    }
    
    .post-title {
      font-size: 1.5rem;
    }
  }
</style> 