<script>
	import { data, current, stats } from '$lib/stores/crucial.js';
	import { overlayState, overlayMode } from '$lib/stores/mode.js';
	import { addWordtoList } from '$lib/utils/essentialFunctions.js';
	import { onDestroy, onMount } from 'svelte';

	let word = '';
	let inputElement;

	function handleKeyPress(event) {
		if (word == '' || overlayState == false) return;

		if (event.key === 'Enter' || event.keyCode === 13) {
			handleSubmit();
		}
	}

	function handleSubmit() {
		data.update((n) => {
			n = addWordtoList($data, $current.lang, $current.list, word);
			return n;
		});
		if ($current.list == 'mistakes') {
			stats.update((n) => {
				n = addWordToStatsMistakesList($stats, $current.lang, word);
			});
		}

		word = '';
	}

	onMount(() => {
		inputElement.focus();
	});
</script>

<div class="board">
	<div class="container">
		<!-- text -->
		<div class="input-container">
			<input
				bind:this={inputElement}
				class="input"
				id="newword"
				type="text"
				name="newword"
				bind:value={word}
				placeholder="The new word"
				on:keydown={handleKeyPress}
			/>
		</div>
	</div>
</div>

<style>
	.board {
		border-radius: 2rem;
		height: 20dvh;
		width: 40vw;
		min-width: 300px;
		z-index: 901;
	}
	.container {
		position: relative;
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.input-container {
		background-color: #475569;
		padding: 2rem 2rem;
		border-radius: 2rem;
	}
	.input {
		max-width: 60vw;
		font-size: 2rem;
		padding: 1rem 0.75rem;
		border-radius: 1.2rem;
	}
</style>
