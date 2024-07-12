<script>
	import {
		showSelector,
		statsSettingMode,
		overlayMode,
		overlayState,
		current,
		data
	} from '$lib/stores.js';
	import { resetKnown } from '$lib/functions.js';

	import AddIcon from '$lib/Icons/AddIcon.svelte';
	import RefreshIcon from '../Icons/RefreshIcon.svelte';

	function capitalizeFirstLetter(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function switchMode() {
		statsSettingMode.update((n) => {
			if (n == 'reflect') {
				showSelector.update((n) => false);
				return 'edit';
			}
			if (n == 'edit') {
				current.update((n) => {
					n.list = 'mistakes';
					return n;
				});
				showSelector.update((n) => false);
				return 'reflect';
			}
		});
	}

	function setSelector(e) {
		showSelector.update((n) => {
			if (n == e.target.id) return false;
			return e.target.id;
		});
	}

	function addNewWord() {
		overlayMode.update((n) => 'newword');
		overlayState.update((n) => !n);
	}

	function resetlist() {
		data.update((n) => {
			n = resetKnown($data, $current.lang, $current.list);
			return n;
		});
	}
</script>

<!--Content Header -->
<div class="content-header">
	<div class="mode-header">
		<div class="mode-options">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<button on:click={setSelector} id="lang">{capitalizeFirstLetter($current.lang)}</button>
			<p>/</p>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<button
				disabled={$statsSettingMode == 'reflect' ? true : false}
				on:click={setSelector}
				id="list">{capitalizeFirstLetter($current.list)}</button
			>
		</div>

		<div class="mode-change-btn">
			{#if $statsSettingMode == 'reflect'}
				<span on:click={switchMode} class="relfect">Reflect</span>
			{:else if $statsSettingMode == 'edit'}
				<span class="refreshIcon" on:click={resetlist}>
					<RefreshIcon />
				</span>

				<span class="plusIcon" on:click={addNewWord}>
					<AddIcon />
				</span>
				<span on:click={switchMode}>Edit</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.mode-change-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.mode-change-btn span {
		font-size: 1.5rem;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 0.5rem;
		font-weight: 600;
	}
	.mode-change-btn span:hover {
		background-color: #eeeeee40;
	}

	.content-header {
		padding: 0.5rem;
	}

	.mode-header {
		display: flex;
		justify-content: space-between;
		flex-grow: 1;
		border-bottom: 1px solid #eee;
	}
	@media (max-width: 600px) {
		.mode-header {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;

			border-bottom: 1px solid #eee;
		}
		.mode-change-btn {
			place-self: end;
		}
	}

	.mode-options {
		display: flex;
		padding: 0.5rem;
		flex-direction: row;
		gap: 0.5rem;
		font-size: 1.2rem;
	}
	.mode-options p {
		padding: 0.5rem;
	}
	.mode-options button {
		border: none;
		background-color: transparent;
		color: #ecfdf5;
		font-size: 1.2rem;
		padding: 0.5rem;
	}
	.mode-options button:not(:disabled):hover {
		background-color: #e3e3e37e;
		cursor: pointer;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	.mode-options button:disabled {
		color: grey;
		cursor: pointer;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}

	.refreshIcon:hover {
		background-color: transparent !important;
	}
	.refreshIcon:hover {
		transition: all 0.25s ease-out;
		transform: rotate(360deg);
	}

	.refreshIcon:active {
		transition: all 0.25s ease-out;
		transform: rotate(360deg) translateY(+5%);
	}
	.plusIcon {
		background-color: transparent !important;
	}
	.plusIcon:hover {
		transition: all 0.25s ease-out;
		transform: rotate(90deg);
	}
</style>
