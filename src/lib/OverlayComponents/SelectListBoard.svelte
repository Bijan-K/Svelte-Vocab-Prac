<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { overlayState, current } from '$lib/stores.js';
	import InfoIcon from '../Icons/InfoIcon.svelte';
	import FileReceiver from './FileReceiver.svelte';

	let listName = '';

	function capitalizeFirstLetter(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

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
		<div class="contentContainer">
			<div class="InputContainer">
				<div class="inputHolder">
					<span>The Name of your list: </span>
					<input bind:value={listName} class="input" type="text" />
				</div>

				<div class="info-holder">
					<InfoIcon />
					<div>
						<p>
							This list will be added to language: <strong
								>{capitalizeFirstLetter($current.lang)}</strong
							>
						</p>
						<p>You can concat new files to already existing lists by writing their names up here</p>
					</div>
				</div>
			</div>

			<!--  -->
			<FileReceiver />

			<!--  -->
			<button class="btn" disabled={listName != '' ? false : true}> Add </button>
		</div>
	</div>
</div>

<style>
	.info-holder {
		display: flex;
		justify-content: start;
		align-items: start;
		gap: 10px;
	}

	span {
		font-size: larger;
	}
	.input {
		background-color: transparent;
		padding: 0.25rem;
		border: none;
		border-bottom: #ecfdf5 1px solid;
		color: #ecfdf5;
		font-size: larger;
	}
	.inputHolder {
		padding-bottom: 1rem;
	}
	.contentContainer {
		margin: 0 10%;
		display: flex;
		flex-direction: column;
	}

	.board {
		border-radius: 2rem;
		min-height: 70vh;
		height: min-content;
		overflow: scroll;
		scrollbar-width: none;
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
	h2 {
		text-align: center;
		padding: 2rem;
		margin-left: 10%;
		margin-right: 10%;
		border-bottom: 1px solid #ecfdf5;
	}

	.InputContainer {
		margin: 0 5%;
		display: flex;
		flex-direction: column;
		padding: 1rem;
	}
	.btn {
		height: 3rem;
		font-size: larger;
		margin: 5% auto;
		padding: 0.5rem 2rem;
		border-radius: 1rem;
		background-color: rgb(41, 106, 150);
	}
	.btn:disabled {
		background-color: gray;
	}

	.btn:not(:disabled):active {
		transform: translateY(5%);
	}

	.btn:not(:disabled):hover {
		transform: translateY(-1%);
	}
</style>
