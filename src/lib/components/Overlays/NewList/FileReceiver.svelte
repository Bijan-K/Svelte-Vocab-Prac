<!-- src\lib\components\Overlays\NewList\FileReceiver.svelte -->
<script>
	import { slide, fade } from 'svelte/transition';
	import { fileWords } from '$lib/stores';

	let isDragging = false;
	let fileName = '';
	let fileType = '';
	let words = [];
	let error = '';
	let success = '';

	function handleFileDrop(event) {
		event.preventDefault();
		isDragging = false;

		const file = event.dataTransfer.files[0];
		if (file) {
			processFile(file);
		}
	}

	function handleDragOver(event) {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file) {
			processFile(file);
		}
	}

	function processFile(file) {
		fileName = file.name;
		fileType = file.type;
		error = '';
		success = '';

		// Validate file type
		if (fileType !== 'application/json' && fileType !== 'text/plain') {
			error = 'Unsupported file type. Please upload a JSON or TXT file.';
			return;
		}

		const reader = new FileReader();

		reader.onload = (e) => {
			const content = e.target.result;
			try {
				if (fileType === 'application/json') {
					const parsed = JSON.parse(content);
					if (!Array.isArray(parsed)) {
						error = 'Invalid JSON format. Expected an array of words.';
						return;
					}
					words = parsed.map((word) => ({
						word: word.replace(/\r/g, '').trim(),
						known: false
					}));
				} else {
					const lines = content
						.replace(/\r/g, '')
						.split('\n')
						.map((line) => line.trim())
						.filter((line) => line !== '');
					words = lines.map((theWord) => ({
						word: theWord.trim(),
						known: false
					}));
				}

				fileWords.set(words);
				success = `Successfully loaded ${words.length} words from "${fileName}"`;
			} catch (err) {
				console.error('Error processing file:', err);
				error = 'Error processing file. Please check the format.';
			}
		};

		reader.readAsText(file);
	}
</script>

<div
	class="file-receiver"
	class:is-dragging={isDragging}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:drop={handleFileDrop}
	in:fade={{ duration: 200 }}
>
	<label for="file-input" class="file-input-label">
		<div class="file-upload-area">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
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
			<span class="upload-text">
				{isDragging ? 'Drop file here' : 'Click to upload or drag a file'}
			</span>
			<span class="supported-files">Supports JSON or TXT files</span>
		</div>
		<input
			id="file-input"
			type="file"
			accept=".json,.txt"
			on:change={handleFileUpload}
			class="visually-hidden"
		/>
	</label>

	{#if fileName && !error}
		<div class="file-info" in:slide={{ duration: 200 }}>
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
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
				<polyline points="14 2 14 8 20 8"></polyline>
				<line x1="16" y1="13" x2="8" y2="13"></line>
				<line x1="16" y1="17" x2="8" y2="17"></line>
				<polyline points="10 9 9 9 8 9"></polyline>
			</svg>
			<span class="file-name">{fileName}</span>
		</div>
	{/if}

	{#if error}
		<div class="error-message" in:slide={{ duration: 200 }}>
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
			<span>{error}</span>
		</div>
	{/if}

	{#if success}
		<div class="success-message" in:slide={{ duration: 200 }}>
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
			<span>{success}</span>
		</div>
	{/if}

	<div class="file-format-help">
		<h4>File Format Requirements:</h4>
		<div class="format-examples">
			<div class="format-example">
				<span class="format-label">JSON</span>
				<pre><code>["word1", "word2", "word3"]</code></pre>
			</div>
			<div class="format-example">
				<span class="format-label">TXT</span>
				<pre><code
						>word1
word2
word3</code
					></pre>
			</div>
		</div>
	</div>
</div>

<style>
	.file-receiver {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.file-input-label {
		cursor: pointer;
		display: block;
	}

	.file-upload-area {
		border: 2px dashed var(--border-light);
		border-radius: 8px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s;
		color: var(--text-muted);
		text-align: center;
	}

	.file-upload-area:hover,
	.is-dragging .file-upload-area {
		border-color: var(--primary);
		background-color: rgba(14, 165, 233, 0.05);
	}

	.upload-text {
		font-weight: 500;
		margin-top: 0.5rem;
		color: var(--text-secondary);
	}

	.supported-files {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.file-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--bg-light);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	.file-name {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.error-message,
	.success-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	.error-message {
		background-color: rgba(239, 68, 68, 0.1);
		color: #f87171;
	}

	.success-message {
		background-color: rgba(16, 185, 129, 0.1);
		color: #34d399;
	}

	.file-format-help {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.file-format-help h4 {
		margin-bottom: 0.5rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.format-examples {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.format-example {
		flex: 1;
	}

	.format-label {
		display: inline-block;
		background-color: var(--bg-light);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: monospace;
		margin-bottom: 0.25rem;
	}

	pre {
		background-color: var(--bg-dark);
		border-radius: 4px;
		padding: 0.5rem;
		overflow-x: auto;
		font-size: 0.8rem;
		margin: 0;
	}

	code {
		font-family: monospace;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	@media (max-width: 600px) {
		.format-examples {
			flex-direction: column;
			gap: 0.5rem;
		}
	}
</style>
