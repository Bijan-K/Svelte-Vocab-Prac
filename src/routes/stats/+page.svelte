<script>
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

<div class="general">
	<div class="stats-container">
		<div class="info">
			<h2>Stats</h2>
			<h4>Streak :</h4>
		</div>
		<div class="chart">
			<p>Chart</p>
		</div>
	</div>
	<div class="mistakes-container">
		<h2>Mistakes go here</h2>
	</div>
</div>

<style>
	.general {
		width: 100%;
		margin-left: 10%;
		margin-right: 10%;
		margin-top: 2rem;
	}
	.stats-container {
		display: flex;
		gap: 1rem;
	}
	.chart {
		border: grey 2px solid;
	}
</style>
