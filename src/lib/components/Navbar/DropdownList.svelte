<script>
	import { onMount, afterUpdate } from 'svelte';
	import { current, lists, data } from '$lib/stores/crucial.js';
	import { overlayState, overlayMode } from '$lib/stores/mode.js';

	import { newCurrentList } from '$lib/utils/essentialFunctions.js';
	import { capitalizeWord, returnSingleWord } from '$lib/utils/generalFunctions.js';

	import './style.css';

	afterUpdate(() => {
		let dropdown1 = document.querySelector('.dropdown1');
		let select1 = dropdown1.querySelector('.select1');
		let caret1 = dropdown1.querySelector('.caret1');
		let menu1 = dropdown1.querySelector('.menu1');
		let options1 = dropdown1.querySelectorAll('.menu1 li');
		let selected1 = dropdown1.querySelector('.selected1');

		options1.forEach((option) => {
			option.addEventListener('click', () => {
				if (option.innerText != '+') {
					selected1.innerText = option.innerText;
					// close caret
					select1.classList.remove('select-clicked1');
					caret1.classList.remove('caret-rotate1');
					menu1.classList.remove('menu-open1');

					options1.forEach((option) => {
						option.classList.remove('active');
					});

					option.classList.add('active');

					if ($current.list.toLowerCase() != option.innerText.toLowerCase()) {
						current.update((n) => {
							let tmp = n;
							tmp.list = option.innerText.toLowerCase();
							tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));

							return tmp;
						});
					}
				}
			});
		});
	});

	onMount(() => {
		let dropdown1 = document.querySelector('.dropdown1');
		let select1 = dropdown1.querySelector('.select1');
		let caret1 = dropdown1.querySelector('.caret1');
		let menu1 = dropdown1.querySelector('.menu1');
		let options1 = dropdown1.querySelectorAll('.menu1 li');
		let selected1 = dropdown1.querySelector('.selected1');
		select1.addEventListener('click', () => {
			select1.classList.toggle('select-clicked1');
			caret1.classList.toggle('caret-rotate1');
			menu1.classList.toggle('menu-open1');
		});

		options1.forEach((option) => {
			option.addEventListener('click', () => {
				if (option.innerText != '+') {
					selected1.innerText = option.innerText;
					select1.classList.remove('select-clicked1');
					caret1.classList.remove('caret-rotate1');
					menu1.classList.remove('menu-open1');

					options1.forEach((option) => {
						option.classList.remove('active');
					});
					option.classList.add('active');

					current.update((n) => {
						let tmp = n;
						tmp.list = option.innerText.toLowerCase();
						tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));

						return tmp;
					});
				}
			});
		});

		options1.forEach((option) => {
			if (selected1.innerText == option.innerText) {
				option.classList.add('active');
				current.update((n) => {
					let tmp = n;
					tmp.list = option.innerText.toLowerCase();
					tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));
					return tmp;
				});
			}
		});
	});

	function overlayClickHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlist');
	}
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

		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<li on:click={overlayClickHandler} class="plus">+</li>
	</ul>
</div>
