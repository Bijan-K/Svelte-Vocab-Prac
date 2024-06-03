<script>
	import TickIcon from '$lib/Icons/TickIcon.svelte';
	function clickHandler() {
		console.log('clicked2');
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
		padding: 0.5rem 1rem;

		background: none;
		color: #eee;
		font-size: 2rem;
		border-radius: 0.5rem;
		background-color: rgb(18, 245, 86);
	}
	div:hover {
		cursor: pointer;
		background-color: aqua;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
