<script>
	import NavBar from '$lib/Navbar/NavBar.svelte';
	import { data, current } from '$lib/stores.js';
	import { returnLists, capitalizeWord } from '$lib/functions.js';
</script>

<svelte:head>
	<title>Practice</title>
</svelte:head>

<NavBar />
<slot />
