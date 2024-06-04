<script>
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
		<a href="/practice"> Practice</a>
		<a href="/stats">Stats</a>
		<a href="/about">About</a>
	</div>
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
	}
	.dir-holder {
		display: flex;
		flex-direction: column;
		padding-left: 0.5rem;
		gap: 0.3rem;
	}
</style>
