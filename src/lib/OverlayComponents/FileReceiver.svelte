<script>
	let fileContent = '';
	let fileName = '';
	let fileType = '';

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
				} catch (error) {
					console.error('Error parsing JSON:', error);
					fileContent = 'Error: Invalid JSON file';
				}
			} else {
				fileContent = content;
			}
		};

		if (fileType === 'application/json') {
			reader.readAsText(file);
		} else {
			reader.readAsText(file);
		}
	}
</script>

<input type="file" accept=".json,.txt" on:change={handleFileUpload} />

{#if fileName}
	<p>File Name: {fileName}</p>
	<p>File Type: {fileType}</p>
	<pre>{JSON.stringify(fileContent, null, 2)}</pre>
{/if}
