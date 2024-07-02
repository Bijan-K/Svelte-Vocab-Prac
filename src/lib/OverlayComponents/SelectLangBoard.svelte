<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { overlayState } from '$lib/stores.js';
	import FileReceiver from './FileReceiver.svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let lang = '';

	let init = false;
	let stage = 0;
	let firstyes = false;
	let showFileReceiver = false;
	let showFinal = false;

	function closeHandler() {
		overlayState.update((n) => !n);
	}
	function startStage2() {
		stage = 2;
	}

	$: if (lang != '') init = true;
</script>

<div class="board">
	<div class="container">
		<!-- close btn -->
		<div on:click={closeHandler} class="close-btn">
			<XIcon />
		</div>

		<!-- title -->
		<h2>Adding new Language</h2>

		<!-- text -->
		<div class="processContainer">
			<div class="firstq">
				<span>Enter the name of your language of choice:</span>
				<input class="inputText" type="text" bind:value={lang} placeholder="Japanese for example" />
			</div>

			<div class="restofq">
				{#if init == 1}
					<div in:fly={{ duration: 800, y: 20 }} class="">
						<span>Equivalent of "define" in that language :</span>
						<input class="inputText" type="text" on:blur={startStage2} />
					</div>
				{/if}

				{#if stage == 2}
					<div in:fly={{ duration: 800, y: 20 }}>Added Mistakes list</div>
				{:else if stage == 3}
					<div in:fly={{ duration: 800, y: 20 }}>
						<span> would you like to add a custom list to your lang? </span>
						<button>Yes</button>
						<button>No</button>
					</div>
				{:else if stage == 3 && firstyes == true}
					<div in:fly={{ duration: 800, y: 20 }}>
						<span> Do you have a file you would like to add? </span>
						<button>Yes</button>
						<button>No</button>
					</div>
				{/if}
			</div>

			{#if showFileReceiver}
				<FileReceiver />
			{/if}

			{#if showFinal}
				<button class="btn"> Add </button>
			{/if}
		</div>
	</div>
</div>

<style>
	.restofq {
		padding: 0.5rem 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.firstq {
		padding: 0.5rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
		font-size: 1.5rem;
	}
	.inputText {
		background-color: transparent;
		padding: 0.25rem 1rem;
		color: #ecfdf5;
		border: none;
		font-size: 1.2rem;
		border-bottom: #ecfdf5 2px solid;
	}
	input::placeholder {
		color: #ecfdf5a8;
	}

	.processContainer {
		margin: 0 10%;
	}

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

	h2 {
		text-align: center;
		padding: 2rem;
		margin-left: 10%;
		margin-right: 10%;
		border-bottom: 1px solid #ecfdf5;
	}
</style>
