<script>
  import { projects } from '../../data/project-data.js';
  import ProjectCard from './ProjectCard.svelte';
</script>

<div class="projects-page container">
  <header class="page-header">
    <h1 class="page-title">Projects</h1>
    <p class="page-subtitle">Showcase your projects with a hero image (16 x 9)</p>
  </header>
  
  <div class="projects-grid">
    {#each projects as project (project.id)}
      <ProjectCard {project} />
    {/each}
  </div>
</div>

<style>
  .projects-page {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-2xl);
  }
  
  .page-header {
    margin-bottom: var(--space-xl);
    text-align: center;
  }
  
  .page-title {
    font-size: clamp(2rem, 5vw, 2.5rem);
    font-weight: 700;
    margin-bottom: var(--space-sm);
  }
  
  .page-subtitle {
    font-size: clamp(var(--font-size-base), 3vw, var(--font-size-lg));
    color: var(--color-text);
    opacity: 0.7;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--space-xl);
    margin-top: var(--space-xl);
  }
  
  @media (min-width: 640px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .page-header {
      margin-bottom: var(--space-2xl);
    }
  }
</style> 