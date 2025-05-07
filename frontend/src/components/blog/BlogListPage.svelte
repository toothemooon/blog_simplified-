<script>
  import { onMount } from 'svelte';
  import { getAllPosts, formatPostDate, getReadingTime, getLocalizedTagName, getLocalizedField } from '../../utils/blog-utils.js';
  import { language, t } from '../../i18n';
  
  // State
  let posts = [];
  let tags = {};
  let showMobileTags = false;
  let loading = true;
  
  // Make currentLanguage reactive
  $: currentLanguage = $language;
  
  // Load posts on component mount
  onMount(() => {
    // Get posts from both new and legacy sources
    posts = getAllPosts();
    
    // Generate unique tags list with counts
    tags = posts.reduce((acc, post) => {
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
    
    loading = false;
  });
  
  // Make tag sorting reactive to language changes
  $: sortedTags = Object.entries(tags).sort(([a], [b]) => {
    const localizedA = getLocalizedTagName(a, currentLanguage);
    const localizedB = getLocalizedTagName(b, currentLanguage);
    return localizedA.localeCompare(localizedB);
  });
  
  // Toggle mobile tags visibility
  function toggleMobileTags() {
    showMobileTags = !showMobileTags;
  }
</script>

<div class="blog-list-page container">
  <div class="blog-list-header">
    <h1 class="page-title">{$t('pages.blog.all_posts')}</h1>
  </div>
  
  {#if loading}
    <div class="loading-indicator">
      <p>{$t('pages.blog.loading')}</p>
    </div>
  {:else}
    <!-- Mobile Tags Toggle Button -->
    <button class="mobile-tags-toggle hide-on-desktop touch-target" on:click={toggleMobileTags}>
      {showMobileTags ? $t('pages.blog.hide_tags') : $t('pages.blog.show_tags')}
      <span class="toggle-icon">{showMobileTags ? '−' : '+'}</span>
    </button>
    
    <div class="blog-list-content">
      <!-- Tags sidebar -->
      <aside class="tags-sidebar" class:mobile-visible={showMobileTags}>
        <div class="tags-header">{$t('pages.blog.all_posts')}</div>
        
        <ul class="tags-list">
          {#each sortedTags as [tag, count]}
            <li class="tag-item">
              <a href="/tags/{tag}" class="tag-link touch-target">
                <span class="tag-name">{getLocalizedTagName(tag, currentLanguage)}</span>
                <span class="tag-count">({count})</span>
              </a>
            </li>
          {/each}
        </ul>
      </aside>
      
      <!-- Posts list -->
      <div class="posts-container">
        {#if posts.length === 0}
          <div class="no-posts">
            <p>{$t('pages.blog.no_posts')}</p>
          </div>
        {:else}
          {#each posts as post}
            <article class="post-item">
              <div class="post-date">
                <span>{$t('pages.tags.published_on')} {formatPostDate(post.date)}</span>
              </div>
              
              <h2 class="post-title">
                <a href="/blog/{post.slug}">{getLocalizedField(post, 'title', currentLanguage)}</a>
              </h2>
              
              {#if post.tags && post.tags.length > 0}
                <div class="post-tags">
                  {#each post.tags as tag}
                    <a href="/tags/{tag}" class="tag">{getLocalizedTagName(tag, currentLanguage)}</a>
                  {/each}
                </div>
              {/if}
              
              <p class="post-summary">{getLocalizedField(post, 'summary', currentLanguage)}</p>
              
              <div class="read-more">
                <a href="/blog/{post.slug}" class="read-more-link touch-target">{$t('pages.tags.read_more')}</a>
              </div>
            </article>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .blog-list-page {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-2xl);
  }
  
  .blog-list-header {
    margin-bottom: var(--space-lg);
  }
  
  .page-title {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 800;
    margin-bottom: var(--space-md);
    line-height: 1.2;
  }
  
  .loading-indicator {
    text-align: center;
    padding: 3rem 0;
  }
  
  .no-posts {
    text-align: center;
    padding: 3rem 0;
    color: var(--color-text-light);
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
    -webkit-tap-highlight-color: transparent;
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
    border-bottom: 1px solid var(--color-border);
    padding-bottom: var(--space-lg);
  }
  
  .tags-header {
    font-size: var(--font-size-lg);
    font-weight: 700;
    margin-bottom: var(--space-md);
  }
  
  .tags-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .tag-item {
    margin-bottom: var(--space-xs);
  }
  
  .tag-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text);
    text-decoration: none;
    padding: var(--space-xs) 0;
    transition: color 0.2s ease;
    height: var(--min-touch-target);
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
  
  .post-item:last-child {
    border-bottom: none;
  }
  
  .post-date {
    font-size: 0.875rem;
    color: var(--color-text-secondary, var(--color-text));
    opacity: 0.7;
    margin-bottom: var(--space-sm);
  }
  
  .post-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: var(--space-sm);
  }
  
  .post-title a {
    color: var(--color-heading, var(--color-text));
    text-decoration: none;
  }
  
  .post-title a:hover {
    color: var(--color-primary);
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: var(--space-sm);
  }
  
  .tag {
    font-size: 0.75rem;
    background-color: var(--color-bg-secondary, #f0f0f0);
    color: var(--color-text-light, #555);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .tag:hover {
    background-color: var(--color-primary);
    color: var(--color-bg);
  }
  
  .post-summary {
    line-height: 1.6;
    margin-bottom: var(--space-md);
    color: var(--color-text);
  }
  
  .read-more {
    margin-top: var(--space-sm);
  }
  
  .read-more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    height: var(--min-touch-target);
    padding: 0 var(--space-sm);
    transition: color 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  
  .read-more-link:hover {
    color: var(--color-primary-dark, var(--color-primary));
    text-decoration: underline;
  }
  
  /* Desktop styles */
  @media (min-width: 768px) {
    .hide-on-desktop {
      display: none;
    }
    
    .blog-list-content {
      flex-direction: row;
    }
    
    .tags-sidebar {
      display: block;
      width: 12rem;
      position: sticky;
      top: var(--space-lg);
      align-self: flex-start;
      margin-right: var(--space-xl);
    }
    
    .posts-container {
      flex: 1;
    }
  }
</style> 