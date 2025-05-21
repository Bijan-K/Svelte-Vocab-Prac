<!-- src\routes\stats\components\LanguagesPanel.svelte -->
<script>
	import { fade, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { capitalizeWord } from '$lib/utils';
	import { current, overlayState, overlayMode } from '$lib/stores';
	import { UIIcons } from '$lib/Icons/index.js';

	import Card from './shared/Card.svelte';
	import EmptyState from './shared/EmptyState.svelte';
	import ProgressBar from './shared/ProgressBar.svelte';

	export let languageStats = [];

	// State
	let showDetailsCard = null;

	// Toggle language details
	function toggleDetailsCard(item) {
		if (showDetailsCard === item) {
			showDetailsCard = null;
		} else {
			showDetailsCard = item;
		}
	}

	// Add handlers
	function addNewLanguage() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlang');
	}

	function addNewList() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlist');
	}

	// Set current language and list for practice
	function setPractice(lang, list) {
		current.update((n) => {
			n.lang = lang;
			n.list = list;
			return n;
		});
	}
</script>

<div class="content-panel languages-panel" in:fade={{ duration: 200 }}>
	<div class="languages-actions">
		<button class="action-button" on:click={addNewLanguage}>
			<UIIcons icon="add" />
			Add Language
		</button>
		<button class="action-button" on:click={addNewList}>
			<UIIcons icon="add" />
			Add List
		</button>
	</div>

	{#if languageStats.length === 0}
		<Card>
			<EmptyState
				message="No languages found"
				subMessage="Add a language to start tracking your progress"
			>
				<button class="action-button" on:click={addNewLanguage}>
					<UIIcons icon="add" />
					Add Language
				</button>
			</EmptyState>
		</Card>
	{:else}
		<div class="languages-lists">
			{#each languageStats as lang (lang.language)}
				<div class="language-section" animate:flip={{ duration: 200 }}>
					<div
						class="language-header-card"
						on:click={() => toggleDetailsCard(lang.language)}
						class:expanded={showDetailsCard === lang.language}
					>
						<div class="language-header-content">
							<h3>{capitalizeWord(lang.language)}</h3>
							<div class="language-stats">
								<div class="language-stat">
									<span class="stat-label">Lists:</span>
									<span class="stat-value">{lang.lists.length}</span>
								</div>
								<div class="language-stat">
									<span class="stat-label">Words:</span>
									<span class="stat-value">{lang.totalWords}</span>
								</div>
								<div class="language-stat">
									<span class="stat-label">Progress:</span>
									<span class="stat-value">{lang.percentage}%</span>
								</div>
							</div>
						</div>
						<div class="toggle-icon">
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
								style="transform: rotate({showDetailsCard === lang.language
									? '180deg'
									: '0deg'}); transition: transform 0.3s"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</div>
					</div>

					{#if showDetailsCard === lang.language}
						<div class="language-lists" transition:slide={{ duration: 300 }}>
							{#if lang.lists.length === 0}
								<EmptyState message="No lists in this language" small={true}>
									<button class="action-button small" on:click={addNewList}>
										<UIIcons icon="add" />
										Add List
									</button>
								</EmptyState>
							{:else}
								{#each lang.lists as list (list.name)}
									<div class="list-card" animate:flip={{ duration: 200 }}>
										<div class="list-info">
											<h4>{capitalizeWord(list.name)}</h4>
											<div class="list-stats">
												<div class="list-stat">
													<span>{list.knownWords}/{list.totalWords} words</span>
												</div>
											</div>
										</div>
										<ProgressBar percentage={list.percentage} />
										<div class="list-actions">
											<a
												href="/practice"
												class="list-action practice"
												title="Practice this list"
												on:click={() => setPractice(lang.language, list.name)}
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
													<polygon points="5 3 19 12 5 21 5 3"></polygon>
												</svg>
											</a>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.content-panel {
		padding: 1.5rem 0;
	}

	.languages-actions {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
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

	.action-button.small {
		padding: 0.5rem 0.75rem;
		font-size: 0.85rem;
	}

	.languages-lists {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.language-section {
		background-color: var(--bg-medium);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	}

	.language-header-card {
		padding: 1.25rem 1.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		transition: all 0.2s;
	}

	.language-header-card:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.language-header-card.expanded {
		border-bottom: 1px solid var(--border-dark);
	}

	.language-header-content {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.language-header-content h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text-primary);
		min-width: 100px;
	}

	.language-stats {
		display: flex;
		gap: 1.5rem;
	}

	.language-stat {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
	}

	.stat-label {
		color: var(--text-muted);
	}

	.stat-value {
		color: var(--text-secondary);
		font-weight: 500;
	}

	.toggle-icon {
		color: var(--text-muted);
	}

	.language-lists {
		padding: 1.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
	}

	.list-card {
		background-color: var(--bg-dark);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition: all 0.2s;
	}

	.list-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.list-info h4 {
		margin: 0 0 0.5rem 0;
		color: var(--text-secondary);
		font-size: 1rem;
	}

	.list-stats {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.list-actions {
		display: flex;
		justify-content: flex-end;
	}

	.list-action {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		color: var(--text-muted);
		transition: all 0.2s;
	}

	.list-action.practice {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.list-action.practice:hover {
		background-color: rgba(16, 185, 129, 0.2);
		color: #10b981;
	}

	@media (max-width: 1024px) {
		.language-header-content {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.language-stats {
			gap: 1rem;
		}
	}

	@media (max-width: 768px) {
		.languages-actions {
			flex-direction: column;
		}
	}
</style>
