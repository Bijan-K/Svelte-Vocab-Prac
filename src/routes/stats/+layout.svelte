<!-- src\routes\stats\+layout.svelte -->
<script>
	import NavBar from '$lib/components/Navbar/NavBar.svelte';
	import Overlay from '$lib/components/Overlays/Overlay.svelte';
	import { overlayState } from '$lib/stores';
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

{#if overlayState}
	<Overlay />
{/if}

<NavBar />
<slot />
