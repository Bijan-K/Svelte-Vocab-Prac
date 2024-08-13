<script>
	import NavBar from '$lib/components/Navbar/NavBar.svelte';
	import Overlay from '$lib/components/Overlays/Overlay.svelte';
	import { overlayState } from '$lib/stores/mode.js';
</script>

<svelte:head>
	<title>Practice</title>
</svelte:head>

{#if overlayState}
	<Overlay />
{/if}

<NavBar />
<slot />
