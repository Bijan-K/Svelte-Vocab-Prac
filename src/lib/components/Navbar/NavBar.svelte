<!-- src\lib\components\Navbar\NavBar.svelte -->
<script>
	import { page } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
	import DropdownLang from './DropdownLang.svelte';
	import DropdownList from './DropdownList.svelte';
	import Setting from './SettingButton.svelte';
	import { menuState } from '$lib/stores';
	import Menu from '$lib/components/Menu/Menu.svelte';
</script>

<nav>
	<div class="nav-container">
		<a data-sveltekit-reload href="/" class="logo">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
				<line x1="12" y1="18" x2="12" y2="18"></line>
				<line x1="9" y1="6" x2="15" y2="6"></line>
				<line x1="9" y1="10" x2="15" y2="10"></line>
				<line x1="9" y1="14" x2="15" y2="14"></line>
			</svg>
			<span>Vocab Practice</span>
		</a>

		{#if $page.url.pathname === '/practice'}
			<div class="dropdown-section" in:fade={{ duration: 200 }}>
				<DropdownLang />
				<DropdownList />
			</div>
		{/if}

		<div class="nav-actions">
			<div class="nav-links">
				<a
					href="/practice"
					class:active={$page.url.pathname === '/practice'}
					in:fly={{ x: 20, duration: 200 }}
				>
					Practice
				</a>
				<a
					href="/stats"
					class:active={$page.url.pathname === '/stats'}
					in:fly={{ x: 20, duration: 200, delay: 50 }}
				>
					Stats
				</a>
				<a
					href="/about"
					class:active={$page.url.pathname === '/about'}
					in:fly={{ x: 20, duration: 200, delay: 100 }}
				>
					About
				</a>
			</div>
			<Setting />
		</div>
	</div>
</nav>

{#if $menuState}
	<Menu />
{/if}

<style>
	nav {
		background-color: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(10px);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 50;
		padding: 0.75rem 1.5rem;
		transition: all 0.3s ease;
	}

	.nav-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1400px;
		margin: 0 auto;
		width: 100%;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.25rem;
		color: #f8fafc;
		transition: all 0.2s;
	}

	.logo:hover {
		color: #0ea5e9;
	}

	.logo svg {
		color: #0ea5e9;
	}

	.dropdown-section {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0 1rem;
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-links a {
		text-decoration: none;
		color: #94a3b8;
		font-weight: 500;
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.nav-links a:hover {
		color: #f8fafc;
		background-color: rgba(255, 255, 255, 0.05);
	}

	.nav-links a.active {
		color: #0ea5e9;
		background-color: rgba(14, 165, 233, 0.1);
	}

	@media (max-width: 900px) {
		.nav-container {
			flex-wrap: wrap;
			gap: 0.75rem;
		}

		.dropdown-section {
			order: 3;
			width: 100%;
			margin: 0.5rem 0 0 0;
			justify-content: space-between;
		}
	}

	@media (max-width: 600px) {
		nav {
			padding: 0.75rem 1rem;
		}

		.logo span {
			display: none;
		}

		.nav-links {
			gap: 0.5rem;
		}

		.nav-links a {
			padding: 0.4rem 0.6rem;
			font-size: 0.9rem;
		}
	}
</style>
