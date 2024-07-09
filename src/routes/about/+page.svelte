<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let display = false;
	onMount(() => {
		display = true;
	});
</script>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="about-container">
		<h2>About</h2>

		<h3>whats dis?</h3>

		<p>Very simple web app you can use to practice vocabulary you find on the net.</p>

		<h3>how to</h3>

		<p>
			Its most self-explanatory. Although there a few useful options in Stats page you should try
			out. Its where this app becomes great. You can find tips in the menu section.

			<br />

			This app was mostly designed for PC. and the mobile quirks and css still need polishing.
		</p>

		<h3>contacts</h3>

		<p>The 2 users of this app can tell me their bugs or suggestions here:</p>
	</div>
{/if}

<style>
	.about-container {
		margin: 10px 10%;
	}
	h2 {
		font-size: 4rem;
		text-align: center;
		padding: 0.5rem;
	}
</style>
