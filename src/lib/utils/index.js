// src/lib/utils/index.js
// Central export file for all utility functions

// Word utilities
export {
    addWordtoList,
    rmWordFromList,
    addWordToStatsMistakesList,
    addWordtoMistakesList,
    findWordReturnArrayIndex,
    changeWordKnownToCorrect,
    newCurrentList,
    selectRandomWord,
    returnSingleWord,
    resetKnown
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