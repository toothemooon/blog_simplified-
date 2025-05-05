// Import project metadata (without content)
import ravencoin from './projects/ravencoin';
import cgcOverseas from './projects/cgc-overseas';
import chengda from './projects/chengda';

// Export array with fixed order: Ravencoin first, then Chengda, then CGC Overseas
export const projects = [
  ravencoin,  // Jan 2018 - Present (ongoing)
  chengda,    // Feb 2023 - Jul 2023
  cgcOverseas // Mar 2021 - Jul 2022
];

// Function to get project by slug
export function getProjectBySlug(slug) {
  return projects.find(project => project.slug === slug) || null;
}

// Dynamic content loading function
export async function getProjectContent(slug) {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  
  try {
    const content = await project.getContent();
    return content.default || content;
  } catch (error) {
    console.error(`Error loading content for project: ${slug}`, error);
    return null;
  }
}

// Get related projects based on tags
export function getRelatedProjects(project, limit = 2) {
  if (!project || !project.tags || !project.tags.length) return [];
  
  // Get projects with matching tags, excluding the current one
  const related = projects
    .filter(p => p.slug !== project.slug && p.tags && p.tags.some(tag => project.tags.includes(tag)))
    .sort((a, b) => {
      // Count matching tags
      const aMatchCount = a.tags.filter(tag => project.tags.includes(tag)).length;
      const bMatchCount = b.tags.filter(tag => project.tags.includes(tag)).length;
      
      // Sort by number of matching tags (descending)
      return bMatchCount - aMatchCount;
    })
    .slice(0, limit);
  
  return related;
} 