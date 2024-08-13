<script>
	import './globals.css';
	import { onMount } from 'svelte';
	import { stats, data, current } from '$lib/stores/crucial.js';
	import { getCurrentDate } from '$lib/utils/generalFunctions.js';
	import { getDefaultLang, getDefaultList } from '$lib/utils/initFunctions.js';

	import { newCurrentList } from '$lib/utils/essentialFunctions.js';
	import { returnSingleWord } from '$lib/utils/generalFunctions.js';

	let hasRun = false;

	let counter = 0;
	$: {
		counter++;
		console.log(counter, 'Current:', $current);
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

	$: if ($stats && !hasRun) {
		runOnce();
		hasRun = true;
	}

	// Add to local after each update
	onMount(() => {
		function loadFromLocalStorage() {
			const storedWords = localStorage.getItem('data');
			const storedOther = localStorage.getItem('stats');

			if (storedWords) {
				try {
					data.set(JSON.parse(storedWords));
				} catch (error) {
					console.error('Error parsing stored words:', error);
				}
			}

			if (storedOther) {
				try {
					stats.set(JSON.parse(storedOther));
				} catch (error) {
					console.error('Error parsing stored other:', error);
				}
			}
		}

		loadFromLocalStorage();

		data.subscribe((value) => {
			localStorage.setItem('data', JSON.stringify(value));
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
