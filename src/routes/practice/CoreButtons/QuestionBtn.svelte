<!-- src\routes\practice\CoreButtons\QuestionBtn.svelte -->
<script>
	import { NavigationIcons } from '$lib/Icons/index.js';
	import { current, stats, dictionarySettings } from '$lib/stores';

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
		if ($current.lang.toLowerCase() === 'english') {
			// For English words, use our dictionary API and show the dictionary panel
			dictionarySettings.update((s) => ({
				...s,
				showPanel: true,
				currentWord: $current.word
			}));
		} else {
			// For non-English languages, use Google search as before
			let word = $current.word;
			window
				.open(
					`https://www.google.com/search?q=${returnDefineWord($stats, $current)}+${word}`,
					'_blank'
				)
				.focus();
		}
	}
</script>

<div on:click={clickHandler}>
	<NavigationIcons icon="question" />
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
		color: #f8fafc;
		font-size: 2rem;
		border-radius: 0.5rem;
		transition: all 0.2s;
	}
	div:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}
	div:active {
		transform: translateY(1px);
	}
</style>
