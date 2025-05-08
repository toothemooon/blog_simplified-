<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  // import { posts } from '../../data/blog-data.js'; // Removed old import
  import { getAllPosts } from '../../utils/blog-utils.js'; // Added new import
  import { searchPosts, groupResultsByYear } from '../../utils/search.js';
  import SearchResultGroup from './SearchResultGroup.svelte';
  import { t, language } from '../../i18n';
  
  // Create event dispatcher
  const dispatch = createEventDispatcher();
  
  // State
  export let isOpen = false;
  let searchInput;
  let query = '';
  let results = [];
  let groupedResults = {};
  let allResultsFlat = []; // Renamed from allResults to avoid confusion with a local var in performSearch
  let activeResultId = -1;
  let debounceTimer;
  
  let allPostsData = []; // To store posts from getAllPosts()

  // Debug information
  let debugInfo = { 
    postsCount: 'not initialized', // Updated initial value
    currentLanguage: '',
    hasSearchFunction: typeof searchPosts === 'function',
    lastError: null
  };
  
  // Update debug info when language changes
  $: debugInfo.currentLanguage = $language;
  
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
      allResultsFlat = [];
      activeResultId = -1;
      return;
    }
    
    try {
      // Check if allPostsData is valid
      if (!Array.isArray(allPostsData) || allPostsData.length === 0) {
        console.warn("Search data not available: allPostsData array is empty or invalid");
        debugInfo.lastError = "Posts data is invalid or empty (from allPostsData)";
        results = []; // Clear results if data source is bad
        groupedResults = {};
        allResultsFlat = [];
        return;
      }
      
      results = searchPosts(allPostsData, query); // Use allPostsData
      groupedResults = groupResultsByYear(results);
      
      // Prepare flat list for keyboard navigation
      allResultsFlat = [];
      let resultIndex = 0;
      
      Object.entries(groupedResults)
        .sort((a, b) => b[0] - a[0]) // Sort by year descending
        .forEach(([year, yearResults]) => {
          yearResults.forEach((result, i) => {
            // Add group start index for active state in groups
            result.groupStartIndex = resultIndex;
            allResultsFlat.push(result);
            resultIndex++;
          });
        });
      
      // Reset active result
      activeResultId = allResultsFlat.length > 0 ? 0 : -1;
      
      // Reset error state on successful search
      debugInfo.lastError = null;
    } catch (error) {
      console.error("Search error:", error);
      debugInfo.lastError = error.message;
      results = [];
      groupedResults = {};
      allResultsFlat = [];
    }
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
        if (allResultsFlat.length > 0) {
          activeResultId = (activeResultId + 1) % allResultsFlat.length;
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (allResultsFlat.length > 0) {
          activeResultId = (activeResultId - 1 + allResultsFlat.length) % allResultsFlat.length;
        }
        break;
        
      case 'Enter':
        event.preventDefault();
        if (activeResultId >= 0 && activeResultId < allResultsFlat.length) {
          // Navigate to the selected result
          const result = allResultsFlat[activeResultId];
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
    allPostsData = getAllPosts(); // Load all posts when component mounts
    debugInfo.postsCount = Array.isArray(allPostsData) ? allPostsData.length : 'not an array';
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
  
  // Ensure proper translation function
  function getTranslation(key, params = {}) {
    try {
      return $t(key, params) || key;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
  }
</script>

{#if isOpen}
  <!-- Backdrop with click outside handler -->
  <div 
    class="search-dialog-backdrop" 
    on:click={handleClickOutside}
    on:keydown={handleKeydown}
    role="dialog"
    aria-label={getTranslation('ui.search')}
    tabindex="-1"
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
          placeholder={getTranslation('ui.search_placeholder')}
          class="search-input"
        />
        
        <div class="search-shortcut">ESC</div>
      </div>
      
      <!-- Divider -->
      <div class="search-divider"></div>
      
      <!-- Search results -->
      <div class="search-results">
        <!-- Temporary debug info (only in development) -->
        {#if debugInfo.lastError && import.meta.env?.DEV}
          <div class="debug-info">
            <p>Debug Info:</p>
            <ul>
              <li>Posts count: {debugInfo.postsCount}</li>
              <li>Current language: {debugInfo.currentLanguage}</li>
              <li>Has search function: {debugInfo.hasSearchFunction ? 'Yes' : 'No'}</li>
              <li>Error: {debugInfo.lastError}</li>
            </ul>
          </div>
        {/if}
        
        {#if query && query.trim() !== ''}
          {#if results.length === 0}
            <div class="no-results">
              {getTranslation('ui.no_results', { query })}
            </div>
          {:else}
            <div class="content-heading">{getTranslation('ui.content_heading')}</div>
            
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
            <p>{getTranslation('ui.start_searching')}</p>
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
  
  .debug-info {
    background-color: #ffeeee;
    padding: 1rem;
    margin: 0 1rem 1rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    color: #333;
  }
  
  .debug-info ul {
    padding-left: 1.5rem;
    margin: 0.5rem 0 0;
  }
</style> 