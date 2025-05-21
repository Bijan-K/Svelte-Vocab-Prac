<!-- src\routes\stats\components\EditMode\EditContainer.svelte -->
<script>
	import { data, current } from '$lib/stores/crucial.js';

	import { returnWordsInList } from '$lib/utils/initFunctions.js';

	import EditWordBox from './EditWordBox.svelte';

	$: wordsArray = returnWordsInList($data, $current.lang, $current.list);
</script>

<div class="edit-container">
	{#each wordsArray as word}
		<EditWordBox {word} />
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

	@media (max-width: 600px) {
		.edit-container {
			grid-template-columns: 1fr;
		}
	}
</style>
