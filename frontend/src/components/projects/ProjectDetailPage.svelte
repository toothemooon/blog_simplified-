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
  <article class="project-detail container-narrow">
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
          <span class="nav-label">PREVIOUS PROJECT</span>
          <a href={prevProject.link} class="nav-link">
            <span class="nav-arrow">←</span> {prevProject.title}
          </a>
        {:else}
          <span class="nav-label disabled">PREVIOUS PROJECT</span>
          <span class="disabled">← Previous Project</span>
        {/if}
      </div>
      
      <div class="nav-item next">
        {#if nextProject}
          <span class="nav-label">NEXT PROJECT</span>
          <a href={nextProject.link} class="nav-link">
            {nextProject.title} <span class="nav-arrow">→</span>
          </a>
        {:else}
          <span class="nav-label disabled">NEXT PROJECT</span>
          <span class="disabled">Next Project →</span>
        {/if}
      </div>
    </div>
    
    <div class="back-link">
      <a href="/projects" class="back-btn">← Back to Projects</a>
    </div>
  </article>
{:else}
  <div class="not-found container-narrow">
    <h1>Project Not Found</h1>
    <p>Sorry, the project you're looking for doesn't exist or has been removed.</p>
    <a href="/projects" class="back-btn">← Back to Projects</a>
  </div>
{/if}

<style>
  .project-detail {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-2xl);
  }
  
  .title {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--color-text);
    line-height: 1.2;
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
    font-size: clamp(1rem, 3vw, 1.125rem);
    margin-bottom: 1.5rem;
  }
  
  .navigation {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 3rem 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
    opacity: 0.7;
    letter-spacing: 0.05em;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
    font-weight: 500;
    font-size: 1.125rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin-left: -0.75rem;
    -webkit-tap-highlight-color: transparent;
  }
  
  .nav-link:hover {
    background-color: rgba(var(--color-primary-rgb), 0.05);
  }
  
  .nav-arrow {
    font-size: 1.25rem;
    line-height: 1;
  }
  
  .disabled {
    color: var(--color-text);
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .back-link {
    margin-top: 3rem;
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }
  
  .back-btn {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    height: var(--min-touch-target);
    font-weight: 500;
    font-size: 1rem;
    padding: 0 var(--space-md);
    -webkit-tap-highlight-color: transparent;
  }
  
  .back-btn:hover {
    text-decoration: underline;
  }
  
  .not-found {
    text-align: center;
    padding: 4rem 1rem;
  }
  
  .not-found h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  @media (min-width: 768px) {
    .navigation {
      flex-direction: row;
      justify-content: space-between;
    }
    
    .nav-item.next {
      text-align: right;
    }
    
    .nav-item.next .nav-link {
      margin-left: auto;
      margin-right: -0.75rem;
      justify-content: flex-end;
    }
  }
</style> 