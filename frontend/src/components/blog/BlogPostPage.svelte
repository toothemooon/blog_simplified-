<script>
  import { posts } from '../../data/blog-data.js';
  
  // Props: slug of the post to display
  export let slug = '';
  
  // Find the post based on the slug
  $: post = posts.find(p => p.slug === slug) || {
    title: 'Post not found',
    date: '',
    summary: '',
    content: '',
    slug: '',
    tags: [],
    authors: []
  };
  
  // Sample content for testing - matching the reference post
  const samplePostContent = `
# Nested Routes

The blog template supports posts in nested sub-folders. This helps in organisation and can be used to group posts of similar content e.g. a multi-part series. This post is itself an example of a nested route! It's located in the \`/data/blog/nested-route\` folder.

## How

Simplify create multiple folders inside the main \`/data/blog\` folder and add your \`.md\`/\`.mdx\` files to them. You can even create something like \`/data/blog/nested-route/deeply-nested-route/my-post.md\`

We use Next.js catch all routes to handle the routing and path creations.

## Use Cases

Here are some reasons to use nested routes

* More logical content organisation (blogs will still be displayed based on the created date)
* Multi-part posts
* Different sub-routes for each author
* Internationalization (though it would be recommended to use Next.js built-in i8n routing)

## Note

* The previous/next post links at bottom of the template are currently sorted by date. One could explore modifying the template to refer the reader to the previous/next post in the series, rather than by date.
  `;
  
  // Format date to display as Month Day, Year
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Simple markdown to HTML converter for testing
  function markdownToHtml(markdown) {
    if (!markdown) return '';
    
    // Start with a container
    let html = '<div>';
    
    // Split the markdown by lines
    const lines = markdown.split('\n');
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ')) {
        // h1 heading
        html += `<h1>${line.substring(2)}</h1>`;
      } else if (line.startsWith('## ')) {
        // h2 heading
        html += `<h2>${line.substring(3)}</h2>`;
      } else if (line.startsWith('* ')) {
        // List item
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${line.substring(2)}</li>`;
      } else if (line === '' && inList) {
        // End of list
        html += '</ul>';
        inList = false;
      } else if (line === '') {
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
    
    // Replace code blocks
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Wrap with final paragraph if needed
    if (!html.endsWith('</p>') && !html.endsWith('</ul>') && !html.endsWith('</h1>') && !html.endsWith('</h2>')) {
      html += '</p>';
    }
    
    // Close the container
    html += '</div>';
    
    // Fix any double paragraph tags
    html = html.replace(/<\/p><p><\/p><p>/g, '</p><p>');
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
  }
  
  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Find the current post index in the sorted posts array
  $: currentIndex = sortedPosts.findIndex(p => p.slug === slug);
  
  // Define previous and next posts based on the sorted array
  $: previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  $: nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
</script>

<div class="blog-post-page container-narrow">
  <article class="blog-post">
    <!-- Date -->
    <div class="post-date-container">
      <time datetime={post.date} class="post-date">
        {formatDate(post.date)}
      </time>
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
      {@html markdownToHtml(samplePostContent)}
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
    
    <!-- Back to blog link -->
    <div class="back-link-container">
      <a href="/blog" class="back-link">← Back to the blog</a>
    </div>
  </article>
</div>

<style>
  .blog-post-page {
    padding-top: var(--space-xl);
    padding-bottom: var(--space-2xl);
  }

  .blog-post {
    margin-bottom: 3rem;
  }

  .post-date-container {
    margin-bottom: 1rem;
  }

  .post-date {
    color: var(--color-text-secondary, var(--color-text));
    opacity: 0.8;
    font-size: 1rem;
  }

  .post-title {
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--color-heading, var(--color-text));
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .post-tag {
    font-size: 0.875rem;
    color: var(--color-primary);
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
  }

  .post-tag:hover {
    text-decoration: underline;
  }

  .post-summary {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--color-text-secondary, var(--color-text));
    opacity: 0.8;
    margin-bottom: 2rem;
  }
  
  .post-divider {
    height: 1px;
    background-color: var(--color-border);
    margin: 2rem 0;
    width: 100%;
  }

  .post-authors {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .author-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  .author-details {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-weight: 500;
  }

  .author-twitter {
    font-size: 0.875rem;
    color: var(--color-primary);
    text-decoration: none;
  }

  .author-twitter:hover {
    text-decoration: underline;
  }

  .post-content {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 3rem;
  }
  
  .post-content h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 2rem 0 1rem;
    line-height: 1.2;
  }
  
  .post-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
    line-height: 1.3;
  }
  
  .post-content p {
    margin-bottom: 1.5rem;
  }
  
  .post-content ul {
    margin: 1rem 0 1.5rem 1.5rem;
    list-style-type: disc;
  }
  
  .post-content li {
    margin-bottom: 0.5rem;
  }
  
  .post-content code {
    font-family: monospace;
    background-color: var(--color-border);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.9em;
  }

  /* Post Navigation Styles */
  .post-navigation {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 0;
    padding: 2rem 0;
    border-top: 1px solid var(--color-border);
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    max-width: 45%;
    text-decoration: none;
    transition: color 0.2s ease;
    border-radius: 0.5rem;
    padding: 0.75rem;
    -webkit-tap-highlight-color: transparent;
  }
  
  .nav-link:hover {
    background-color: rgba(var(--color-primary-rgb), 0.05);
  }
  
  .nav-placeholder {
    width: 45%;
  }

  .nav-label {
    font-size: 0.8rem;
    color: var(--color-text-secondary, var(--color-text));
    opacity: 0.7;
    margin-bottom: 0.5rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .nav-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-primary);
    line-height: 1.4;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .nav-arrow {
    font-size: 1.25rem;
    line-height: 1;
  }
  
  .prev-link {
    margin-right: auto;
  }

  .next-link {
    margin-left: auto;
    text-align: right;
  }
  
  /* Back to blog link */
  .back-link-container {
    text-align: center;
    margin: 3rem 0;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }
  
  .back-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: opacity 0.2s ease;
    display: inline-flex;
    align-items: center;
    height: var(--min-touch-target);
    padding: 0 var(--space-md);
    -webkit-tap-highlight-color: transparent;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .post-title {
      font-size: 2rem;
    }
    
    .post-summary,
    .post-content {
      font-size: 1rem;
    }
    
    .post-navigation {
      flex-direction: row;
      gap: 1rem;
      padding: 1.5rem 0;
    }
    
    .nav-link, .nav-placeholder {
      max-width: 45%;
      min-height: var(--min-touch-target);
      padding: 1rem;
      border-radius: 0.5rem;
    }
    
    .next-link {
      text-align: right;
    }
  }
</style> 