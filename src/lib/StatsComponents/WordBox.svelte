<script>
	import { data, current, overlayMode, overlayState } from '$lib/stores.js';
	import { removeWordfromList } from '$lib/functions.js';

	import EditIcon from '$lib/Icons/EditIcon.svelte';
	import RemoveIcon from '$lib/Icons/RemoveIcon.svelte';
	import NegativeIcon from '$lib/Icons/NegativeIcon.svelte';
	import CheckIcon from '$lib/Icons/CheckIcon.svelte';

	export let word = { word: 'nothing here :\\', known: false };

	function editHandler() {
		let selectedWord = word.word;

		data.update((n) => {
			n = removeWordfromList($data, $current.lang, $current.list, selectedWord);
			return n;
		});

		overlayMode.update((n) => 'newword');

		overlayState.update((n) => !n);
	}

	function removeHandler() {
		console.log('impor', word.word);
		let selectedWord = word.word;

		data.update((n) => {
			n = removeWordfromList($data, $current.lang, $current.list, selectedWord);
			console.log(n);
			return n;
		});
	}
</script>

<div class="wordbox">
	<div class="known">
		{#if word.known}
			<CheckIcon />
		{:else}
			<NegativeIcon />
		{/if}
	</div>

	<div class="btn-holder">
		<span on:click={editHandler} class="btn edit"><EditIcon /></span>
		<span on:click={removeHandler} class="btn remove"><RemoveIcon /></span>
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
	.known {
		position: absolute;
		top: 5px;
		left: 5px;
	}

	.edit:active {
		transform: translateY(5%);
	}
	.remove:active {
		transform: translateY(5%);
	}
</style>
