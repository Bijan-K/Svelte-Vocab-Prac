<script>
	import { onMount } from 'svelte';

	import { data, current, langs, lists } from '$lib/stores.js';
	import {
		capitalizeWord,
		returnLists,
		returnSingleWord,
		returnWordsInList
	} from '$lib/functions.js';

	import './style.css';

	onMount(() => {
		const dropdown = document.querySelector('.dropdown');
		const select = dropdown.querySelector('.select');
		const caret = dropdown.querySelector('.caret');
		const menu = dropdown.querySelector('.menu');
		const options = dropdown.querySelectorAll('.menu li');
		const selected = dropdown.querySelector('.selected');
		select.addEventListener('click', () => {
			select.classList.toggle('select-clicked');
			caret.classList.toggle('caret-rotate');
			menu.classList.toggle('menu-open');
		});
		options.forEach((option) => {
			option.addEventListener('click', () => {
				if (option.innerText != '+') {
					selected.innerText = option.innerText;
					select.classList.remove('select-clicked');
					caret.classList.remove('caret-rotate');
					menu.classList.remove('menu-open');
					options.forEach((option) => {
						option.classList.remove('active');
					});
					option.classList.add('active');

					current.update((n) => {
						let tmp = n;
						tmp.lang = option.innerText.toLowerCase();
						tmp.list = returnLists($data, tmp.lang);
						console.log($data);
						console.log(tmp.lang);
						console.log(tmp.list);
						console.log('lang thing', returnWordsInList($data, tmp.lang, tmp.list));
						tmp.word = capitalizeWord(
							returnSingleWord(returnWordsInList($data, tmp.lang, tmp.list))
						);

						return tmp;
					});
				}
			});
		});

		options.forEach((option) => {
			if (selected.innerText == option.innerText) {
				option.classList.add('active');

				current.update((n) => {
					let tmp = n;
					tmp.lang = option.innerText.toLowerCase();
					return tmp;
				});
			}
		});
	});
</script>

<div class="dropdown">
	<div class="select">
		<span class="selected">
			{capitalizeWord($langs[0])}
		</span>
		<div class="caret"></div>
	</div>
	<ul class="menu">
		{#each $langs as lang}
			<li>{capitalizeWord(lang)}</li>
		{/each}

		<li class="plus">+</li>
	</ul>
</div>

<style>
	.dropdown {
		margin-left: auto;
	}
</style>
