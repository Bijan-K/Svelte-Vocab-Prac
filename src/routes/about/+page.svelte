<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let display = false;
	onMount(() => {
		display = true;
	});

	// form
	let name = '';
	let message = '';
</script>

{#if display}
	<div in:fly={{ y: 20, duration: 200 }} class="about-container">
		<h2>About</h2>

		<h3>whats dis?</h3>

		<p>
			Very simple web app you can use in order to practice new words you find on the net(or papers).
		</p>

		<h3>how to</h3>

		<p>
			Its most self-explanatory. Although there a few useful options in Stats page you should try
			out. IMO, It's where this app becomes better than a simple text editor.

			<br />
			<br />

			You can also find tips in the menu section.

			<br />
			<br />

			This app was mostly designed for PC. and the mobile quirks and css still need polishing.
		</p>

		<h3>contacts</h3>

		<p>The 2 users of this app can tell me their bugs or suggestions here:</p>

		<form class="flex" name="contact" method="POST" data-netlify="true" on:submit|preventDefault>
			<input type="hidden" name="form-name" value="contact" />

			<div class="inputGrid">
				<input
					class="input"
					id="name"
					name="name"
					type="text"
					placeholder="name || .*"
					bind:value={name}
					required
				/>
				<textarea
					class="textarea"
					id="message"
					name="message"
					placeholder="Very nice app, didn't use it but it was cool."
					bind:value={message}
					required
				/>
			</div>

			<button class="send" type="submit">send</button>
		</form>

		<p>made by bijan</p>
	</div>
{/if}

<style>
	.about-container {
		font-family: 'Courier New', Courier, monospace;
		display: flex;
		flex-direction: column;
		padding: 10px 10%;
		width: 100%;
		height: 90vh;
		overflow-y: scroll;
	}

	.send {
		padding: 0rem 0.5rem;
	}
	.input {
		padding: 0.5rem;
		font-size: larger;
		background-color: transparent;
		border: none;
		border-bottom: 1px #eee solid;
		color: #eee;
	}
	.textarea {
		padding: 0.2rem 0.5rem;
		font-size: larger;
		background-color: transparent;
		border: none;
		border-bottom: 1px #eee solid;
	}

	.flex {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 0.5rem 2rem;
		width: 30%;
	}
	.inputGrid {
		display: grid;
		grid-template-rows: 1fr 4fr;
		gap: 10px;
	}

	.send {
		padding: 1rem;
		background-color: transparent;
		border: #eee 1px solid;
		color: #eee;
		font-size: larger;
	}
	.send:hover {
		cursor: pointer;
	}

	h2 {
		font-size: 4rem;
		text-align: center;
		padding: 0.5rem;
	}
	h3 {
		font-size: 1.75rem;
		padding: 0.5rem;
	}
	p {
		font-size: 1.3rem;
		padding: 0.5rem 2rem;
	}
</style>
