<script>
	let mode = 'test';
</script>

<div class="practice-container">
	{#if mode == 'test'}
		<div>typewriter</div>
	{:else if mode == 'add'}
		<input type="text" />
	{/if}

	<div>
		<button>right</button>
		<button>wrong</button>
		<button>down</button>
	</div>
</div>

<style>
	.practice-container {
		height: 100%;
		align-items: center;
		justify-content: center;
		display: flex;
		gap: 1rem;
		flex-direction: column;
		flex: 2fr 1fr;
	}
</style>
