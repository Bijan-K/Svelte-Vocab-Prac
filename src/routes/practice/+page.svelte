<!-- src\routes\practice\+page.svelte -->
<script>
	import CorrectBtn from './CoreButtons/CorrectBtn.svelte';
	import WrongBtn from './CoreButtons/WrongBtn.svelte';
	import QuestionBtn from './CoreButtons/QuestionBtn.svelte';
	import Typewriter from './Typewriter.svelte';
	import DictionaryPanel from './DictionaryPanel.svelte';
	import PracticeHeader from './PracticeHeader.svelte';

	import { fade, fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { data, current, stats, pracMode, dictionarySettings } from '$lib/stores';

	import {
		addWordtoList,
		changeWordKnownToCorrect,
		newCurrentList,
		addWordToStatsMistakesList,
		addWordtoMistakesList,
		capitalizeWord,
		selectRandomWord,
		returnSingleWord
	} from '$lib/utils';

	// Initial animation
	let display = false;
	let input = '';
	$: remaining = newCurrentList($data, $current.lang, $current.list);

	// For question button
	function returnDefineKeyWord(stats, current) {
		let index = stats.mistake_lang.findIndex(
			(element) => element.lang.toLowerCase() == current.lang
		);
		if (index != -1) {
			return stats.mistake_lang[index].defineKeyword;
		}
		return 'define';
	}

	function handleKeydown(event) {
		// Keyboard functions
		function handleUp() {
			let word = $current.word;
			if ($current.lang.toLowerCase() === 'english') {
				dictionarySettings.update((s) => ({
					...s,
					showPanel: true,
					currentWord: word
				}));
			} else {
				window
					.open(
						`https://www.google.com/search?q=${returnDefineKeyWord($stats, $current)}+${word}`,
						'_blank'
					)
					.focus();
			}
		}

		function handleLeft() {
			if (input === '' && $pracMode === 'lexicon') return;
			if ($current.word === '') return;

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

		function handleRight() {
			if (input === '' && $pracMode === 'lexicon') return;
			if ($current.word === '') return;

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

		switch (event.key) {
			case 'ArrowUp':
				handleUp();
				break;
			case 'ArrowLeft':
				handleLeft();
				break;
			case 'ArrowRight':
				handleRight();
				break;
		}
	}

	// For adding a new word
	// Lexicon mode Word adder
	function addWord() {
		if (input === '') return;

		data.update((n) => {
			n = addWordtoList($data, $current.lang, $current.list, input);
			return n;
		});

		if ($current.list === 'mistakes') {
			stats.update((n) => {
				n = addWordToStatsMistakesList($stats, $current.lang, input);
				return n;
			});
		}

		current.update((n) => {
			let tmp = n;
			tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));
			return tmp;
		});
		input = '';
	}

	function handleKeyPress(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			addWord();
		}
	}

	onMount(() => {
		display = true;
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	// Updating Stats
	$: {
		$current;
		$stats;
		returnDefineKeyWord($stats, $current);
	}
</script>

<svelte:head>
	<title>Practice | {capitalizeWord($current.lang)} - {capitalizeWord($current.list)}</title>
</svelte:head>

<DictionaryPanel word={$dictionarySettings.currentWord} bind:show={$dictionarySettings.showPanel} />

{#if display}
	<div in:fade={{ duration: 300 }}>
		<PracticeHeader />

		<div class="practice-container">
			{#if $pracMode === 'normal'}
				<div in:fade={{ duration: 300 }} class="text">
					{#if $current.word === '' || $current.word === undefined}
						<div class="no-word">No words found</div>
					{:else}
						<div class="middle">
							<Typewriter text={capitalizeWord($current.word)} />
						</div>
					{/if}
				</div>
			{:else if $pracMode === 'lexicon'}
				<div class="lexicon-container" in:fly={{ y: 20, duration: 300 }}>
					<div class="lexicon-header">
						<h2>Add new words to your vocabulary</h2>
						<p>
							Type a word and press Enter or click Add to save it to your {capitalizeWord(
								$current.list
							)} list
						</p>
					</div>

					<div class="input-container">
						<input
							class="input"
							type="text"
							bind:value={input}
							on:keydown={handleKeyPress}
							placeholder="Type a new word..."
						/>
						<button class="add-button" on:click={addWord} disabled={!input}> Add </button>
					</div>
				</div>
			{/if}
		</div>

		{#if $pracMode === 'normal'}
			<div class="control-container">
				<div in:fade={{ duration: 300 }} class="core-btn">
					<WrongBtn />
					<QuestionBtn />
					<CorrectBtn />
				</div>

				<div class="shortcuts-hint" in:fade={{ duration: 300, delay: 500 }}>
					<span class="hint-text">
						<kbd>←</kbd> Unknown
						<kbd>↑</kbd> Define
						<kbd>→</kbd> Known
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.practice-container {
		height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.text {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.middle {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
		justify-content: center;
		min-height: 120px;
	}

	.no-word {
		color: var(--text-muted);
		font-size: 1.5rem;
		font-style: italic;
	}

	.control-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 2rem;
		gap: 1rem;
	}

	.core-btn {
		background-color: var(--bg-medium);
		border-radius: 12px;
		padding: 1rem 2rem;
		display: flex;
		gap: 1.5rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	.shortcuts-hint {
		font-size: 0.85rem;
		color: var(--text-muted);
		background-color: rgba(30, 41, 59, 0.7);
		backdrop-filter: blur(8px);
		padding: 0.5rem 1rem;
		border-radius: 20px;
	}

	.hint-text {
		display: flex;
		gap: 1rem;
	}

	kbd {
		background-color: var(--bg-light);
		padding: 0.1rem 0.3rem;
		border-radius: 4px;
		font-family: monospace;
		margin-right: 0.25rem;
	}

	.lexicon-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		width: 100%;
		max-width: 600px;
		text-align: center;
	}

	.lexicon-header h2 {
		margin-bottom: 0.75rem;
		color: var(--text-primary);
		font-size: 1.75rem;
	}

	.lexicon-header p {
		color: var(--text-muted);
	}

	.input-container {
		display: flex;
		width: 100%;
		gap: 0.5rem;
	}

	.input {
		flex: 1;
		color: var(--text-primary);
		border: none;
		font-size: 1.2rem;
		padding: 1rem 1.5rem;
		background: rgba(30, 41, 59, 0.8);
		border: 1px solid var(--border-light);
		border-radius: 8px;
		transition: all 0.2s;
	}

	.input:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
	}

	.add-button {
		background-color: var(--primary);
		color: white;
		border: none;
		padding: 0 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		transition: all 0.2s;
	}

	.add-button:hover:not(:disabled) {
		background-color: var(--primary-dark);
	}

	.add-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 700px) {
		.input {
			font-size: 1rem;
			padding: 0.75rem 1rem;
		}

		.core-btn {
			padding: 0.75rem 1.25rem;
			gap: 1rem;
		}

		.shortcuts-hint {
			display: none;
		}

		.lexicon-header h2 {
			font-size: 1.4rem;
		}

		.lexicon-header p {
			font-size: 0.9rem;
		}
	}
</style>
