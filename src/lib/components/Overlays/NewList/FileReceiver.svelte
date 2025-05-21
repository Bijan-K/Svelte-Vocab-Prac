<!-- src\lib\components\Overlays\NewList\FileReceiver.svelte -->
<script>
	import ToolTip from './FileReceiverToolTip.svelte';
	import { fly } from 'svelte/transition';
	import { fileWords } from '$lib/stores/forms.js';

	let fileContent = '';
	let fileName = '';
	let fileType = '';
	let words = [];

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		fileName = file.name;
		fileType = file.type;

		const reader = new FileReader();

		reader.onload = (e) => {
			const content = e.target.result;

			if (fileType === 'application/json') {
				try {
					fileContent = JSON.parse(content);
					words = fileContent.map((word) => ({
						word: word.replace(/\r/g, '').trim(),
						known: false
					}));
				} catch (error) {
					console.error('Error parsing JSON:', error);
					fileContent = 'Error: Invalid JSON file';
				}
			} else if (fileType === 'text/plain') {
				const lines = content
					.replace(/\r/g, '')
					.split('\n')
					.map((line) => line.trim())
					.filter((line) => line !== '');
				words = lines.map((theWord) => ({
					word: theWord.trim(),
					known: false
				}));
			} else {
				alert('Unsupported file type: ' + fileType);
				return;
			}

			fileWords.set(words);
		};

		reader.readAsText(file);
	}
</script>

<div in:fly={{ duration: 800, y: 20 }} class="file-receiver">
	<div class="container">
		<p>
			You can add a file containing the words you would like to include in this list here. Be sure
			that your file is either <ToolTip message="['word', 'word', 'word', etc]"
				><strong>.json</strong></ToolTip
			> or <ToolTip message="word"><strong>.txt</strong></ToolTip> and formatted like the ToolTip implies.
		</p>
	</div>
	<div class="inputContainer">
		<input type="file" accept=".json,.txt" on:change={handleFileUpload} />
	</div>
</div>

<style>
	strong {
		text-decoration: underline;
	}
	.file-receiver {
		margin: 0 10%;
		display: flex;
		flex-direction: column;
	}
	.container {
		font-size: large;
		padding-bottom: 1rem;
	}
	p {
		font-size: large;
	}
</style>
