// src/lib/stores/dataStore.js
import { writable, derived } from 'svelte/store';
import { returnListsOfLang } from '$lib/utils/listUtils.js';

// Main vocabulary data store
export const data = writable([
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

// Current selection state
export const current = writable({
  lang: '',
  list: '',
  word: ''
});

// Derived stores
export const langs = derived(data, (data) => {
  return data.map((obj) => obj.lang);
});

export const lists = derived([data, current], (stores) => {
  const [data, current] = stores;
  if (current.lang === '') return data[0].lists.map((obj) => obj.name.toLowerCase());

  let lang = current.lang.toLowerCase();
  return returnListsOfLang(data, lang);
});

// File-related word store
export const fileWords = writable([]);