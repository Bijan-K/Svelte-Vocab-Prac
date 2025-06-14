<!-- src/lib/components/Dictionary/DictionaryResult.svelte -->
<script>
	import { onMount } from 'svelte';
	import { UIIcons } from '$lib/Icons/index.js';
	import { fade, slide } from 'svelte/transition';
	import { current, stats } from '$lib/stores';

	export let word = '';
	export let fallbackSearch = true;

	let loading = false;
	let error = false;
	let wordData = null;
	let activeTab = 0;
	let audioSrc = '';
	let copySuccess = false;

	// Check if current language is English
	$: isEnglish = $current?.lang?.toLowerCase() === 'english';

	// Get define keyword for current language
	function getDefineKeyword() {
		if (!$stats?.mistake_lang) return 'define';

		const langData = $stats.mistake_lang.find(
			(l) => l.lang.toLowerCase() === $current?.lang?.toLowerCase()
		);

		return langData?.defineKeyword || 'define';
	}

	// Get LLM prompt for current language
	function getLLMPrompt() {
		if (!$stats?.mistake_lang) return 'What is the meaning of';

		const langData = $stats.mistake_lang.find(
			(l) => l.lang.toLowerCase() === $current?.lang?.toLowerCase()
		);

		return langData?.llmPrompt || 'What is the meaning of';
	}

	async function fetchWordData() {
		if (!word) return;

		// For non-English languages, immediately redirect to Google
		if (!isEnglish) {
			openGoogleSearch();
			return;
		}

		loading = true;
		error = false;
		wordData = null;

		try {
			const response = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
			);

			if (!response.ok) {
				throw new Error('Word not found');
			}

			const data = await response.json();
			wordData = data[0];

			// Find first available audio
			const audioPhonetic = wordData.phonetics.find((p) => p.audio && p.audio.trim() !== '');
			if (audioPhonetic) {
				audioSrc = audioPhonetic.audio.startsWith('//')
					? 'https:' + audioPhonetic.audio
					: audioPhonetic.audio;
			}
		} catch (err) {
			console.error('Error fetching word:', err);
			error = true;

			if (fallbackSearch) {
				openGoogleSearch();
			}
		} finally {
			loading = false;
		}
	}

	function openGoogleSearch() {
		if (!word) return;
		const defineKeyword = getDefineKeyword();
		window.open(
			`https://www.google.com/search?q=${defineKeyword}+${encodeURIComponent(word)}`,
			'_blank'
		);
	}

	async function copyLLMPrompt() {
		const llmPrompt = getLLMPrompt();
		const promptText = `${llmPrompt} "${word}"`;

		try {
			await navigator.clipboard.writeText(promptText);
			copySuccess = true;
			setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = promptText;
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			try {
				document.execCommand('copy');
				copySuccess = true;
				setTimeout(() => {
					copySuccess = false;
				}, 2000);
			} catch (fallbackErr) {
				console.error('Fallback copy failed: ', fallbackErr);
			}
			document.body.removeChild(textArea);
		}
	}

	function playAudio() {
		if (audioSrc) {
			const audio = new Audio(audioSrc);
			audio.play();
		}
	}

	$: if (word) fetchWordData();
</script>

<div class="dictionary-result">
	{#if !isEnglish}
		<div class="non-english-message" in:fade>
			<p>
				Opening Google search for <strong>{word}</strong> in {$current?.lang ||
					'selected language'}...
			</p>
			<div class="action-buttons">
				<button on:click={openGoogleSearch} class="google-button"> Open Google Search </button>
				<button on:click={copyLLMPrompt} class="copy-button" class:success={copySuccess}>
					{#if copySuccess}
						<UIIcons icon="check" />
						Copied!
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
							<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
							<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
						</svg>
						Copy LLM Prompt
					{/if}
				</button>
			</div>
		</div>
	{:else if loading}
		<div class="loading" in:fade>
			<div class="loader"></div>
			<p>Looking up <strong>{word}</strong>...</p>
		</div>
	{:else if error}
		<div class="error" in:fade>
			<p>Sorry, couldn't find the definition for <strong>{word}</strong>.</p>
			<div class="action-buttons">
				{#if !fallbackSearch}
					<button on:click={openGoogleSearch} class="google-button"> Search on Google </button>
				{/if}
				<button on:click={copyLLMPrompt} class="copy-button" class:success={copySuccess}>
					{#if copySuccess}
						<UIIcons icon="check" />
						Copied!
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
							<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
							<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
						</svg>
						Copy LLM Prompt
					{/if}
				</button>
			</div>
		</div>
	{:else if wordData}
		<div class="result" in:slide={{ duration: 300 }}>
			<div class="word-header">
				<h2>{wordData.word}</h2>
				{#if wordData.phonetic}
					<div class="phonetic">
						<span>{wordData.phonetic}</span>
						{#if audioSrc}
							<button on:click={playAudio} class="play-button">
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
									<path d="M11 5L6 9H2v6h4l5 4V5z"></path>
									<path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
									<path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
								</svg>
							</button>
						{/if}
					</div>
				{/if}
				<div class="header-actions">
					<button on:click={copyLLMPrompt} class="copy-button" class:success={copySuccess}>
						{#if copySuccess}
							<UIIcons icon="check" />
							Copied!
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
								<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
								<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
							</svg>
							Copy LLM Prompt
						{/if}
					</button>
				</div>
			</div>

			<!-- Tab navigation for meanings -->
			{#if wordData.meanings && wordData.meanings.length > 0}
				<div class="meaning-tabs">
					{#each wordData.meanings as meaning, i}
						<button
							class="tab-button"
							class:active={activeTab === i}
							on:click={() => (activeTab = i)}
						>
							{meaning.partOfSpeech}
						</button>
					{/each}
				</div>

				<!-- Tab content -->
				<div class="meaning-content">
					{#each wordData.meanings[activeTab].definitions as definition, i}
						<div class="definition" in:fade={{ duration: 150 }}>
							<span class="definition-number">{i + 1}.</span>
							<div class="definition-content">
								<p class="definition-text">{definition.definition}</p>
								{#if definition.example}
									<p class="example">"{definition.example}"</p>
								{/if}
								{#if definition.synonyms && definition.synonyms.length > 0}
									<div class="synonyms">
										<span class="label">Synonyms:</span>
										<div class="synonym-list">
											{#each definition.synonyms.slice(0, 5) as synonym}
												<span class="synonym">{synonym}</span>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}

			{#if wordData.origin}
				<div class="origin">
					<h4>Origin</h4>
					<p>{wordData.origin}</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.dictionary-result {
		background-color: rgba(30, 41, 59, 0.95);
		border-radius: 12px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
		padding: 1.5rem;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		color: #f8fafc;
		overflow-y: auto;
		max-height: 80vh;
	}

	.loading,
	.error,
	.non-english-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		text-align: center;
	}

	.loader {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #64748b;
		animation: spin 1s ease-in-out infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.word-header {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 1rem;
	}

	h2 {
		font-size: 2rem;
		margin: 0;
		color: #e2e8f0;
		font-weight: 600;
	}

	.phonetic {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;
		color: #94a3b8;
		font-size: 1.1rem;
	}

	.play-button {
		background: none;
		border: none;
		color: #64748b;
		cursor: pointer;
		padding: 0.2rem;
		margin-left: 0.5rem;
		transition: color 0.2s;
	}

	.play-button:hover {
		color: #f8fafc;
	}

	.header-actions {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
	}

	.action-buttons {
		display: flex;
		gap: 0.75rem;
		margin-top: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.google-button {
		background: #0ea5e9;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.google-button:hover {
		background: #0284c7;
	}

	.copy-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: rgba(139, 92, 246, 0.1);
		color: #a78bfa;
		border: 1px solid rgba(139, 92, 246, 0.2);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
	}

	.copy-button:hover {
		background: rgba(139, 92, 246, 0.2);
	}

	.copy-button.success {
		background: rgba(16, 185, 129, 0.1);
		color: #10b981;
		border-color: rgba(16, 185, 129, 0.2);
	}

	.meaning-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.tab-button {
		background: #334155;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 50px;
		color: #cbd5e1;
		cursor: pointer;
		font-size: 0.9rem;
		transition: all 0.2s;
	}

	.tab-button:hover {
		background: #475569;
	}

	.tab-button.active {
		background: #0ea5e9;
		color: #f8fafc;
	}

	.meaning-content {
		margin-bottom: 1.5rem;
	}

	.definition {
		display: flex;
		margin-bottom: 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.definition:last-child {
		border-bottom: none;
	}

	.definition-number {
		color: #64748b;
		font-weight: 600;
		margin-right: 0.75rem;
		flex-shrink: 0;
	}

	.definition-content {
		flex: 1;
	}

	.definition-text {
		margin: 0 0 0.5rem 0;
		line-height: 1.5;
	}

	.example {
		color: #94a3b8;
		font-style: italic;
		margin: 0.5rem 0;
		line-height: 1.5;
	}

	.synonyms {
		display: flex;
		flex-direction: column;
		margin-top: 0.75rem;
	}

	.label {
		color: #64748b;
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}

	.synonym-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.synonym {
		background: #334155;
		color: #cbd5e1;
		padding: 0.25rem 0.75rem;
		border-radius: 50px;
		font-size: 0.85rem;
	}

	.origin {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1rem;
		margin-top: 0.5rem;
	}

	.origin h4 {
		color: #64748b;
		margin: 0 0 0.5rem 0;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.origin p {
		color: #cbd5e1;
		margin: 0;
		line-height: 1.5;
		font-size: 0.95rem;
	}

	.non-english-message {
		color: #cbd5e1;
	}

	.non-english-message p {
		margin-bottom: 1rem;
		font-size: 1rem;
	}

	@media (max-width: 600px) {
		.dictionary-result {
			padding: 1rem;
			border-radius: 8px;
		}

		h2 {
			font-size: 1.5rem;
		}

		.tab-button {
			padding: 0.35rem 0.75rem;
			font-size: 0.8rem;
		}

		.action-buttons {
			flex-direction: column;
		}

		.header-actions {
			margin-top: 0.5rem;
			justify-content: center;
		}
	}
</style>
