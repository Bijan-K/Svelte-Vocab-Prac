<script>
	import ToolTip from './ToolTip.svelte';

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
					words = fileContent.map((word) => ({ word, known: false }));
				} catch (error) {
					console.error('Error parsing JSON:', error);
					fileContent = 'Error: Invalid JSON file';
				}
			} else if (fileType === 'text/plain') {
				const lines = content.split('\n').filter((line) => line.trim() !== '');
				words = lines.map((theWord) => ({ word: theWord, known: false }));
			} else {
				alert('Unsupported file type:', type);
			}
		};

		// Add new words to the new list
	}
</script>

<div class="file-receiver">
	<div class="container">
		<p>
			You can add a file containing the words you would like to include in this list here. Be sure
			that your file is either <ToolTip message="['word', 'word', 'word', etc]"
				><i>.json</i></ToolTip
			> or <ToolTip message="word"><i>.txt</i></ToolTip>and formatted like the ToolTip implies.
		</p>
	</div>

	<input type="file" accept=".json,.txt" on:change={handleFileUpload} />

	{#if fileName}
		<p>File Name: {fileName}</p>
		<p>File Type: {fileType}</p>
	{/if}
</div>

<style>
	i {
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
