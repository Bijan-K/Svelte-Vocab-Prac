<script>
	import SettingIcon from '../Icons/Setting-icon.svelte';
	function clickHandler() {
		return 0;
	}
</script>

<button class="setting-button" on:click={clickHandler}>
	<SettingIcon />
</button>

<div></div>

<style>
	.setting-button {
		padding: 0;
		border: none;
		background: none;
		text-decoration: none;
		position: fixed;
		top: 10px;
		right: 1rem;
		color: black;
		font-size: 2rem;
	}
	.setting-button:hover {
		cursor: pointer;
	}
</style>
