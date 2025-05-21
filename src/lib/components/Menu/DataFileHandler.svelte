<!-- src\lib\components\Menu\DataFileHandler.svelte -->
<script>
	import { data, stats } from '$lib/stores';

	function handleDownload() {
		const jsonString = JSON.stringify([$data, $stats]);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'store-data.json';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function handleUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const json = JSON.parse(e.target.result);
					data.set(json[0]);
					stats.set(json[1]);
				} catch (error) {
					console.error('Error parsing JSON:', error);
				}
			};
			reader.readAsText(file);
		}
	}
</script>

<div class="button-container">
	<button on:click={handleDownload}> Save to JSON </button>
	<button on:click={() => document.getElementById('fileInput').click()}> Load from JSON </button>
	<input
		id="fileInput"
		type="file"
		accept=".json"
		on:change={handleUpload}
		style="display: none;"
	/>
</div>

<style>
	.button-container {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		border-radius: 0.5rem;
		margin-top: auto;
		margin-bottom: 5rem;
	}

	button {
		padding: 0.5rem 1rem;
		background-color: white;
		color: black;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	button:hover {
		background-color: #cdcdcd;
	}
</style>
