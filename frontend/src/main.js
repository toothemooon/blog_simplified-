import App from './App.svelte';
import page from 'page';

// Log initial path for debugging
console.log('Initial path:', window.location.pathname);

const app = new App({
	target: document.body,
	props: {
		currentRoute: '/',
		params: {}
	}
});

// Helper function to set route and scroll to top
function setRoute(route, params = {}) {
	console.log('Setting route:', route, 'with params:', params);
	window.scrollTo(0, 0);
	app.$set({ currentRoute: route, params });
}

// Set up routing
page('/', () => {
	console.log('Root route handler called');
	setRoute('/');
});

// Blog listing page
page('/blog', () => {
	console.log('Blog route handler called');
	setRoute('/blog-list');
});

// Individual blog post page
page('/blog/:slug', (ctx) => {
	console.log('Blog post route handler called with slug:', ctx.params.slug);
	setRoute('/blog-post', { slug: ctx.params.slug });
});

// Tags page showing all tags
page('/tags', () => {
	console.log('Tags route handler called');
	setRoute('/tags-list');
});

// Individual tag page showing posts with a specific tag
page('/tags/:tag', (ctx) => {
	console.log('Tag route handler called with tag:', ctx.params.tag);
	setRoute('/tag', { tag: ctx.params.tag });
});

// Projects listing page
page('/projects', () => {
	console.log('Projects route handler called');
	setRoute('/projects-list');
});

// Individual project page
page('/projects/:id', (ctx) => {
	console.log('Project detail route handler called with id:', ctx.params.id);
	setRoute('/project-detail', { id: ctx.params.id });
});

// Add a catch-all route for 404s
page('*', () => {
	console.log('404 route handler called for:', window.location.pathname);
	setRoute('/');
});

// Start the router
console.log('Starting router');
page.start();

export default app;