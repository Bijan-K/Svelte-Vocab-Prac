<!-- src\lib\components\Navbar\DropdownList.svelte -->
<script>
	import { data, current, overlayMode, overlayState, lists } from '$lib/stores';
	import { newCurrentList, capitalizeWord, returnSingleWord } from '$lib/utils';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';

	function overlayClickHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlist');
	}

	function handleSelect(event) {
		const selectedList = event.detail.selected.toLowerCase();

		if (selectedList !== $current.list.toLowerCase()) {
			current.update((n) => {
				let tmp = n;
				tmp.list = selectedList;
				tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));
				return tmp;
			});
		}
	}
</script>

<div class="dropdown-wrapper">
	<Dropdown
		items={$lists.map((list) => capitalizeWord(list))}
		selected={capitalizeWord($current.list)}
		placeholder="Select List"
		allowAddition={true}
		on:select={handleSelect}
		on:add={overlayClickHandler}
	/>
</div>

<style>
	.dropdown-wrapper {
		min-width: 150px;
	}
</style>
