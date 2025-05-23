// src/lib/utils/wordUtils.js
// Functions for manipulating word data with spaced repetition support

import { createNewWord, calculateNextDueDate, isWordDue } from '$lib/stores/dataStore.js';

/**
 * Add a word to a specific list with SRS properties
 */
export function addWordtoList(data, Lang, List, word) {
  const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() == Lang);
  if (langIndex != -1) {
    const listIndex = data[langIndex].lists.findIndex((obj) => obj.name.toLowerCase() == List);

    if (listIndex != -1) {
      data[langIndex].lists[listIndex].words.push(createNewWord(word));
      return data;
    }
  }

  return data;
}

/**
 * Remove a word from a specific list
 */
export function rmWordFromList(data, lang, list, word) {
  const langObject = data.find((obj) => obj.lang.toLowerCase() == lang);

  if (langObject) {
    const targetList = langObject.lists.find((l) => l.name.toLowerCase() == list);

    if (targetList) {
      targetList.words = targetList.words.filter((obj) => obj.word !== word);

      let langIndex = data.findIndex((obj) => obj.lang.toLowerCase() === lang);
      let listIndex = data[langIndex].lists.findIndex((obj) => obj.name.toLowerCase() == list);

      data[langIndex].lists[listIndex] = targetList;
    }
  }

  return data;
}

/**
 * Delete a word from a specific list (new function for UI delete functionality)
 */
export function deleteWordFromList(data, lang, list, word) {
  const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() === lang.toLowerCase());
  
  if (langIndex !== -1) {
    const listIndex = data[langIndex].lists.findIndex((obj) => obj.name.toLowerCase() === list.toLowerCase());
    
    if (listIndex !== -1) {
      data[langIndex].lists[listIndex].words = data[langIndex].lists[listIndex].words.filter(
        (wordObj) => wordObj.word !== word
      );
    }
  }
  
  return data;
}

/**
 * Remove a word from stats mistakes list
 */
export function removeWordFromStatsMistakesList(stats, currentLang, word) {
  let langIndex = stats.mistake_lang.findIndex((obj) => obj.lang.toLowerCase() === currentLang.toLowerCase());
  
  if (langIndex !== -1) {
    stats.mistake_lang[langIndex].mistakes = stats.mistake_lang[langIndex].mistakes.filter(
      (mistake) => mistake.word !== word
    );
  }
  
  return stats;
}

/**
 * Add a word to the stats mistakes list for tracking
 */
export function addWordToStatsMistakesList(stats, currentLang, word) {
  let langIndex = stats.mistake_lang.findIndex((obj) => obj.lang.toLowerCase() == currentLang);

  if (langIndex != -1) {
    // if the word did not exist
    if (!stats.mistake_lang[langIndex].mistakes.some((obj) => obj.word === word)) {
      stats.mistake_lang[langIndex].mistakes.push({ word: word, times: 1 });
      return stats;
    }
    // increasing the count of the word
    else {
      let index = stats.mistake_lang[langIndex].mistakes.findIndex((obj) => obj.word === word);
      stats.mistake_lang[langIndex].mistakes[index].times++;
      return stats;
    }
  }
  
  return stats;
}

/**
 * Add a word to the mistakes list with SRS properties
 */
export function addWordtoMistakesList(data, currentLang, word) {
  const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() === currentLang);

  if (langIndex != -1) {
    let index = data[langIndex].lists[0].words.findIndex((obj) => obj.word === word);

    if (index == -1) {
      // Add as new word if not exists
      data[langIndex].lists[0].words.push(createNewWord(word));
    } else {
      // Reset the word's progress if it already exists
      const wordData = data[langIndex].lists[0].words[index];
      const updates = calculateNextDueDate(wordData, false);
      Object.assign(data[langIndex].lists[0].words[index], updates);
    }
    return data;
  }

  return data;
}

/**
 * Find a word and return its array indices
 */
export function findWordReturnArrayIndex(data, currentLang, currentList, word) {
  const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() == currentLang);

  if (langIndex != -1) {
    const listIndex = data[langIndex].lists.findIndex(
      (obj) => obj.name.toLowerCase() == currentList
    );

    if (listIndex != -1) {
      let wordIndex = data[langIndex].lists[listIndex].words.findIndex((obj) => obj.word == word);
      if (wordIndex != -1) return [langIndex, listIndex, wordIndex];
    }
  }

  return [-1, -1, -1];
}

/**
 * Update word after correct answer (SRS progression)
 */
export function markWordCorrect(data, currentLang, currentList, word) {
  const [i, j, k] = [...findWordReturnArrayIndex(data, currentLang, currentList, word)];

  if (i != -1) {
    const wordData = data[i].lists[j].words[k];
    const updates = calculateNextDueDate(wordData, true);
    Object.assign(data[i].lists[j].words[k], updates);
  }

  return data;
}

/**
 * Update word after incorrect answer (SRS reset)
 */
export function markWordIncorrect(data, currentLang, currentList, word) {
  const [i, j, k] = [...findWordReturnArrayIndex(data, currentLang, currentList, word)];

  if (i != -1) {
    const wordData = data[i].lists[j].words[k];
    const updates = calculateNextDueDate(wordData, false);
    Object.assign(data[i].lists[j].words[k], updates);
  }

  return data;
}

/**
 * Legacy function - now redirects to markWordCorrect
 */
export function changeWordKnownToCorrect(data, currentLang, currentList, word) {
  return markWordCorrect(data, currentLang, currentList, word);
}

/**
 * Get words that are due for review in a specific list
 */
export function getDueWords(data, currentLang, currentList) {
  const langObject = data.find((obj) => obj.lang.toLowerCase() === currentLang);

  if (langObject) {
    const thisListIndex = langObject.lists.findIndex(
      (obj) => obj.name.toLowerCase() == currentList
    );

    if (thisListIndex != -1) {
      const allWords = langObject.lists[thisListIndex].words;
      return allWords.filter(word => isWordDue(word));
    }
  }

  return [];
}

/**
 * Get new list of words based on current selection (due words)
 */
export function newCurrentList(data, currentLang, currentList) {
  return getDueWords(data, currentLang, currentList);
}

/**
 * Select a random word from due words
 */
export function selectRandomWord(listWords) {
  if (listWords.length != 0) {
    return listWords[Math.floor(Math.random() * listWords.length)];
  }

  return { word: 'All caught up! 🎉' };
}

/**
 * Return a single random word from a list
 */
export function returnSingleWord(list) {
  if (list.length == 0) return 'All caught up! 🎉';

  return list[Math.floor(Math.random() * list.length)].word;
}

/**
 * Reset all words in a list to initial SRS state
 */
export function resetListProgress(data, targetLang, targetListName) {
  const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() === targetLang.toLowerCase());

  if (langIndex !== -1) {
    const listIndex = data[langIndex].lists.findIndex(
      (obj) => obj.name.toLowerCase() === targetListName.toLowerCase()
    );

    if (listIndex !== -1) {
      data[langIndex].lists[listIndex].words.forEach((wordObj) => {
        wordObj.level = 0;
        wordObj.dueDate = new Date().toISOString();
        wordObj.lastReviewed = null;
        wordObj.correctStreak = 0;
        wordObj.incorrectCount = 0;
        wordObj.totalReviews = 0;
      });
    }
  }

  return data;
}

/**
 * Legacy function - now redirects to resetListProgress
 */
export function resetKnown(data, targetLang, targetListName) {
  return resetListProgress(data, targetLang, targetListName);
}

/**
 * Get statistics for a specific list
 */
export function getListStats(data, lang, listName) {
  const langObject = data.find((obj) => obj.lang.toLowerCase() === lang.toLowerCase());
  
  if (!langObject) return { total: 0, new: 0, learning: 0, mature: 0, due: 0 };
  
  const list = langObject.lists.find((l) => l.name.toLowerCase() === listName.toLowerCase());
  
  if (!list) return { total: 0, new: 0, learning: 0, mature: 0, due: 0 };
  
  const now = new Date();
  const stats = {
    total: list.words.length,
    new: 0,
    learning: 0,
    mature: 0,
    due: 0
  };
  
  list.words.forEach(word => {
    if (word.level === 0) {
      stats.new++;
    } else if (word.level < 4) {
      stats.learning++;
    } else {
      stats.mature++;
    }
    
    if (isWordDue(word)) {
      stats.due++;
    }
  });
  
  return stats;
}