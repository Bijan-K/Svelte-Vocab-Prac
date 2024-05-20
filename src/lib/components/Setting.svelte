<script>
	import SettingIcon from '../Icons/Setting-icon.svelte';
	let menu = false;

	function clickHandler() {
		menu = !menu;
	}
</script>

<button class="setting-button" on:click={clickHandler}>
	<SettingIcon />
</button>

{#if menu}
	<div class="setting-menu">
		<ul>
			<li>
				<a href="/about">About</a>
			</li>
			<li>
				<a href="/stats">Stats</a>
			</li>
			<li>Mode:</li>
			<li></li>
		</ul>
	</div>
{/if}

<style>
	.setting-button {
		display: flex;
		align-items: center;
		padding: 0;
		border: none;
		background: none;
		text-decoration: none;
		color: #dbeafe;
		font-size: 2rem;
		margin-left: auto;
	}
	.setting-button:hover {
		cursor: pointer;
	}

	.setting-menu {
		position: absolute;
		top: 4.5rem;
		right: 1rem;
		border-radius: 1rem;
		padding: 0.5rem 2rem;
		background-color: #000;
	}
	a {
		text-decoration: none;
	}
</style>
