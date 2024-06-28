<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { current, data, stats } from '$lib/stores.js';
	import { getCurrentDate, calculateStreak } from '$lib/functions.js';

	// Icons
	import TodayIcon from '$lib/Icons/TodayIcon.svelte';
	import FireIcon from '$lib/Icons/FireIcon.svelte';
	import CalendarIcon from '$lib/Icons/CalendarIcon.svelte';
	import NegativeIcon from '$lib/Icons/NegativeIcon.svelte';
	import CheckIcon from '$lib/Icons/CheckIcon.svelte';

	let display = false;
	let streak = calculateStreak($stats.record.date_list, getCurrentDate());

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
				<!-- streak -->
				<div class="stats-item">
					<h3 class="stats-title">Streak <FireIcon /></h3>
					<span class="stats-stat"> {streak} {streak === 1 ? 'day' : 'days'} </span>
				</div>
				<!-- current day -->
				<div class="stats-item">
					<h3 class="stats-title">Date <CalendarIcon /></h3>
					<span class="stats-stat date">{getCurrentDate()}</span>
				</div>
				<!-- current day record -->
				<div class="stats-item">
					<h3 class="stats-title">Today <TodayIcon /></h3>
					<div>
						<span>
							<CheckIcon />

							{$stats.record.info.correct}</span
						>
						<span>
							<NegativeIcon />

							{$stats.record.info.incorrect}</span
						>
					</div>
				</div>
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
		width: 100%;
	}
	.stats-container .info {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2rem;
	}
	.stats-item {
		place-self: center;
		width: 50%;
		height: 6rem;
		text-align: center;
		padding: 0.5rem;
		border-top: 1px solid #eee;
	}
	.stats-title {
		padding: 0.5rem;
		font-size: 1.2rem;
	}
	.stats-stat {
		padding: 0.5rem;
		text-align: center;
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

	.mistakes-container {
		padding: 0.5rem;
	}

	.Stats-header {
		display: flex;
		justify-content: space-between;
		flex-grow: 1;
		border-bottom: 1px solid #eee;
	}

	.stats-item div {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
