<script>
	import { current, data, stats } from '$lib/stores.js';
	import { returnLists } from '$lib/functions.js';
	import { slide } from 'svelte/transition';

	function capitalizeFirstLetter(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function changeList(e) {
		let list = e.target.innerText;
		current.update((n) => {
			n.list = list.toLowerCase();
			return n;
		});
	}

	$: listArray = returnLists($data, $current.lang);
</script>

<div
	in:slide={{ duration: 200, axis: 'y' }}
	out:slide={{ duration: 200, axis: 'y' }}
	class="selector-container"
>
	{#each listArray as list}
		<span on:click={changeList}>
			{capitalizeFirstLetter(list)}
		</span>
	{/each}
</div>

<style>
	.selector-container {
		margin: 0 0.5rem;
		height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		padding: 1.5rem 1rem;

		border-bottom: 1px solid #eee;
	}

	span {
		border: none;
		background-color: transparent;
		color: #ecfdf5;
		font-size: 1.2rem;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
	}
	span:hover {
		background-color: #e3e3e37e;
		cursor: pointer;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
</style>
