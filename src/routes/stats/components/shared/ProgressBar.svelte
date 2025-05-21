<!-- src\routes\stats\components\shared\ProgressBar.svelte -->
<script>
	export let percentage = 0;
	export let showLabel = true;
	export let height = '6px';
</script>

<div class="progress-container">
	<div class="progress-bar" style="height: {height}">
		<div class="progress-fill" style="width: {percentage}%"></div>
	</div>

	{#if showLabel}
		<div class="progress-percentage">
			{percentage}%
		</div>
	{/if}
</div>

<style>
	.progress-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.progress-bar {
		flex: 1;
		background-color: var(--bg-light);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background-color: var(--primary);
		border-radius: 3px;
		transition: width 0.3s ease;
	}

	.progress-percentage {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--primary);
		min-width: 40px;
		text-align: right;
	}
</style>
