<script>
	import CorrectBtn from '../../lib/CoreButtons/CorrectBtn.svelte';
	import WrongBtn from '../../lib/CoreButtons/WrongBtn.svelte';
	import QuestionBtn from '../../lib/CoreButtons/QuestionBtn.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { current } from '$lib/stores.js';
	import { capitalizeWord, returnSingleWord } from '$lib/functions.js';

	let mode = 'test';
</script>

<div class="practice-container">
	{#if mode == 'test'}
		<div class="text">
			{$current.word == '' || $current.word == undefined ? 'No words in the list' : $current.word}
		</div>
	{:else if mode == 'add'}
		<input type="text" />
	{/if}

	<!-- <FadeDownBtn /> -->

	<div class="core-btn">
		<WrongBtn />
		<QuestionBtn />
		<CorrectBtn />
	</div>
</div>

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
		background-color: #0f172a;
		border-radius: 0.5rem;
		padding: 2rem 3rem;
		display: flex;
		gap: 0.5rem;
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
</style>
