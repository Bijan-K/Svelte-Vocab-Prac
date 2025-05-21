<!-- src\routes\stats\components\EditMode\EditWordBox.svelte -->
<script>
	import { fade } from 'svelte/transition';

	import { data, current, overlayState, overlayMode } from '$lib/stores';
	console.log('loaded');

	import { rmWordFromList } from '$lib/utils';

	import { UIIcons } from '$lib/Icons/index.js';

	export let word = { word: 'nothing here :\\', known: false };

	function editHandler() {
		let selectedWord = word.word;

		overlayMode.update((n) => 'newword');

		overlayState.update((n) => !n);

		data.update((n) => {
			n = rmWordFromList($data, $current.lang, $current.list, selectedWord);
			return n;
		});
	}

	function removeHandler() {
		let selectedWord = word.word;

		data.update((n) => {
			n = rmWordFromList($data, $current.lang, $current.list, selectedWord);
			return n;
		});
	}
</script>

<div transition:fade class="wordbox">
	<div class="known">
		{#if word.known}
			<UIIcons icon="check" />
		{:else}
			<UIIcons icon="negative" />
		{/if}
	</div>

	<div class="btn-holder">
		<span on:click={editHandler} class="btn edit"><UIIcons icon="edit" /></span>
		<span on:click={removeHandler} class="btn remove"><UIIcons icon="remove" /></span>
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
	.btn:hover {
		cursor: pointer;
	}

	.edit:active {
		transform: translateY(5%);
	}
	.remove:active {
		transform: translateY(5%);
	}
</style>
