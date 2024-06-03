<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	function clickHandler() {
		console.log('clicked');
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
		padding: 0.5rem 1rem;
		background: none;
		color: #eee;
		font-size: 2rem;
		border-radius: 0.5rem;
		background-color: rgb(252, 61, 61);
	}
	div:hover {
		cursor: pointer;
		background-color: aqua;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
