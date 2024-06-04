<script>
	import QuestionIcon from '$lib/Icons/QuestionIcon.svelte';
</script>

<div>
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
	}
	div:hover {
		cursor: pointer;
		border-bottom: #eee 2px solid;
	}
	div:active {
		transform: translateY(+10%);
	}
</style>
