<script>
	import './styles.css';
	import { page } from "$app/stores"
	import Header from "$lib/components/Header.svelte";
</script>

<div class="app">
	<Header></Header>
	<main>
		<slot />
	</main>

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

</style>
