<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { overlayState, data, stats } from '$lib/stores.js';

	function closeHandler() {
		overlayState.update((n) => !n);
	}

	function resetConformHandler() {
		data.set([
			{
				lang: 'english',
				lists: [
					{
						name: 'mistakes',
						words: []
					}
				]
			}
		]);
		stats.set({
			record: {
				date_list: [],
				t_date: new Date(),
				info: {
					incorrect: 0,
					correct: 0
				}
			},
			streak: 0,
			mistake_lang: [
				{
					lang: 'english',
					defineKeyword: 'define',
					mistakes: []
				}
			]
		});
	}
</script>

<div class="board">
	<div class="container">
		<!-- close btn -->
		<div on:click={closeHandler} class="close-btn">
			<XIcon />
		</div>

		<h3>Are you sure?</h3>
		<div class="btn-container">
			<button class="conform" on:click={resetConformHandler}>Yes </button>
			<button class="reject" on:click={closeHandler}>No </button>
		</div>
	</div>
</div>

<style>
	.board {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 8rem;
		width: 50%;
		background-color: #475569;
		border-radius: 2rem;
	}
	.container {
		position: relative;
		height: 100%;
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	h3 {
		font-size: 2rem;
		text-align: center;
	}
	.btn-container {
		display: flex;
		gap: 2rem;
	}

	.conform {
		font-size: larger;
		padding: 0.5rem 2rem;
		background-color: #05986eac;
		color: #ecfdf5;
		border-radius: 1rem;
	}
	.reject {
		font-size: larger;

		padding: 0.5rem 2rem;
		color: #ecfdf5;
		background-color: #ca154894;
		border-radius: 1rem;
	}

	.close-btn {
		position: absolute;
		font-size: 1.5rem;
		top: 0.8rem;
		right: 1rem;
		cursor: pointer;
	}
</style>
