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

page('/blog/:slug', (ctx) => {
	app.$set({ 
		currentRoute: '/blog',
		params: { slug: ctx.params.slug }
	});
});

page('/tags/:tag', (ctx) => {
	app.$set({ 
		currentRoute: '/tags',
		params: { tag: ctx.params.tag }
	});
});

// Start the router
page.start();

export default app;