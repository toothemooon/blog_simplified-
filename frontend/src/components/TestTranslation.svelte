<script>
  import { t, language, setLanguage, getSupportedLanguages } from '../i18n';
  
  const languages = getSupportedLanguages();
</script>

<div class="test-translation">
  <h2>Translation Test</h2>
  
  <div class="language-selector">
    <p>Current language: <strong>{$language}</strong></p>
    <div class="buttons">
      {#each languages as lang}
        <button 
          on:click={() => setLanguage(lang.code)} 
          class:active={$language === lang.code}
        >
          {lang.name}
        </button>
      {/each}
    </div>
  </div>
  
  <div class="translation-examples">
    <h3>Navigation Items</h3>
    <ul>
      <li><strong>Blog:</strong> {$t('nav.blog')}</li>
      <li><strong>Tags:</strong> {$t('nav.tags')}</li>
      <li><strong>Projects:</strong> {$t('nav.projects')}</li>
      <li><strong>About:</strong> {$t('nav.about')}</li>
    </ul>
    
    <h3>About Page</h3>
    <ul>
      <li><strong>Title:</strong> {$t('pages.about.title')}</li>
      <li><strong>Intro:</strong> {$t('pages.about.intro')}</li>
    </ul>
  </div>
</div>

<style>
  .test-translation {
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .language-selector {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: var(--color-bg-secondary);
    border-radius: 0.5rem;
  }
  
  .buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-bg);
    cursor: pointer;
    border-radius: 0.25rem;
  }
  
  button.active {
    background-color: var(--color-primary);
    color: white;
  }
  
  .translation-examples {
    padding: 1rem;
    background-color: var(--color-bg-secondary);
    border-radius: 0.5rem;
  }
  
  ul {
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
</style> 