<script>
	import { onMount } from 'svelte';
	import { stats, current } from '$lib/stores.js';

	// Icons
	import QIcon from '../Icons/QIcon.svelte';
	import SearchIcon from '$lib/Icons/SearchIcon.svelte';

	function returnArray(mistake_lang, currentLang) {
		let index = mistake_lang.findIndex((obj) => obj.lang == currentLang);

		return mistake_lang[index].mistakes;
	}

	//
	$: mistakesArray = returnArray($stats.mistake_lang, $current.lang);
</script>

<div class="reflect-container">
	<div class="title-holder">
		<div class="title">
			<h2>Mistake</h2>
			<h2>Count</h2>
			<h2><QIcon /></h2>
		</div>
	</div>

	<div class="">
		{#each mistakesArray as mistake}
			<div class="mistake">
				<span>{mistake.word}</span>
				<span>{mistake.times}</span>
				<a href="https://www.google.com/search?q=define+{mistake.word}" target="'_blank'">
					<SearchIcon />
				</a>
			</div>
		{/each}

		{#if mistakesArray.length == 0}
			<h1>no mistakes here</h1>
		{/if}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}
	.reflect-container {
		transform: translateY(-20%);
		border: 1px green dashed;
		width: 100%;
		height: 100%;
	}
	.title-holder {
		border: 1px yellow dashed;

		padding: 1rem;
		border-bottom: 1px solid #f0fdf4;
		margin: 0 3%;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10%;
	}

	.mistake {
		padding: 2rem;
		font-size: 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 12%;
		border-bottom: #f0fdf4 1px solid;
	}
	.mistake a {
		text-decoration: none;
		color: #f0fdf4;
	}
	.mistake span {
		text-align: center;
	}
</style>
