import { writable } from 'svelte/store';

export let data = writable([
	{
		lang: 'english',
		lists: [
			{
				name: 'mistakes',
				words: []
			},
			{
				name: 'default',
				words: [
					{
						word: 'salient',
						known: false
					},
					{
						word: 'brevity',
						known: false
					},
					{
						word: 'exposition',
						known: false
					},
					{
						word: 'appendix',
						known: false
					},
					{
						word: 'terse',
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
	lang: '',
	list: '',
	currentDay: ''
});

export let overlayState = writable(false);

export let menuState = writable(false);
