<!-- src\routes\practice\CoreButtons\WrongBtn.svelte -->
<script>
	import {
		newCurrentList,
		addWordToStatsMistakesList,
		addWordtoMistakesList,
		selectRandomWord
	} from '$lib/utils';

	import { data, current, stats } from '$lib/stores';

	function clickHandler() {
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
</script>

<button on:click={clickHandler} class="wrong-btn" aria-label="Mark as unknown">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
</button>

<style>
	.wrong-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(239, 68, 68, 0.15);
		color: #ef4444;
		border: none;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		transition: all 0.2s;
	}

	.wrong-btn:hover {
		background-color: rgba(239, 68, 68, 0.25);
		transform: translateY(-3px);
	}

	.wrong-btn:active {
		transform: translateY(1px);
	}

	@media (max-width: 600px) {
		.wrong-btn {
			width: 50px;
			height: 50px;
		}

		.wrong-btn svg {
			width: 20px;
			height: 20px;
		}
	}
</style>
