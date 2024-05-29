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

export let stats = writable(0);

export let current = writable(0);

export let showLayout = writable(true);
