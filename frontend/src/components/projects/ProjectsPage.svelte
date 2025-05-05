<script>
  import { projects } from '../../data/project-data.js';
  import ProjectCard from './ProjectCard.svelte';
  import { onMount } from 'svelte';
  
  onMount(() => {
    console.log('ProjectsPage mounted with', projects.length, 'projects');
  });
</script>

<div class="projects-page">
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
    padding: 1rem 0;
  }
  
  .page-header {
    margin-bottom: 2rem;
  }
  
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .page-subtitle {
    font-size: 1.125rem;
    color: var(--color-text);
    opacity: 0.7;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: 640px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style> 