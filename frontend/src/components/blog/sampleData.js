// Sample author data
export const authors = {
  'tails-azimuth': {
    name: 'Tails Azimuth',
    avatar: 'https://github.com/vercel.png',
    twitter: '@tailwindcss',
    bio: 'Creator of the Tailwind Nextjs Starter Blog template'
  }
};

// Sample blog posts data
export const posts = [
  {
    slug: 'release-of-tailwind-nextjs-starter-blog-v2-0',
    title: 'Release of Tailwind Nextjs Starter Blog v2.0',
    date: '2023-08-05',
    summary: 'Release of Tailwind Nextjs Starter Blog template v2.0, refactored with Nextjs App directory and React Server Components setup. Discover the new features and how to migrate from V1.',
    tags: ['next-js', 'tailwind', 'guide', 'feature'],
    authors: [authors['tails-azimuth']]
  },
  {
    slug: 'new-features-in-v1',
    title: 'New features in v1',
    date: '2021-08-07',
    summary: 'An overview of the new features released in v1 - code block copy, multiple authors, frontmatter layout and more',
    tags: ['next-js', 'tailwind', 'guide'],
    authors: [authors['tails-azimuth']]
  },
  {
    slug: 'introducing-multi-part-posts-with-nested-routing',
    title: 'Introducing Multi-part Posts with Nested Routing',
    date: '2021-05-02',
    summary: 'The blog template supports posts in nested sub-folders. This can be used to group posts of similar content e.g. a multi-part course. This post is itself an example of a nested route!',
    tags: ['multi-author', 'next-js', 'feature'],
    authors: [authors['tails-azimuth']]
  },
  {
    slug: 'introducing-tailwind-nextjs-starter-blog',
    title: 'Introducing Tailwind Nextjs Starter Blog',
    date: '2021-01-12',
    summary: 'Looking for a performant, out of the box template, with all the best in web technology to support your blogging needs? Checkout the Tailwind Nextjs Starter Blog template.',
    tags: ['next-js', 'tailwind', 'guide'],
    authors: [authors['tails-azimuth']]
  },
  {
    slug: 'deriving-the-ols-estimator',
    title: 'Deriving the OLS Estimator',
    date: '2020-12-21',
    summary: 'How to derive the OLS Estimator with matrix notation and a tour of math typesetting using markdown with the help of KaTeX.',
    tags: ['next-js', 'math', 'ols'],
    authors: [authors['tails-azimuth']]
  }
]; 