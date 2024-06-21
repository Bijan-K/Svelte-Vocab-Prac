<script>
	import TickIcon from '$lib/Icons/TickIcon.svelte';
	import { current, data } from '$lib/stores.js';
	import {
		changeWordKnownToCorrect,
		newCurrentWordList,
		filterKnownIsTrue
	} from '$lib/functions.js';

	function clickHandler() {
		data.update((n) => {
			console.log(
				'------- Data update -------- \n',
				changeWordKnownToCorrect($data, $current.lang, $current.list, $current.word)
			);
			n = changeWordKnownToCorrect($data, $current.lang, $current.list, $current.word);
			return n;
		});

		current.update((n) => {
			let tmp = n;
			tmp.word = filterKnownIsTrue(newCurrentWordList($data, $current.lang, $current.list)).word;
			return tmp;
		});
	}
</script>

<div on:click={clickHandler}>
	<TickIcon />
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
		background-color: #064e3b;
	}
	div:hover {
		cursor: pointer;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
