<script>
  import { getProject, formatProjectPeriod, getRelatedProjectsBySlug, getLocalizedField } from '../../utils/project-utils.js';
  import { t, language } from '../../i18n';
  
  export let slug = '';
  
  let project = null;
  let loading = true;
  let error = null;
  let relatedProjects = [];
  
  $: if (slug) {
    loadProject(slug);
  }
  
  async function loadProject(projectSlug) {
    if (!projectSlug) return;
    
    loading = true;
    error = null;
    
    try {
      const projectData = await getProject(projectSlug);
      
      if (!projectData) {
        error = $t('pages.projects.not_found');
        project = null;
      } else {
        project = projectData;
        relatedProjects = getRelatedProjectsBySlug(projectSlug);
      }
    } catch (err) {
      console.error('Error loading project:', err);
      error = $t('pages.projects.error');
    } finally {
      loading = false;
    }
  }
  
  // Helper function to get localized metadata field
  function getLocalizedMetadataField(metadata, key) {
    if (!metadata || !key) return '';
    
    const localizedKey = `${key}_${$language}`;
    if (metadata[localizedKey]) {
      return metadata[localizedKey];
    }
    
    return metadata[key] || '';
  }
</script>

<div class="project-detail-page container-narrow">
  {#if loading}
    <div class="loading-indicator">
      <p>{$t('pages.projects.loading')}</p>
    </div>
  {:else if error}
    <div class="error-message">
      <h2>{$t('pages.projects.error')}</h2>
      <p>{error}</p>
      <a href="/projects">{$t('pages.projects.return_to_list')}</a>
    </div>
  {:else if project}
    <article class="project-detail">
      <!-- Period -->
      <div class="project-date-container">
        <span class="project-period">{formatProjectPeriod(project.period)}</span>
      </div>
      
      <!-- Title -->
      <h1 class="project-title">{getLocalizedField(project, 'title', $language)}</h1>
      
      <!-- Role and Location -->
      <div class="project-role-location">
        <span class="project-role">{getLocalizedField(project, 'role', $language)}</span>
        {#if project.location}
          <span class="location-separator"> | </span>
          <span class="project-location">{getLocalizedField(project, 'location', $language)}</span>
        {/if}
      </div>
      
      <!-- Metadata -->
      <div class="project-metadata">
        {#if project.metadata}
          {#each Object.entries(project.metadata) as [key, value]}
            {#if !key.includes('_ja') && !key.includes('_zh')}
              <div class="metadata-group">
                <span class="metadata-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                <span class="metadata-value">{getLocalizedMetadataField(project.metadata, key)}</span>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
      
      <!-- Project Details -->
      {#if project.projects && project.projects.length > 0}
        <div class="project-subprojects">
          <h2>{$t('pages.projects.project_details')}</h2>
          <ul class="subprojects-list">
            {#each project.projects as subproject}
              <li class="subproject-item">
                <span class="subproject-name">{subproject.name}</span>
                {#if subproject.value}
                  <span class="subproject-value">({subproject.value})</span>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      
      <!-- Summary -->
      <div class="project-summary">
        <h2>Overview</h2>
        <p>{getLocalizedField(project, 'summary', $language)}</p>
      </div>
      
      <!-- Achievements -->
      {#if project.achievements && project.achievements.length > 0}
        <div class="project-achievements">
          <h2>{$t('pages.projects.key_achievements')}</h2>
          <ul class="achievements-list">
            {#each (project[`achievements_${$language}`] || project.achievements) as achievement}
              <li>{achievement}</li>
            {/each}
          </ul>
        </div>
      {/if}
      
      <!-- Tags -->
      {#if project.tags && project.tags.length > 0}
        <div class="project-tags">
          {#each project.tags as tag}
            <span class="tag">{$t(`tags.${tag}`)}</span>
          {/each}
        </div>
      {/if}
      
      <!-- Related Projects -->
      {#if relatedProjects.length > 0}
        <div class="related-projects">
          <h2>{$t('pages.projects.related_projects')}</h2>
          <div class="related-projects-list">
            {#each relatedProjects as relatedProject}
              <div class="related-project-item">
                <a href="/projects/{relatedProject.slug}" class="related-project-link">
                  <span class="related-project-title">{getLocalizedField(relatedProject, 'title', $language)}</span>
                  <span class="related-project-period">{formatProjectPeriod(relatedProject.period)}</span>
                </a>
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <div class="no-related-projects">
          <p>{$t('pages.projects.no_related_projects')}</p>
        </div>
      {/if}
      
      <!-- Back to Projects -->
      <div class="back-to-projects">
        <a href="/projects">← {$t('pages.projects.return_to_list')}</a>
      </div>
    </article>
  {:else}
    <div class="not-found">
      <h2>{$t('pages.projects.not_found')}</h2>
      <p>The project you're looking for doesn't exist or has been removed.</p>
      <a href="/projects">{$t('pages.projects.return_to_list')}</a>
    </div>
  {/if}
</div>

<style>
  .project-detail-page {
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .project-detail {
    width: 100%;
  }
  
  .project-date-container {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
  
  .project-title {
    font-size: 2.5rem;
    line-height: 1.2;
    margin: 0.5rem 0 1rem;
    color: var(--color-heading, var(--color-text));
  }
  
  .project-role-location {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: var(--color-text);
  }
  
  .project-role {
    font-weight: 600;
  }
  
  .location-separator {
    opacity: 0.5;
    margin: 0 0.5rem;
  }
  
  .project-metadata {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
    padding: 1.5rem;
    background-color: var(--color-bg-secondary, #f5f5f5);
    border-radius: 0.5rem;
  }
  
  .metadata-group {
    display: flex;
    flex-direction: column;
  }
  
  .metadata-label {
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: var(--color-heading, var(--color-text));
  }
  
  .metadata-value {
    font-size: 1rem;
  }
  
  .project-summary, .project-achievements, .project-subprojects, .related-projects {
    margin: 2rem 0;
  }
  
  .project-summary h2, .project-achievements h2, .project-subprojects h2, .related-projects h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-heading, var(--color-text));
  }
  
  .project-summary p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .achievements-list, .subprojects-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .achievements-list li, .subprojects-list li {
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }
  
  .subproject-value {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 2rem 0;
  }
  
  .tag {
    font-size: 0.8rem;
    padding: 0.2rem 0.75rem;
    border-radius: 0.25rem;
    background-color: var(--color-border);
    color: var(--color-text);
    text-decoration: none;
    transition: background-color 0.2s ease;
    display: inline-block;
  }
  
  .related-projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .related-project-item {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 1rem;
    transition: all 0.2s ease;
  }
  
  .related-project-item:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .related-project-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }
  
  .related-project-title {
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0.5rem;
  }
  
  .related-project-period {
    font-size: 0.8rem;
    color: var(--color-text);
    opacity: 0.7;
  }
  
  .back-to-projects {
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  
  .back-to-projects a {
    display: inline-block;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.2s ease;
  }
  
  .back-to-projects a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  
  .loading-indicator, .error-message, .not-found {
    text-align: center;
    padding: 3rem 0;
  }
  
  .error-message h2, .not-found h2 {
    margin-bottom: 1rem;
    color: var(--color-heading);
  }
  
  .error-message a, .not-found a {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    border-radius: 0.25rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .error-message a:hover, .not-found a:hover {
    background-color: var(--color-primary);
    color: white;
  }
  
  @media (max-width: 640px) {
    .project-title {
      font-size: 2rem;
    }
    
    .project-role-location {
      font-size: 1.1rem;
      flex-direction: column;
    }
    
    .location-separator {
      display: none;
    }
    
    .project-location {
      display: block;
      margin-top: 0.25rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    .project-metadata {
      grid-template-columns: 1fr;
    }
    
    .related-projects-list {
      grid-template-columns: 1fr;
    }
  }
</style> 