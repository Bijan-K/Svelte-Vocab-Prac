<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let display = false;
	onMount(() => {
		display = true;
	});

	// form
	let name = '';
	let message = '';
</script>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="about-container">
		<h2>About</h2>

		<h3>whats dis?</h3>

		<p>
			Very simple web app you can use in order to practice new words you find on the net(or papers).
		</p>

		<h3>how to</h3>

		<p>
			Its most self-explanatory. Although there a few useful options in Stats page you should try
			out. IMO, It's where this app becomes better than a simple text editor.

			<br />
			<br />

			You can also find tips in the menu section.

			<br />
			<br />

			This app was mostly designed for PC. and the mobile quirks and css still need polishing.
		</p>

		<p>made by bijan</p>
	</div>

	<div class="mobile"></div>
{/if}

<style>
	.mobile {
		display: none;
		padding: 20px;
	}
	@media (max-width: 700px) {
		.mobile {
			display: block;
		}
	}

	.about-container {
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-direction: column;
		padding: 10px 10%;
		width: 100%;
		height: 90vh;
		overflow-y: scroll;
	}

	h2 {
		font-size: 4rem;
		text-align: center;
		padding: 0.5rem;
	}
	h3 {
		font-size: 1.75rem;
		padding: 0.5rem;
	}
	p {
		font-size: 1.3rem;
		padding: 0.5rem 2rem;
	}
</style>
