<!-- src/routes/practice/DictionaryPanel.svelte -->
<script>
	import { fade, fly } from 'svelte/transition';
	import { UIIcons } from '$lib/Icons/index.js';
	import DictionaryResult from '$lib/components/Dictionary/DictionaryResult.svelte';

	export let word = '';
	export let show = false;

	function close() {
		show = false;
	}
</script>

{#if show && word}
	<div class="panel-overlay" transition:fade={{ duration: 150 }} on:click={close}>
		<div class="dictionary-panel" in:fly={{ y: 20, duration: 200 }} on:click|stopPropagation>
			<div class="panel-header">
				<button class="close-button" on:click={close}>
					<UIIcons icon="x" />
				</button>
			</div>
			<div class="panel-content">
				<DictionaryResult {word} fallbackSearch={false} />
			</div>
		</div>
	</div>
{/if}

<style>
	.panel-overlay {
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

	.dictionary-panel {
		position: relative;
		width: 100%;
		max-width: 650px;
		max-height: 90vh;
		border-radius: 12px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
		overflow: hidden;
		background-color: var(--bg-medium);
	}

	.panel-header {
		position: relative;
		height: 40px;
		background-color: rgba(30, 41, 59, 0.8);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 0.5rem;
	}

	.close-button {
		background: transparent;
		border: none;
		color: #cbd5e1;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s;
	}

	.close-button:hover {
		background: #475569;
		color: #f8fafc;
	}

	.panel-content {
		width: 100%;
		height: calc(100% - 40px);
		overflow-y: auto;
	}

	@media (max-width: 600px) {
		.panel-overlay {
			padding: 0.5rem;
		}

		.dictionary-panel {
			max-height: 85vh;
		}
	}
</style>
