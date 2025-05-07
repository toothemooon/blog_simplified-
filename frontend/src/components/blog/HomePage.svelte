<script>
  import { getAllPosts, formatPostDate, getLocalizedTagName, getLocalizedField } from '../../utils/blog-utils.js';
  import { language, t } from '../../i18n';
  
  // Get 5 most recent posts
  const recentPosts = getAllPosts().slice(0, 5);
</script>

<div class="home-page">
  <div class="page-header">
    <h1 class="page-title">{$t('pages.home.latest')}</h1>
    <p class="page-subtitle">{$t('pages.home.subtitle')}</p>
  </div>
  
  <div class="posts-list">
    {#each recentPosts as post}
      <article class="post-item">
        <div class="post-date">
          <span>{$t('pages.tags.published_on')} {formatPostDate(post.date)}</span>
        </div>
        
        <h2 class="post-title">
          <a href="/blog/{post.slug}">{getLocalizedField(post, 'title')}</a>
        </h2>
        
        {#if post.tags && post.tags.length > 0}
          <div class="post-tags">
            {#each post.tags as tag}
              <a href="/tags/{tag}" class="tag">{getLocalizedTagName(tag)}</a>
            {/each}
          </div>
        {/if}
        
        <p class="post-summary">{getLocalizedField(post, 'summary')}</p>
        
        <div class="read-more">
          <a href="/blog/{post.slug}" class="read-more-link">{$t('pages.tags.read_more')}</a>
        </div>
      </article>
    {/each}
    
    <div class="all-posts-link">
      <a href="/blog">{$t('pages.home.all_posts')}</a>
    </div>
  </div>
</div>

<style>
  .home-page {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  .page-header {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 2rem;
    width: 100%;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    letter-spacing: -0.025em;
    word-break: break-word;
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.8;
  }
  
  .posts-list {
    width: 100%;
    box-sizing: border-box;
  }
  
  .post-item {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--color-border);
    width: 100%;
    box-sizing: border-box;
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
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
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
    width: 100%;
  }
  
  .tag {
    font-size: 0.8rem;
    padding: 0.2rem 0.75rem;
    border-radius: 0.25rem;
    background-color: var(--color-border);
    color: var(--color-text);
    text-decoration: none;
    transition: background-color 0.2s ease;
    margin-bottom: 0.25rem;
    display: inline-block;
  }
  
  .tag:hover {
    background-color: var(--color-primary);
    color: white;
    text-decoration: none;
  }
  
  .post-summary {
    margin: 0.75rem 0;
    line-height: 1.6;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  
  .read-more {
    margin-top: 1rem;
  }
  
  .read-more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease;
    display: inline-block;
  }
  
  .read-more-link:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  .all-posts-link {
    margin-top: 2rem;
    text-align: center;
    padding: 1rem 0;
    width: 100%;
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
  
  /* Mobile responsive styles */
  @media (max-width: 640px) {
    .home-page {
      padding: 0 0.75rem;
    }
    
    .page-title {
      font-size: 2.25rem;
    }
    
    .page-subtitle {
      font-size: 1rem;
    }
    
    .post-title {
      font-size: 1.5rem;
    }
    
    .post-summary {
      font-size: 0.95rem;
      line-height: 1.7;
    }
    
    .post-item {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
    }
    
    .tag {
      padding: 0.3rem 0.8rem;
      margin-right: 0.25rem;
      margin-bottom: 0.5rem;
    }
    
    .read-more-link {
      padding: 0.5rem 0;
    }
  }
</style> 