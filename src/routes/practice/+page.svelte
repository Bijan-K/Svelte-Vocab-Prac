<script>
	import CorrectBtn from '../../lib/CoreButtons/CorrectBtn.svelte';
	import WrongBtn from '../../lib/CoreButtons/WrongBtn.svelte';
	import QuestionBtn from '../../lib/CoreButtons/QuestionBtn.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	import {
		changeWordKnownToCorrect,
		addWordtoMistakesList,
		updateStatsMistakesList,
		selectRandomWord,
		newCurrentWordList,
		addWordtoList
	} from '$lib/functions.js';
	import { current, data, stats, pracMode } from '$lib/stores.js';
	import Typewriter from '../../lib/Typewriter.svelte';

	// Initial animation
	let display = false;
	let input = '';
	$: remaining = newCurrentWordList($data, $current.lang, $current.list);

	function returnDefineWord(stats, current) {
		let index = stats.mistake_lang.findIndex((element) => element.lang == current.lang);

		if (index != -1) {
			return stats.mistake_lang[index].defineKeyword;
		}

		return 'define';
	}

	//

	$: {
		$stats;
		returnDefineWord($stats, $current);
	}

	function handleUp() {
		let word = $current.word;
		window
			.open(
				`https://www.google.com/search?q=${returnDefineWord($stats, $current)}+${word}`,
				'_blank'
			)
			.focus();
	}
	function handleLeft() {
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
			n = updateStatsMistakesList($stats, $current.lang, $current.word);
			return n;
		});

		current.update((n) => {
			let tmp = n;
			tmp.word = selectRandomWord(newCurrentWordList($data, $current.lang, $current.list)).word;
			return tmp;
		});
	}
	function handleRight() {
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
			tmp.word = selectRandomWord(newCurrentWordList($data, $current.lang, $current.list)).word;
			return tmp;
		});
	}

	function handleKeydown(event) {
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

	function handleKeyPress(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			data.update((n) => {
				n = addWordtoList($data, $current.lang, $current.list, input);
				return n;
			});

			input = '';
		}
	}
	function addWord() {
		data.update((n) => {
			n = addWordtoList($data, $current.lang, $current.list, input);
			return n;
		});

		input = '';
	}

	onMount(() => {
		display = true;

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="practice-container">
		{#if $pracMode == 'normal'}
			<div in:fade={{ duration: 200 }} class="text">
				{#if $current.word == '' || $current.word == undefined}
					<div>Empty List</div>
				{:else}
					<!-- {$current.word} -->
					<div class="middle">
						<Typewriter text={$current.word} />
						<span> Remaining : {remaining.length != 0 ? remaining.length : 'None'}</span>
					</div>
				{/if}
			</div>
		{:else if $pracMode == 'lexicon'}
			<input
				in:slide={{ duration: 200 }}
				class="input"
				type="text"
				bind:value={input}
				on:keydown={handleKeyPress}
				placeholder="Type the word you want to add"
			/>
		{/if}
	</div>

	<div in:fade={{ y: 20, duration: 200 }} class="core-btn">
		{#if $pracMode == 'normal'}
			<WrongBtn />
			<QuestionBtn />
			<CorrectBtn />
		{:else if $pracMode == 'lexicon'}
			<div class="lexicon-btns">
				<button on:click={addWord} class="btn-lex">Add</button>
				<div class="info">
					<span> Or press enter </span>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.middle {
		transform: translateY(10%);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
		justify-content: center;
		min-height: 100px;
	}
	.middle span {
		font-size: 1rem;
		position: absolute;
		width: 500px;
		bottom: -50%;
		text-align: center;
	}

	.practice-container {
		height: 100%;
		align-items: center;
		justify-content: center;
		display: flex;
		gap: 5rem;
		flex-direction: column;
		flex: 2fr 1fr;
	}
	.text {
		transform: translateY(-100%);
		font-size: 5rem;
	}

	@media (max-width: 700px) {
		.text {
			transform: translateY(-150%);
			font-size: 5rem;
		}
	}

	.core-btn {
		position: fixed;
		bottom: 12%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #0f172a;
		border-radius: 0.5rem;
		padding: 2rem 3rem;
		display: flex;
		gap: 0.5rem;
	}

	@media (max-width: 600px) {
		.core-btn {
			padding: 1rem 1.5rem;
		}
	}

	.input {
		transform: translateY(-100%);
		color: #ecfdf5;
		border: none;
		font-size: 3rem;
		width: 60%;
		padding: 2.5rem 2rem;
		background: transparent;
		border-bottom: 1px #eee solid;
		border-radius: 1rem;
	}

	.lexicon-btns {
		display: grid;
		grid-template-rows: 2fr 1fr;
	}
	.info {
		place-self: center;
		font-size: 0.5rem;
		display: flex;
		align-items: center;

		gap: 10px;
	}
	.info span {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
	}

	.btn-lex {
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
		background-color: rgb(9, 120, 90);
	}
	.btn-lex:hover {
		cursor: pointer;
	}
	.btn-lex:active {
		transform: translateY(+10%);
	}
</style>
