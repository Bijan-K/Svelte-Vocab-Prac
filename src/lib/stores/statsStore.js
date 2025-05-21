// src/lib/stores/statsStore.js
import { writable } from 'svelte/store';

// Statistics and tracking data
export const stats = writable({
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