<script>
	import { current, showSelector, statsMode } from '$lib/stores.js';

	import AddIcon from '$lib/Icons/AddIcon.svelte';
	function switchMode() {
		mode.update((n) => {
			if (n == 'reflect') return 'edit';
			if (n == 'edit') return 'reflect';
		});
	}

	function setSelector(e) {
		console.log(e);
		let selectorMode = e.target.id;

		showSelector.update((n) => selectorMode);
	}

	function addNewWord() {
		//
	}
</script>

<!--Content Header -->
<div class="content-header">
	<div class="mode-header">
		<div class="mode-options">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h4 on:click={setSelector} id="lang">English</h4>
			<p>/</p>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<h4 on:click={setSelector} id="list">Mistakes</h4>
		</div>

		<div class="mode-change-btn">
			{#if $statsMode == 'reflect'}
				<span on:click={switchMode} class="relfect">Reflect</span>
			{:else if $statsMode == 'edit'}
				<span on:click={addNewWord}>
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
	.mode-options h4 {
		padding: 0.5rem;
	}
	.mode-options h4:hover {
		background-color: #e3e3e37e;
		cursor: pointer;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
</style>
