<script>
	import CorrectBtn from '../../lib/CoreButtons/CorrectBtn.svelte';
	import WrongBtn from '../../lib/CoreButtons/WrongBtn.svelte';
	import QuestionBtn from '../../lib/CoreButtons/QuestionBtn.svelte';
	import { fade, fly } from 'svelte/transition';
	import { current, stats } from '$lib/stores.js';
	import { onMount } from 'svelte';

	import { getCurrentDate, capitalizeWord, returnSingleWord } from '$lib/functions.js';

	// Initial animation
	let display = false;
	onMount(() => {
		display = true;
	});

	let mode = 'test';
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
