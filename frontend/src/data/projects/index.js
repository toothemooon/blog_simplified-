// Import project metadata (without content)
import ravencoin from './projects/ravencoin';
import cgcOverseas from './projects/cgc-overseas';
import chengda from './projects/chengda';

// Export array with metadata only (sorted by period, newest first)
export const projects = [
  ravencoin,
  cgcOverseas,
  chengda
].sort((a, b) => {
  // Extract year and month from period end date
  const aEndDate = a.period.split('–')[1]?.trim() || a.period;
  const bEndDate = b.period.split('–')[1]?.trim() || b.period;
  
  // Handle 'Present' specially
  if (aEndDate.includes('Present')) return -1;
  if (bEndDate.includes('Present')) return 1;
  
  // Otherwise sort by date (most recent first)
  return new Date(bEndDate) - new Date(aEndDate);
});

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