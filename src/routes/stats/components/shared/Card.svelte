<!-- src\routes\stats\components\shared\Card.svelte -->
<script>
	export let title = '';
	export let padding = '1.5rem';
</script>

<div class="card">
	{#if title}
		<div class="card-header">
			<h2>{title}</h2>
			<slot name="header-actions"></slot>
		</div>
	{/if}

	<div class="card-body" style="padding: {padding}">
		<slot></slot>
	</div>
</div>

<style>
	.card {
		background-color: var(--bg-medium);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		margin-bottom: 1.5rem;
	}

	.card-header {
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid var(--border-dark);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-header h2 {
		margin: 0;
		font-size: 1.2rem;
		color: var(--text-primary);
	}
</style>
