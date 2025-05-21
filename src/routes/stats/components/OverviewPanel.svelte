<!-- src\routes\stats\components\OverviewPanel.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { overlayMode, overlayState } from '$lib/stores';

	import { getCurrentDate } from '$lib/utils';
	import { capitalizeWord } from '$lib/utils';
	import { UIIcons } from '$lib/Icons/index.js';

	import Card from './shared/Card.svelte';
	import EmptyState from './shared/EmptyState.svelte';
	import ProgressBar from './shared/ProgressBar.svelte';

	export let statsData = {
		totalWords: 0,
		totalKnown: 0,
		totalUnknown: 0,
		knownPercentage: 0,
		languageStats: []
	};

	export let todayStats = { correct: 0, incorrect: 0 };

	// Generate recent activity (simulated for now - in a real app, would be actual history)
	const today = getCurrentDate();
	const recentActivity = [
		{
			date: today,
			correct: todayStats.correct,
			incorrect: todayStats.incorrect
		}
	];
</script>

<div class="content-panel overview-panel" in:fade={{ duration: 200 }}>
	<!-- Progress Overview -->
	<Card title="Overall Progress">
		<div class="progress-container">
			<div class="progress-chart">
				<div class="progress-circle" style="--progress: {statsData.knownPercentage}%">
					<div class="progress-inner">
						<span class="progress-percent">{statsData.knownPercentage}%</span>
						<span class="progress-label">Complete</span>
					</div>
				</div>
			</div>
			<div class="progress-details">
				<div class="progress-stat">
					<div class="stat-label">Total Words</div>
					<div class="stat-value">{statsData.totalWords}</div>
				</div>
				<div class="progress-stat">
					<div class="stat-label">Known</div>
					<div class="stat-value known">{statsData.totalKnown}</div>
				</div>
				<div class="progress-stat">
					<div class="stat-label">To Learn</div>
					<div class="stat-value unknown">{statsData.totalUnknown}</div>
				</div>
			</div>
		</div>
	</Card>

	<!-- Language Breakdown -->
	<Card title="Languages">
		{#if statsData.languageStats.length === 0}
			<EmptyState
				message="No languages found"
				subMessage="Add a language to start tracking your progress"
			>
				<button
					class="action-button"
					on:click={() => {
						overlayState.update((n) => !n);
						overlayMode.update((n) => 'selectlang');
					}}
				>
					<UIIcons icon="add" />
					Add Language
				</button>
			</EmptyState>
		{:else}
			<div class="language-list">
				{#each statsData.languageStats as lang (lang.language)}
					<div class="language-item" animate:flip={{ duration: 200 }}>
						<div class="language-header">
							<h3>{capitalizeWord(lang.language)}</h3>
							<div class="language-count">
								{lang.knownWords}/{lang.totalWords} words
							</div>
						</div>
						<ProgressBar percentage={lang.percentage} />
					</div>
				{/each}
			</div>
		{/if}
	</Card>

	<!-- Recent Activity -->
	<Card title="Recent Activity">
		{#if recentActivity.length === 0}
			<EmptyState
				message="No recent activity"
				subMessage="Start practicing to see your activity here"
			>
				<a href="/practice" class="action-button"> Start Practicing </a>
			</EmptyState>
		{:else}
			<div class="activity-list">
				{#each recentActivity as activity (activity.date)}
					<div class="activity-item">
						<div class="activity-date">
							{activity.date}
						</div>
						<div class="activity-stats">
							<div class="activity-correct">
								<UIIcons icon="check" />
								<span>{activity.correct}</span>
							</div>
							<div class="activity-incorrect">
								<UIIcons icon="negative" />
								<span>{activity.incorrect}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</Card>
</div>

<style>
	.content-panel {
		padding: 1.5rem 0;
	}

	/* Progress container */
	.progress-container {
		display: flex;
		gap: 2rem;
		align-items: center;
	}

	.progress-chart {
		flex-shrink: 0;
	}

	.progress-circle {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		background: conic-gradient(
			var(--primary) 0% var(--progress),
			var(--bg-light) var(--progress) 100%
		);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.progress-inner {
		width: 120px;
		height: 120px;
		background-color: var(--bg-medium);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.progress-percent {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.progress-label {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.progress-details {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.progress-stat {
		background-color: var(--bg-dark);
		padding: 1rem;
		border-radius: 8px;
		text-align: center;
	}

	.stat-label {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.stat-value.known {
		color: #10b981;
	}

	.stat-value.unknown {
		color: #f59e0b;
	}

	/* Languages list */
	.language-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
	}

	.language-item {
		background-color: var(--bg-dark);
		padding: 1rem;
		border-radius: 8px;
		transition: all 0.2s;
	}

	.language-item:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.language-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
	}

	.language-header h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-secondary);
	}

	.language-count {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	/* Activity list */
	.activity-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.activity-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem;
		background-color: var(--bg-dark);
		border-radius: 8px;
	}

	.activity-date {
		font-size: 0.95rem;
		color: var(--text-secondary);
	}

	.activity-stats {
		display: flex;
		gap: 1rem;
	}

	.activity-correct,
	.activity-incorrect {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: 500;
	}

	.activity-correct {
		color: #10b981;
	}

	.activity-incorrect {
		color: #ef4444;
	}

	/* Action button */
	.action-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0.75rem 1.25rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		text-decoration: none;
		font-size: 0.95rem;
	}

	.action-button:hover {
		background-color: var(--primary-dark);
		transform: translateY(-2px);
	}

	@media (max-width: 1024px) {
		.progress-container {
			flex-direction: column;
		}

		.progress-details {
			width: 100%;
		}
	}

	@media (max-width: 600px) {
		.progress-details {
			grid-template-columns: 1fr;
		}
	}
</style>
