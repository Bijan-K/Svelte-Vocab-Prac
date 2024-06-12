<script>
	import { onMount } from 'svelte';
	import { current, lists, data } from '$lib/stores.js';
	import {
		capitalizeWord,
		returnWordsInList,
		returnSingleWord,
		DropdownListCheck
	} from '$lib/functions.js';

	import './style.css';

	onMount(() => {
		const dropdown1 = document.querySelector('.dropdown1');
		const select1 = dropdown1.querySelector('.select1');
		const caret1 = dropdown1.querySelector('.caret1');
		const menu1 = dropdown1.querySelector('.menu1');
		const options1 = dropdown1.querySelectorAll('.menu1 li');
		const selected1 = dropdown1.querySelector('.selected1');

		select1.addEventListener('click', () => {
			select1.classList.toggle('select-clicked1');
			caret1.classList.toggle('caret-rotate1');
			menu1.classList.toggle('menu-open1');
		});

		options1.forEach((option) => {
			option.addEventListener('click', () => {
				if (option.innerText != '+') {
					selected1.innerText = option.innerText;
					console.log('option innertext', option.innerText);
					select1.classList.remove('select-clicked1');
					caret1.classList.remove('caret-rotate1');
					menu1.classList.remove('menu-open1');

					options1.forEach((option) => {
						option.classList.remove('active');
					});
					option.classList.add('active');
					console.log('this is option', option);

					current.update((n) => {
						let tmp = n;
						tmp.list = option.innerText.toLowerCase();
						tmp.word = capitalizeWord(
							returnSingleWord(returnWordsInList($data, tmp.lang, tmp.list))
						);
						return tmp;
					});
				}
			});
		});

		// const dropdown1 = document.querySelector('.dropdown1');
		// const select1 = dropdown1.querySelector('.select1');
		// const caret1 = dropdown1.querySelector('.caret1');
		// const menu1 = dropdown1.querySelector('.menu1');
		// const options1 = dropdown1.querySelectorAll('.menu1 li');
		// const selected1 = dropdown1.querySelector('.selected1');
		// select1.addEventListener('click', () => {
		// 	select1.classList.toggle('select-clicked1');
		// 	caret1.classList.toggle('caret-rotate1');
		// 	menu1.classList.toggle('menu-open1');
		// });
		// options1.forEach((option) => {
		// 	option.addEventListener('click', () => {
		// 		if (option.innerText != '+') {
		// 			// DropdownListCheck(option.innerText);

		// 			current.update((n) => {
		// 				let tmp = n;
		// 				tmp.list = option.innerText.toLowerCase();
		// 				tmp.word = capitalizeWord(
		// 					returnSingleWord(returnWordsInList($data, tmp.lang, tmp.list))
		// 				);
		// 				return tmp;
		// 			});
		// 		}
		// 	});
		// });

		options1.forEach((option) => {
			if (selected1.innerText == option.innerText) {
				option.classList.add('active');
				current.update((n) => {
					let tmp = n;
					tmp.list = option.innerText.toLowerCase();
					tmp.word = returnSingleWord(returnWordsInList($data, tmp.lang, tmp.list));
					return tmp;
				});
			}
		});
	});
</script>

<div class="dropdown1">
	<div class="select1">
		<span class="selected1">{capitalizeWord($lists[0])}</span>
		<div class="caret1"></div>
	</div>
	<ul class="menu1">
		{#each $lists as list}
			<li>{capitalizeWord(list)}</li>
		{/each}

		<li class="plus">+</li>
	</ul>
</div>

<style>
</style>
