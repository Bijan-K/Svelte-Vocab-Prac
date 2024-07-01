<script>
	import { data, current } from '$lib/stores.js';
	import { returnWordsInList } from '$lib/functions.js';

	import WordBox from './WordBox.svelte';

	$: wordsArray = returnWordsInList($data, $current.lang, $current.list);

	$: console.log(wordsArray);
	$: console.log($current.lang);
	$: console.log($current.list);
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
