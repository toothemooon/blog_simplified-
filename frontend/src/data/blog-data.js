// Blog data store
export const posts = [
  {
    title: 'Nested Routes',
    date: '2023-03-25',
    summary: 'How to organize your content with nested routes in a blog',
    content: `
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
    `,
    slug: 'nested-routes',
    tags: ['routing', 'features'],
    authors: [
      {
        name: 'Timothy Lin',
        avatar: 'https://avatars.githubusercontent.com/u/28109?v=4',
        twitter: '@timlrx'
      }
    ]
  },
  {
    title: 'Introduction to Svelte',
    date: '2023-04-18',
    summary: 'Learn the basics of Svelte and why it is a great choice for building web applications',
    content: `
# Introduction to Svelte

Svelte is a modern JavaScript framework that takes a unique approach to building user interfaces. Unlike traditional frameworks that do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.

## Why Svelte?

* No Virtual DOM
* True reactivity
* Less code to write
* Built-in animations and transitions
* No framework to ship to production

## Getting Started

To create a new Svelte project, you can use the official template:

\`\`\`
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
\`\`\`

And you're ready to go!
    `,
    slug: 'introduction-to-svelte',
    tags: ['svelte', 'javascript', 'frameworks'],
    authors: [
      {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        twitter: '@sarahjdev'
      }
    ]
  },
  {
    title: 'Custom CSS vs UI Libraries',
    date: '2023-05-10',
    summary: 'Pros and cons of writing custom CSS versus using UI component libraries',
    content: `
# Custom CSS vs UI Libraries

When building a web application, one of the first decisions you'll make is how to approach styling. Should you write custom CSS from scratch or use a UI component library? This post explores the trade-offs.

## Custom CSS

### Pros
* Complete control over the design
* No unused CSS bloating your bundle
* No library-specific knowledge required

### Cons
* More time-consuming
* Need to handle cross-browser compatibility
* Have to implement accessibility yourself

## UI Libraries

### Pros
* Faster development
* Consistent design
* Built-in accessibility
* Community support

### Cons
* Less unique designs
* Larger bundle sizes
* Learning curve for the library API

## Conclusion

There's no one-size-fits-all answer. For unique projects with specific design requirements, custom CSS might be better. For rapid development or when consistency is key, a UI library could be the right choice.
    `,
    slug: 'custom-css-vs-ui-libraries',
    tags: ['css', 'design', 'frontend'],
    authors: [
      {
        name: 'Alex Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        twitter: '@alexchendesign'
      }
    ]
  },
  {
    title: 'Building a Blog with Svelte',
    date: '2023-06-05',
    summary: 'A step-by-step guide to creating your own blog using Svelte and vanilla CSS',
    content: `
# Building a Blog with Svelte

Creating a blog with Svelte is straightforward and enjoyable. This guide will walk you through the process step by step.

## Setting Up the Project

First, create a new Svelte project:

\`\`\`
npx degit sveltejs/template my-blog
cd my-blog
npm install
\`\`\`

## Creating Components

You'll need several key components:

1. BlogList - For the main page showing all posts
2. BlogPost - For individual post pages
3. Header - For navigation
4. Tags - For categorizing posts

## Routing

For client-side routing, page.js works great with Svelte:

\`\`\`
npm install page
\`\`\`

Then set up your routes in main.js.

## Styling

With vanilla CSS, you can create a beautiful, responsive design without the overhead of a CSS framework.

## Conclusion

Svelte's lightweight nature and intuitive syntax make it perfect for building performant blogs. By using vanilla CSS, you maintain full control over the design while keeping bundle sizes small.
    `,
    slug: 'building-a-blog-with-svelte',
    tags: ['svelte', 'tutorial', 'frontend'],
    authors: [
      {
        name: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        twitter: '@mariagarcia_dev'
      }
    ]
  },
  {
    title: 'The Power of Progressive Enhancement',
    date: '2023-07-15',
    summary: 'Understanding how progressive enhancement can improve your web applications',
    content: `
# The Power of Progressive Enhancement

Progressive enhancement is a web design strategy that emphasizes core webpage content first, then progressively adds more nuanced and technically rigorous layers of presentation and features on top of the content.

## Core Principles

1. Basic content should be accessible to all web browsers
2. Basic functionality should be accessible to all web browsers
3. Sparse, semantic markup contains all content
4. Enhanced layout is provided by externally linked CSS
5. Enhanced behavior is provided by unobtrusive, externally linked JavaScript
6. End-user web browser preferences are respected

## Benefits

* Better accessibility
* Improved performance
* More resilient applications
* Better SEO
* Easier maintenance

## Implementation

Start with semantic HTML, then layer on CSS and JavaScript:

\`\`\`html
<!-- Basic HTML structure -->
<article>
  <h1>Article Title</h1>
  <p>Article content...</p>
</article>

<!-- Enhanced with CSS -->
<article class="card">
  <h1 class="title">Article Title</h1>
  <p class="content">Article content...</p>
</article>

<!-- Enhanced with JavaScript -->
<article class="card" data-interactive>
  <h1 class="title">Article Title</h1>
  <p class="content">Article content...</p>
</article>
\`\`\`
    `,
    slug: 'progressive-enhancement',
    tags: ['web-development', 'accessibility', 'best-practices'],
    authors: [
      {
        name: 'Alex Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        twitter: '@alexchen_dev'
      }
    ]
  },
  {
    title: 'Understanding CSS Grid',
    date: '2023-08-22',
    summary: 'A comprehensive guide to mastering CSS Grid layout',
    content: `
# Understanding CSS Grid

CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.

## Basic Concepts

* Grid Container
* Grid Items
* Grid Lines
* Grid Tracks
* Grid Cells
* Grid Areas

## Example Layout

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

.header { grid-area: 1 / 1 / 2 / 3; }
.sidebar { grid-area: 2 / 1 / 3 / 2; }
.main { grid-area: 2 / 2 / 3 / 3; }
.footer { grid-area: 3 / 1 / 4 / 3; }
\`\`\`

## Best Practices

* Use named grid areas for better readability
* Combine with media queries for responsive layouts
* Use minmax() for flexible sizing
* Leverage auto-fit and auto-fill for dynamic layouts
    `,
    slug: 'understanding-css-grid',
    tags: ['css', 'layout', 'frontend'],
    authors: [
      {
        name: 'Jamie Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        twitter: '@jamiewilson_dev'
      }
    ]
  }
]; 