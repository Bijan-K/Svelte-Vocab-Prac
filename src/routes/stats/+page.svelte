<script>
</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

<div class="general">
	<h2>Stats</h2>
	<div class="stats-container">
		<div class="info">
			<h4>Streak :</h4>
		</div>
		<div class="chart">
			<p>Chart</p>
		</div>
	</div>
	<div class="mistakes-container">
		<div>List name</div>
		<div>
			<input type="options" />
		</div>
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
	h2 {
		font-size: 3rem;
		text-align: center;
	}
	.info {
		width: 20%;
	}
	.info h4 {
		text-align: start;
		font-size: 2rem;
	}

	.chart {
		width: 80%;
		border: grey 2px solid;
	}
</style>
