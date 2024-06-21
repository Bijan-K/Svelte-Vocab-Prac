<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { addWordtoMistakesList, updateStatsMistakesList } from '$lib/functions.js';

	import { data, stats, current } from '$lib/stores.js';

	function clickHandler() {
		data.update((n) => {
			n = addWordtoMistakesList($data, $current.lang, $current.word);
			console.log(n);
			return n;
		});

		stats.update((n) => {
			let tmp = n;
			tmp.Record.info.incorrect++;
			return tmp;
		});

		stats.update((n) => {
			n = updateStatsMistakesList($stats, $current.lang, $current.word);
		});

		console.log('\n -- data -- \n', $data);
		console.log('\n -- stats -- \n', $stats);
	}
</script>

<div on:click={clickHandler}>
	<XIcon />
</div>

<style>
	div {
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
		background-color: rgb(159 18 57);
	}
	div:hover {
		cursor: pointer;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
