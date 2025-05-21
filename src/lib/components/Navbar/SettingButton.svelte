<!-- src\lib\components\Navbar\SettingButton.svelte -->
<script>
	import { UIIcons } from '$lib/Icons/index.js';
	import { page } from '$app/stores';
	import { menuState } from '$lib/stores';

	function clickHandler() {
		menuState.update((n) => !n);
	}
</script>

<button
	class:setting-margin={$page.url.pathname !== '/practice'}
	class="setting-button"
	on:click={clickHandler}
>
	<UIIcons icon="setting" />
</button>

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
		transform: translateY(-2%);
	}

	.setting-button:active {
		transform: translateY(+5%);
	}
</style>
