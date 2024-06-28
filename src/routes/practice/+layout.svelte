<script>
	import NavBar from '$lib/Navbar/NavBar.svelte';
	import Overlay from '$lib/OverlayComponents/Overlay.svelte';
	import { current, data, stats } from '$lib/stores.js';
</script>

<svelte:head>
	<title>Practice</title>
</svelte:head>

<Overlay />
<NavBar />
<slot />
