<script>
	import { page } from '$app/stores';
	import { slide, fly } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';

	import { overlayMode, overlayState } from '$lib/stores/mode.js';

	import LinkIcon from '$lib/Icons/LinkIcon.svelte';
	import InfoIcon from '$lib/Icons/InfoIcon.svelte';
	import GithubIcon from '$lib/Icons/GithubIcon.svelte';

	import ModeSelectPrac from './ModeSelectPrac.svelte';
	import DataFileHandler from './DataFileHandler.svelte';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	afterNavigate(() => {
		visible = false;
		setTimeout(() => {
			visible = true;
		}, 200);
	});

	function resetHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'conformation');
	}
</script>

<div
	in:slide={{ duration: 500, easing: quintOut, axis: 'x' }}
	out:slide={{ duration: 500, easing: quintOut, axis: 'x' }}
	class="menuOverlay"
>
	<h2>Directories:</h2>
	<div class="dir-holder">
		<a href="/practice">
			<LinkIcon />
			<span> Practice </span>
		</a>
		<a href="/stats">
			<LinkIcon />
			<span> Stats </span>
		</a>
		<a href="/about">
			<LinkIcon />
			<span> About </span>
		</a>
	</div>

	{#if $page.url.pathname === '/practice' && visible}
		<div class="specific" in:fly={{ duration: 200, y: 20 }}>
			<h2 class="secondary-title">Practice Settings:</h2>

			<ModeSelectPrac />

			<div class="info">
				<span class="ico">
					<InfoIcon />
				</span>
				<p>
					You can use arrow keys instead of buttons on PC. left for wrong, up for question and right
					for right.
				</p>
			</div>

			<div class="info">
				<span class="ico">
					<InfoIcon />
				</span>
				<p class="lower">Your data is saved in LocalStorage.</p>
			</div>
		</div>
	{:else if $page.url.pathname === '/stats' && visible}
		<div class="specific" in:fly={{ duration: 200, y: 20 }}>
			<h2>Stats Settings:</h2>

			<button class="reset" on:click={resetHandler}>Reset all?</button>

			<div class="info">
				<span class="ico">
					<InfoIcon />
				</span>
				<p>
					Use Enter when in reflect mode to quickly add new words to the list you want. Also use
					Enter to save your word to your specific list.
				</p>
			</div>
		</div>
	{:else if $page.url.pathname === '/about' && visible}
		<div class="specific" in:fly={{ duration: 200, y: 20 }}>
			<h2 class="secondary-title">Source code:</h2>
			<a
				class="github"
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/Bijan-K/Svelte-Vocab-Prac.git"
			>
				<GithubIcon />
			</a>
		</div>
	{/if}

	<DataFileHandler />
</div>

<style>
	.specific {
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	a {
		text-decoration: none;
		color: #eee;
		font-size: 1.1rem;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	a:hover {
		text-decoration: underline;
	}

	a span {
		padding-left: 0.25rem;
	}

	.dir-holder {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 0.3rem;
		padding-bottom: 1rem;
		border-bottom: #eee 1px solid;
	}

	.github {
		padding: 0.5rem;
		cursor: pointer;
	}

	.ico {
		min-width: 20px;
	}

	.info {
		padding: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: start;
		gap: 1rem;
	}

	.lower {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.menuOverlay {
		position: fixed;
		top: 10%;
		right: 0;
		width: 30%;
		height: 100%;
		background-color: #111;
		padding: 0.5rem;
		border-left: #eee 1px solid;
		z-index: 99;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.reset {
		font-size: large;
		margin: 0.5rem;
		padding: 0.25rem 0.5rem;
		border: none;
		color: #eee;
		border-radius: 0.25rem;
		background-color: #9f1239;
	}

	.reset:hover {
		transform: translateY(-1%);
	}

	.reset:active {
		transform: translateY(1%);
	}

	.secondary-title {
		margin-bottom: 0.5rem;
	}

	@media (max-width: 600px) {
		.menuOverlay {
			width: 100%;
		}
	}
</style>
