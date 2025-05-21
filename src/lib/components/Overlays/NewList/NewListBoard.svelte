<!-- src\lib\components\Overlays\NewList\NewListBoard.svelte -->
<script>
	import { UIIcons } from '$lib/Icons/index.js';
	import { data, current, overlayState, fileWords } from '$lib/stores';
	import { newCurrentList, addNewListToLang, addWordsToList, returnSingleWord } from '$lib/utils';
	import { scale, fade, slide } from 'svelte/transition';
	import FileReceiver from './FileReceiver.svelte';

	let listName = '';
	let isImporting = false;

	function capitalizeFirstLetter(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function closeHandler() {
		overlayState.update((n) => !n);
	}

	function conformAddList() {
		data.update((n) => {
			let newData = addNewListToLang($data, $current.lang, listName);
			if ($fileWords.length > 0) {
				newData = addWordsToList($data, $current.lang, listName, $fileWords);
			}
			return newData;
		});

		fileWords.set([]);

		current.update((n) => {
			n.list = listName.toLowerCase();
			n.word = returnSingleWord(newCurrentList($data, n.lang, n.list));
			return n;
		});

		closeHandler();
	}
</script>

<div class="modal-overlay" on:click={closeHandler}>
	<div
		class="modal-content"
		on:click|stopPropagation
		in:scale={{ duration: 300, start: 0.9, opacity: 0 }}
	>
		<div class="modal-header">
			<h2>Add New List</h2>
			<button class="close-btn" on:click={closeHandler} aria-label="Close">
				<UIIcons icon="x" />
			</button>
		</div>

		<div class="modal-body">
			<div class="language-badge">
				<span>Language:</span>
				<strong>{capitalizeFirstLetter($current.lang)}</strong>
			</div>

			<div class="form-group">
				<label for="list-name">List Name</label>
				<input
					id="list-name"
					type="text"
					bind:value={listName}
					placeholder="e.g. Favorites, Business, Travel"
					required
				/>
			</div>

			<div class="import-toggle">
				<button
					class="toggle-btn"
					class:active={isImporting}
					on:click={() => (isImporting = !isImporting)}
				>
					<span class="toggle-text">Import words from file</span>
					<span class="toggle-icon">
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
							style="transform: rotate({isImporting
								? '180deg'
								: '0deg'}); transition: transform 0.3s"
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</span>
				</button>

				{#if isImporting}
					<div class="import-section" transition:slide={{ duration: 300 }}>
						<FileReceiver />
					</div>
				{/if}
			</div>

			<div class="tips" in:fade={{ duration: 200 }}>
				<div class="tip-header">
					<UIIcons icon="info" />
					<span>Quick Tips:</span>
				</div>
				<ul>
					<li>Lists can be used to categorize your vocabulary</li>
					<li>You can add words to an existing list at any time</li>
					<li>The "Mistakes" list tracks words you find difficult</li>
				</ul>
			</div>
		</div>

		<div class="modal-footer">
			<button class="btn btn-primary" on:click={conformAddList} disabled={!listName}>
				Add List
			</button>
		</div>
	</div>
</div>

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal-content {
		background-color: var(--bg-medium);
		border-radius: 12px;
		width: 100%;
		max-width: 550px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
		overflow: hidden;
		position: relative;
	}

	.modal-header {
		padding: 1.5rem;
		border-bottom: 1px solid var(--border-dark);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: var(--text-primary);
	}

	.close-btn {
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background-color: var(--bg-light);
		color: var(--text-primary);
	}

	.modal-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.language-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--bg-light);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
		color: var(--text-muted);
		align-self: flex-start;
	}

	.language-badge strong {
		color: var(--primary);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: 500;
		color: var(--text-secondary);
	}

	input {
		background-color: var(--bg-light);
		border: 1px solid var(--border-light);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		color: var(--text-primary);
		font-size: 1rem;
		transition: all 0.2s;
	}

	input:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
		outline: none;
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.7;
	}

	.import-toggle {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.toggle-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--bg-light);
		border: 1px solid var(--border-dark);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s;
		width: 100%;
		text-align: left;
	}

	.toggle-btn:hover {
		background-color: rgba(51, 65, 85, 0.7);
	}

	.toggle-btn.active {
		background-color: rgba(14, 165, 233, 0.1);
		border-color: var(--primary);
		color: var(--primary);
	}

	.toggle-text {
		font-weight: 500;
	}

	.import-section {
		background-color: var(--bg-dark);
		border-radius: 8px;
		padding: 1rem;
	}

	.tips {
		background-color: rgba(14, 165, 233, 0.05);
		border: 1px solid rgba(14, 165, 233, 0.1);
		border-radius: 8px;
		padding: 1rem;
	}

	.tip-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--primary);
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.tips ul {
		margin: 0.5rem 0 0 1.5rem;
		padding: 0;
		color: var(--text-muted);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.modal-footer {
		padding: 1.5rem;
		border-top: 1px solid var(--border-dark);
		display: flex;
		justify-content: flex-end;
	}

	.btn {
		padding: 0.75rem 1.25rem;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border: none;
		font-size: 0.95rem;
	}

	.btn-primary {
		background-color: var(--primary);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background-color: var(--primary-dark);
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 600px) {
		.modal-content {
			height: auto;
			max-height: 90vh;
		}

		.modal-header h2 {
			font-size: 1.3rem;
		}

		.modal-body {
			padding: 1.25rem;
			gap: 1.25rem;
		}
	}
</style>
