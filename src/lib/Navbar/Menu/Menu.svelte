<script>
	import { slide, crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<div
	in:slide={{ duration: 500, easing: quintOut, axis: 'x' }}
	out:slide={{ duration: 500, easing: quintOut, axis: 'x' }}
	class="menuOverlay"
>
	<div>ashfkajsdh</div>
	<h2>HELLLOOO</h2>
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
</style>
