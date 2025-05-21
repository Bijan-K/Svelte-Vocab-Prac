<!-- src\routes\stats\components\StatsInfoHeader.svelte -->
<script>
	import TodayIcon from '$lib/Icons/TodayIcon.svelte';
	import FireIcon from '$lib/Icons/FireIcon.svelte';
	import CalendarIcon from '$lib/Icons/CalendarIcon.svelte';
	import NegativeIcon from '$lib/Icons/NegativeIcon.svelte';
	import CheckIcon from '$lib/Icons/CheckIcon.svelte';

	import { stats } from '$lib/stores/crucial.js';
	import { getCurrentDate, calculateStreak } from '$lib/utils/generalFunctions.js';

	let streak = calculateStreak($stats.record.date_list, getCurrentDate());
</script>

<!-- head info -->
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

<style>
	.stats-container {
		display: flex;
		gap: 1rem;
		width: 100%;
	}
	.stats-container .info {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2rem;
	}

	@media (max-width: 600px) {
		.info {
			display: grid;
			grid-template-columns: 1fr !important;
			grid-template-rows: 1fr 1fr 1fr;
			gap: 2rem;
		}
	}

	.stats-item {
		place-self: center;
		width: 60%;
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

	.stats-item div {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
</style>
