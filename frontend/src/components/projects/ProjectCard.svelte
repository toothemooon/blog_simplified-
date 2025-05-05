<script>
  export let project;
</script>

<article class="project-card">
  <a href={project.link} class="image-container">
    <img src={project.image} alt={project.title} class="project-image">
  </a>
  
  <div class="content">
    <h2 class="title">
      <a href={project.link}>{project.title}</a>
    </h2>
    <p class="description">{project.description}</p>
    <a href={project.link} class="learn-more touch-target">Learn more →</a>
  </div>
</article>

<style>
  .project-card {
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .project-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px -3px rgba(0, 0, 0, 0.1);
  }
  
  .image-container {
    aspect-ratio: 16/9;
    overflow: hidden;
    display: block;
    position: relative;
  }
  
  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .project-card:hover .project-image {
    transform: scale(1.02);
  }
  
  .content {
    padding: var(--space-md);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .title {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin-bottom: var(--space-sm);
    line-height: 1.3;
  }
  
  .title a {
    color: var(--color-text);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .title a:hover {
    color: var(--color-primary);
  }
  
  .description {
    color: var(--color-text);
    opacity: 0.8;
    margin-bottom: var(--space-md);
    line-height: 1.5;
    flex: 1;
    font-size: 0.95rem;
  }
  
  .learn-more {
    display: inline-flex;
    align-items: center;
    height: var(--min-touch-target);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s ease;
    margin-top: auto;
  }
  
  .learn-more:hover {
    color: var(--color-secondary);
  }
  
  @media (min-width: 640px) {
    .content {
      padding: var(--space-lg);
    }
    
    .title {
      font-size: var(--font-size-xl);
    }
  }
</style> 