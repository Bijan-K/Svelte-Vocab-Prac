// src/lib/stores/dataStore.js
import { writable, derived } from 'svelte/store';
import { returnListsOfLang } from '$lib/utils/listUtils.js';

// Version for data migration
export const DATA_VERSION = '3.0.0';

// Spaced repetition intervals in days
export const SRS_INTERVALS = [1, 3, 7, 14, 30, 90, 180, 365];

// Helper function to create a new word with SRS properties
export function createNewWord(wordText) {
  return {
    word: wordText,
    level: 0,
    dueDate: new Date().toISOString(),
    lastReviewed: null,
    correctStreak: 0,
    incorrectCount: 0,
    totalReviews: 0
  };
}

// Helper function to check if a word is due for review
export function isWordDue(word) {
  if (!word.dueDate) return true;
  return new Date() >= new Date(word.dueDate);
}

// Helper function to calculate next due date
export function calculateNextDueDate(word, wasCorrect) {
  const now = new Date();
  
  if (wasCorrect) {
    // Increase level and schedule further out
    const newLevel = Math.min(word.level + 1, SRS_INTERVALS.length - 1);
    const daysToAdd = SRS_INTERVALS[newLevel];
    const nextDue = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    
    return {
      level: newLevel,
      dueDate: nextDue.toISOString(),
      lastReviewed: now.toISOString(),
      correctStreak: word.correctStreak + 1,
      incorrectCount: word.incorrectCount,
      totalReviews: word.totalReviews + 1
    };
  } else {
    // Reset to earlier level but not completely back to 0
    const newLevel = Math.max(0, Math.floor(word.level / 2));
    const daysToAdd = SRS_INTERVALS[newLevel];
    const nextDue = new Date(now.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
    
    return {
      level: newLevel,
      dueDate: nextDue.toISOString(),
      lastReviewed: now.toISOString(),
      correctStreak: 0,
      incorrectCount: word.incorrectCount + 1,
      totalReviews: word.totalReviews + 1
    };
  }
}

// Main vocabulary data store with spaced repetition
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
            level: 0,
            dueDate: new Date().toISOString(),
            lastReviewed: null,
            correctStreak: 0,
            incorrectCount: 0,
            totalReviews: 0
          },
          {
            word: 'brevity',
            level: 0,
            dueDate: new Date().toISOString(),
            lastReviewed: null,
            correctStreak: 0,
            incorrectCount: 0,
            totalReviews: 0
          },
          {
            word: 'exposition',
            level: 0,
            dueDate: new Date().toISOString(),
            lastReviewed: null,
            correctStreak: 0,
            incorrectCount: 0,
            totalReviews: 0
          },
          {
            word: 'appendix',
            level: 0,
            dueDate: new Date().toISOString(),
            lastReviewed: null,
            correctStreak: 0,
            incorrectCount: 0,
            totalReviews: 0
          },
          {
            word: 'terse',
            level: 0,
            dueDate: new Date().toISOString(),
            lastReviewed: null,
            correctStreak: 0,
            incorrectCount: 0,
            totalReviews: 0
          },
          {
            word: 'quotient',
            level: 0,
            dueDate: new Date().toISOString(),
            lastReviewed: null,
            correctStreak: 0,
            incorrectCount: 0,
            totalReviews: 0
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