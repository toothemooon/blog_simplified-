<script>
	import Header from './components/Header.svelte';
	import HomePage from './components/blog/HomePage.svelte';
	import './global.css';
</script>

<div class="app">
	<Header />
	
	<main class="container main-content">
		<HomePage />
	</main>

	<!-- Simple footer - will be implemented properly later -->
	<footer class="footer">
		<div class="container">
			<p>&copy; {new Date().getFullYear()} • SvelteBlog • Built with Svelte 4 and vanilla CSS</p>
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