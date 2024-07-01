<script>
	import EditIcon from '$lib/Icons/EditIcon.svelte';
	import RemoveIcon from '$lib/Icons/RemoveIcon.svelte';

	export let word = '';

	function editHandler() {
		//
	}

	function removeHandler() {
		//
	}
</script>

<div class="wordbox">
	<div class="btn-holder">
		<span on:click={editHandler} class="btn"><EditIcon /></span>
		<span on:click={removeHandler} class="btn"><RemoveIcon /></span>
	</div>

	<span class="word">{word.word}</span>
</div>

<style>
	.wordbox {
		padding: 1.5rem;
		border-bottom: 1px solid #eee;
		border-left: 1px solid #eee;

		display: flex;
		justify-content: center;
		align-items: center;

		min-width: 100px;
		min-height: 80px;

		position: relative;

		box-shadow: -2px 1px 2px 2px #11111126;
	}

	.btn-holder {
		position: absolute;
		top: 5px;
		right: 5px;

		display: flex;
		gap: 10px;
	}
</style>
