<script>
</script>

<svelte:head>
	<title>Vocabulary Practice</title>
</svelte:head>

<div class="container">
	<div class="text-container">
		<h1>Vocabulary Practice</h1>
		<p>A simple webapp for practicing Vocabulary</p>
	</div>

	<div class="btn-container">
		<a class="btn" data-sveltekit-reload href="/practice">Practice</a>
		<a class="btn" data-sveltekit-reload href="/stats">Stats</a>
		<a class="btn" data-sveltekit-reload href="/about">About</a>
	</div>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-grow: 1;
		gap: 5rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	h1 {
		font-size: 6rem;
	}
	.text-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
	.btn-container {
		display: flex;
		gap: 1rem;
	}
	.btn {
		text-decoration: none;
		color: beige;
		background-color: darkcyan;
		padding: 1rem 1.5rem;
		border-radius: 0.25rem;
	}
</style>
