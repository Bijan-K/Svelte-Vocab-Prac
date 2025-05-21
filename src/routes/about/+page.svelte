<!-- src\routes\about\+page.svelte -->
<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let display = false;
	onMount(() => {
		display = true;
	});
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="about-container">
		<h2>About</h2>

		<h3>"whats dis?"</h3>

		<p>
			A very simple web app you can use in order to practice new words you find on the net(or
			papers).
		</p>

		<p class="credit">made by bijan</p>
	</div>
{/if}

<style>
	.credit {
		border-top: 0.5px #eee solid;
		padding-top: 1.5rem;
		margin-top: 1.5rem;
	}

	.about-container {
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-direction: column;
		padding: 10px 10%;
		width: 100%;
		height: 90dvh;
		overflow-y: scroll;
		scrollbar-width: none;
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
