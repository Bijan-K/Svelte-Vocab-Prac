<script>
	import { page } from '$app/stores';
	import DropdownLang from './DropdownLang.svelte';
	import DropdownList from './DropdownList.svelte';
	import Setting from '$lib/Navbar/Setting.svelte';

	import { menuState, current, data, stats } from '$lib/stores.js';
	import Menu from '$lib/Menu/Menu.svelte';

	$: console.log('current lang : ', $current.lang);
	$: console.log('current list : ', $current.list);
	$: console.log('current word : ', $current.word);
	$: console.log('-------');
	$: console.log('-------------');
	$: console.log('current Data : ', $data);
	$: console.log('current Stats : ', $stats);
	$: console.log('current Current : ', $current);
</script>

<nav>
	<a data-sveltekit-reload href="/">Vocab </a>

	{#if $page.url.pathname === '/practice'}
		<DropdownLang />
		<DropdownList />
	{/if}

	<Setting />
</nav>

{#if $menuState}
	<Menu />
{/if}

<style>
	nav {
		display: flex;
		/* justify-content: center; */
		align-items: center;
		padding: 1rem;
		gap: 0.5rem;
		background-color: rgba(0, 0, 0, 0.744);
		max-height: 10%;
		min-height: 10%;
		z-index: 10;
	}
	a {
		text-decoration: none;
		display: flex;
		align-items: center;

		color: white;
		font-size: 1.5rem;
	}
</style>
