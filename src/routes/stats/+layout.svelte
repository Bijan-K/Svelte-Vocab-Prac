<script>
	import NavBar from '../../lib/NavBar.svelte';
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

<main>
	<NavBar />
	<slot />
</main>

<style>
	main {
		height: 100%;
	}
</style>
