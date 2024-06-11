<script>
	import SettingIcon from '../Icons/SettingIcon.svelte';
	import { page } from '$app/stores';
	import { menuState } from '$lib/stores.js';

	function clickHandler() {
		menuState.update((n) => !n);
	}
</script>

<button
	class:setting-margin={$page.url.pathname !== '/practice'}
	class="setting-button"
	on:click={clickHandler}
>
	<SettingIcon />
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
