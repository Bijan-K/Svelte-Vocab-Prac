<!-- src\lib\components\Menu\DataFileHandler.svelte -->
<script>
	import { data, stats, DATA_VERSION, createNewWord } from '$lib/stores';
	import { slide } from 'svelte/transition';

	let exportSuccess = false;
	let importSuccess = false;
	let importError = '';

	function showExportSuccess() {
		exportSuccess = true;
		setTimeout(() => {
			exportSuccess = false;
		}, 3000);
	}

	function showImportSuccess() {
		importSuccess = true;
		setTimeout(() => {
			importSuccess = false;
		}, 3000);
	}

	function showImportError(message) {
		importError = message;
		setTimeout(() => {
			importError = '';
		}, 5000);
	}

	function handleDownload() {
		try {
			const exportData = {
				version: DATA_VERSION,
				timestamp: new Date().toISOString(),
				data: $data,
				stats: $stats
			};

			const jsonString = JSON.stringify(exportData, null, 2);
			const blob = new Blob([jsonString], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;

			// Generate filename with timestamp
			const now = new Date();
			const dateStr = now.toISOString().split('T')[0];
			a.download = `vocabulary-data-${dateStr}.json`;

			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			showExportSuccess();
		} catch (error) {
			console.error('Error exporting data:', error);
			showImportError('Error exporting data. Please try again.');
		}
	}

	function migrateOldFormat(importedData) {
		// Check if it's the old array format
		if (Array.isArray(importedData) && importedData.length === 2) {
			console.log('Migrating from old format...');
			const [oldData, oldStats] = importedData;

			// Migrate data structure
			const migratedData = oldData.map((langData) => ({
				...langData,
				lists: langData.lists.map((list) => ({
					...list,
					words: list.words.map((word) => {
						// If word already has new structure, keep it
						if (word.level !== undefined) return word;

						// Migrate from old boolean structure
						return createNewWord(word.word);
					})
				}))
			}));

			// Migrate stats structure
			const migratedStats = {
				...oldStats,
				version: DATA_VERSION,
				record: {
					...oldStats.record,
					info: {
						...oldStats.record.info,
						totalReviews: oldStats.record.info.totalReviews || 0,
						newWords: oldStats.record.info.newWords || 0
					}
				},
				mistake_lang: oldStats.mistake_lang.map((langMistakes) => ({
					...langMistakes,
					llmPrompt: langMistakes.llmPrompt || 'What is the meaning of'
				})),
				srs: {
					totalWordsLearning: 0,
					wordsReviewedToday: 0,
					averageAccuracy: 0,
					longestStreak: 0
				}
			};

			return { data: migratedData, stats: migratedStats };
		}

		// Check if it's the new format
		if (importedData.version && importedData.data && importedData.stats) {
			console.log('Loading new format...');
			return { data: importedData.data, stats: importedData.stats };
		}

		throw new Error('Unrecognized file format');
	}

	function handleUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const json = JSON.parse(e.target.result);

					const { data: migratedData, stats: migratedStats } = migrateOldFormat(json);

					// Validate the migrated data structure
					if (!Array.isArray(migratedData) || typeof migratedStats !== 'object') {
						showImportError('Invalid file format. Please upload a valid vocabulary data file.');
						return;
					}

					// Additional validation for data structure
					const isValidData = migratedData.every(
						(lang) =>
							lang.lang &&
							Array.isArray(lang.lists) &&
							lang.lists.every(
								(list) =>
									list.name &&
									Array.isArray(list.words) &&
									list.words.every(
										(word) =>
											typeof word.word === 'string' &&
											typeof word.level === 'number' &&
											typeof word.dueDate === 'string'
									)
							)
					);

					if (!isValidData) {
						showImportError('Invalid data structure in file. Please check the file format.');
						return;
					}

					data.set(migratedData);
					stats.set(migratedStats);
					showImportSuccess();
				} catch (error) {
					console.error('Error parsing JSON:', error);
					showImportError(
						"Error parsing the file. Please make sure it's a valid vocabulary data file."
					);
				}
			};
			reader.readAsText(file);
		}

		// Reset the file input
		event.target.value = '';
	}
</script>

<div class="data-file-handler">
	<div class="action-buttons">
		<button class="action-btn export-btn" on:click={handleDownload}>
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
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="7 10 12 15 17 10"></polyline>
				<line x1="12" y1="15" x2="12" y2="3"></line>
			</svg>
			<span>Export Data</span>
		</button>

		<button
			class="action-btn import-btn"
			on:click={() => document.getElementById('fileInput').click()}
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
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="17 8 12 3 7 8"></polyline>
				<line x1="12" y1="3" x2="12" y2="15"></line>
			</svg>
			<span>Import Data</span>
		</button>

		<input
			id="fileInput"
			type="file"
			accept=".json"
			on:change={handleUpload}
			style="display: none;"
		/>
	</div>

	{#if exportSuccess}
		<div class="status-message success" transition:slide={{ duration: 200 }}>
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
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
				<polyline points="22 4 12 14.01 9 11.01"></polyline>
			</svg>
			<span>Data exported successfully with SRS support!</span>
		</div>
	{/if}

	{#if importSuccess}
		<div class="status-message success" transition:slide={{ duration: 200 }}>
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
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
				<polyline points="22 4 12 14.01 9 11.01"></polyline>
			</svg>
			<span>Data imported successfully! Old format automatically migrated.</span>
		</div>
	{/if}

	{#if importError}
		<div class="status-message error" transition:slide={{ duration: 200 }}>
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
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="8" x2="12" y2="12"></line>
				<line x1="12" y1="16" x2="12.01" y2="16"></line>
			</svg>
			<span>{importError}</span>
		</div>
	{/if}

	<div class="info-note">
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
			<circle cx="12" cy="12" r="10"></circle>
			<line x1="12" y1="16" x2="12" y2="12"></line>
			<line x1="12" y1="8" x2="12.01" y2="8"></line>
		</svg>
		<span
			>Your data includes spaced repetition progress. Export regularly to back up your learning
			progress. Old format files are automatically migrated.</span
		>
	</div>
</div>

<style>
	.data-file-handler {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.action-buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 8px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border: 1px solid var(--border-light);
		font-size: 0.9rem;
	}

	.export-btn {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
		border-color: rgba(14, 165, 233, 0.2);
	}

	.export-btn:hover {
		background-color: rgba(14, 165, 233, 0.2);
	}

	.import-btn {
		background-color: var(--bg-light);
		color: var(--text-secondary);
	}

	.import-btn:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.status-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	.success {
		background-color: rgba(16, 185, 129, 0.1);
		color: #34d399;
	}

	.error {
		background-color: rgba(239, 68, 68, 0.1);
		color: #f87171;
	}

	.info-note {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-muted);
		padding: 0.5rem;
		background-color: var(--bg-dark);
		border-radius: 6px;
		margin-top: 0.5rem;
	}

	.info-note svg {
		flex-shrink: 0;
		margin-top: 0.2rem;
	}
</style>
