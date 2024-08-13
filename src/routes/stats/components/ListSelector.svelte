<script>
	import { current, data } from '$lib/stores/crucial.js';
	import { returnListsOfLang } from '$lib/utils/initFunctions.js';
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

	$: listArray = returnListsOfLang($data, $current.lang);
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

	@media (max-width: 600px) {
		span {
			text-align: center;
		}
		span:hover {
			padding: 0.5rem;
		}

		.selector-container {
			margin: 0 0;
			padding: 0;
			height: auto;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			place-self: center;
		}
	}
</style>
