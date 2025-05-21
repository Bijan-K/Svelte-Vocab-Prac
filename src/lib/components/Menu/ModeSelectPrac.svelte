<!-- src\lib\components\Menu\ModeSelectPrac.svelte -->
<script>
	import { pracMode } from '$lib/stores/mode.js';

	function toggle() {
		pracMode.update((n) => {
			if (n == 'lexicon') return 'normal';
			if (n == 'normal') return 'lexicon';
		});
	}
</script>

<div class="modeselect">
	<div class="toggle-wrapper">
		<div class="toggle transparent">
			<input id="transparent" type="checkbox" on:click={toggle} />
			<label class="toggle-item" for="transparent"></label>
		</div>

		<div class="mode-text">
			{#if $pracMode == 'normal'}
				Practice Mode
			{:else if $pracMode == 'lexicon'}
				Lexicon Adder
			{/if}
		</div>
	</div>
</div>

<style>
	.mode-text {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.modeselect {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: start;
		align-items: center;
	}
	.modeselect::before {
		content: '';
		position: absolute;
	}
	.modeselect::after {
		content: '';
		position: absolute;
	}

	input {
		height: 40px;
		left: 0;
		opacity: 0;
		position: absolute;
		top: 0;
		width: 40px;
	}

	.toggle-wrapper {
		flex: 1 1 calc(100% / 3);
		display: flex;
		align-items: center;
		justify-content: start;
		overflow: hidden;
		position: relative;
	}

	@media (max-width: 960px) {
		.toggle-wrapper {
			flex: 1 1 calc(100% / 2);
		}
	}
	@media (max-width: 700px) {
		.toggle-wrapper {
			flex: 1 1 100%;
		}
	}

	.toggle {
		position: relative;
		display: inline-block;
	}

	label.toggle-item {
		width: 4rem;
		background: #2e394d;
		height: 1em;
		display: inline-block;
		border-radius: 50px;
		margin: 10px;
		position: relative;
		transition: all 0.3s ease;
		transform-origin: 20% center;
		cursor: pointer;
	}

	label.toggle-item:before {
		content: '';
		display: block;
		width: 1.3em;
		height: 1.3em;
		position: absolute;
		top: 0.25em;
		left: 0.25em;
		border-radius: 2em;
		border: 2px solid #88cf8f;
		transition: 0.3s ease;
	}

	.transparent > label {
		background: transparent;
		border: 3px solid #fff;
		height: 2.35em;
	}

	.transparent > label::before {
		border: 3px solid #fff;
		width: 1em;
		height: 1em;
		top: 0.35em;
		left: 0.3em;
		background: #fff;
	}

	#transparent:checked + label::before {
		transform: translateX(28px);
	}
</style>
