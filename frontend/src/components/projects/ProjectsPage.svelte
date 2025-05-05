<script>
  import { getAllProjects, formatProjectPeriod } from '../../utils/project-utils.js';
  
  // Get all projects
  const projects = getAllProjects();
</script>

<div class="projects-page">
  <div class="page-header">
    <h1 class="page-title">Projects</h1>
    <p class="page-subtitle">A showcase of my professional experience and achievements</p>
  </div>
  
  <div class="projects-list">
    {#each projects as project}
      <article class="project-item">
        <div class="project-metadata">
          <span class="project-period">{formatProjectPeriod(project.period)}</span>
        </div>
        
        <h2 class="project-title">
          <a href="/projects/{project.slug}">{project.title}</a>
        </h2>
        
        <div class="project-role-location">
          <span class="project-role">{project.role}</span>
          {#if project.location}
            <span class="location-separator"> | </span>
            <span class="project-location">{project.location}</span>
          {/if}
        </div>
        
        <p class="project-summary">{project.summary}</p>
        
        {#if project.tags && project.tags.length > 0}
          <div class="project-tags">
            {#each project.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        {/if}
        
        <div class="read-more">
          <a href="/projects/{project.slug}" class="read-more-link">View details →</a>
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  .projects-page {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 0 1rem;
    box-sizing: border-box;
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
  }
  
  .page-subtitle {
    font-size: 1.1rem;
    color: var(--color-text);
    opacity: 0.8;
  }
  
  .projects-list {
    width: 100%;
    box-sizing: border-box;
  }
  
  .project-item {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--color-border);
    width: 100%;
    box-sizing: border-box;
  }
  
  .project-metadata {
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
  
  .project-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
  }
  
  .project-title a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .project-title a:hover {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .project-role-location {
    font-size: 1.1rem;
    color: var(--color-text);
    margin-bottom: 1rem;
    opacity: 0.9;
  }
  
  .project-role {
    font-weight: 600;
  }
  
  .location-separator {
    color: var(--color-text);
    opacity: 0.5;
  }
  
  .project-summary {
    margin: 0.75rem 0;
    line-height: 1.6;
  }
  
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
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
  
  @media (max-width: 640px) {
    .projects-page {
      padding: 0 0.75rem;
    }
    
    .page-title {
      font-size: 2.25rem;
    }
    
    .project-title {
      font-size: 1.5rem;
    }
    
    .project-role-location {
      font-size: 1rem;
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
  }
</style> 