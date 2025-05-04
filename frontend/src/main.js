import App from './App.svelte';
import page from 'page';

const app = new App({
	target: document.body,
	props: {
		currentRoute: '/',
		params: {}
	}
});

// Set up routing
page('/', () => {
	app.$set({ currentRoute: '/', params: {} });
});

// Blog listing page
page('/blog', () => {
	app.$set({ currentRoute: '/blog-list', params: {} });
});

// Individual blog post page
page('/blog/:slug', (ctx) => {
	app.$set({ 
		currentRoute: '/blog-post',
		params: { slug: ctx.params.slug }
	});
});

// Tags page showing all tags
page('/tags', () => {
	app.$set({ currentRoute: '/tags-list', params: {} });
});

// Individual tag page showing posts with a specific tag
page('/tags/:tag', (ctx) => {
	app.$set({ 
		currentRoute: '/tag',
		params: { tag: ctx.params.tag }
	});
});

// Start the router
page.start();

export default app;