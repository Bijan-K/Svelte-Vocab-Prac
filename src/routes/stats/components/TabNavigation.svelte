<!-- src\routes\stats\components\TabNavigation.svelte -->
<script>
	import { createEventDispatcher } from 'svelte';

	export let activeTab = 'overview';

	const dispatch = createEventDispatcher();

	const tabs = [
		{
			id: 'overview',
			label: 'Overview',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`
		},
		{
			id: 'vocabulary',
			label: 'Vocabulary',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`
		},
		{
			id: 'languages',
			label: 'Languages & Lists',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
		},
		{
			id: 'mistakes',
			label: 'Mistakes',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M15 9l-6 6"></path><path d="M9 9l6 6"></path></svg>`
		}
	];

	function setActiveTab(tabId) {
		activeTab = tabId;
		dispatch('tabChange', { tab: tabId });
	}
</script>

<div class="content-tabs">
	{#each tabs as tab}
		<button
			class="tab-button"
			class:active={activeTab === tab.id}
			on:click={() => setActiveTab(tab.id)}
			aria-label={tab.label}
		>
			<span class="tab-icon" aria-hidden="true">
				{@html tab.icon}
			</span>
			<span class="tab-label">{tab.label}</span>
		</button>
	{/each}
</div>

<style>
	.content-tabs {
		display: flex;
		gap: 0.5rem;
		border-bottom: 1px solid var(--border-dark);
		padding-bottom: 0.5rem;
	}

	.tab-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background-color: transparent;
		border: none;
		color: var(--text-muted);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		border-radius: 8px;
	}

	.tab-button:hover {
		background-color: var(--bg-light);
		color: var(--text-secondary);
	}

	.tab-button.active {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
	}

	@media (max-width: 600px) {
		.content-tabs {
			overflow-x: auto;
			padding-bottom: 0.75rem;
		}

		.tab-button {
			padding: 0.75rem 1rem;
			white-space: nowrap;
		}
	}
</style>
