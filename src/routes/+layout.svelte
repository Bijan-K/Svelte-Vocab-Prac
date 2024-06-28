<script>
	import './globals.css';
	import { stats } from '$lib/stores.js';
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
</script>

<main>
	<slot />
</main>

<style>
	main {
		height: 100%;
	}
</style>
