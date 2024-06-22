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

		<p>word app</p>
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
