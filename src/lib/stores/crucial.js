// src\lib\stores\crucial.js
import { writable, derived } from 'svelte/store';
import { returnListsOfLang } from '$lib/utils/initFunctions.js';

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
					},
					{
						word: 'quotient',
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
			mistakes: []
		}
	]
});

export let current = writable({
	lang: '',
	list: '',
	word: ''
});

// necessary for navbar
export let langs = derived(data, (data) => {
	return data.map((obj) => obj.lang);
});

export let lists = derived([data, current], (stores) => {
	const [data, current] = stores;
	if (current.lang == '') return data[0].lists.map((obj) => obj.name.toLowerCase());

	let lang = current.lang.toLowerCase();

	return returnListsOfLang(data, lang);
});
