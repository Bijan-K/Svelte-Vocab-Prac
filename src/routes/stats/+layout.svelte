<script>
	import NavBar from '$lib/Navbar/NavBar.svelte';
	import Overlay from '$lib/OverlayComponents/Overlay.svelte';
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

<Overlay />
<NavBar />
<slot />
