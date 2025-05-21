<!-- src\routes\practice\PracticeHeader.svelte -->
<script>
	import { fade, slide } from 'svelte/transition';
	import { data, current, overlayMode, overlayState, langs, lists } from '$lib/stores';
	import { newCurrentList, returnSingleWord, capitalizeWord, returnListsOfLang } from '$lib/utils';

	let showLanguages = false;
	let showLists = false;

	function toggleLanguages() {
		showLanguages = !showLanguages;
		if (showLanguages) showLists = false;
	}

	function toggleLists() {
		showLists = !showLists;
		if (showLists) showLanguages = false;
	}

	function selectLanguage(lang) {
		const selectedLang = lang.toLowerCase();

		if (selectedLang !== $current.lang.toLowerCase()) {
			current.update((n) => {
				let tmp = n;
				tmp.lang = selectedLang;
				tmp.list = returnListsOfLang($data, tmp.lang)[0];
				tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));
				return tmp;
			});
		}

		showLanguages = false;
	}

	function selectList(list) {
		const selectedList = list.toLowerCase();

		if (selectedList !== $current.list.toLowerCase()) {
			current.update((n) => {
				let tmp = n;
				tmp.list = selectedList;
				tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));
				return tmp;
			});
		}

		showLists = false;
	}

	function addNewLanguage() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlang');
		showLanguages = false;
	}

	function addNewList() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlist');
		showLists = false;
	}

	// Close dropdowns when clicking outside
	function handleClickOutside(event) {
		if (!event.target.closest('.dropdown-container')) {
			showLanguages = false;
			showLists = false;
		}
	}

	$: remaining = newCurrentList($data, $current.lang, $current.list);
</script>

<svelte:window on:click={handleClickOutside} />

<div class="practice-header">
	<div class="selectors">
		<div class="dropdown-container">
			<button
				class="selector-btn"
				class:active={showLanguages}
				on:click|stopPropagation={toggleLanguages}
			>
				<span>{capitalizeWord($current.lang)}</span>
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
					style="transform: rotate({showLanguages ? '180deg' : '0deg'}); transition: transform 0.2s"
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>

			{#if showLanguages}
				<div class="dropdown-menu" transition:slide={{ duration: 150 }} on:click|stopPropagation>
					{#each $langs as lang}
						<button
							class="dropdown-item"
							class:active={lang.toLowerCase() === $current.lang.toLowerCase()}
							on:click={() => selectLanguage(lang)}
						>
							{capitalizeWord(lang)}
						</button>
					{/each}

					<button class="dropdown-item add-item" on:click={addNewLanguage}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
						<span>Add Language</span>
					</button>
				</div>
			{/if}
		</div>

		<div class="divider">/</div>

		<div class="dropdown-container">
			<button class="selector-btn" class:active={showLists} on:click|stopPropagation={toggleLists}>
				<span>{capitalizeWord($current.list)}</span>
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
					style="transform: rotate({showLists ? '180deg' : '0deg'}); transition: transform 0.2s"
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>

			{#if showLists}
				<div class="dropdown-menu" transition:slide={{ duration: 150 }} on:click|stopPropagation>
					{#each $lists as list}
						<button
							class="dropdown-item"
							class:active={list.toLowerCase() === $current.list.toLowerCase()}
							on:click={() => selectList(list)}
						>
							{capitalizeWord(list)}
						</button>
					{/each}

					<button class="dropdown-item add-item" on:click={addNewList}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
						<span>Add List</span>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<div class="word-info">
		<div class="word-count">
			Remaining: <span class="count">{remaining.length || 'None'}</span>
		</div>
	</div>
</div>

<style>
	.practice-header {
		position: absolute;
		top: 80px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		z-index: 20;
	}

	.selectors {
		display: flex;
		align-items: center;
		background-color: rgba(30, 41, 59, 0.7);
		backdrop-filter: blur(8px);
		border-radius: 8px;
		padding: 0.5rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.dropdown-container {
		position: relative;
	}

	.selector-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		padding: 0.5rem 0.75rem;
		color: var(--text-secondary);
		cursor: pointer;
		font-weight: 500;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.selector-btn:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.selector-btn.active {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
	}

	.divider {
		color: var(--text-muted);
		margin: 0 0.25rem;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 5px);
		left: 0;
		min-width: 180px;
		background-color: var(--bg-medium);
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		z-index: 30;
		overflow: hidden;
		max-height: 300px;
		overflow-y: auto;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background: none;
		border: none;
		text-align: left;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s;
	}

	.dropdown-item:hover {
		background-color: var(--bg-light);
	}

	.dropdown-item.active {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
		font-weight: 500;
	}

	.add-item {
		border-top: 1px solid var(--border-dark);
		color: var(--primary);
	}

	.word-info {
		display: flex;
		align-items: center;
		background-color: rgba(30, 41, 59, 0.7);
		backdrop-filter: blur(8px);
		border-radius: 8px;
		padding: 0.5rem 1rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.word-count {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.count {
		font-weight: 600;
		color: var(--text-secondary);
		margin-left: 0.25rem;
	}

	@media (max-width: 600px) {
		.practice-header {
			padding: 0.75rem 1rem;
			flex-direction: column;
			gap: 0.5rem;
			align-items: stretch;
		}

		.selectors {
			width: 100%;
			justify-content: center;
		}

		.word-info {
			justify-content: center;
		}
	}
</style>
