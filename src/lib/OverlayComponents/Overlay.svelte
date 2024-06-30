<script>
	import { overlayState, overlayMode } from '$lib/stores.js';
	import SelectListBoard from './SelectListBoard.svelte';
	import SelectLangBoard from './SelectLangBoard.svelte';
	import ConformationBoard from './ConformationBoard.svelte';
	import InputBoard from './InputBoard.svelte';

	function clickHandler() {
		overlayState.update((n) => !n);
	}
	// export let overlay_state = false;
</script>

{#if $overlayState}
	<div class="overlay">
		<div class="overlay-toggle" on:click={clickHandler}></div>
		{#if $overlayMode == 'selectlist'}
			<SelectListBoard />
		{:else if $overlayMode == 'selectlang'}
			<SelectLangBoard />
		{:else if $overlayMode == 'conformation'}
			<ConformationBoard />
		{:else if $overlayMode == 'newword'}
			<InputBoard />
		{/if}
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		height: 100vh;
		width: 100vw;
		z-index: 900;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.overlay-toggle {
		position: fixed;
		height: 100vh;
		width: 100vw;
		background-color: hsla(0, 0%, 0%, 0.25);
	}
</style>
