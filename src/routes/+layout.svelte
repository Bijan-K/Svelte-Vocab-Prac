<script>
	import './globals.css';
	import { onMount } from 'svelte';
	import { stats, data } from '$lib/stores.js';
	import { getCurrentDate } from '$lib/functions.js';

	let hasRun = false;

	function runOnce() {
		stats.update((n) => {
			if (n.record.date_list.includes(getCurrentDate())) return n;

			n.record.date_list.push(getCurrentDate());
			return n;
		});
	}

	$: if ($stats && !hasRun) {
		runOnce();
		hasRun = true;
	}

	// Add to local after each update
	onMount(() => {
		data.subscribe((value) => {
			localStorage.setItem('data', JSON.stringify(value));
		});

		stats.subscribe((value) => {
			localStorage.setItem('stats', JSON.stringify(value));
		});

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
	});

	// Retrieve from local
</script>

<main>
	<slot />
</main>

<style>
	main {
		height: 100dvh;
	}
</style>
