<script>
	import XIcon from '$lib/Icons/XIcon.svelte';
	import { current, data, stats } from '$lib/stores/crucial.js';
	import { overlayState } from '$lib/stores/mode.js';
	import { fileWords } from '$lib/stores/forms.js';

	import {
		addNewLangToDataAndStats,
		addNewListToLang,
		addWordsToList
	} from '$lib/utils/formFunctions.js';

	import { fly } from 'svelte/transition';

	let lang = '';
	let newlist = '';
	let define = '';

	let init = false;
	let showFinal = false;

	function closeHandler() {
		overlayState.update((n) => !n);
	}
	// Adding to data and stats
	function addHandler() {
		let [newData, newStats] = addNewLangToDataAndStats($data, $stats, lang, define);

		data.update((n) => newData);
		stats.update((n) => newStats);
		current.update((n) => {
			n.lang = lang.toLowerCase();
			return n;
		});

		if (newlist != '') {
			newData = addNewListToLang($data, $current.lang, newlist);
			if ($fileWords != []) {
				newData = addWordsToList($data, $current.lang, newlist, $fileWords);
			}
		}

		fileWords.set([]);

		closeHandler();
	}

	$: if (lang != '') init = true;
	$: if (define != '') showFinal = true;
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
						<input
							class="inputText"
							type="text"
							bind:value={define}
							placeholder="google translate it"
						/>
					</div>
				{/if}
			</div>

			{#if showFinal}
				<button on:click={addHandler} in:fly={{ duration: 800, y: 20 }} class="btn"> Add </button>
			{/if}
		</div>
	</div>
</div>

<style>
	.btn {
		position: absolute;
		right: 5rem;
		margin: 5% 10%;
		font-size: 1.2rem;
		padding: 0.5rem 2rem;
		background-color: #08805ece;
		color: #ecfdf5;
		border: 1px #eee as;
		border-radius: 1rem;
	}

	.restofq {
		padding: 0.5rem 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
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
		height: 70dvh;
		width: 50vw;
		background-color: #475569;
		z-index: 901;
	}

	@media screen and (max-width: 600px) {
		.board {
			height: 80dvh;
			width: 90vw;
		}
		.btn {
			margin: 10%;
		}
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
