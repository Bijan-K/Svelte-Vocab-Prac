import { writable, derived } from 'svelte/store';

// forms
export let currentForm = writable({
	Lang: '',
	List: '',
	defineWord: ''
});

export let formState = writable(false);

export let fileWords = writable([]);
