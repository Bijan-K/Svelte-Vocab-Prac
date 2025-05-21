<!-- src\routes\stats\components\MistakesPanel.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { stats } from '$lib/stores';
	import { capitalizeWord } from '$lib/utils';

	import Card from './shared/Card.svelte';
	import EmptyState from './shared/EmptyState.svelte';
</script>

<div class="content-panel mistakes-panel" in:fade={{ duration: 200 }}>
	{#if $stats.mistake_lang.length === 0 || $stats.mistake_lang.every((l) => l.mistakes.length === 0)}
		<Card>
			<EmptyState
				message="No mistakes tracked yet"
				subMessage="Practice more to track your mistakes"
			>
				<a href="/practice" class="action-button"> Start Practicing </a>
			</EmptyState>
		</Card>
	{:else}
		<div class="mistakes-content">
			{#each $stats.mistake_lang as langMistakes (langMistakes.lang)}
				{#if langMistakes.mistakes.length > 0}
					<Card title={capitalizeWord(langMistakes.lang)} padding="0">
						<div class="mistakes-list">
							<div class="mistakes-table-header">
								<div class="mistake-word">Word</div>
								<div class="mistake-count">Times Missed</div>
								<div class="mistake-action">Lookup</div>
							</div>

							{#each langMistakes.mistakes as mistake (mistake.word)}
								<div class="mistake-item" animate:flip={{ duration: 200 }}>
									<div class="mistake-word">{mistake.word}</div>
									<div class="mistake-count">
										<span class="count-badge">{mistake.times}</span>
									</div>
									<div class="mistake-action">
										<a
											href={`https://www.google.com/search?q=${langMistakes.defineKeyword}+${encodeURIComponent(mistake.word)}`}
											target="_blank"
											class="mistake-lookup"
											title="Look up definition"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<circle cx="11" cy="11" r="8"></circle>
												<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
											</svg>
										</a>
									</div>
								</div>
							{/each}
						</div>
					</Card>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.content-panel {
		padding: 1.5rem 0;
	}

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

	.mistakes-table-header {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 1rem;
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid var(--border-dark);
		font-size: 0.9rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	.mistake-item {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 1rem;
		padding: 0.75rem 1.5rem;
		border-bottom: 1px solid var(--border-dark);
		transition: all 0.2s;
	}

	.mistake-item:last-child {
		border-bottom: none;
	}

	.mistake-item:hover {
		background-color: rgba(255, 255, 255, 0.02);
	}

	.mistake-word {
		color: var(--text-secondary);
		font-weight: 500;
	}

	.mistake-count {
		text-align: center;
	}

	.count-badge {
		display: inline-block;
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		font-size: 0.85rem;
		font-weight: 500;
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		min-width: 32px;
		text-align: center;
	}

	.mistake-lookup {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		background-color: var(--bg-light);
		color: var(--text-muted);
		transition: all 0.2s;
	}

	.mistake-lookup:hover {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
	}

	@media (max-width: 768px) {
		.mistakes-table-header,
		.mistake-item {
			grid-template-columns: 1fr auto;
		}

		.mistake-action,
		.mistake-count {
			text-align: right;
		}
	}
</style>
