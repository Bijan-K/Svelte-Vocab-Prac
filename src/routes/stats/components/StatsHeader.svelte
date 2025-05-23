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
		streak: 0,
		srsStats: {
			totalNew: 0,
			totalLearning: 0,
			totalMature: 0,
			totalDue: 0,
			averageLevel: 0
		}
	};

	export let todayStats = { correct: 0, incorrect: 0, totalReviews: 0, newWords: 0 };

	// Calculate today's accuracy
	$: todayAccuracy =
		todayStats.totalReviews > 0
			? Math.round((todayStats.correct / todayStats.totalReviews) * 100)
			: 0;
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
			title="Due Words"
			value={statsData.srsStats.totalDue}
			icon="calendar"
			theme="due"
			animation={{ y: 20, duration: 300, delay: 200 }}
		/>

		<StatItem
			title="Total Words"
			value={statsData.totalWords}
			icon="words"
			theme="words"
			animation={{ y: 20, duration: 300, delay: 300 }}
		/>

		<StatItem
			title="Mature Words"
			value={statsData.srsStats.totalMature}
			icon="progress"
			theme="progress"
			animation={{ y: 20, duration: 300, delay: 400 }}
		/>

		<div class="stats-item" in:fly={{ y: 20, duration: 300, delay: 500 }}>
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
					<span class="accuracy" title="Accuracy: {todayAccuracy}%">
						{todayAccuracy}%
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- SRS Progress Bar -->
	<div class="srs-progress" in:fly={{ y: 20, duration: 300, delay: 600 }}>
		<div class="srs-progress-header">
			<span class="srs-title">Learning Progress</span>
			<span class="srs-average">Avg Level: {statsData.srsStats.averageLevel}</span>
		</div>
		<div class="srs-progress-bar">
			<div
				class="srs-segment new"
				style="width: {statsData.totalWords > 0
					? (statsData.srsStats.totalNew / statsData.totalWords) * 100
					: 0}%"
				title="New: {statsData.srsStats.totalNew}"
			></div>
			<div
				class="srs-segment learning"
				style="width: {statsData.totalWords > 0
					? (statsData.srsStats.totalLearning / statsData.totalWords) * 100
					: 0}%"
				title="Learning: {statsData.srsStats.totalLearning}"
			></div>
			<div
				class="srs-segment mature"
				style="width: {statsData.totalWords > 0
					? (statsData.srsStats.totalMature / statsData.totalWords) * 100
					: 0}%"
				title="Mature: {statsData.srsStats.totalMature}"
			></div>
		</div>
		<div class="srs-legend">
			<div class="legend-item">
				<div class="legend-color new"></div>
				<span>New ({statsData.srsStats.totalNew})</span>
			</div>
			<div class="legend-item">
				<div class="legend-color learning"></div>
				<span>Learning ({statsData.srsStats.totalLearning})</span>
			</div>
			<div class="legend-item">
				<div class="legend-color mature"></div>
				<span>Mature ({statsData.srsStats.totalMature})</span>
			</div>
		</div>
	</div>
</div>

<style>
	.stats-header {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stats-overview {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
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

	.stats-icon.due {
		background-color: rgba(239, 68, 68, 0.15);
		color: #ef4444;
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
		gap: 0.75rem;
		font-size: 1rem;
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

	.today-stats .accuracy {
		color: #0ea5e9;
		font-weight: 600;
		margin-left: auto;
	}

	/* SRS Progress */
	.srs-progress {
		background-color: var(--bg-medium);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	}

	.srs-progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.srs-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.srs-average {
		font-size: 0.9rem;
		color: var(--text-muted);
		background-color: var(--bg-dark);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
	}

	.srs-progress-bar {
		height: 8px;
		background-color: var(--bg-dark);
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		margin-bottom: 1rem;
	}

	.srs-segment {
		height: 100%;
		transition: width 0.3s ease;
	}

	.srs-segment.new {
		background-color: #0ea5e9;
	}

	.srs-segment.learning {
		background-color: #f59e0b;
	}

	.srs-segment.mature {
		background-color: #10b981;
	}

	.srs-legend {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 2px;
	}

	.legend-color.new {
		background-color: #0ea5e9;
	}

	.legend-color.learning {
		background-color: #f59e0b;
	}

	.legend-color.mature {
		background-color: #10b981;
	}

	@media (max-width: 1200px) {
		.stats-overview {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 1024px) {
		.stats-overview {
			grid-template-columns: repeat(2, 1fr);
		}

		.srs-legend {
			gap: 1rem;
		}
	}

	@media (max-width: 600px) {
		.stats-overview {
			grid-template-columns: 1fr;
		}

		.today-stats {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.today-stats .accuracy {
			margin-left: 0;
		}

		.srs-progress-header {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}

		.srs-legend {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
