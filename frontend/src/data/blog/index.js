// Import post metadata (without content)
import introToRavencoin from './posts/2019-03-25-introduction-to-ravencoin';
import ravencoinX16r from './posts/2019-04-02-ravencoin-x16r-algorithm';
import ravencoinWallet from './posts/2019-04-10-ravencoin-wallet-ecosystem';
import assetTokenization from './posts/2019-04-18-asset-tokenization-ravencoin';
import ipfsIntegration from './posts/2019-04-26-ipfs-ravencoin-integration';
import blockchainComparison from './posts/2019-05-04-public-vs-private-blockchains';
import ravencoinPrivacy from './posts/2019-05-12-ravencoin-privacy-future';
import findingYourGroove from './posts/2024-05-06-finding-your-groove-balancing-ai-and-good-old-fashioned-coding';
import bozuMekuri from './posts/2025-10-06-bozu-mekuri-traditional-japanese-card-game';

// Export array with metadata only (sorted by date, newest first)
export const posts = [
  bozuMekuri,
  findingYourGroove,
  ravencoinPrivacy,
  blockchainComparison,
  ipfsIntegration,
  assetTokenization,
  ravencoinWallet,
  ravencoinX16r,
  introToRavencoin
].sort((a, b) => new Date(b.date) - new Date(a.date));

// Function to get post by slug
export function getPostBySlug(slug) {
  return posts.find(post => post.slug === slug) || null;
}

// Dynamic content loading function
export async function getPostContent(slug) {
  const post = getPostBySlug(slug);
  if (!post) return null;
  
  try {
    const content = await post.getContent();
    return content.default || content;
  } catch (error) {
    console.error(`Error loading content for post: ${slug}`, error);
    return null;
  }
}

// Get related posts (same tag, excluding current post)
export function getRelatedPosts(slug, tag, limit = 3) {
  // Find posts with the same tag
  return posts
    .filter(post => post.slug !== slug && post.tags.includes(tag))
    .slice(0, limit);
}

// Get posts by tag
export function getPostsByTag(tag) {
  return posts.filter(post => post.tags.includes(tag));
}

// Get all unique tags
export function getAllTags() {
  const tagsSet = new Set();
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}

// Get next post in series (chronologically)
export function getNextPost(slug) {
  const currentIndex = posts.findIndex(post => post.slug === slug);
  return currentIndex > 0 ? posts[currentIndex - 1] : null;
}

// Get previous post in series (chronologically)
export function getPreviousPost(slug) {
  const currentIndex = posts.findIndex(post => post.slug === slug);
  return currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
} 