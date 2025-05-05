<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { posts } from '../../data/blog-data.js';
  import { searchPosts, groupResultsByYear } from '../../utils/search.js';
  import SearchResultGroup from './SearchResultGroup.svelte';
  
  // Create event dispatcher
  const dispatch = createEventDispatcher();
  
  // State
  export let isOpen = false;
  let searchInput;
  let query = '';
  let results = [];
  let groupedResults = {};
  let allResults = [];
  let activeResultId = -1;
  let debounceTimer;
  
  // When the dialog is opened, focus the input and add keyboard listeners
  $: if (isOpen) {
    setTimeout(() => {
      if (searchInput) {
        searchInput.focus();
      }
    }, 50);
  }
  
  // Handle search input changes with debounce
  function handleInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch();
    }, 200); // 200ms debounce
  }
  
  // Perform the search
  function performSearch() {
    if (query.trim() === '') {
      results = [];
      groupedResults = {};
      allResults = [];
      activeResultId = -1;
      return;
    }
    
    results = searchPosts(posts, query);
    groupedResults = groupResultsByYear(results);
    
    // Prepare flat list for keyboard navigation
    allResults = [];
    let resultIndex = 0;
    
    Object.entries(groupedResults)
      .sort((a, b) => b[0] - a[0]) // Sort by year descending
      .forEach(([year, yearResults]) => {
        yearResults.forEach((result, i) => {
          // Add group start index for active state in groups
          result.groupStartIndex = resultIndex;
          allResults.push(result);
          resultIndex++;
        });
      });
    
    // Reset active result
    activeResultId = allResults.length > 0 ? 0 : -1;
  }
  
  // Close the dialog
  function close() {
    dispatch('close');
  }
  
  // Handle key navigation
  function handleKeydown(event) {
    if (!isOpen) return;
    
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
        
      case 'ArrowDown':
        event.preventDefault();
        if (allResults.length > 0) {
          activeResultId = (activeResultId + 1) % allResults.length;
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (allResults.length > 0) {
          activeResultId = (activeResultId - 1 + allResults.length) % allResults.length;
        }
        break;
        
      case 'Enter':
        event.preventDefault();
        if (activeResultId >= 0 && activeResultId < allResults.length) {
          // Navigate to the selected result
          const result = allResults[activeResultId];
          window.location.href = `/blog/${result.post.slug}`;
          close();
        }
        break;
    }
  }
  
  // Handle clicks outside the dialog to close it
  function handleClickOutside(event) {
    if (isOpen && event.target.classList.contains('search-dialog-backdrop')) {
      close();
    }
  }
  
  // Set up keyboard shortcuts and cleanup
  onMount(() => {
    // Add global keyboard shortcut for opening search
    const handleGlobalKeydown = (event) => {
      // '/' key to open search (unless in an input or textarea)
      if (
        event.key === '/' && 
        !isOpen && 
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        event.preventDefault();
        dispatch('open');
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeydown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  });
</script>

{#if isOpen}
  <!-- Backdrop with click outside handler -->
  <div 
    class="search-dialog-backdrop" 
    on:click={handleClickOutside}
    on:keydown={handleKeydown}
    role="dialog"
    aria-label="Search dialog"
  >
    <!-- Dialog container -->
    <div class="search-dialog">
      <!-- Search input -->
      <div class="search-input-container">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        
        <input
          type="text"
          bind:this={searchInput}
          bind:value={query}
          on:input={handleInput}
          placeholder="Type a command or search..."
          class="search-input"
        />
        
        <div class="search-shortcut">ESC</div>
      </div>
      
      <!-- Divider -->
      <div class="search-divider"></div>
      
      <!-- Search results -->
      <div class="search-results">
        {#if query && query.trim() !== ''}
          {#if results.length === 0}
            <div class="no-results">
              No results found for "{query}"
            </div>
          {:else}
            <div class="content-heading">CONTENT</div>
            
            {#each Object.entries(groupedResults).sort((a, b) => b[0] - a[0]) as [year, yearResults]}
              <SearchResultGroup 
                {year} 
                results={yearResults} 
                {query}
                {activeResultId}
              />
            {/each}
          {/if}
        {:else}
          <div class="empty-state">
            <p>Type to start searching...</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .search-dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 4rem;
    z-index: 50;
    animation: fadeIn 0.2s ease;
  }
  
  .search-dialog {
    width: 100%;
    max-width: 600px;
    margin: 0 var(--space-md);
    background-color: var(--color-bg);
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
    animation: slideDown 0.2s ease;
  }
  
  .search-input-container {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    position: relative;
    min-height: var(--min-touch-target);
  }
  
  .search-icon {
    margin-right: 0.75rem;
    color: var(--color-text);
    opacity: 0.5;
  }
  
  .search-input {
    flex: 1;
    background: none;
    border: none;
    color: var(--color-text);
    font-size: 1rem;
    outline: none;
    padding: 0.5rem 0;
    height: var(--min-touch-target);
  }
  
  .search-shortcut {
    font-size: 0.75rem;
    background-color: var(--color-border);
    color: var(--color-text);
    opacity: 0.8;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  
  .search-divider {
    height: 1px;
    background-color: var(--color-border);
    margin: 0;
  }
  
  .search-results {
    max-height: calc(80vh - 100px);
    overflow-y: auto;
    padding: 1rem 0;
    -webkit-overflow-scrolling: touch;
  }
  
  .content-heading {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text);
    opacity: 0.5;
    margin-bottom: 0.75rem;
    padding: 0 1rem;
    letter-spacing: 0.05em;
  }
  
  .no-results, .empty-state {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--color-text);
    opacity: 0.7;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideDown {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Add RGB versions of primary color for rgba usage in :global(mark) */
  :global(:root) {
    --color-primary-rgb: 49, 130, 206; /* Default blue */
  }
  
  :global(.dark-theme) {
    --color-primary-rgb: 66, 153, 225; /* Darker blue */
  }
  
  /* Mobile optimizations */
  @media (max-width: 640px) {
    .search-dialog-backdrop {
      padding-top: 2rem;
    }
    
    .search-dialog {
      max-width: calc(100% - 2rem);
      margin: 0 1rem;
    }
    
    .search-results {
      max-height: 60vh;
    }
  }
</style> 