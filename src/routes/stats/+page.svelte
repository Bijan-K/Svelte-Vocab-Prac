<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { current, showSelector, statsSettingMode } from '$lib/stores.js';

	import MappedMistakes from '$lib/StatsComponents/MappedMistakes.svelte';
	import EditContainer from '$lib/StatsComponents/EditContainer.svelte';
	import LangSelector from '$lib/StatsComponents/LangSelector.svelte';
	import ListSelector from '$lib/StatsComponents/ListSelector.svelte';
	import StatsHeadInfo from '$lib/StatsComponents/StatsHeadInfo.svelte';
	import StatsListSetting from '$lib/StatsComponents/StatsListSetting.svelte';

	let display = false;

	onMount(() => {
		display = true;

		current.update((n) => {
			n.lang = 'english';
			n.list = 'mistakes';
			return n;
		});
	});
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="general">
		<!-- title -->
		<h2>Stats</h2>

		<StatsHeadInfo />

		<div class="setting-holder">
			<StatsListSetting />

			<!-- lang/list selectors -->
			{#if $showSelector == 'lang'}
				<LangSelector />
			{:else if $showSelector == 'list' && $statsSettingMode == 'edit'}
				<ListSelector />
			{/if}
		</div>
		<!-- Content Body -->
		<div class="content-body">
			{#if $statsSettingMode == 'reflect'}
				<MappedMistakes />
			{:else if $statsSettingMode == 'edit'}
				<EditContainer />
			{/if}
		</div>
	</div>
{/if}

<style>
	.general {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		height: 100%;
		padding: 10%;
		padding-right: 10%;
		padding-top: 2rem;
		overflow: scroll;
	}

	h2 {
		font-size: 3rem;
		text-align: center;
	}
	.setting-holder {
		width: 100%;

		display: flex;
		flex-direction: column;
	}
</style>
