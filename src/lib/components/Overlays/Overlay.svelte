<script>
	import { overlayState, overlayMode } from '$lib/stores/mode.js';
	import NewLangBoard from './NewLang/NewLangBoard.svelte';
	import NewListBoard from './NewList/NewListBoard.svelte';
	import ConformationBoard from './ConformationBoard.svelte';
	import NewWordInputBoard from './NewWordInputBoard.svelte';

	function clickHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => false);
	}
</script>

{#if $overlayState}
	<div class="overlay">
		<div class="overlay-toggle" on:click={clickHandler}></div>
		{#if $overlayMode == 'selectlist'}
			<NewListBoard />
		{:else if $overlayMode == 'selectlang'}
			<NewLangBoard />
		{:else if $overlayMode == 'conformation'}
			<ConformationBoard />
		{:else if $overlayMode == 'newword'}
			<!-- this bastard -->
			{#if $overlayState}
				<NewWordInputBoard />
			{/if}
		{/if}
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		height: 100dvh;
		width: 100vw;
		z-index: 900;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.overlay-toggle {
		position: fixed;
		height: 100dvh;
		width: 100vw;
		background-color: hsla(0, 0%, 0%, 0.441);
	}
</style>
