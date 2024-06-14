<script>
	import { page } from '$app/stores';
	import LinkIcon from '$lib/Icons/LinkIcon.svelte';
	import { slide, crossfade } from 'svelte/transition';
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
		<h2>Practice Settings:</h2>
		<p>lmao</p>
	{:else if $page.url.pathname === '/stats'}
		<h2>Stats Settings:</h2>
		<input />
	{:else if $page.url.pathname === '/about'}
		<h2>About Setting:</h2>
	{/if}
</div>

<style>
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
	a span {
		padding-left: 0.5rem;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
