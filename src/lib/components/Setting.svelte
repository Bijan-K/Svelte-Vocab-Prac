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
</style>
