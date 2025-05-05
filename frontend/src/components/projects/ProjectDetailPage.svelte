<script>
  import { projects } from '../../data/project-data.js';
  
  export let params = {};
  
  $: projectId = params.id || '';
  $: project = projects.find(p => p.id === projectId);
  $: prevProject = getPreviousProject(project);
  $: nextProject = getNextProject(project);
  
  function getPreviousProject(currentProject) {
    if (!currentProject) return null;
    const index = projects.findIndex(p => p.id === currentProject.id);
    return index > 0 ? projects[index - 1] : null;
  }
  
  function getNextProject(currentProject) {
    if (!currentProject) return null;
    const index = projects.findIndex(p => p.id === currentProject.id);
    return index < projects.length - 1 ? projects[index + 1] : null;
  }
</script>

{#if project}
  <article class="project-detail">
    <header>
      <h1 class="title">{project.title}</h1>
      
      <div class="hero-image-container">
        <img src={project.image} alt={project.title} class="hero-image">
      </div>
    </header>
    
    <div class="content">
      <p class="description">{project.description}</p>
      
      <!-- Additional project details would go here -->
    </div>
    
    <div class="navigation">
      <div class="nav-item prev">
        {#if prevProject}
          <a href={prevProject.link}>← {prevProject.title}</a>
        {:else}
          <span class="disabled">← Previous Project</span>
        {/if}
      </div>
      
      <div class="nav-item next">
        {#if nextProject}
          <a href={nextProject.link}>{nextProject.title} →</a>
        {:else}
          <span class="disabled">Next Project →</span>
        {/if}
      </div>
    </div>
    
    <div class="back-link">
      <a href="/projects">← Back to Projects</a>
    </div>
  </article>
{:else}
  <div class="not-found">
    <h1>Project Not Found</h1>
    <p>Sorry, the project you're looking for doesn't exist or has been removed.</p>
    <a href="/projects">← Back to Projects</a>
  </div>
{/if}

<style>
  .project-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--color-text);
  }
  
  .hero-image-container {
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .hero-image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
  
  .content {
    margin-bottom: 2rem;
    line-height: 1.7;
  }
  
  .description {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  
  .navigation {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  
  .nav-item a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .nav-item a:hover {
    color: var(--color-secondary);
  }
  
  .disabled {
    color: var(--color-text);
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .back-link {
    margin-top: 2rem;
  }
  
  .back-link a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .back-link a:hover {
    color: var(--color-secondary);
  }
  
  .not-found {
    text-align: center;
    padding: 4rem 1rem;
  }
  
  .not-found h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .not-found a {
    display: inline-block;
    margin-top: 1.5rem;
    color: var(--color-primary);
    text-decoration: none;
  }
</style> 