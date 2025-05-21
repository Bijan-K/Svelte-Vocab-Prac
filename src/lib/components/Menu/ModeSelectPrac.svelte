<!-- src\lib\components\Menu\ModeSelectPrac.svelte -->
<script>
	import { pracMode } from '$lib/stores';

	function toggle() {
		pracMode.update((n) => {
			if (n == 'lexicon') return 'normal';
			if (n == 'normal') return 'lexicon';
		});
	}

	$: isLexiconMode = $pracMode === 'lexicon';
</script>

<div class="modeselect">
	<div class="toggle-wrapper">
		<div class="mode-label-container">
			<div class="mode-text">{isLexiconMode ? 'Lexicon Adder' : 'Practice Mode'}</div>
			<div class="mode-description">
				{#if isLexiconMode}
					Add new words to your vocabulary
				{:else}
					Practice and learn your vocabulary words
				{/if}
			</div>
		</div>

		<div class="toggle-switch">
			<button
				class="toggle-button"
				class:active={!isLexiconMode}
				on:click={() => pracMode.set('normal')}
			>
				Practice
			</button>
			<button
				class="toggle-button"
				class:active={isLexiconMode}
				on:click={() => pracMode.set('lexicon')}
			>
				Lexicon
			</button>
		</div>
	</div>
</div>

<style>
	.modeselect {
		width: 100%;
		padding: 1rem 0;
	}

	.toggle-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.mode-label-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.mode-text {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.mode-description {
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.toggle-switch {
		display: flex;
		background-color: var(--bg-dark);
		border-radius: 8px;
		padding: 0.25rem;
		width: 100%;
	}

	.toggle-button {
		flex: 1;
		padding: 0.75rem 1rem;
		border: none;
		background: transparent;
		color: var(--text-muted);
		font-weight: 500;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.toggle-button.active {
		background-color: var(--primary);
		color: white;
	}

	.toggle-button:hover:not(.active) {
		background-color: rgba(255, 255, 255, 0.05);
		color: var(--text-secondary);
	}

	@media (max-width: 600px) {
		.toggle-button {
			padding: 0.6rem 0.75rem;
			font-size: 0.95rem;
		}
	}
</style>
