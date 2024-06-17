<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let display = false;
	onMount(() => {
		display = true;
	});
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="general">
		<h2>Stats</h2>
		<div class="stats-container">
			<div class="info">
				<h3>Streak :</h3>
				<span> 7 Days fire </span>
				<h3>Day :</h3>
				<h3>T. Progress :</h3>
			</div>
			<div class="chart">
				<p>Chart</p>
			</div>
		</div>
		<div class="mistakes-container">
			<div class="Stats-header">
				<div class="mode-container">
					<h4>English</h4>
					<p>/</p>
					<h4>Mistakes</h4>
				</div>

				<div>
					<div>Reflect / edit</div>
				</div>
			</div>

			<div>
				<input type="options" />
			</div>
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
	}
	.stats-container {
		display: flex;
		gap: 1rem;
		justify-content: space-between;
	}
	.stats-container .info {
		padding: 1rem;
	}

	.mode-container {
		display: flex;
		padding: 0.5rem;
		flex-direction: row;
		gap: 0.5rem;
		font-size: 1.2rem;
	}
	.mode-container p {
		padding: 0.5rem;
	}
	.mode-container h4 {
		padding: 0.5rem;
	}
	.mode-container h4:hover {
		background-color: #e3e3e37e;
		cursor: pointer;
		border-radius: 0.5rem;
		padding: 0.5rem;
	}
	h2 {
		font-size: 3rem;
		text-align: center;
	}
	.info {
		width: 20%;
		text-align: start;
		border-left: 1px solid #eee;
	}
	.info h3 {
		text-align: start;
		padding: 0.5rem;
	}

	.chart {
		width: 80%;
		border: grey 2px solid;
	}

	.mistakes-container {
		padding: 0.5rem;
	}

	.Stats-header {
		display: flex;
		justify-content: space-between;
		flex-grow: 1;
		border-bottom: 1px solid #eee;
	}
</style>
