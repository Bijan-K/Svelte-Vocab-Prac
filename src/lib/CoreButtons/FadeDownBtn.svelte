<script>
	import FadeDownIcon from '$lib/Icons/FadeDownIcon.svelte';
	import { iframeState } from '$lib/stores.js';

	function clickHandler() {
		iframeState.update((n) => !n);
	}
</script>

<div on:click={clickHandler}>
	<FadeDownIcon />
</div>

<style>
	div {
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		padding: 0.5rem 1rem;

		background: none;
		color: #eee;
		font-size: 2rem;
		border-radius: 0.5rem;
	}
	div:hover {
		cursor: pointer;
		border-bottom: #eee 2px solid;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
