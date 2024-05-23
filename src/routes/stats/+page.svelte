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
	.info h2 {
		font-size: 3rem;
	}
	.info h4 {
		font-size: 2rem;
		padding-top: 3rem;
	}

	.chart {
		border: grey 2px solid;
	}
</style>
