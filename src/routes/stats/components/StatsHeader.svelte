<!-- src\routes\stats\components\StatsHeader.svelte -->
<script>
	import { fly } from 'svelte/transition';
	import { StatIcons, UIIcons } from '$lib/Icons/index.js';
	import StatItem from './shared/StatItem.svelte';

	export let statsData = {
		totalWords: 0,
		totalKnown: 0,
		totalUnknown: 0,
		knownPercentage: 0,
		streak: 0
	};

	export let todayStats = { correct: 0, incorrect: 0 };
</script>

<div class="stats-header">
	<div class="stats-overview">
		<StatItem
			title="Streak"
			value="{statsData.streak} {statsData.streak === 1 ? 'day' : 'days'}"
			icon="fire"
			theme="streak"
			animation={{ y: 20, duration: 300, delay: 100 }}
		/>

		<StatItem
			title="Total Words"
			value={statsData.totalWords}
			icon="words"
			theme="words"
			animation={{ y: 20, duration: 300, delay: 200 }}
		/>

		<StatItem
			title="Progress"
			value="{statsData.knownPercentage}%"
			icon="progress"
			theme="progress"
			animation={{ y: 20, duration: 300, delay: 300 }}
		/>

		<div class="stats-item" in:fly={{ y: 20, duration: 300, delay: 400 }}>
			<div class="stats-icon today">
				<StatIcons icon="today" />
			</div>
			<div class="stats-data">
				<h3>Today</h3>
				<div class="stats-value today-stats">
					<span class="correct">
						<UIIcons icon="check" />
						{todayStats.correct}
					</span>
					<span class="incorrect">
						<UIIcons icon="negative" />
						{todayStats.incorrect}
					</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.stats-header {
		margin-bottom: 1rem;
	}

	.stats-overview {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

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

	.stats-icon.today {
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

	.today-stats {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: 1.25rem;
	}

	.today-stats .correct {
		color: #10b981;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.today-stats .incorrect {
		color: #ef4444;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	@media (max-width: 1024px) {
		.stats-overview {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.stats-overview {
			grid-template-columns: 1fr;
		}
	}
</style>
