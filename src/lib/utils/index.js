// src/lib/utils/index.js
// Central export file for all utility functions

// Word utilities
export {
  addWordtoList,
  rmWordFromList,
  deleteWordFromList,
  removeWordFromStatsMistakesList,
  addWordToStatsMistakesList,
  addWordtoMistakesList,
  findWordReturnArrayIndex,
  changeWordKnownToCorrect,
  markWordCorrect,
  markWordIncorrect,
  newCurrentList,
  getDueWords,
  selectRandomWord,
  returnSingleWord,
  resetKnown,
  resetListProgress,
  getListStats
} from './wordUtils.js';

// List utilities
export {
  getDefaultLang,
  getDefaultList,
  returnListsOfLang,
  returnWordsInList,
  addNewLangToDataAndStats,
  addNewListToLang,
  addWordsToList
} from './listUtils.js';

// Formatting utilities
export {
  capitalizeWord,
  getCurrentDate,
  calculateStreak
} from './formatUtils.js';

// SRS utilities (re-exported from dataStore for convenience)
export {
  createNewWord,
  isWordDue,
  calculateNextDueDate,
  SRS_INTERVALS
} from '../stores/dataStore.js';