<script>
	import Header from './components/Header.svelte';
	import HomePage from './components/blog/HomePage.svelte';
	import BlogPostPage from './components/blog/BlogPostPage.svelte';
	import BlogListPage from './components/blog/BlogListPage.svelte';
	import TagsPage from './components/blog/TagsPage.svelte';
	import TagPage from './components/blog/TagPage.svelte';
	import './global.css';
	
	// Props from router
	export let currentRoute = '/';
	export let params = {};
</script>

<div class="app">
	<Header />
	
	<main class="container main-content">
		{#if currentRoute === '/'}
			<HomePage />
		{:else if currentRoute === '/blog-list'}
			<BlogListPage />
		{:else if currentRoute === '/blog-post'}
			<BlogPostPage slug={params.slug} />
		{:else if currentRoute === '/tags-list'}
			<TagsPage />
		{:else if currentRoute === '/tag'}
			<TagPage tag={params.tag} />
		{/if}
	</main>

	<!-- Simple footer - will be implemented properly later -->
	<footer class="footer">
		<div class="container">
			<p>&copy; {new Date().getFullYear()} • MyBlog • Built by サラダ</p>
		</div>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	
	.main-content {
		flex: 1;
		padding: 2rem 0;
	}
	
	.footer {
		padding: 1.5rem 0;
		text-align: center;
		border-top: 1px solid var(--color-border);
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.7;
	}
</style>