<!-- src\lib\components\Overlays\NewLang\NewLangBoard.svelte -->
<script>
	import { UIIcons } from '$lib/Icons/index.js';
	import { data, current, stats, overlayState, fileWords } from '$lib/stores';
	import { addNewLangToDataAndStats, addNewListToLang, addWordsToList } from '$lib/utils';
	import { fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let lang = '';
	let newlist = '';
	let define = '';

	let step = 1;
	let isFormValid = false;

	function closeHandler() {
		overlayState.update((n) => !n);
	}

	function addHandler() {
		let [newData, newStats] = addNewLangToDataAndStats($data, $stats, lang, define);

		data.update((n) => newData);
		stats.update((n) => newStats);
		current.update((n) => {
			n.lang = lang.toLowerCase();
			return n;
		});

		if (newlist !== '') {
			newData = addNewListToLang($data, $current.lang, newlist);
			if ($fileWords.length > 0) {
				newData = addWordsToList($data, $current.lang, newlist, $fileWords);
			}
		}

		fileWords.set([]);

		closeHandler();
	}

	$: isFormValid = lang !== '';
	$: canContinue = step === 1 ? lang !== '' : define !== '';
</script>

<div class="modal-overlay" on:click={closeHandler}>
	<div
		class="modal-content"
		on:click|stopPropagation
		in:scale={{ duration: 300, start: 0.9, opacity: 0 }}
	>
		<div class="modal-header">
			<h2>Add New Language</h2>
			<button class="close-btn" on:click={closeHandler} aria-label="Close">
				<UIIcons icon="x" />
			</button>
		</div>

		<div class="modal-body">
			{#if step === 1}
				<div class="form-group" in:fly={{ y: 20, duration: 300 }}>
					<label for="lang-name">Language Name</label>
					<input
						id="lang-name"
						type="text"
						bind:value={lang}
						placeholder="e.g. Spanish, French, Japanese"
						required
					/>
					<div class="optional-list">
						<label for="list-name">Custom List Name (Optional)</label>
						<input
							id="list-name"
							type="text"
							bind:value={newlist}
							placeholder="e.g. Travel Vocabulary, Business Terms"
						/>
						<small>A "mistakes" list will be created by default</small>
					</div>
				</div>
			{:else if step === 2}
				<div class="form-group" in:fly={{ y: 20, duration: 300 }}>
					<label for="define-word">Define Keyword</label>
					<input
						id="define-word"
						type="text"
						bind:value={define}
						placeholder="Translation of 'define' in {lang} (for lookups)"
						required
					/>
					<small
						>This will be used for dictionary lookups in Google (e.g. "define" in English)</small
					>
				</div>
			{/if}
		</div>

		<div class="modal-footer">
			{#if step === 1}
				<button class="btn btn-primary" on:click={() => (step = 2)} disabled={!canContinue}>
					Continue
				</button>
			{:else if step === 2}
				<div class="btn-group">
					<button class="btn btn-outline" on:click={() => (step = 1)}> Back </button>
					<button class="btn btn-primary" on:click={addHandler} disabled={!canContinue}>
						Add Language
					</button>
				</div>
			{/if}
		</div>

		<div class="modal-progress">
			<div class="progress-dots">
				<span class="dot" class:active={step === 1}></span>
				<span class="dot" class:active={step === 2}></span>
			</div>
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
		max-width: 500px;
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
		padding: 2rem 1.5rem;
		min-height: 200px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	label {
		font-weight: 500;
		color: var(--text-secondary);
		margin-bottom: -0.5rem;
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

	.optional-list {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px dashed var(--border-dark);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	small {
		color: var(--text-muted);
		font-size: 0.85rem;
		margin-top: -0.5rem;
	}

	.modal-footer {
		padding: 1.5rem;
		border-top: 1px solid var(--border-dark);
		display: flex;
		justify-content: flex-end;
	}

	.btn-group {
		display: flex;
		gap: 1rem;
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

	.btn-outline {
		background-color: transparent;
		border: 1px solid var(--border-light);
		color: var(--text-secondary);
	}

	.btn-outline:hover {
		background-color: var(--bg-light);
		color: var(--text-primary);
	}

	.modal-progress {
		padding: 1rem;
		display: flex;
		justify-content: center;
	}

	.progress-dots {
		display: flex;
		gap: 0.5rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--border-light);
		transition: all 0.2s;
	}

	.dot.active {
		background-color: var(--primary);
		transform: scale(1.2);
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
			padding: 1.5rem 1.25rem;
		}
	}
</style>
