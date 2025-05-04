<script>
	import Header from './lib/components/Header.svelte';
	import './global.css';
</script>

<div class="app">
	<Header />
	
	<main class="container main-content">
		<h1>Welcome to SvelteBlog</h1>
		<p>A modern blog built with Svelte 4 and vanilla CSS</p>
		
		<!-- This will be replaced with router content when we implement routing -->
		<div class="placeholder-content">
			<h2>Coming Soon</h2>
			<p>Blog posts, tags, projects, and more!</p>
		</div>
	</main>
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
		text-align: center;
	}
	
	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}
	
	.placeholder-content {
		margin-top: 4rem;
		padding: 2rem;
		background-color: var(--color-border);
		border-radius: 0.5rem;
	}
</style>