<!-- src\routes\practice\CoreButtons\WrongBtn.svelte -->
<script>
	import XIcon from '$lib/Icons/XIcon.svelte';

	import {
		addWordtoMistakesList,
		addWordToStatsMistakesList,
		newCurrentList
	} from '$lib/utils/essentialFunctions.js';
	import { selectRandomWord } from '$lib/utils/generalFunctions.js';

	import { data, stats, current } from '$lib/stores/crucial.js';

	function clickHandler() {
		data.update((n) => {
			n = addWordtoMistakesList($data, $current.lang, $current.word);
			return n;
		});

		stats.update((n) => {
			let tmp = n;
			tmp.record.info.incorrect++;
			return tmp;
		});

		stats.update((n) => {
			n = addWordToStatsMistakesList($stats, $current.lang, $current.word);
			return n;
		});

		current.update((n) => {
			let tmp = n;
			tmp.word = selectRandomWord(newCurrentList($data, $current.lang, $current.list)).word;
			return tmp;
		});
	}
</script>

<div on:click={clickHandler}>
	<XIcon />
</div>

<style>
	div {
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		padding: 0.75rem 2rem;
		background: none;
		color: #eee;
		font-size: 2rem;
		border-radius: 0.5rem;
		background-color: rgb(159 18 57);
	}
	div:hover {
		cursor: pointer;
		transform: translateY(-3%);
	}
	div:active {
		transform: translateY(+3%);
	}
</style>
