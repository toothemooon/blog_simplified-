<script>
  import { t } from '../i18n';
  
  // Social media icons
  const socialLinks = [
    { name: 'Mail', url: 'mailto:hsc110110123@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'GitHub', url: 'https://github.com/toothemooon', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sarada03', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'X', url: 'https://x.com/Developer036', icon: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' }
  ];
</script>

<div class="about-page">
  <h1 class="page-title">{$t('pages.about.title')}</h1>
  
  <div class="author-profile">
    <div class="avatar-container">
      <img class="avatar" src="/images/avatar/scenery-avatar.svg" alt="Scenic landscape avatar with mountains and trees" />
    </div>
    
    <div class="author-info">
      <h2 class="author-name">{$t('pages.about.author_name')}</h2>
      <p class="author-title">{$t('pages.about.author_title')}</p>
      <p class="author-institution">{$t('pages.about.author_institution')}</p>
      
      <div class="social-links">
        {#each socialLinks as link}
          <a href={link.url} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={link.name}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon">
              <path d={link.icon}></path>
            </svg>
            <span class="social-name">{link.name}</span>
          </a>
        {/each}
      </div>
    </div>
  </div>
  
  <div class="bio-content">
    <p>{$t('pages.about.bio_part1')}</p>
    <p>{$t('pages.about.bio_part2')}</p>
  </div>
</div>

<style>
  .about-page {
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  
  .author-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .avatar-container {
    margin-bottom: 1.5rem;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--color-primary);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .author-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .author-name {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .author-title {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    color: var(--color-text);
  }
  
  .author-institution {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: var(--color-text);
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .social-link:hover {
    color: var(--color-secondary);
  }
  
  .social-icon {
    width: 24px;
    height: 24px;
  }
  
  .social-name {
    display: none;
  }
  
  .bio-content {
    line-height: 1.7;
  }
  
  .bio-content p {
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .author-profile {
      flex-direction: row;
      text-align: left;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 2rem;
    }
    
    .avatar-container {
      margin-bottom: 0;
    }
    
    .author-info {
      align-items: flex-start;
    }
    
    .social-links {
      justify-content: flex-start;
    }
  }
</style> 