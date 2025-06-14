<!-- src\routes\stats\components\VocabularyPanel.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { data, current, stats } from '$lib/stores';
	import {
		capitalizeWord,
		returnListsOfLang,
		returnWordsInList,
		addWordtoList,
		deleteWordFromList,
		removeWordFromStatsMistakesList,
		isWordDue,
		SRS_INTERVALS
	} from '$lib/utils';
	import { UIIcons } from '$lib/Icons/index.js';
	import Card from './shared/Card.svelte';
	import EmptyState from './shared/EmptyState.svelte';

	// State
	let filterLanguage = '';
	let filterList = '';
	let searchTerm = '';
	let newWord = '';

	// Initialize filters with current selection
	$: if ($current && !filterLanguage) {
		filterLanguage = $current.lang;
		filterList = $current.list;
	}

	// Language and list options
	$: availableLanguages = $data.map((lang) => lang.lang);
	$: availableLists = returnListsOfLang($data, filterLanguage);

	// Filter words based on search term
	$: filteredWords = searchTerm
		? returnWordsInList($data, filterLanguage, filterList).filter((word) =>
				word.word.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: returnWordsInList($data, filterLanguage, filterList);

	// Set language and update lists
	function setLanguageFilter(lang) {
		filterLanguage = lang;
		availableLists = returnListsOfLang($data, lang);
		filterList = availableLists[0];
	}

	// Set list filter
	function setListFilter(list) {
		filterList = list;
	}

	// Add a new word to the current list
	function addNewWord() {
		if (!newWord.trim()) return;

		data.update((n) => {
			return addWordtoList(n, filterLanguage, filterList, newWord);
		});

		newWord = '';
	}

	// Delete a word from the current list
	function deleteWord(word) {
		data.update((n) => {
			return deleteWordFromList(n, filterLanguage, filterList, word);
		});

		// Also remove from stats mistakes if it exists
		stats.update((n) => {
			return removeWordFromStatsMistakesList(n, filterLanguage, word);
		});
	}

	// Handle enter key press to add word
	function handleKeyPress(event) {
		if (event.key === 'Enter' && newWord.trim()) {
			addNewWord();
		}
	}

	// Get SRS status info
	function getSRSStatus(word) {
		const isDue = isWordDue(word);
		const level = word.level || 0;
		const nextInterval = SRS_INTERVALS[Math.min(level, SRS_INTERVALS.length - 1)];

		let statusText = '';
		let statusClass = '';

		if (level === 0) {
			statusText = 'New';
			statusClass = 'new';
		} else if (level < 4) {
			statusText = 'Learning';
			statusClass = 'learning';
		} else {
			statusText = 'Mature';
			statusClass = 'mature';
		}

		if (isDue) {
			statusText += ' (Due)';
			statusClass += ' due';
		}

		return { statusText, statusClass, nextInterval, isDue };
	}

	// Format date for display
	function formatDate(dateString) {
		if (!dateString) return 'Never';
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = date - now;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) {
			return 'Due now';
		} else if (diffDays === 0) {
			return 'Today';
		} else if (diffDays === 1) {
			return 'Tomorrow';
		} else {
			return `In ${diffDays} days`;
		}
	}
</script>

<div class="content-panel vocabulary-panel" in:fade={{ duration: 200 }}>
	<!-- Filters and Controls -->
	<Card padding="1rem">
		<div class="vocabulary-controls">
			<div class="filters">
				<div class="filter-group">
					<label for="language-filter">Language</label>
					<select
						id="language-filter"
						bind:value={filterLanguage}
						on:change={() => setLanguageFilter(filterLanguage)}
					>
						{#each availableLanguages as lang}
							<option value={lang}>{capitalizeWord(lang)}</option>
						{/each}
					</select>
				</div>

				<div class="filter-group">
					<label for="list-filter">List</label>
					<select
						id="list-filter"
						bind:value={filterList}
						on:change={() => setListFilter(filterList)}
					>
						{#each availableLists as list}
							<option value={list}>{capitalizeWord(list)}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="search-container">
				<div class="search-input-wrapper">
					<svg
						class="search-icon"
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
					<input
						type="text"
						placeholder="Search words..."
						bind:value={searchTerm}
						class="search-input"
					/>
					<button class="clear-button" on:click={() => (searchTerm = '')} disabled={!searchTerm}>
						{#if searchTerm}
							<UIIcons icon="x" />
						{:else}
							<span class="clear-placeholder"></span>
						{/if}
					</button>
				</div>
			</div>
		</div>
	</Card>

	<!-- Words Grid -->
	<Card>
		<div class="add-word-form">
			<input
				type="text"
				placeholder="Add a new word..."
				bind:value={newWord}
				on:keydown={handleKeyPress}
			/>
			<button class="add-button" on:click={addNewWord} disabled={!newWord}>
				<UIIcons icon="add" />
				Add
			</button>
		</div>

		{#if filteredWords.length === 0}
			<EmptyState
				message={searchTerm ? `No words found matching "${searchTerm}"` : 'No words in this list'}
				subMessage={searchTerm ? '' : 'Type a word above to add it to this list'}
			>
				{#if searchTerm}
					<button class="action-button" on:click={() => (searchTerm = '')}> Clear Search </button>
				{/if}
			</EmptyState>
		{:else}
			<div class="words-grid">
				{#each filteredWords as word (word.word)}
					{@const srsStatus = getSRSStatus(word)}
					<div class="word-card" class:due={srsStatus.isDue} animate:flip={{ duration: 200 }}>
						<div class="word-header">
							<div class="word-text">{word.word}</div>
							<div class="word-level">Level {word.level || 0}</div>
						</div>

						<div class="word-srs-info">
							<div class="srs-status {srsStatus.statusClass}">
								{srsStatus.statusText}
							</div>
							<div class="srs-details">
								<div class="srs-detail">
									<span class="detail-label">Next review:</span>
									<span class="detail-value">{formatDate(word.dueDate)}</span>
								</div>
								<div class="srs-detail">
									<span class="detail-label">Streak:</span>
									<span class="detail-value">{word.correctStreak || 0}</span>
								</div>
								<div class="srs-detail">
									<span class="detail-label">Total reviews:</span>
									<span class="detail-value">{word.totalReviews || 0}</span>
								</div>
							</div>
						</div>

						<div class="word-actions">
							<button
								class="word-action delete"
								title="Delete word"
								on:click={() => deleteWord(word.word)}
							>
								<UIIcons icon="remove" />
							</button>

							<a
								href={`https://www.google.com/search?q=define+${encodeURIComponent(word.word)}`}
								target="_blank"
								class="word-action lookup"
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
		{/if}
	</Card>
</div>

<style>
	.content-panel {
		padding: 1.5rem 0;
	}

	.vocabulary-controls {
		display: flex;
		gap: 1rem;
	}

	.filters {
		display: flex;
		gap: 1rem;
		flex: 1;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.filter-group label {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.filter-group select {
		background-color: var(--bg-dark);
		color: var(--text-secondary);
		border: 1px solid var(--border-dark);
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		font-size: 0.95rem;
		-webkit-appearance: none;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
		background-size: 1em;
		padding-right: 2.5em;
		min-width: 150px;
	}

	.search-container {
		min-width: 200px;
	}

	.search-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 0.75rem;
		color: var(--text-muted);
		z-index: 1;
	}

	.search-input {
		width: 100%;
		background-color: var(--bg-dark);
		color: var(--text-secondary);
		border: 1px solid var(--border-dark);
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
		padding-left: 2.5rem;
		padding-right: 2.5rem;
		font-size: 0.95rem;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--primary);
	}

	.clear-button {
		position: absolute;
		right: 0.5rem;
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}

	.clear-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.clear-placeholder {
		width: 16px;
		height: 16px;
	}

	.add-word-form {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.add-word-form input {
		flex: 1;
		background-color: var(--bg-dark);
		color: var(--text-secondary);
		border: 1px solid var(--border-dark);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		font-size: 1rem;
	}

	.add-word-form input:focus {
		outline: none;
		border-color: var(--primary);
	}

	.add-button,
	.action-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0 1.25rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.add-button:hover:not(:disabled),
	.action-button:hover {
		background-color: var(--primary-dark);
	}

	.add-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.words-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.word-card {
		background-color: var(--bg-dark);
		border-radius: 8px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition: all 0.2s;
		border-left: 3px solid var(--border-light);
	}

	.word-card.due {
		border-left-color: #ef4444;
		background-color: rgba(239, 68, 68, 0.05);
	}

	.word-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.word-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.word-text {
		font-weight: 500;
		color: var(--text-secondary);
		word-break: break-word;
		font-size: 1.1rem;
	}

	.word-level {
		background-color: var(--bg-light);
		color: var(--text-muted);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.word-srs-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.srs-status {
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-size: 0.8rem;
		font-weight: 500;
		align-self: flex-start;
	}

	.srs-status.new {
		background-color: rgba(14, 165, 233, 0.1);
		color: #0ea5e9;
	}

	.srs-status.learning {
		background-color: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
	}

	.srs-status.mature {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.srs-status.due {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.srs-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.8rem;
	}

	.srs-detail {
		display: flex;
		justify-content: space-between;
	}

	.detail-label {
		color: var(--text-muted);
	}

	.detail-value {
		color: var(--text-secondary);
		font-weight: 500;
	}

	.word-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.word-action {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 6px;
		background-color: var(--bg-light);
		color: var(--text-muted);
		transition: all 0.2s;
		border: none;
		cursor: pointer;
	}

	.word-action.lookup {
		text-decoration: none;
	}

	.word-action.lookup:hover {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
	}

	.word-action.delete:hover {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	@media (max-width: 768px) {
		.vocabulary-controls {
			flex-direction: column;
		}

		.words-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 600px) {
		.word-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}
	}
</style>
