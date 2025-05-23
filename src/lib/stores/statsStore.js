// src/lib/stores/statsStore.js
import { writable } from 'svelte/store';

// Statistics and tracking data with spaced repetition support
export const stats = writable({
  version: '3.0.0',
  record: {
    date_list: [],
    t_date: new Date(),
    info: {
      incorrect: 0,
      correct: 0,
      totalReviews: 0,
      newWords: 0
    }
  },
  streak: 0,
  mistake_lang: [
    {
      lang: 'english',
      defineKeyword: 'define',
      llmPrompt: 'What is the meaning of',
      mistakes: []
    }
  ],
  // New SRS-specific stats
  srs: {
    totalWordsLearning: 0,
    wordsReviewedToday: 0,
    averageAccuracy: 0,
    longestStreak: 0,
    dailyGoal: 20,
    weeklyStreak: 0
  }
});