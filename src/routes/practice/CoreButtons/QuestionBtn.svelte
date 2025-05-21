<!-- src\routes\practice\CoreButtons\QuestionBtn.svelte -->
<script>
	import QuestionIcon from '$lib/Icons/QuestionIcon.svelte';
	import { current, stats } from '$lib/stores/crucial.js';

	function returnDefineWord(stats, current) {
		let index = stats.mistake_lang.findIndex(
			(element) => element.lang.toLowerCase() == current.lang
		);

		if (index != -1) {
			return stats.mistake_lang[index].defineKeyword;
		}

		return 'define';
	}

	$: {
		$stats;
		returnDefineWord($stats, $current);
	}

	function clickHandler() {
		let word = $current.word;
		window
			.open(
				`https://www.google.com/search?q=${returnDefineWord($stats, $current)}+${word}`,
				'_blank'
			)
			.focus();
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
		transform: translateY(+3%);
	}
</style>
