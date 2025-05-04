<script>
  import { posts } from './sampleData.js';
  
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
  
  // Find the previous and next posts for navigation
  const currentIndex = posts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
</script>

<div class="blog-post-page">
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
          <span class="nav-label">Previous Article</span>
          <span class="nav-title">{previousPost.title}</span>
        </a>
      {/if}
      
      {#if nextPost}
        <a href="/blog/{nextPost.slug}" class="nav-link next-link">
          <span class="nav-label">Next Article</span>
          <span class="nav-title">{nextPost.title}</span>
        </a>
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
    max-width: 42rem;
    margin: 0 auto;
    padding: 0 1rem;
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

  .post-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }

  .nav-link {
    display: flex;
    flex-direction: column;
    max-width: 45%;
    text-decoration: none;
  }

  .nav-label {
    font-size: 0.875rem;
    color: var(--color-text-secondary, var(--color-text));
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }

  .nav-title {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-primary);
  }
  
  .prev-link {
    margin-right: auto;
  }

  .next-link {
    margin-left: auto;
    text-align: right;
  }
  
  .back-link-container {
    text-align: center;
    margin-top: 3rem;
  }
  
  .back-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
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
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .nav-link {
      max-width: 100%;
    }
    
    .next-link {
      text-align: left;
    }
  }
</style> 