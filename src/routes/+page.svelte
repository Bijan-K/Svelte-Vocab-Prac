<svelte:head>
	<title>Vocabulary Practice</title>
</svelte:head>

<div class="container">
	<div class="text-container">
		<h1>Vocabulary Practice</h1>
		<p class="sub-header">A simple webapp for practicing Vocabulary</p>
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
	.text-container {
		display: flex;
		padding: 10% 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
	h1 {
		font-size: calc(60px + 1vw);
		text-align: center;
	}
	.sub-header {
		font-size: calc(20px + 1vw);
		text-align: center;
	}

	.btn-container {
		display: flex;
		gap: 1rem;
	}

	@media (max-width: 600px) {
		/* Mobile-specific styles */
		.btn-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}

	.btn {
		text-decoration: none;
		text-align: center;
		color: beige;
		background-color: darkcyan;
		padding: 1rem 1.5rem;
		border-radius: 0.25rem;
	}
</style>
