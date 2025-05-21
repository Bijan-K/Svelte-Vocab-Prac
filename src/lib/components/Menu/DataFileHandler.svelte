<!-- src\lib\components\Menu\DataFileHandler.svelte -->
<script>
	import { data, stats } from '$lib/stores';
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
			const jsonString = JSON.stringify([$data, $stats]);
			const blob = new Blob([jsonString], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = 'vocabulary-data.json';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			showExportSuccess();
		} catch (error) {
			console.error('Error exporting data:', error);
		}
	}

	function handleUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const json = JSON.parse(e.target.result);

					if (!Array.isArray(json) || json.length !== 2) {
						showImportError('Invalid file format. Please upload a valid vocabulary data file.');
						return;
					}

					data.set(json[0]);
					stats.set(json[1]);
					showImportSuccess();
				} catch (error) {
					console.error('Error parsing JSON:', error);
					showImportError("Error parsing the file. Please make sure it's a valid JSON file.");
				}
			};
			reader.readAsText(file);
		}
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
			<span>Data exported successfully!</span>
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
			<span>Data imported successfully!</span>
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
			>Your data is stored locally in your browser. Export regularly to back up your vocabulary
			lists.</span
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
