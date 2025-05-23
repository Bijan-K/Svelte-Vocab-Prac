<!-- src\routes\practice\CoreButtons\CorrectBtn.svelte -->
<script>
	import { data, current, stats } from '$lib/stores';
	import { markWordCorrect, getDueWords, selectRandomWord } from '$lib/utils';

	function clickHandler() {
		if ($current.word === 'All caught up! 🎉') return;

		data.update((n) => {
			n = markWordCorrect($data, $current.lang, $current.list, $current.word);
			return n;
		});

		stats.update((n) => {
			let tmp = n;
			tmp.record.info.correct++;
			tmp.record.info.totalReviews++;
			return tmp;
		});

		current.update((n) => {
			let tmp = n;
			const dueWords = getDueWords($data, $current.lang, $current.list);
			tmp.word = selectRandomWord(dueWords).word;
			return tmp;
		});
	}
</script>

<button on:click={clickHandler} class="correct-btn" aria-label="Mark as known">
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
		<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
		<polyline points="22 4 12 14.01 9 11.01"></polyline>
	</svg>
</button>

<style>
	.correct-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(16, 185, 129, 0.15);
		color: #10b981;
		border: none;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		transition: all 0.2s;
	}

	.correct-btn:hover {
		background-color: rgba(16, 185, 129, 0.25);
		transform: translateY(-3px);
	}

	.correct-btn:active {
		transform: translateY(1px);
	}

	@media (max-width: 600px) {
		.correct-btn {
			width: 50px;
			height: 50px;
		}

		.correct-btn svg {
			width: 20px;
			height: 20px;
		}
	}
</style>
