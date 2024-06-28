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

		<h3>Are you sure?</h3>
		<div class="">
			<button>Yes </button>
			<button>No </button>
		</div>
	</div>
</div>

<style>
	.board {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 5rem;
		width: 50%;
		background-color: #475569;
	}
</style>
