import { projects, getProjectBySlug, getProjectContent, getRelatedProjects } from '../data/projects';

/**
 * Get all projects
 */
export function getAllProjects() {
  return projects;
}

/**
 * Get a specific project by slug
 */
export async function getProject(slug) {
  const project = getProjectBySlug(slug);
  if (!project) return null;
  
  return project;
}

/**
 * Format a project period for display
 * Example: "Jan 2018 – Present" -> "January 2018 – Present"
 */
export function formatProjectPeriod(period) {
  if (!period) return '';
  
  // Map of short month names to full month names
  const monthMap = {
    'Jan': 'January',
    'Feb': 'February',
    'Mar': 'March',
    'Apr': 'April',
    'May': 'May',
    'Jun': 'June',
    'Jul': 'July',
    'Aug': 'August',
    'Sep': 'September',
    'Oct': 'October',
    'Nov': 'November',
    'Dec': 'December'
  };
  
  // Replace short month names with full month names
  let formattedPeriod = period;
  Object.entries(monthMap).forEach(([short, full]) => {
    const regex = new RegExp(`\\b${short}\\b`, 'g');
    formattedPeriod = formattedPeriod.replace(regex, full);
  });
  
  return formattedPeriod;
}

/**
 * Get related projects for a given project
 */
export function getRelatedProjectsBySlug(slug, limit = 2) {
  const project = getProjectBySlug(slug);
  if (!project) return [];
  
  return getRelatedProjects(project, limit);
} 