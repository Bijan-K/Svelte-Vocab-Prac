<script>
	import { overlayState, overlayMode } from '$lib/stores.js';
	import SelectBoard from './SelectBoard.svelte';
	import QuestionBoard from './QuestionBoard.svelte';

	function clickHandler() {
		overlayState.update((n) => !n);
	}
	// export let overlay_state = false;
</script>

{#if $overlayState}
	<div class="overlay">
		<div class="overlay-toggle" on:click={clickHandler}></div>
		{#if $overlayMode == 'select'}
			<SelectBoard />
		{:else}
			<QuestionBoard />
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
