<script>
	import { overlayState } from '$lib/stores.js';

	function clickHandler() {
		overlayState.update((n) => !n);
	}
	// export let overlay_state = false;
</script>

<div class="overlay" on:click={clickHandler}>
	<div class="board">
		<button></button>
		<button></button>
		<button></button>
		<input type="text" />
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		height: 100vh;
		width: 100vh;
		background-color: hsla(0, 0%, 0%, 0.25);
	}

	.board {
		height: 100%;
		width: 100%;
		margin: 10%;
		padding: 5%;
		background-color: grey;
	}
</style>
