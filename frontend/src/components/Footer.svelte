<script>
  // Social media icons with expanded set of links
  const socialLinks = [
    { name: 'Mail', url: 'mailto:hsc110110123@gmail.com', icon: 'M0 4v16h24V4H0zm19.4 2L12 10.78 4.6 6h14.8zM2 18V7.48l10 6.25 10-6.25V18H2z' },
    { name: 'GitHub', url: 'https://github.com/toothemooon', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.743.084-.729.084-.729 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12' },
    { name: 'Medium', url: 'https://medium.com/@abc510433622', icon: 'M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.279.39-.67.325-1.052v-10.608z' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sarada03', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'YouTube', url: 'https://www.youtube.com/@afewthoughts7755', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
    { name: 'X', url: 'https://x.com/Developer036', icon: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' }
  ];

  // Current year for copyright
  const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="social-links-container">
        <div class="social-links">
          {#each socialLinks as link}
            <a href={link.url} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={link.name}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="social-icon">
                <path d={link.icon}></path>
              </svg>
            </a>
          {/each}
        </div>
      </div>
      
      <div class="footer-info">
        <div class="copyright">
          <span>&copy; {currentYear}</span>
          <span class="divider">•</span>
          <span>Sarada's Blog</span>
          <span class="divider">•</span>
          <span>Built with Svelte 4</span>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    padding: 3rem 0 2rem;
    border-top: 1px solid var(--color-border);
    background-color: var(--color-bg);
    margin-top: 2rem;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: var(--container-width-md);
    margin: 0 auto;
  }
  
  .social-links-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .social-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
    max-width: 70%;
    margin: 0 auto;
  }
  
  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text);
    transition: color 0.2s ease;
    width: 24px;
    height: 24px;
    opacity: 0.7;
  }
  
  .social-link:hover {
    color: var(--color-primary);
    opacity: 1;
    text-decoration: none;
  }
  
  .social-icon {
    width: 24px;
    height: 24px;
  }
  
  .footer-info {
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.8;
    margin-top: 0.5rem;
  }
  
  .copyright {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .divider {
    opacity: 0.5;
  }
  
  @media (min-width: 640px) {
    .social-links {
      max-width: 450px;
    }
  }
</style> 