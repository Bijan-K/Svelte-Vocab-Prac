<script>
	import { overlayState } from '$lib/stores.js';
</script>

<div class="board">
	<div class="container">
		<!-- text -->
		<div class="input-container">
			<input class="input" type="text" placeholder="The new word" />
		</div>
	</div>
</div>

<style>
	.board {
		border-radius: 2rem;
		height: 20vh;
		width: 40vw;
		min-width: 300px;
		background-color: #475569;
		z-index: 901;
	}
	.container {
		position: relative;
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.input {
		max-width: 60vw;
		font-size: 2rem;
		padding: 1rem 0.75rem;
		border-radius: 1.2rem;
	}
</style>
