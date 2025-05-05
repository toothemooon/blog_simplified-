<script>
  import SearchResult from './SearchResult.svelte';
  
  // Props
  export let year;
  export let results = [];
  export let query = '';
  export let activeResultId = -1;
</script>

<div class="search-result-group">
  <h3 class="group-year">{year}</h3>
  
  <div class="results-list">
    {#each results as result, index}
      <SearchResult 
        {result} 
        {query}
        active={index + results[0].groupStartIndex === activeResultId}
      />
    {/each}
  </div>
</div>

<style>
  .search-result-group {
    margin-bottom: 1.5rem;
  }
  
  .group-year {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text);
    opacity: 0.8;
    margin-bottom: 0.5rem;
    padding: 0 1rem;
  }
  
  .results-list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
</style> 