<!-- src\lib\components\Navbar\DropdownLang.svelte -->
<script>
	import './style.css';
	import { onMount, afterUpdate } from 'svelte';
	// Replace all store imports with this single import pattern
	import { data, current, overlayMode, overlayState, langs, lists } from '$lib/stores';

	import { newCurrentList, returnListsOfLang, capitalizeWord, returnSingleWord } from '$lib/utils';

	function overlayHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'selectlang');
	}

	afterUpdate(() => {
		let dropdown = document.querySelector('.dropdown');
		let select = dropdown.querySelector('.select');
		let caret = dropdown.querySelector('.caret');
		let menu = dropdown.querySelector('.menu');
		let options = dropdown.querySelectorAll('.menu li');
		let selected = dropdown.querySelector('.selected');

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

					// active class for list
					if ($current.lang.toLowerCase() != option.innerText.toLowerCase()) {
						current.update((n) => {
							let tmp = n;
							tmp.lang = option.innerText.toLowerCase();
							tmp.list = returnListsOfLang($data, tmp.lang)[0];
							tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));

							return tmp;
						});
					}

					// active class for list
					let dropdown1 = document.querySelector('.dropdown1');
					let options1 = dropdown1.querySelectorAll('.menu1 li');
					let selected1 = dropdown1.querySelector('.selected1');

					selected1.innerText = capitalizeWord($current.list);

					options1.forEach((option3) => {
						if ($current.list != undefined) {
							if (option3.innerText.toLowerCase() == $current.list) {
								options1.forEach((option3) => {
									option3.classList.remove('active');
								});
								option3.classList.add('active');
							}

							option3.addEventListener('click', () => {
								if (option3.innerText != '+') {
									selected1.innerText = option3.innerText;

									options1.forEach((option3) => {
										option3.classList.remove('active');
									});
									option3.classList.add('active');

									if ($current.list.toLowerCase() != option3.innerText.toLowerCase()) {
										current.update((n) => {
											tmp.list = option3.innerText.toLowerCase();
											tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));

											return tmp;
										});
									}
								}
							});
						}
					});
				}
			});
		});
	});

	onMount(() => {
		let dropdown = document.querySelector('.dropdown');
		let select = dropdown.querySelector('.select');
		let caret = dropdown.querySelector('.caret');
		let menu = dropdown.querySelector('.menu');
		let options = dropdown.querySelectorAll('.menu li');
		let selected = dropdown.querySelector('.selected');

		// its own function
		select.addEventListener('click', () => {
			select.classList.toggle('select-clicked');
			caret.classList.toggle('caret-rotate');
			menu.classList.toggle('menu-open');
		});

		options.forEach((option) => {
			option.addEventListener('click', () => {
				// its own function
				if (option.innerText != '+') {
					selected.innerText = option.innerText;
					select.classList.remove('select-clicked');
					caret.classList.remove('caret-rotate');
					menu.classList.remove('menu-open');

					options.forEach((option) => {
						option.classList.remove('active');
					});

					option.classList.add('active');

					// active class for list
					current.update((n) => {
						let tmp = n;
						tmp.lang = option.innerText.toLowerCase();
						tmp.list = returnListsOfLang($data, tmp.lang)[0];
						tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));

						return tmp;
					});

					// active class for list
					let dropdown1 = document.querySelector('.dropdown1');
					let options1 = dropdown1.querySelectorAll('.menu1 li');
					let selected1 = dropdown1.querySelector('.selected1');

					selected1.innerText = capitalizeWord($current.list);

					options1.forEach((option3) => {
						if ($current.list != undefined) {
							if (option3.innerText.toLowerCase() == $current.list) {
								options1.forEach((option3) => {
									option3.classList.remove('active');
								});
								option3.classList.add('active');
							}

							option3.addEventListener('click', () => {
								if (option3.innerText != '+') {
									selected1.innerText = option3.innerText;

									options1.forEach((option3) => {
										option3.classList.remove('active');
									});
									option3.classList.add('active');

									current.update((n) => {
										let tmp = n;
										tmp.list = option3.innerText.toLowerCase();
										tmp.word = returnSingleWord(newCurrentList($data, tmp.lang, tmp.list));

										return tmp;
									});
								}
							});
						}
					});
				}
			});
		});

		// this one can be in the update
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

		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<li on:click={overlayHandler} class="plus">+</li>
	</ul>
</div>

<style>
	.dropdown {
		margin-left: auto;
	}
</style>
