<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { current } from '$lib/stores.js';

	function clickHandler(e) {
		console.log(e.target.innerText);
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
