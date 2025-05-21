<!-- src\routes\stats\components\shared\EmptyState.svelte -->
<script>
	export let message = 'No data available';
	export let subMessage = '';
	export let small = false;
</script>

<div class="empty-state" class:small>
	<p class="main-message">{message}</p>

	{#if subMessage}
		<p class="tip">{subMessage}</p>
	{/if}

	<slot></slot>
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 3rem 1rem;
		color: var(--text-muted);
	}

	.empty-state.small {
		padding: 1.5rem 1rem;
	}

	.main-message {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
	}

	.small .main-message {
		font-size: 0.95rem;
	}

	.tip {
		font-size: 0.9rem;
		opacity: 0.7;
		margin-bottom: 1.5rem;
	}
</style>
