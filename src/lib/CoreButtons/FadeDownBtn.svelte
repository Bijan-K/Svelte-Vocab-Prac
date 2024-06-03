<script>
	import FadeDownIcon from '$lib/Icons/FadeDownIcon.svelte';
	function clickHandler() {
		console.log('clicked');
	}
</script>

<div on:click={clickHandler}>
	<FadeDownIcon />
</div>

<style>
	div {
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: rotate(-90deg);
		border: none;
		padding: 0.25rem;
		background: none;
		color: #eee;
		font-size: 2rem;
		border-radius: 0.5rem;
		background-color: rgb(61, 141, 252);
	}
	div:hover {
		cursor: pointer;
		background-color: aqua;
	}
	div:active {
		transform: translateY(+10%) rotate(-90deg);
	}
</style>
