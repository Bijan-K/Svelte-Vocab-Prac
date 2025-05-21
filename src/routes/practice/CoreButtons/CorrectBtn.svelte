<!-- src\routes\practice\CoreButtons\CorrectBtn.svelte -->
<script>
	import TickIcon from '$lib/Icons/TickIcon.svelte';

	import { current, data, stats } from '$lib/stores/crucial.js';

	import { changeWordKnownToCorrect, newCurrentList } from '$lib/utils/essentialFunctions.js';
	import { selectRandomWord } from '$lib/utils/generalFunctions.js';

	function clickHandler() {
		data.update((n) => {
			n = changeWordKnownToCorrect($data, $current.lang, $current.list, $current.word);
			return n;
		});

		stats.update((n) => {
			let tmp = n;
			tmp.record.info.correct++;
			return tmp;
		});

		current.update((n) => {
			let tmp = n;
			tmp.word = selectRandomWord(newCurrentList($data, $current.lang, $current.list)).word;
			return tmp;
		});
	}
</script>

<div on:click={clickHandler}>
	<TickIcon />
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
		background-color: #064e3b;
	}
	div:hover {
		cursor: pointer;
		transform: translateY(-3%);
	}
	div:active {
		transform: translateY(+3%);
	}
</style>
