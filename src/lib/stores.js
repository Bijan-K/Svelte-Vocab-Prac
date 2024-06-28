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
						word: 'Mistake1',
						known: false
					},
					{
						word: 'Mistake2',
						known: false
					},
					{
						word: 'Mistake3',
						known: false
					},
					{
						word: 'Mistake4',
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
		lang: 'german',
		lists: [
			{
				name: 'mistakes',
				words: []
			}
		]
	},
	{
		lang: 'japanese',
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
	record: {
		date_list: [],
		t_date: new Date(),
		info: {
			incorrect: 0,
			correct: 0
		}
	},
	streak: 0,
	mistake_lang: [
		{
			lang: 'english',
			defineKeyword: 'define',
			mistakes: [{ word: 'word', times: 0 }]
		},
		{
			lang: 'german',
			defineKeyword: 'definieren',
			mistakes: [{ word: 'word', times: 0 }]
		},
		{
			lang: 'japanese',
			defineKeyword: '定義する',
			mistakes: [{ word: 'word', times: 0 }]
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

// selectlist
// selectlang
// question
// addword
export let overlayMode = writable('select');

export let menuState = writable(false);
