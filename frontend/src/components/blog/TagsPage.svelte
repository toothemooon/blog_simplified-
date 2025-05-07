<script>
  import { getAllPosts } from '../../utils/blog-utils.js';
  import { getLocalizedTagName } from '../../utils/blog-utils.js';
  import { language, t } from '../../i18n';
  
  // Get all posts
  const allPosts = getAllPosts();
  
  // Store current language for reactivity
  $: currentLanguage = $language;
  
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
  
  // Force component to update when language changes
  $: {
    currentLanguage; // this references the variable to establish the dependency
    // This block will run whenever currentLanguage changes
  }
  
  // Sort tags in a reactive way that will update when language changes
  $: sortedTags = Object.entries(tags).sort(([a], [b]) => {
    const localizedA = getLocalizedTagName(a, currentLanguage);
    const localizedB = getLocalizedTagName(b, currentLanguage);
    return localizedA.localeCompare(localizedB);
  });
  
  // Get the highest post count to scale font sizes
  const maxCount = Math.max(...Object.values(tags));
  
  // Function to get a font size based on count
  function getFontSize(count) {
    const minSize = 1;
    const maxSize = 1.75;
    // Calculate a size between minSize and maxSize based on count
    return minSize + ((count / maxCount) * (maxSize - minSize)) + 'rem';
  }
</script>

<div class="tags-page">
  <div class="tags-header">
    <h1 class="page-title">{$t('pages.tags.title')}</h1>
  </div>
  
  <div class="tags-container">
    {#each sortedTags as [tag, count]}
      <div class="tag-item">
        <a 
          href="/tags/{tag}" 
          class="tag-link" 
          style="font-size: {getFontSize(count)}"
        >
          {getLocalizedTagName(tag)} <span class="tag-count">({count})</span>
        </a>
      </div>
    {/each}
  </div>
</div>

<style>
  .tags-page {
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .tags-header {
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 1rem;
  }
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--color-heading, var(--color-text));
    letter-spacing: -0.025em;
  }
  
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 2.5rem;
  }
  
  .tag-item {
    margin-bottom: 0.5rem;
    flex: 0 0 auto;
  }
  
  .tag-link {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    line-height: 1.4;
  }
  
  .tag-link:hover {
    color: var(--color-secondary);
    text-decoration: underline;
  }
  
  .tag-count {
    font-size: 0.85em;
    color: var(--color-text);
    opacity: 0.7;
    font-weight: normal;
    margin-left: 0.15rem;
  }
  
  @media (max-width: 640px) {
    .page-title {
      font-size: 2.5rem;
    }
    
    .tags-container {
      gap: 1rem 1.5rem;
    }
  }
</style> 