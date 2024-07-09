<script>
	import { onMount } from 'svelte';
	import { data, current, overlayMode, overlayState } from '$lib/stores.js';
	import { returnWordsInList } from '$lib/functions.js';

	import WordBox from './WordBox.svelte';

	function handleKeydown(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			console.log('here');
			overlayMode.update((n) => 'newword');
			overlayState.update((n) => true);
			console.log($overlayMode);
			console.log($overlayState);
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
	});

	$: wordsArray = returnWordsInList($data, $current.lang, $current.list);
</script>

<div class="edit-container">
	{#each wordsArray as word}
		<WordBox {word} />
	{/each}
</div>

<style>
	.edit-container {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		padding: 0.5rem 2rem;
		gap: 2.5rem;
	}
</style>
