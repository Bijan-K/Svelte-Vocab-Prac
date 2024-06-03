<script>
	import QuestionIcon from '$lib/Icons/QuestionIcon.svelte';
	import { iframeState } from '$lib/stores.js';

	function clickHandler() {
		iframeState.update((n) => {
			console.log(iframeState);
			return !n;
		});
	}
</script>

<div on:click={clickHandler}>
	<QuestionIcon />
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
