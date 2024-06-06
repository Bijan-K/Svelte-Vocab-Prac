<script>
	import { onMount } from 'svelte';
	import { data, current } from '$lib/stores.js';
	import { returnLangs, capitalizeWord } from '$lib/functions.js';

	import './style.css';
	$: langs = returnLangs($data);

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
				selected.innerText = option.innerText;
				// assign variable
				current.update((n) => {
					if (option.innerText == '+') {
						n.lang = data[0].lang;
						return n;
					}
					n.lang = option.innerText.lowerCase();
					return n;
				});
				select.classList.remove('select-clicked');
				caret.classList.remove('caret-rotate');
				menu.classList.remove('menu-open');
				options.forEach((option) => {
					option.classList.remove('active');
				});
				option.classList.add('active');
			});
		});
	});
</script>

<div class="dropdown">
	<div class="select">
		<span class="selected">Default</span>
		<div class="caret"></div>
	</div>
	<ul class="menu">
		{#each langs as lang}
			<li class="active">{capitalizeWord(lang)}</li>
		{/each}

		<li class="plus">+</li>
	</ul>
</div>

<style>
	.dropdown {
		margin-left: auto;
	}
</style>
