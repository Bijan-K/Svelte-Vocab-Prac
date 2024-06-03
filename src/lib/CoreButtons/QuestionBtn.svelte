<script>
	import QuestionIcon from '$lib/Icons/QuestionIcon.svelte';
	function clickHandler() {
		console.log('clicked');
	}
</script>

<div on:click={clickHandler}>
	<QuestionIcon />
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
		background-color: rgb(61, 109, 252);
	}
	div:hover {
		cursor: pointer;
		background-color: aqua;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
