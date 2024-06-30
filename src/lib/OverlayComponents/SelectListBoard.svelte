<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { overlayState } from '$lib/stores.js';

	function closeHandler() {
		overlayState.update((n) => !n);
	}
</script>

<div class="board">
	<div class="container">
		<!-- close btn -->
		<div on:click={closeHandler} class="close-btn">
			<XIcon />
		</div>

		<!-- title -->
		<h2 class="title">Adding new List</h2>
		<!-- text -->

		<!--  -->
	</div>
</div>

<style>
	.board {
		border-radius: 2rem;
		height: 70vh;
		width: 50vw;
		background-color: #475569;
		z-index: 901;
	}
	.container {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.close-btn {
		position: absolute;
		font-size: 1.5rem;
		top: 0.8rem;
		right: 1rem;
		cursor: pointer;
	}
</style>
