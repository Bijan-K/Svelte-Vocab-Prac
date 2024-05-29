<script>
	import { onMount } from 'svelte';
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
				selected1.innerText = option.innerText;
				select1.classList.remove('select-clicked1');
				caret1.classList.remove('caret-rotate1');
				menu1.classList.remove('menu-open1');
				options1.forEach((option) => {
					option.classList.remove('active');
				});
				option.classList.add('active');
			});
		});
	});
</script>

<div class="dropdown1">
	<div class="select1">
		<span class="selected1">Mistakes</span>
		<div class="caret1"></div>
	</div>
	<ul class="menu1">
		<li>Instagram</li>
		<li>Twitter</li>
		<li>Github</li>

		<li class="plus">+</li>
	</ul>
</div>

<style>
	.plus {
		text-align: center;
	}
</style>
