<script>
	import { overlayState, data, current } from '$lib/stores.js';
	import { addWordtoList } from '$lib/functions.js';

	let word = '';

	function handleKeyPress(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			handleSubmit();
		}
	}

	function handleSubmit() {
		data.update((n) => {
			n = addWordtoList($data, $current.lang, $current.list, word);
			return n;
		});

		overlayState.update((n) => false);
	}
</script>

<div class="board">
	<div class="container">
		<!-- text -->
		<div class="input-container">
			<input
				class="input"
				type="text"
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
		height: 20vh;
		width: 40vw;
		min-width: 300px;
		background-color: #475569;
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
	.input {
		max-width: 60vw;
		font-size: 2rem;
		padding: 1rem 0.75rem;
		border-radius: 1.2rem;
	}
</style>
