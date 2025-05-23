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
		languageStats: [],
		srsStats: {
			totalNew: 0,
			totalLearning: 0,
			totalMature: 0,
			totalDue: 0,
			averageLevel: 0
		}
	};

	export let todayStats = { correct: 0, incorrect: 0, totalReviews: 0, newWords: 0 };

	// Calculate SRS-specific stats from language data
	$: srsStats = statsData.languageStats.reduce(
		(acc, lang) => {
			lang.lists.forEach((list) => {
				acc.totalNew += list.srsStats?.new || 0;
				acc.totalLearning += list.srsStats?.learning || 0;
				acc.totalMature += list.srsStats?.mature || 0;
				acc.totalDue += list.srsStats?.due || 0;
			});
			return acc;
		},
		{ totalNew: 0, totalLearning: 0, totalMature: 0, totalDue: 0 }
	);

	// Generate recent activity (simulated for now - in a real app, would be actual history)
	const today = getCurrentDate();
	const recentActivity = [
		{
			date: today,
			correct: todayStats.correct,
			incorrect: todayStats.incorrect,
			totalReviews: todayStats.totalReviews || todayStats.correct + todayStats.incorrect,
			newWords: todayStats.newWords || 0
		}
	];

	// Calculate accuracy percentage
	$: todayAccuracy =
		todayStats.totalReviews > 0
			? Math.round((todayStats.correct / todayStats.totalReviews) * 100)
			: 0;
</script>

<div class="content-panel overview-panel" in:fade={{ duration: 200 }}>
	<!-- SRS Progress Overview -->
	<Card title="Learning Progress">
		<div class="srs-overview">
			<div class="srs-stats-grid">
				<div class="srs-stat-card new">
					<div class="stat-icon">
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
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
					</div>
					<div class="stat-content">
						<div class="stat-value">{srsStats.totalNew}</div>
						<div class="stat-label">New Words</div>
					</div>
				</div>

				<div class="srs-stat-card learning">
					<div class="stat-icon">
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
							<path
								d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
							></path>
						</svg>
					</div>
					<div class="stat-content">
						<div class="stat-value">{srsStats.totalLearning}</div>
						<div class="stat-label">Learning</div>
					</div>
				</div>

				<div class="srs-stat-card mature">
					<div class="stat-icon">
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
					</div>
					<div class="stat-content">
						<div class="stat-value">{srsStats.totalMature}</div>
						<div class="stat-label">Mature</div>
					</div>
				</div>

				<div class="srs-stat-card due">
					<div class="stat-icon">
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
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
					</div>
					<div class="stat-content">
						<div class="stat-value">{srsStats.totalDue}</div>
						<div class="stat-label">Due Now</div>
					</div>
				</div>
			</div>
		</div>
	</Card>

	<!-- Overall Progress Circle -->
	<Card title="Overall Progress">
		<div class="progress-container">
			<div class="progress-chart">
				<div class="progress-circle" style="--progress: {statsData.knownPercentage}%">
					<div class="progress-inner">
						<span class="progress-percent">{statsData.knownPercentage}%</span>
						<span class="progress-label">Learned</span>
					</div>
				</div>
			</div>
			<div class="progress-details">
				<div class="progress-stat">
					<div class="stat-label">Total Words</div>
					<div class="stat-value">{statsData.totalWords}</div>
				</div>
				<div class="progress-stat">
					<div class="stat-label">Learned</div>
					<div class="stat-value learned">{statsData.totalKnown}</div>
				</div>
				<div class="progress-stat">
					<div class="stat-label">To Learn</div>
					<div class="stat-value learning">{statsData.totalUnknown}</div>
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

	<!-- Today's Performance -->
	<Card title="Today's Performance">
		{#if todayStats.totalReviews === 0}
			<EmptyState
				message="No reviews today"
				subMessage="Start practicing to see your daily performance"
			>
				<a href="/practice" class="action-button"> Start Practicing </a>
			</EmptyState>
		{:else}
			<div class="performance-grid">
				<div class="performance-stat">
					<div class="performance-icon correct">
						<UIIcons icon="check" />
					</div>
					<div class="performance-content">
						<div class="performance-value">{todayStats.correct}</div>
						<div class="performance-label">Correct</div>
					</div>
				</div>

				<div class="performance-stat">
					<div class="performance-icon incorrect">
						<UIIcons icon="negative" />
					</div>
					<div class="performance-content">
						<div class="performance-value">{todayStats.incorrect}</div>
						<div class="performance-label">Incorrect</div>
					</div>
				</div>

				<div class="performance-stat">
					<div class="performance-icon accuracy">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M9 12l2 2 4-4"></path>
							<path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
							<path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
							<path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
							<path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
						</svg>
					</div>
					<div class="performance-content">
						<div class="performance-value">{todayAccuracy}%</div>
						<div class="performance-label">Accuracy</div>
					</div>
				</div>

				<div class="performance-stat">
					<div class="performance-icon new-words">
						<UIIcons icon="add" />
					</div>
					<div class="performance-content">
						<div class="performance-value">{todayStats.newWords || 0}</div>
						<div class="performance-label">New Words</div>
					</div>
				</div>
			</div>
		{/if}
	</Card>
</div>

<style>
	.content-panel {
		padding: 1.5rem 0;
	}

	/* SRS Overview */
	.srs-overview {
		margin-bottom: 1rem;
	}

	.srs-stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.srs-stat-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background-color: var(--bg-dark);
		border-radius: 8px;
		border-left: 3px solid;
	}

	.srs-stat-card.new {
		border-left-color: #0ea5e9;
	}

	.srs-stat-card.learning {
		border-left-color: #f59e0b;
	}

	.srs-stat-card.mature {
		border-left-color: #10b981;
	}

	.srs-stat-card.due {
		border-left-color: #ef4444;
	}

	.stat-icon {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.srs-stat-card.new .stat-icon {
		background-color: rgba(14, 165, 233, 0.1);
		color: #0ea5e9;
	}

	.srs-stat-card.learning .stat-icon {
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
	}

	.srs-stat-card.mature .stat-icon {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.srs-stat-card.due .stat-icon {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.stat-content {
		flex: 1;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1;
	}

	.stat-label {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
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
		width: 120px;
		height: 120px;
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
		width: 90px;
		height: 90px;
		background-color: var(--bg-medium);
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.progress-percent {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.progress-label {
		font-size: 0.8rem;
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

	.progress-stat .stat-label {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}

	.progress-stat .stat-value {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.progress-stat .stat-value.learned {
		color: #10b981;
	}

	.progress-stat .stat-value.learning {
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

	/* Performance grid */
	.performance-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	.performance-stat {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem;
		background-color: var(--bg-dark);
		border-radius: 8px;
	}

	.performance-icon {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.performance-icon.correct {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.performance-icon.incorrect {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.performance-icon.accuracy {
		background-color: rgba(14, 165, 233, 0.1);
		color: #0ea5e9;
	}

	.performance-icon.new-words {
		background-color: rgba(139, 92, 246, 0.1);
		color: #8b5cf6;
	}

	.performance-content {
		flex: 1;
	}

	.performance-value {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1;
	}

	.performance-label {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
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

		.srs-stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.performance-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.progress-details {
			grid-template-columns: 1fr;
		}

		.srs-stats-grid {
			grid-template-columns: 1fr;
		}

		.performance-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
