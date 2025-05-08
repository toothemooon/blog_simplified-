<script>
	import Header from './components/Header.svelte';
	import HomePage from './components/blog/HomePage.svelte';
	import BlogPostPage from './components/blog/BlogPostPage.svelte';
	import BlogListPage from './components/blog/BlogListPage.svelte';
	import TagsPage from './components/blog/TagsPage.svelte';
	import TagPage from './components/blog/TagPage.svelte';
	import ProjectsPage from './components/projects/ProjectsPage.svelte';
	import ProjectDetailPage from './components/projects/ProjectDetailPage.svelte';
	import AboutPage from './components/AboutPage.svelte';
	import NotFoundPage from './components/error/NotFoundPage.svelte';
	import TestTranslation from './components/TestTranslation.svelte';
	import Footer from './components/Footer.svelte';
	import './global.css';
	
	// Props from router
	export let currentRoute = '/';
	export let params = {};

	// $: console.log('[App.svelte] currentRoute:', currentRoute, 'params:', params); // Commented out
</script>

<div class="app">
	<Header {currentRoute} />
	
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
		{:else if currentRoute === '/projects-list'}
			<ProjectsPage />
		{:else if currentRoute === '/project-detail'}
			<ProjectDetailPage slug={params.id} />
		{:else if currentRoute === '/about'}
			<AboutPage />
		{:else if currentRoute === '/test-translation'}
			<TestTranslation />
		{:else if currentRoute === '/not-found'}
			<NotFoundPage />
		{/if}
	</main>

	<Footer />
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
</style>