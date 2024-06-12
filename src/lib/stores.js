import { writable, derived } from 'svelte/store';
import { returnLists } from './functions';

export let data = writable([
	{
		lang: 'english',
		lists: [
			{
				name: 'mistakes',
				words: [
					{
						word: 'hoho',
						known: false
					}
				]
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
	},
	{
		lang: 'arabic',
		lists: []
	},
	{
		lang: 'korean',
		lists: [
			{
				name: 'mistakes',
				words: [
					{
						word: 'korean word',
						known: false
					}
				]
			},
			{
				name: 'list2',
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
	word: '',
	currentDay: ''
});

export let langs = derived(data, (data) => {
	return data.map((obj) => obj.lang);
});

export let lists = derived([data, current], (stores) => {
	const [data, current] = stores;
	if (current.lang == '') return data[0].lists.map((obj) => obj.name);

	let lang = current.lang;

	return returnLists(data, lang);
});

export let overlayState = writable(false);

export let menuState = writable(false);
