<script>
  import { onMount } from 'svelte';
  import { 
    getPost, 
    getNextPostForSlug, 
    getPreviousPostForSlug,
    formatPostDate,
    getReadingTime 
  } from '../../utils/blog-utils.js';
  
  // Props: slug of the post to display
  export let slug = '';
  
  // State variables
  let post = null;
  let content = '';
  let loading = true;
  let error = null;
  let readingTime = '';
  let nextPost = null;
  let previousPost = null;
  
  // Load post data on mount and when slug changes
  $: if (slug) {
    loadPost(slug);
  }
  
  async function loadPost(postSlug) {
    if (!postSlug) return;
    
    loading = true;
    error = null;
    
    try {
      // Get post with content
      const postData = await getPost(postSlug);
      
      if (!postData) {
        error = 'Post not found';
        post = null;
        content = '';
      } else {
        post = postData;
        content = typeof postData.content === 'string' 
          ? postData.content 
          : postData.content?.default || '';
        readingTime = getReadingTime(content);
        
        // Get next and previous posts
        nextPost = getNextPostForSlug(postSlug);
        previousPost = getPreviousPostForSlug(postSlug);
      }
    } catch (err) {
      console.error('Error loading post:', err);
      error = 'Failed to load post';
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    loadPost(slug);
  });
  
  // Simple markdown to HTML converter
  function markdownToHtml(markdown) {
    if (!markdown) return '';
    
    // Start with a container
    let html = '<div>';
    
    // Split the markdown by lines
    const lines = markdown.split('\n');
    let inList = false;
    let inCodeBlock = false;
    let codeContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          html += `<pre><code>${codeContent}</code></pre>`;
          codeContent = '';
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
          // Get language if specified
          const lang = line.trim().slice(3);
          if (lang) {
            codeContent = `// Language: ${lang}\n`;
          }
        }
        continue;
      }
      
      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }
      
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('# ')) {
        // h1 heading
        html += `<h1>${trimmedLine.substring(2)}</h1>`;
      } else if (trimmedLine.startsWith('## ')) {
        // h2 heading
        html += `<h2>${trimmedLine.substring(3)}</h2>`;
      } else if (trimmedLine.startsWith('### ')) {
        // h3 heading
        html += `<h3>${trimmedLine.substring(4)}</h3>`;
      } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        // List item
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${trimmedLine.substring(2)}</li>`;
      } else if (trimmedLine === '' && inList) {
        // End of list
        html += '</ul>';
        inList = false;
      } else if (trimmedLine === '') {
        // Empty line, paragraph break
        html += '</p><p>';
      } else if (!inList) {
        // Regular paragraph text
        html += line + ' ';
      }
    }
    
    // Close any open lists
    if (inList) {
      html += '</ul>';
    }
    
    // Close any open code blocks
    if (inCodeBlock) {
      html += `<pre><code>${codeContent}</code></pre>`;
    }
    
    // Replace inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Replace strong/bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Replace emphasis/italic
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Replace links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Wrap with final paragraph if needed
    if (!html.endsWith('</p>') && !html.endsWith('</ul>') && 
        !html.endsWith('</h1>') && !html.endsWith('</h2>') && 
        !html.endsWith('</h3>') && !html.endsWith('</pre>')) {
      html += '</p>';
    }
    
    // Close the container
    html += '</div>';
    
    // Fix any double paragraph tags
    html = html.replace(/<\/p><p><\/p><p>/g, '</p><p>');
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
  }
</script>

<div class="blog-post-page container-narrow">
  {#if loading}
    <div class="loading-indicator">
      <p>Loading post...</p>
    </div>
  {:else if error}
    <div class="error-message">
      <h2>Error</h2>
      <p>{error}</p>
      <a href="/blog">Return to blog list</a>
    </div>
  {:else if post}
    <article class="blog-post">
      <!-- Date and reading time -->
      <div class="post-date-container">
        <time datetime={post.date} class="post-date">
          {formatPostDate(post.date)}
        </time>
        <span class="reading-time">{readingTime}</span>
      </div>
      
      <!-- Title -->
      <h1 class="post-title">{post.title}</h1>
      
      <!-- Tags -->
      {#if post.tags && post.tags.length > 0}
        <div class="post-tags">
          {#each post.tags as tag}
            <a href="/tags/{tag}" class="post-tag">{tag}</a>
          {/each}
        </div>
      {/if}
      
      <!-- Summary -->
      <div class="post-summary">
        {post.summary}
      </div>
      
      <!-- Divider line -->
      <div class="post-divider"></div>
      
      <!-- Authors -->
      {#if post.authors && post.authors.length > 0}
        <div class="post-authors">
          {#each post.authors as author}
            <div class="author-info">
              <img src={author.avatar} alt={author.name} class="author-avatar" />
              <div class="author-details">
                <span class="author-name">{author.name}</span>
                {#if author.twitter}
                  <a href="https://twitter.com/{author.twitter.replace('@', '')}" class="author-twitter">{author.twitter}</a>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <!-- Content -->
      <div class="post-content">
        {@html markdownToHtml(content)}
      </div>
      
      <!-- Post Navigation -->
      <div class="post-navigation">
        {#if previousPost}
          <a href="/blog/{previousPost.slug}" class="nav-link prev-link">
            <span class="nav-label">PREVIOUS ARTICLE</span>
            <span class="nav-title">
              <span class="nav-arrow">←</span> {previousPost.title}
            </span>
          </a>
        {:else}
          <div class="nav-placeholder"></div>
        {/if}
        
        {#if nextPost}
          <a href="/blog/{nextPost.slug}" class="nav-link next-link">
            <span class="nav-label">NEXT ARTICLE</span>
            <span class="nav-title">
              {nextPost.title} <span class="nav-arrow">→</span>
            </span>
          </a>
        {:else}
          <div class="nav-placeholder"></div>
        {/if}
      </div>
    </article>
  {:else}
    <div class="not-found">
      <h2>Post Not Found</h2>
      <p>The blog post you're looking for doesn't exist or has been removed.</p>
      <a href="/blog">Return to blog list</a>
    </div>
  {/if}
</div>

<style>
  /* 
   * IMPORTANT: The following CSS selectors for .post-content elements
   * will be flagged as "unused" by the Svelte compiler. This is expected and can be safely ignored.
   * 
   * These selectors target HTML elements that are dynamically generated when rendering
   * Markdown content in the blog post. Since this content is loaded at runtime and not
   * statically defined in the template, Svelte can't detect the relationship.
   * 
   * Do not remove these selectors even if they appear unused!
   */
  
  .post-container {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  .post-header {
    margin-bottom: 2rem;
  }
  
  .blog-post-page {
    margin-top: 2rem;
  }
  
  .blog-post {
    max-width: 100%;
  }
  
  .post-title {
    font-size: 2.5rem;
    line-height: 1.2;
    margin: 0.5rem 0 1rem;
    color: var(--color-heading);
  }
  
  .post-date-container {
    display: flex;
    align-items: center;
    color: var(--color-text-light);
    font-size: 0.9rem;
  }
  
  .reading-time {
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 1px solid var(--color-border);
  }
  
  .post-summary {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-light);
    margin: 1rem 0;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .post-tag {
    display: inline-block;
    background-color: var(--color-bg-secondary);
    color: var(--color-text);
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .post-tag:hover {
    background-color: var(--color-primary);
    color: var(--color-bg);
  }
  
  .post-divider {
    height: 1px;
    background-color: var(--color-border);
    margin: 2rem 0;
  }
  
  .post-authors {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
  .author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .author-details {
    display: flex;
    flex-direction: column;
  }
  
  .author-name {
    font-weight: 600;
    color: var(--color-heading);
  }
  
  .author-twitter {
    color: var(--color-primary);
    font-size: 0.9rem;
    text-decoration: none;
  }
  
  .author-twitter:hover {
    text-decoration: underline;
  }
  
  .post-content {
    line-height: 1.8;
    font-size: 1.05rem;
  }
  
  .post-content h1 {
    font-size: 2rem;
    margin: 2rem 0 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }
  
  .post-content h2 {
    font-size: 1.5rem;
    margin: 1.75rem 0 1rem;
    color: var(--color-heading);
  }
  
  .post-content h3 {
    font-size: 1.25rem;
    margin: 1.5rem 0 0.75rem;
    color: var(--color-heading);
  }
  
  .post-content p {
    margin-bottom: 1.25rem;
  }
  
  .post-content ul, .post-content ol {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }
  
  .post-content li {
    margin-bottom: 0.5rem;
  }
  
  .post-content code {
    background-color: var(--color-bg-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9em;
  }
  
  .post-content pre {
    background-color: var(--color-bg-secondary);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }
  
  .post-content pre code {
    background: none;
    padding: 0;
    border-radius: 0;
    display: block;
    line-height: 1.6;
  }
  
  .post-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }
  
  .nav-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    max-width: 45%;
  }
  
  .nav-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-light);
    margin-bottom: 0.25rem;
  }
  
  .nav-title {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .nav-arrow {
    vertical-align: middle;
  }
  
  .nav-placeholder {
    width: 45%;
  }
  
  .prev-link {
    align-items: flex-start;
  }
  
  .next-link {
    align-items: flex-end;
    text-align: right;
  }
  
  .loading-indicator, .error-message, .not-found {
    text-align: center;
    padding: 3rem 0;
  }
  
  .error-message h2, .not-found h2 {
    color: var(--color-heading);
    margin-bottom: 1rem;
  }
  
  .error-message a, .not-found a {
    display: inline-block;
    margin-top: 1rem;
    color: var(--color-primary);
    text-decoration: none;
    border: 1px solid var(--color-primary);
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
  
  .error-message a:hover, .not-found a:hover {
    background-color: var(--color-primary);
    color: var(--color-bg);
  }
  
  @media (max-width: 768px) {
    .post-title {
      font-size: 2rem;
    }
    
    .post-navigation {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .nav-link, .nav-placeholder {
      max-width: 100%;
    }
    
    .next-link {
      align-items: flex-start;
      text-align: left;
    }
  }
</style> 