<script>
	import NavBarMin from '../../lib/NavBarMin.svelte';
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

<main>
	<NavBarMin />
	<slot />
</main>

<style>
	main {
		height: 100%;
	}
</style>
