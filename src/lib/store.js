import { writable } from 'svelte/store';

export let data = writable([
	{
		lang: 'english',
		lists: [
			{
				name: 'mistakes',
				words: [
					{
						word: 'word',
						known: false
					},
					{
						word: 'word2',
						known: false
					},
					{
						word: 'word3',
						known: false
					}
				]
			}
		]
	}
]);

export let stats = writable({
	chart: [
		{
			date: new Date(),
			info: {
				incorrect: 0,
				correct: 0
			}
		}
	],
	streak: 0,
	Mistake_lang: [
		{
			lang: 'english',
			Mistakes: [{ word: 'word', times: 0 }]
		}
	]
});

export let current = writable({
	lang: 'english',
	list: '',
	currentDay: ''
});
