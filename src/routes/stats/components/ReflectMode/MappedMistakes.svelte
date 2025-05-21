<!-- src\routes\stats\components\ReflectMode\MappedMistakes.svelte -->
<script>
	import { stats, current } from '$lib/stores/crucial.js';

	import {StatIcons} from '$lib/Icons/index.js';
	import {NavigationIcons} from '$lib/Icons/index.js';

	function returnArray(mistake_lang, currentLang) {
		let index = mistake_lang.findIndex((obj) => obj.lang.toLowerCase() == currentLang);

		return mistake_lang[index].mistakes;
	}

	function returnDefineWord(stats, current) {
		let index = stats.mistake_lang.findIndex(
			(element) => element.lang.toLowerCase() == current.lang
		);

		if (index != -1) {
			return stats.mistake_lang[index].defineKeyword;
		}

		return 'define';
	}

	$: {
		$stats;
		returnDefineWord($stats, $current);
	}

	$: mistakesArray = returnArray($stats.mistake_lang, $current.lang);
</script>

<div class="reflect-container">
	<div class="title-holder">
		<div class="title">
			<h2>Mistake</h2>
			<h2>Times</h2>
			<h2><StatIcons icon="q" /></h2>
		</div>
	</div>

	<div class="">
		{#each mistakesArray as mistake}
			<div class="mistake">
				<span>{mistake.word}</span>
				<span>{mistake.times}</span>
				<a
					href="https://www.google.com/search?q={returnDefineWord($stats, $current)}+{mistake.word}"
					target="'_blank'"
				>
					<NavigationIcons icon="search" />
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
		padding: 0.75rem;
		text-align: center;
	}
	.reflect-container {
		width: 100%;
		height: 100%;
	}
	.title-holder {
		padding: 1rem;
		border-bottom: 1px solid #f0fdf4;
		margin: 0 3%;
	}
	.title {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		margin: 0 10%;
	}
	@media (max-width: 600px) {
		.title {
			margin: 0 2px;
		}
		.title h2 {
			font-size: calc(16px + 1vw);
		}

		h1 {
			font-size: calc(20px + 1vw);
		}
	}

	.title h2 {
		place-self: center;
	}

	.mistake {
		padding: 2rem;
		font-size: 1.2rem;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin: 0 12%;
		border-bottom: #f0fdf4 1px solid;
	}
	.mistake a {
		place-self: center;
		text-decoration: none;
		color: #f0fdf4;
	}
	.mistake span {
		place-self: center;

		text-align: center;
	}
</style>
