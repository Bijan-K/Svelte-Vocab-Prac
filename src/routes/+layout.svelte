<!-- src/routes/+layout.svelte -->
<script>
	import './globals.css';
	import { onMount } from 'svelte';
	import { data, current, stats, DATA_VERSION, createNewWord } from '$lib/stores';

	import {
		newCurrentList,
		getDefaultLang,
		getCurrentDate,
		returnSingleWord,
		getDefaultList
	} from '$lib/utils';

	let hasRun = false;
	let counter = 0;
	$: {
		counter++;
	}

	function runOnce() {
		stats.update((n) => {
			if (n.record.date_list.includes(getCurrentDate())) return n;

			n.record.date_list.push(getCurrentDate());
			return n;
		});

		setTimeout(() => {
			current.update((n) => {
				n.lang = getDefaultLang($data);
				n.list = getDefaultList($data, n.lang);
				n.word = returnSingleWord(newCurrentList($data, n.lang, n.list));
				return n;
			});
		}, 100);
	}

	function migrateDataStructure(oldData, oldStats) {
		console.log('Migrating data structure to version', DATA_VERSION);

		// Migrate data structure
		const migratedData = oldData.map((langData) => ({
			...langData,
			lists: langData.lists.map((list) => ({
				...list,
				words: list.words.map((word) => {
					// If word already has new structure, keep it
					if (word.level !== undefined) return word;

					// Migrate from old boolean structure
					return createNewWord(word.word);
				})
			}))
		}));

		// Migrate stats structure
		const migratedStats = {
			...oldStats,
			version: DATA_VERSION,
			record: {
				...oldStats.record,
				info: {
					...oldStats.record.info,
					totalReviews: oldStats.record.info.totalReviews || 0,
					newWords: oldStats.record.info.newWords || 0
				}
			},
			mistake_lang: oldStats.mistake_lang.map((langMistakes) => ({
				...langMistakes,
				llmPrompt: langMistakes.llmPrompt || 'What is the meaning of'
			})),
			srs: {
				totalWordsLearning: 0,
				wordsReviewedToday: 0,
				averageAccuracy: 0,
				longestStreak: 0
			}
		};

		return { migratedData, migratedStats };
	}

	$: if ($stats && !hasRun) {
		runOnce();
		hasRun = true;
	}

	// Add to local after each update
	onMount(() => {
		function loadFromLocalStorage() {
			const storedWords = localStorage.getItem('data');
			const storedOther = localStorage.getItem('stats');
			const storedVersion = localStorage.getItem('dataVersion');

			let needsMigration = false;
			let loadedData = null;
			let loadedStats = null;

			// Check if we need migration
			if (storedVersion !== DATA_VERSION) {
				needsMigration = true;
				console.log('Data version mismatch. Current:', storedVersion, 'Required:', DATA_VERSION);
			}

			if (storedWords) {
				try {
					loadedData = JSON.parse(storedWords);
				} catch (error) {
					console.error('Error parsing stored words:', error);
					needsMigration = true;
				}
			}

			if (storedOther) {
				try {
					loadedStats = JSON.parse(storedOther);
				} catch (error) {
					console.error('Error parsing stored other:', error);
					needsMigration = true;
				}
			}

			// Perform migration if needed
			if (needsMigration && loadedData && loadedStats) {
				const { migratedData, migratedStats } = migrateDataStructure(loadedData, loadedStats);

				data.set(migratedData);
				stats.set(migratedStats);

				// Save migrated data
				localStorage.setItem('data', JSON.stringify(migratedData));
				localStorage.setItem('stats', JSON.stringify(migratedStats));
				localStorage.setItem('dataVersion', DATA_VERSION);

				console.log('Data migration completed');
			} else if (loadedData && loadedStats && !needsMigration) {
				// Load normally if no migration needed
				data.set(loadedData);
				stats.set(loadedStats);
			} else if (!loadedData || !loadedStats) {
				// First time load - set version
				localStorage.setItem('dataVersion', DATA_VERSION);
			}
		}

		loadFromLocalStorage();

		// Subscribe to changes and save to localStorage
		data.subscribe((value) => {
			localStorage.setItem('data', JSON.stringify(value));
			localStorage.setItem('dataVersion', DATA_VERSION);
		});

		stats.subscribe((value) => {
			localStorage.setItem('stats', JSON.stringify(value));
		});
	});
</script>

<main>
	<slot />
</main>

<style>
	main {
		height: 100dvh;
	}
</style>
