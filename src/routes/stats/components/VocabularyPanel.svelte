<!-- src\routes\stats\components\VocabularyPanel.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { data, current } from '$lib/stores';
	import { capitalizeWord, returnListsOfLang, returnWordsInList, addWordtoList } from '$lib/utils';
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

	// Handle enter key press to add word
	function handleKeyPress(event) {
		if (event.key === 'Enter' && newWord.trim()) {
			addNewWord();
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
					{/if}
				</button>
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
					<div class="word-card" class:known={word.known} animate:flip={{ duration: 200 }}>
						<div class="word-text">{word.word}</div>
						<div class="word-status">
							{#if word.known}
								<span class="status known">
									<UIIcons icon="check" />
								</span>
							{:else}
								<span class="status unknown">
									<UIIcons icon="negative" />
								</span>
							{/if}
						</div>
						<div class="word-actions">
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
		position: relative;
		min-width: 200px;
	}

	.search-input {
		width: 100%;
		background-color: var(--bg-dark);
		color: var(--text-secondary);
		border: 1px solid var(--border-dark);
		border-radius: 6px;
		padding: 0.5rem 0.75rem;
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
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clear-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
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
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 1rem;
	}

	.word-card {
		background-color: var(--bg-dark);
		border-radius: 8px;
		padding: 1rem;
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: all 0.2s;
		border-left: 3px solid var(--border-light);
	}

	.word-card.known {
		border-left-color: #10b981;
	}

	.word-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.word-text {
		font-weight: 500;
		color: var(--text-secondary);
		word-break: break-word;
	}

	.word-status {
		font-size: 0.9rem;
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.85rem;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.status.known {
		background-color: rgba(16, 185, 129, 0.1);
		color: #10b981;
	}

	.status.unknown {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.word-actions {
		display: flex;
		justify-content: flex-end;
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
	}

	.word-action.lookup:hover {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
	}

	@media (max-width: 768px) {
		.vocabulary-controls {
			flex-direction: column;
		}
	}

	@media (max-width: 600px) {
		.words-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
