<!-- src/lib/components/DropDown/Dropdown.svelte -->
<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';
	import { UIIcons } from '$lib/Icons/index.js';

	export let items = [];
	export let selected = '';
	export let placeholder = 'Select an option';
	export let allowAddition = false;
	export let maxHeight = '250px';

	let isOpen = false;
	let dropdown;
	let searchTerm = '';
	let filteredItems = items;

	const dispatch = createEventDispatcher();

	$: if (items) {
		filteredItems = searchTerm
			? items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
			: items;
	}

	function handleSelect(item) {
		selected = item;
		isOpen = false;
		searchTerm = '';
		dispatch('select', { selected: item });
	}

	function handleAddNew() {
		dispatch('add');
		isOpen = false;
	}

	function toggle() {
		isOpen = !isOpen;
		if (!isOpen) searchTerm = '';
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event) {
		if (dropdown && !dropdown.contains(event.target)) {
			isOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="dropdown-container" bind:this={dropdown}>
	<button class="dropdown-toggle" on:click={toggle} class:active={isOpen} type="button">
		<span class="selected-text">
			{selected || placeholder}
		</span>
		<span class="dropdown-icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d={isOpen ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'}></path>
			</svg>
		</span>
	</button>

	{#if isOpen}
		<div class="dropdown-menu" transition:slide={{ duration: 150 }}>
			{#if items.length > 10}
				<div class="dropdown-search">
					<input
						type="text"
						bind:value={searchTerm}
						placeholder="Search..."
						on:click|stopPropagation
					/>
				</div>
			{/if}

			<ul class="dropdown-list" style="max-height: {maxHeight}">
				{#each filteredItems as item}
					<li
						class="dropdown-item"
						class:active={item === selected}
						on:click={() => handleSelect(item)}
					>
						{item}
					</li>
				{/each}

				{#if filteredItems.length === 0}
					<li class="dropdown-empty">No results found</li>
				{/if}
			</ul>

			{#if allowAddition}
				<div class="dropdown-add" transition:fade={{ duration: 100 }}>
					<button class="add-button" on:click|stopPropagation={handleAddNew}>
						<span class="add-icon">
							<UIIcons icon="add" />
						</span>
						<span>Add New</span>
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.dropdown-container {
		position: relative;
		width: 100%;
		font-family: inherit;
	}

	.dropdown-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.75rem 1rem;
		background-color: #1e293b;
		color: #f8fafc;
		border: 1px solid #475569;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 1rem;
		text-align: left;
	}

	.dropdown-toggle:hover {
		background-color: #334155;
	}

	.dropdown-toggle.active {
		border-color: #0ea5e9;
		box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.3);
	}

	.dropdown-icon {
		flex-shrink: 0;
		margin-left: 0.5rem;
		color: #94a3b8;
		transition: transform 0.2s;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 5px);
		left: 0;
		width: 100%;
		background-color: #1e293b;
		border: 1px solid #475569;
		border-radius: 8px;
		overflow: hidden;
		z-index: 900;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	.dropdown-search {
		padding: 0.75rem;
		border-bottom: 1px solid #334155;
	}

	.dropdown-search input {
		width: 100%;
		padding: 0.5rem 0.75rem;
		background-color: #334155;
		color: #f8fafc;
		border: 1px solid #475569;
		border-radius: 4px;
		font-size: 0.9rem;
		transition: all 0.2s;
	}

	.dropdown-search input:focus {
		outline: none;
		border-color: #0ea5e9;
	}

	.dropdown-list {
		list-style: none;
		padding: 0;
		margin: 0;
		max-height: 250px;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #475569 #1e293b;
	}

	.dropdown-list::-webkit-scrollbar {
		width: 8px;
	}

	.dropdown-list::-webkit-scrollbar-track {
		background: #1e293b;
	}

	.dropdown-list::-webkit-scrollbar-thumb {
		background-color: #475569;
		border-radius: 20px;
		border: 2px solid #1e293b;
	}

	.dropdown-item {
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.dropdown-item:hover {
		background-color: #334155;
	}

	.dropdown-item.active {
		background-color: rgba(14, 165, 233, 0.15);
		color: #0ea5e9;
		font-weight: 500;
	}

	.dropdown-empty {
		padding: 1rem;
		text-align: center;
		color: #94a3b8;
		font-style: italic;
	}

	.dropdown-add {
		padding: 0.5rem;
		border-top: 1px solid #334155;
	}

	.add-button {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0.5rem;
		background-color: transparent;
		color: #0ea5e9;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 0.9rem;
	}

	.add-button:hover {
		background-color: #334155;
	}

	.add-icon {
		display: flex;
		align-items: center;
		margin-right: 0.5rem;
	}

	@media (max-width: 600px) {
		.dropdown-toggle {
			padding: 0.6rem 0.75rem;
			font-size: 0.95rem;
		}

		.dropdown-item {
			padding: 0.6rem 0.75rem;
		}
	}
</style>
