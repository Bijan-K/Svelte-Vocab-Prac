<script>
	import CorrectBtn from '../../lib/CoreButtons/CorrectBtn.svelte';
	import WrongBtn from '../../lib/CoreButtons/WrongBtn.svelte';
	import FadeDownBtn from '../../lib/CoreButtons/FadeDownBtn.svelte';
	import QuestionBtn from '../../lib/CoreButtons/QuestionBtn.svelte';

	let mode = 'test';
	let questionMode = false;
</script>

<div class="practice-container">
	{#if mode == 'test'}
		<div class="text">typewriter</div>
	{:else if mode == 'add'}
		<input type="text" />
	{/if}

	<div class="core-btn">
		<WrongBtn />
		{#if questionMode}
			<FadeDownBtn />
		{:else}
			<QuestionBtn />
		{/if}
		<CorrectBtn />
	</div>
</div>

<style>
	.practice-container {
		height: 100%;
		align-items: center;
		justify-content: center;
		display: flex;
		gap: 5rem;
		flex-direction: column;
		flex: 2fr 1fr;
	}
	.text {
		font-size: 2rem;
	}

	.core-btn {
		transform: translateY(+50%);
		background-color: #0f172a;
		border-radius: 0.5rem;
		padding: 2rem 3rem;
		display: flex;
		gap: 0.5rem;
	}
</style>
