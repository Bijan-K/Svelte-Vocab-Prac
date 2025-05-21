// src/lib/utils/wordUtils.js
// Functions for manipulating word data

/**
 * Add a word to a specific list
 */
export function addWordtoList(data, Lang, List, word) {
    const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() == Lang);
    if (langIndex != -1) {
      const listIndex = data[langIndex].lists.findIndex((obj) => obj.name.toLowerCase() == List);
  
      if (listIndex != -1) {
        data[langIndex].lists[listIndex].words.push({ word: word, known: false });
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
   * Add a word to the mistakes list
   */
  export function addWordtoMistakesList(data, currentLang, word) {
    const langIndex = data.findIndex((obj) => obj.lang.toLowerCase() === currentLang);
  
    if (langIndex != -1) {
      let index = data[langIndex].lists[0].words.findIndex((obj) => obj.word === word);
  
      if (index == -1) {
        data[langIndex].lists[0].words.push({ word: word, known: false });
      } else {
        data[langIndex].lists[0].words[index].known = false;
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
   * Mark a word as known/correct
   */
  export function changeWordKnownToCorrect(data, currentLang, currentList, word) {
    const [i, j, k] = [...findWordReturnArrayIndex(data, currentLang, currentList, word)];
  
    if (i != -1) {
      data[i].lists[j].words[k].known = true;
    }
  
    return data;
  }
  
  /**
   * Get a new list of words based on current selection
   */
  export function newCurrentList(data, currentLang, currentList) {
    const langObject = data.find((obj) => obj.lang.toLowerCase() === currentLang);
  
    if (langObject) {
      const thisListIndex = langObject.lists.findIndex(
        (obj) => obj.name.toLowerCase() == currentList
      );
  
      if (thisListIndex != -1) {
        let toBeFiltered = langObject.lists[thisListIndex];
        toBeFiltered = toBeFiltered.words.filter((item) => item.known == false);
  
        return toBeFiltered;
      }
    }
  
    return [];
  }
  
  /**
   * Select a random word from a list
   */
  export function selectRandomWord(listWords) {
    if (listWords.length != 0) {
      return listWords[Math.floor(Math.random() * listWords.length)];
    }
  
    return { word: 'Completed ^^' };
  }
  
  /**
   * Return a single random word from a list
   */
  export function returnSingleWord(list) {
    if (list.length == 0) return 'empty list';
  
    return list[Math.floor(Math.random() * list.length)].word;
  }
  
  /**
   * Reset the known status of all words in a list
   */
  export function resetKnown(data, targetLang, targetListName) {
    const LangIndex = data.findIndex((obj) => (obj.name = targetLang));
  
    const ListIndex = data[LangIndex].lists.findIndex(
      (obj) => obj.name.toLowerCase() == targetListName
    );
  
    data[LangIndex].lists[ListIndex].words.forEach((element) => {
      element.known = false;
    });
  
    return data;
  }