<!-- src\routes\stats\+page.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { current, stats, data } from '$lib/stores';
	import { getListStats, isWordDue } from '$lib/utils';

	// Components
	import StatsHeader from './components/StatsHeader.svelte';
	import TabNavigation from './components/TabNavigation.svelte';
	import OverviewPanel from './components/OverviewPanel.svelte';
	import VocabularyPanel from './components/VocabularyPanel.svelte';
	import LanguagesPanel from './components/LanguagesPanel.svelte';
	import MistakesPanel from './components/MistakesPanel.svelte';

	// State
	let loaded = false;
	let activeTab = 'overview';
	let statsData = {
		totalWords: 0,
		totalKnown: 0,
		totalUnknown: 0,
		knownPercentage: 0,
		languageStats: [],
		streak: 0,
		srsStats: {
			totalNew: 0,
			totalLearning: 0,
			totalMature: 0,
			totalDue: 0,
			averageLevel: 0
		}
	};

	// Initialize stats page
	onMount(() => {
		current.update((n) => {
			if (!n.lang) n.lang = 'english';
			if (!n.list) n.list = 'mistakes';
			return n;
		});

		calculateStats();
		loaded = true;
	});

	function calculateStats() {
		// Calculate language statistics with SRS data
		let totalWords = 0;
		let totalKnown = 0; // Words at mature level (level 4+)
		let srsGlobal = {
			totalNew: 0,
			totalLearning: 0,
			totalMature: 0,
			totalDue: 0,
			totalLevels: 0,
			wordCount: 0
		};

		let languageStats = $data.map((lang) => {
			const langName = lang.lang;
			let langTotalWords = 0;
			let langKnownWords = 0; // Mature words (level 4+)
			let langSrsStats = {
				totalNew: 0,
				totalLearning: 0,
				totalMature: 0,
				totalDue: 0
			};

			// Calculate lists within this language
			const listStats = lang.lists.map((list) => {
				const listSrsStats = getListStats($data, langName, list.name);
				const listTotalWords = list.words.length;
				const listKnownWords = list.words.filter((w) => (w.level || 0) >= 4).length;
				const listKnownPercentage =
					listTotalWords > 0 ? Math.round((listKnownWords / listTotalWords) * 100) : 0;

				// Add to language totals
				langTotalWords += listTotalWords;
				langKnownWords += listKnownWords;
				langSrsStats.totalNew += listSrsStats.new;
				langSrsStats.totalLearning += listSrsStats.learning;
				langSrsStats.totalMature += listSrsStats.mature;
				langSrsStats.totalDue += listSrsStats.due;

				return {
					name: list.name,
					totalWords: listTotalWords,
					knownWords: listKnownWords,
					unknownWords: listTotalWords - listKnownWords,
					percentage: listKnownPercentage,
					srsStats: listSrsStats
				};
			});

			const langKnownPercentage =
				langTotalWords > 0 ? Math.round((langKnownWords / langTotalWords) * 100) : 0;

			// Add to global totals
			totalWords += langTotalWords;
			totalKnown += langKnownWords;
			srsGlobal.totalNew += langSrsStats.totalNew;
			srsGlobal.totalLearning += langSrsStats.totalLearning;
			srsGlobal.totalMature += langSrsStats.totalMature;
			srsGlobal.totalDue += langSrsStats.totalDue;

			// Calculate average level for this language
			lang.lists.forEach((list) => {
				list.words.forEach((word) => {
					srsGlobal.totalLevels += word.level || 0;
					srsGlobal.wordCount++;
				});
			});

			return {
				language: langName,
				totalWords: langTotalWords,
				knownWords: langKnownWords,
				unknownWords: langTotalWords - langKnownWords,
				percentage: langKnownPercentage,
				lists: listStats,
				srsStats: langSrsStats
			};
		});

		const totalUnknown = totalWords - totalKnown;
		const knownPercentage = totalWords > 0 ? Math.round((totalKnown / totalWords) * 100) : 0;
		const averageLevel =
			srsGlobal.wordCount > 0 ? (srsGlobal.totalLevels / srsGlobal.wordCount).toFixed(1) : 0;

		// Update the stats data object
		statsData = {
			totalWords,
			totalKnown,
			totalUnknown,
			knownPercentage,
			languageStats,
			streak: $stats.streak || 0,
			srsStats: {
				...srsGlobal,
				averageLevel: parseFloat(averageLevel)
			}
		};
	}

	// Keep stats updated when data changes
	$: {
		$data;
		$stats;
		$current;
		if (loaded) calculateStats();
	}

	// Handle tab changes
	function handleTabChange(event) {
		activeTab = event.detail.tab;
	}
</script>

<svelte:head>
	<title>Stats | Vocabulary Practice</title>
</svelte:head>

{#if loaded}
	<div class="stats-container" in:fade={{ duration: 300 }}>
		<!-- Header with key metrics -->
		<StatsHeader {statsData} todayStats={$stats.record.info} />

		<!-- Main content tabs -->
		<TabNavigation {activeTab} on:tabChange={handleTabChange} />

		<!-- Main content area -->
		<div class="content-area">
			{#if activeTab === 'overview'}
				<OverviewPanel {statsData} todayStats={$stats.record.info} />
			{:else if activeTab === 'vocabulary'}
				<VocabularyPanel />
			{:else if activeTab === 'languages'}
				<LanguagesPanel languageStats={statsData.languageStats} />
			{:else if activeTab === 'mistakes'}
				<MistakesPanel />
			{/if}
		</div>
	</div>
{/if}

<style>
	.stats-container {
		width: 100%;
		max-width: 1300px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.content-area {
		flex: 1;
		overflow-y: auto;
		padding: 0 0.5rem;
	}

	@media (max-width: 600px) {
		.stats-container {
			padding: 1rem;
		}
	}
</style>
