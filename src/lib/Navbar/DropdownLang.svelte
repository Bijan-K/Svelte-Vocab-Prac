<script>
	import { onMount } from 'svelte';
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
				selected.innerText = option.innerText;
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

	function clickHanlder() {
		console.log('Asd');
	}
</script>

<div class="dropdown">
	<div class="select">
		<span class="selected">English</span>
		<div class="caret"></div>
	</div>
	<ul class="menu">
		<li>Instagram</li>
		<li>Twitter</li>
		<li>Github</li>
		<li on:click={clickHanlder} class="active">English</li>
	</ul>
</div>

<style>
	.dropdown {
		margin-left: auto;
	}
</style>
