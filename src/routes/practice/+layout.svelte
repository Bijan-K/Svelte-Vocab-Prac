<script>
	import NavBar from '$lib/Navbar/NavBar.svelte';
	import { current, data, stats } from '$lib/stores.js';

	$: console.log('------- Data update -------- \n', $data, $current, $stats);
</script>

<svelte:head>
	<title>Practice</title>
</svelte:head>

<NavBar />
<slot />
