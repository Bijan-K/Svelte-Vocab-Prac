<script>
	import SettingIcon from '../Icons/Setting-icon.svelte';
	import { page } from '$app/stores';

	let menu = false;

	function clickHandler() {
		menu = !menu;
	}
</script>

<button
	class:setting-margin={$page.url.pathname !== '/practice'}
	class="setting-button"
	on:click={clickHandler}
>
	<SettingIcon />
</button>

{#if menu}
	<div class="setting-menu">
		<ul>
			<li>
				<a href="/practice">Practice</a>
			</li>
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
	}
	.setting-margin {
		margin-left: auto;
	}

	.setting-button:hover {
		cursor: pointer;
	}

	.setting-menu {
		position: absolute;
		top: 5rem;
		right: 1rem;
		border-radius: 1rem;
		padding: 0.5rem 1rem;
		background-color: #000;
	}
	.setting-menu li {
		padding: 0.1rem;
		font-size: larger;
		color: #dbeafe;
	}

	ul {
		list-style-type: none;
		margin: 0;
	}
	a {
		text-decoration: none;
	}
</style>
