<!-- src\lib\components\Navbar\DropdownLang.svelte -->
<script>
	import { data, current, overlayMode, overlayState, langs } from '$lib/stores';
	import { returnListsOfLang, capitalizeWord, returnSingleWord } from '$lib/utils';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';

	function overlayHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlang');
	}

	function handleSelect(event) {
		const selectedLang = event.detail.selected.toLowerCase();

		if (selectedLang !== $current.lang.toLowerCase()) {
			current.update((n) => {
				let tmp = n;
				tmp.lang = selectedLang;
				tmp.list = returnListsOfLang($data, tmp.lang)[0];
				tmp.word = returnSingleWord(
					$data[$data.findIndex((obj) => obj.lang.toLowerCase() === selectedLang)].lists[0].words
				);
				return tmp;
			});
		}
	}
</script>

<div class="dropdown-wrapper">
	<Dropdown
		items={$langs.map((lang) => capitalizeWord(lang))}
		selected={capitalizeWord($current.lang)}
		placeholder="Select Language"
		allowAddition={true}
		on:select={handleSelect}
		on:add={overlayHandler}
	/>
</div>

<style>
	.dropdown-wrapper {
		min-width: 150px;
		margin-left: auto;
	}
</style>
