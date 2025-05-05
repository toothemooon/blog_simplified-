<script>
  import { highlightTerms, formatDate } from '../../utils/search.js';
  
  // Props
  export let result;
  export let query = '';
  export let active = false;
</script>

<a 
  href={`/blog/${result.post.slug}`} 
  class="search-result"
  class:active={active}
>
  <div class="result-date">
    {formatDate(result.post.date)}
  </div>
  
  <div class="result-title">
    {@html highlightTerms(result.post.title, query)}
  </div>
</a>

<style>
  .search-result {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--color-text);
    border-radius: 0.25rem;
    transition: background-color 0.15s ease;
    cursor: pointer;
  }
  
  .search-result:hover,
  .search-result.active {
    background-color: var(--color-border);
  }
  
  .result-date {
    font-size: 0.85rem;
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }
  
  .result-title {
    font-size: 1rem;
    font-weight: 500;
  }
  
  .result-title :global(mark) {
    background-color: rgba(var(--color-primary-rgb, 49, 130, 206), 0.2);
    color: var(--color-primary);
    padding: 0 0.1rem;
    border-radius: 0.125rem;
    font-weight: 600;
  }
</style> 