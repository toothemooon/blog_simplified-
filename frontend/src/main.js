import App from './App.svelte';
import page from 'page';

const app = new App({
	target: document.body,
	props: {
		currentRoute: '/',
		params: {}
	}
});

// Helper function to set route and scroll to top
function setRoute(route, params = {}) {
	window.scrollTo(0, 0);
	app.$set({ currentRoute: route, params });
}

// Set up routing
page('/', () => {
	setRoute('/');
});

// Blog listing page
page('/blog', () => {
	setRoute('/blog-list');
});

// Individual blog post page
page('/blog/:slug', (ctx) => {
	setRoute('/blog-post', { slug: ctx.params.slug });
});

// Tags page showing all tags
page('/tags', () => {
	setRoute('/tags-list');
});

// Individual tag page showing posts with a specific tag
page('/tags/:tag', (ctx) => {
	setRoute('/tag', { tag: ctx.params.tag });
});

// Projects listing page
page('/projects', () => {
	setRoute('/projects-list');
});

// Individual project page
page('/projects/:id', (ctx) => {
	setRoute('/project-detail', { id: ctx.params.id });
});

// About page
page('/about', () => {
	setRoute('/about');
});

// Add a catch-all route for 404s
page('*', () => {
	setRoute('/not-found');
});

// Start the router
page.start();

export default app;