import { writable, derived } from 'svelte/store';
import { returnLists } from './functions';

// crucial
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
				words: ['salient', 'brevity', 'exposition', 'appendix', 'terse', 'quotient']
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
	if (current.lang == '') return data[0].lists.map((obj) => obj.name);

	let lang = current.lang;

	return returnLists(data, lang);
});

// modes:
// options: selectlist / selectlang / conformation / newword
export let overlayMode = writable(false);

export let overlayState = writable(false);

export let menuState = writable(false);

export let showSelector = writable(false);

export let statsSettingMode = writable('reflect');

export let pracMode = writable('normal');

// forms
export let currentForm = writable({
	Lang: '',
	List: '',
	defineWord: ''
});

export let formState = writable(false);

export let fileWords = writable([]);
