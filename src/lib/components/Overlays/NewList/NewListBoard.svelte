<!-- src\lib\components\Overlays\NewList\NewListBoard.svelte -->
<script>
	import { UIIcons } from '$lib/Icons/index.js';
	import { data, current, overlayState, fileWords } from '$lib/stores';

	import { newCurrentList, addNewListToLang, addWordsToList, returnSingleWord } from '$lib/utils';

	import FileReceiver from './FileReceiver.svelte';

	let listName = '';

	function capitalizeFirstLetter(string) {
		if (!string) return '';
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function closeHandler() {
		overlayState.update((n) => !n);
	}

	function conformAddList() {
		data.update((n) => {
			let newData = addNewListToLang($data, $current.lang, listName);
			if ($fileWords != []) {
				newData = addWordsToList($data, $current.lang, listName, $fileWords);
			}
			return newData;
		});

		fileWords.set([]);

		current.update((n) => {
			n.list = listName.toLowerCase();
			n.word = returnSingleWord(newCurrentList($data, n.lang, n.list));
			return n;
		});

		closeHandler();
	}
</script>

<div class="board">
	<div class="container">
		<!-- close btn -->
		<div on:click={closeHandler} class="close-btn">
			<UIIcons icon="x" />
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
					<UIIcons icon="info" />
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
			<button on:click={conformAddList} class="btn" disabled={listName != '' ? false : true}>
				Add
			</button>
		</div>
	</div>
</div>

<style>
	.info-holder {
		display: flex;
		justify-content: center;
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
		width: 90%;
	}
	.inputHolder {
		width: 50%;
		padding-bottom: 1rem;
		display: flex;
		gap: 10px;
		flex-direction: column;
	}
	.contentContainer {
		margin: 0 10%;
		display: flex;
		flex-direction: column;
	}

	.board {
		border-radius: 2rem;
		height: 70dvh;
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
		gap: 10px;
		justify-content: center;
		align-items: start;
	}
	.btn {
		height: 3rem;
		font-size: larger;
		margin: 5% auto;
		padding: 0.5rem 2rem;
		background-color: #08805ece;
		color: #ecfdf5;
		border-radius: 0.2rem;
		box-shadow: 1px 1px 1.5px #ecfdf538;
	}
	.btn:hover {
		background-color: #09966ece;
		cursor: pointer;
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

	@media screen and (max-width: 600px) {
		.board {
			height: 80dvh;
			width: 90vw;
		}
		.inputHolder {
			width: 100%;
		}
	}
</style>
