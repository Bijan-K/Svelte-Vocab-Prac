<script>
	import { onMount } from 'svelte';
	import './style.css';

	onMount(() => {
		const dropdown1 = document.querySelector('.dropdown');
		const select1 = dropdown.querySelector('.select');
		const caret1 = dropdown.querySelector('.caret');
		const menu1 = dropdown.querySelector('.menu');
		const options1 = dropdown.querySelectorAll('.menu li');
		const selected1 = dropdown.querySelector('.selected');
		select1.addEventListener('click', () => {
			select1.classList.toggle('select-clicked');
			caret1.classList.toggle('caret-rotate');
			menu1.classList.toggle('menu-open');
		});
		options1.forEach((option) => {
			option.addEventListener('click', () => {
				selected1.innerText = option.innerText;
				select1.classList.remove('select-clicked');
				caret1.classList.remove('caret-rotate');
				menu1.classList.remove('menu-open');
				options1.forEach((option) => {
					option.classList.remove('active');
				});
				option.classList.add('active');
			});
		});
	});
</script>

<div class="dropdown">
	<div class="select">
		<span class="selected">Mistakes</span>
		<div class="caret"></div>
	</div>
	<ul class="menu">
		<li>Instagram</li>
		<li>Twitter</li>
		<li>Github</li>
		<li class="active">Mistakes</li>
	</ul>
</div>

<style>
</style>
