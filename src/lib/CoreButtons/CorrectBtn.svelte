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
