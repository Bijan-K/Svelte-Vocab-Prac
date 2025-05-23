<!-- src\routes\stats\components\LanguagesPanel.svelte -->
<script>
	import { fade, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { capitalizeWord, getListStats, resetListProgress } from '$lib/utils';
	import { current, overlayState, overlayMode, data } from '$lib/stores';
	import { UIIcons } from '$lib/Icons/index.js';

	import Card from './shared/Card.svelte';
	import EmptyState from './shared/EmptyState.svelte';
	import ProgressBar from './shared/ProgressBar.svelte';

	export let languageStats = [];

	// State
	let showDetailsCard = null;
	let resetConfirm = null;

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

	// Reset list progress
	function handleResetList(lang, list) {
		resetConfirm = `${lang}-${list}`;
	}

	function confirmResetList(lang, list) {
		data.update((n) => {
			return resetListProgress(n, lang, list);
		});
		resetConfirm = null;
	}

	function cancelReset() {
		resetConfirm = null;
	}

	// Calculate enhanced stats for each list
	function getEnhancedListStats(lang, list) {
		return getListStats($data, lang, list);
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
									{@const enhancedStats = getEnhancedListStats(lang.language, list.name)}
									<div class="list-card" animate:flip={{ duration: 200 }}>
										<div class="list-info">
											<h4>{capitalizeWord(list.name)}</h4>
											<div class="list-stats">
												<div class="srs-stats">
													<span class="stat-item new">New: {enhancedStats.new}</span>
													<span class="stat-item learning">Learning: {enhancedStats.learning}</span>
													<span class="stat-item mature">Mature: {enhancedStats.mature}</span>
													<span class="stat-item due">Due: {enhancedStats.due}</span>
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

											{#if resetConfirm === `${lang.language}-${list.name}`}
												<div class="reset-confirm" transition:slide={{ duration: 200 }}>
													<span class="reset-text">Reset progress?</span>
													<button
														class="confirm-btn"
														on:click={() => confirmResetList(lang.language, list.name)}
														title="Confirm reset"
													>
														<UIIcons icon="check" />
													</button>
													<button class="cancel-btn" on:click={cancelReset} title="Cancel reset">
														<UIIcons icon="x" />
													</button>
												</div>
											{:else}
												<button
													class="list-action reset"
													title="Reset list progress"
													on:click={() => handleResetList(lang.language, list.name)}
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
														<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
														<path d="M21 3v5h-5"></path>
														<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
														<path d="M3 21v-5h5"></path>
													</svg>
												</button>
											{/if}
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
		border-left: 3px solid var(--border-light);
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

	.srs-stats {
		display: flex;
		gap: 0.75rem;
		font-size: 0.8rem;
	}

	.stat-item {
		padding: 0.2rem 0.5rem;
		border-radius: 4px;
		font-weight: 500;
	}

	.stat-item.new {
		background-color: rgba(14, 165, 233, 0.1);
		color: #0ea5e9;
	}

	.stat-item.learning {
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
	}

	.stat-item.mature {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.stat-item.due {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.list-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		align-items: center;
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
		border: none;
		cursor: pointer;
		background: none;
	}

	.list-action.practice {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
		text-decoration: none;
	}

	.list-action.practice:hover {
		background-color: rgba(16, 185, 129, 0.2);
		color: #10b981;
	}

	.list-action.reset {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.list-action.reset:hover {
		background-color: rgba(239, 68, 68, 0.2);
		color: #ef4444;
	}

	.reset-confirm {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--bg-light);
		padding: 0.5rem;
		border-radius: 6px;
		font-size: 0.8rem;
	}

	.reset-text {
		color: var(--text-muted);
		white-space: nowrap;
	}

	.confirm-btn,
	.cancel-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 4px;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.confirm-btn {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.confirm-btn:hover {
		background-color: rgba(16, 185, 129, 0.2);
	}

	.cancel-btn {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.cancel-btn:hover {
		background-color: rgba(239, 68, 68, 0.2);
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

		.srs-stats {
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}

	@media (max-width: 768px) {
		.languages-actions {
			flex-direction: column;
		}

		.language-lists {
			grid-template-columns: 1fr;
		}
	}
</style>
