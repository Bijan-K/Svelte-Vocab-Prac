<!-- src\routes\stats\components\shared\StatItem.svelte -->
<script>
	import { fly } from 'svelte/transition';
	import { StatIcons } from '$lib/Icons/index.js';

	export let title = 'Stat';
	export let value = '0';
	export let icon = '';
	export let theme = 'default';
	export let animation = { y: 20, duration: 300, delay: 0 };
</script>

<div class="stats-item" in:fly={animation}>
	<div class="stats-icon {theme}">
		{#if icon === 'fire' || icon === 'today' || icon === 'calendar'}
			<StatIcons {icon} />
		{:else if icon === 'words'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1"></path>
				<path d="M18 14v4h4"></path>
				<path d="M15 6v8a2 2 0 0 0 2 2h4"></path>
			</svg>
		{:else if icon === 'progress'}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
				<polyline points="22 4 12 14.01 9 11.01"></polyline>
			</svg>
		{/if}
	</div>
	<div class="stats-data">
		<h3>{title}</h3>
		<div class="stats-value">{value}</div>
	</div>
</div>

<style>
	.stats-item {
		background-color: var(--bg-medium);
		border-radius: 12px;
		padding: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: all 0.3s;
	}

	.stats-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	}

	.stats-icon {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 1.5rem;
	}

	.stats-icon.streak {
		background-color: rgba(245, 158, 11, 0.15);
		color: #f59e0b;
	}

	.stats-icon.words {
		background-color: rgba(14, 165, 233, 0.15);
		color: #0ea5e9;
	}

	.stats-icon.progress {
		background-color: rgba(16, 185, 129, 0.15);
		color: #10b981;
	}

	.stats-icon.default {
		background-color: rgba(139, 92, 246, 0.15);
		color: #8b5cf6;
	}

	.stats-data {
		flex: 1;
	}

	.stats-data h3 {
		margin: 0;
		font-size: 0.9rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.stats-value {
		margin-top: 0.25rem;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}
</style>
