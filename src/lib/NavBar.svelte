<script>
	import { page } from '$app/stores';
	import DropdownLang from './Navbar/DropdownLang.svelte';
	import DropdownList from './Navbar/DropdownList.svelte';
	import Setting from './components/Setting.svelte';
</script>

<nav>
	<a href="/">Vocab</a>
	{#if $page.url.pathname === '/practice'}
		<DropdownLang />
		<DropdownList />
	{/if}

	<Setting />
</nav>

<style>
	nav {
		display: flex;
		padding: 1rem;
		gap: 0.5rem;
		background-color: rgba(0, 0, 0, 0.703);
	}
	a {
		text-decoration: none;
		display: flex;
		align-items: center;

		color: white;
		font-size: 1.5rem;
	}
</style>
