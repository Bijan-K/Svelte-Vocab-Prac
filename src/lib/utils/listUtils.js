// src/lib/utils/listUtils.js
// Functions for managing lists and languages

/**
 * Get the default language from data
 */
export function getDefaultLang(data) {
  return data[0].lang.toLowerCase();
}

/**
 * Get the default list for a given language
 */
export function getDefaultList(data, currentLang) {
  const langObject = data.find((obj) => obj.lang.toLowerCase() === currentLang);
  return langObject.lists[0].name;
}

/**
 * Return all lists for a given language
 */
export function returnListsOfLang(data, lang) {
  const langObject = data.find((obj) => obj.lang.toLowerCase() === lang);

  if (langObject) {
    const currentLists = langObject.lists.map((obj) => obj.name.toLowerCase());
    return currentLists;
  }

  return ['notfound'];
}

/**
 * Return all words in a specific list
 */
export function returnWordsInList(data, lang, list) {
  const langObject = data.find((obj) => obj.lang.toLowerCase() === lang);

  if (langObject.lang == lang) {
    const targetList = langObject.lists.find((l) => l.name.toLowerCase() === list);

    if (targetList) {
      return targetList.words;
    }
  }

  return [];
}

/**
 * Add a new language to data and stats
 */
export function addNewLangToDataAndStats(data, stats, langName, defineWord = '', llmPrompt = '') {
  data.push({
    lang: langName.toLowerCase(),
    lists: [
      {
        name: 'mistakes',
        words: []
      }
    ]
  });

  stats.mistake_lang.push({
    lang: langName.toLowerCase(),
    defineKeyword: defineWord,
    llmPrompt: llmPrompt || 'What is the meaning of',
    mistakes: []
  });

  return [data, stats];
}

/**
 * Add a new list to a specific language
 */
export function addNewListToLang(data, lang, listName) {
  const langIndex = data.findIndex((item) => item.lang.toLowerCase() === lang);
  const listExists = data[langIndex].lists.some((list) => list.name.toLowerCase() === listName);

  if (!listExists) {
    data[langIndex].lists.push({ name: listName, words: [] });
  }

  return data;
}

/**
 * Add words to an existing list in a specific language
 */
export function addWordsToList(data, LangName, ListName, newWords) {
  const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() === LangName);

  if (langIndex !== -1) {
    const listIndex = data[langIndex].lists.findIndex(
      (list) => list.name.toLowerCase() === ListName
    );

    if (listIndex !== -1) {
      const existingWords = data[langIndex].lists[listIndex].words;

      newWords.forEach((newWord) => {
        if (!existingWords.some((existing) => existing.word === newWord.word)) {
          data[langIndex].lists[listIndex].words.push(newWord);
        }
      });
    }
  }

  return data;
}