<!-- src\routes\practice\+page.svelte -->
<script>
	import CorrectBtn from './CoreButtons/CorrectBtn.svelte';
	import WrongBtn from './CoreButtons/WrongBtn.svelte';
	import QuestionBtn from './CoreButtons/QuestionBtn.svelte';
	import Typewriter from './Typewriter.svelte';
	import DictionaryPanel from './DictionaryPanel.svelte';

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
			if (input == '') return;
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
			if (input == '') return;

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
		if (input == '') return;

		data.update((n) => {
			n = addWordtoList($data, $current.lang, $current.list, input);
			return n;
		});

		if ($current.list == 'mistakes') {
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
	<div in:fly={{ y: 20, duration: 200 }} class="practice-container">
		<div class="practice-header">
			<div class="word-info">
				<span class="language">{capitalizeWord($current.lang)}</span>
				<span class="list-name">{capitalizeWord($current.list)}</span>
			</div>
			<div class="word-count">
				Remaining: <span class="count">{remaining.length || 'None'}</span>
			</div>
		</div>

		{#if $pracMode == 'normal'}
			<div in:fade={{ duration: 200 }} class="text">
				{#if $current.word == '' || $current.word == undefined}
					<div class="no-word">No words found</div>
				{:else}
					<div class="middle">
						<Typewriter text={capitalizeWord($current.word)} />
					</div>
				{/if}
			</div>
		{:else if $pracMode == 'lexicon'}
			<div class="lexicon-container">
				<input
					in:slide={{ duration: 200 }}
					class="input"
					type="text"
					bind:value={input}
					on:keydown={handleKeyPress}
					placeholder="Type the word you want to add"
				/>
				<p class="lexicon-hint">Press Enter or click Add after typing a word</p>
			</div>
		{/if}
	</div>

	<div class="control-container">
		<div in:fade={{ y: 20, duration: 200 }} class="core-btn">
			{#if $pracMode == 'normal'}
				<WrongBtn />
				<QuestionBtn />
				<CorrectBtn />
			{:else if $pracMode == 'lexicon'}
				<div class="lexicon-btns">
					<button on:click={addWord} class="btn-lex">Add</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.practice-container {
		height: 70vh;
		display: flex;
		gap: 1rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.practice-header {
		position: absolute;
		top: 80px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		color: #94a3b8;
	}

	.word-info {
		display: flex;
		align-items: center;
	}

	.language {
		font-weight: 600;
		color: #0ea5e9;
	}

	.list-name {
		margin-left: 0.5rem;
		padding-left: 0.5rem;
		border-left: 1px solid #475569;
	}

	.word-count {
		font-size: 0.9rem;
	}

	.count {
		font-weight: 600;
		background: #1e293b;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
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
		color: #94a3b8;
		font-size: 1.5rem;
		font-style: italic;
	}

	.control-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		padding-bottom: 2rem;
	}

	.core-btn {
		background-color: #1e293b;
		border-radius: 12px;
		padding: 1rem 2rem;
		display: flex;
		gap: 1.5rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	.lexicon-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 500px;
	}

	.input {
		color: #f8fafc;
		border: none;
		font-size: 1.5rem;
		width: 100%;
		padding: 1rem 1.5rem;
		background: rgba(30, 41, 59, 0.8);
		border: 1px solid #475569;
		border-radius: 8px;
		transition: all 0.2s;
	}

	.input:focus {
		outline: none;
		border-color: #0ea5e9;
		box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
	}

	.lexicon-hint {
		color: #94a3b8;
		font-size: 0.9rem;
	}

	.lexicon-btns {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-lex {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		padding: 0.75rem 2rem;
		background: #0ea5e9;
		color: #f8fafc;
		font-size: 1.25rem;
		font-weight: 500;
		border-radius: 8px;
		transition: all 0.2s;
	}

	.btn-lex:hover {
		background: #0284c7;
		cursor: pointer;
		transform: translateY(-2px);
	}

	.btn-lex:active {
		transform: translateY(1px);
	}

	@media (max-width: 700px) {
		.practice-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.input {
			width: 90%;
			font-size: 1.2rem;
			padding: 0.75rem 1rem;
		}

		.core-btn {
			padding: 0.75rem 1.25rem;
			gap: 1rem;
		}
	}
</style>
