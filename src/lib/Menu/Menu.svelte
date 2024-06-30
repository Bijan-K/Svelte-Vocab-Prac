<script>
	import { page } from '$app/stores';
	import LinkIcon from '$lib/Icons/LinkIcon.svelte';
	import InfoIcon from '$lib/Icons/InfoIcon.svelte';
	import GithubIcon from '$lib/Icons/GithubIcon.svelte';
	import ModeSelectPrac from '$lib/Menu/ModeSelectPrac.svelte';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
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
			<span> Practice </span></a
		>
		<a href="/stats">
			<LinkIcon />
			<span> Stats </span>
		</a>
		<a href="/about">
			<LinkIcon />
			<span> About </span></a
		>
	</div>

	{#if $page.url.pathname === '/practice'}
		<h2 class="secondary-title">Practice Settings:</h2>

		<ModeSelectPrac />

		<div class="info">
			<InfoIcon />
			<p>
				You can also use the arrow keys <u>left</u>, <u>up</u> and <u>right</u> as an alternative in
				PC.
			</p>
		</div>
	{:else if $page.url.pathname === '/stats'}
		<h2>Stats Settings:</h2>

		<button class="reset">Reset all?</button>
	{:else if $page.url.pathname === '/about'}
		<h2 class="secondary-title">Source code:</h2>
		<a href="https://github.com/Bijan-K" class="github">
			<GithubIcon />
		</a>
	{/if}
</div>

<style>
	.github {
		padding: 0.5rem;
		cursor: pointer;
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
		transform: translateY(-5%);
	}
	.reset:active {
		transform: translateY(5%);
	}

	.secondary-title {
		margin-bottom: 0.5rem;
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
	}
	.dir-holder {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 0.3rem;
	}
	a {
		text-decoration: none;
		color: #eee;
		font-size: 1.1rem;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.info {
		height: 100%;
		margin-top: auto;
		padding: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: start;
		gap: 1rem;
	}
	a:hover {
		text-decoration: underline;
	}
	a span {
		padding-left: 0.25rem;
	}
</style>
