<script>
	import CorrectBtn from '../../lib/CoreButtons/CorrectBtn.svelte';
	import WrongBtn from '../../lib/CoreButtons/WrongBtn.svelte';
	import QuestionBtn from '../../lib/CoreButtons/QuestionBtn.svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import {
		changeWordKnownToCorrect,
		addWordtoMistakesList,
		updateStatsMistakesList,
		selectRandomWord,
		newCurrentWordList
	} from '$lib/functions.js';
	import { current, data, stats } from '$lib/stores.js';

	// Initial animation
	let display = false;
	let mode = 'test';

	function handleUp() {
		let word = $current.word;
		window.open(`https://www.google.com/search?q=define+${word}`, '_blank').focus();
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
		{#if mode == 'test'}
			<div class="text">
				{$current.word == '' || $current.word == undefined ? 'No words in the list' : $current.word}
			</div>
		{:else if mode == 'add'}
			<input class="input" type="text" placeholder="Type the word you want to add" />
		{/if}
	</div>

	<div in:fade={{ y: 20, duration: 200 }} class="core-btn">
		<WrongBtn />
		<QuestionBtn />
		<CorrectBtn />
	</div>
{/if}

<style>
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

	.input {
		border: none;
		padding: 0.5rem;
		background: transparent;
		border-left: 1px #eee solid;
		border-bottom: 1px #eee solid;
	}
</style>
