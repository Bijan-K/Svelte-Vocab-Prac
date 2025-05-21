// src\lib\utils\formFunctions.js
// Add a new Lang to Data and Stats
export function addNewLangToDataAndStats(data, stats, langName, defineWord = '') {
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
		mistakes: []
	});

	return [data, stats];
}

// Add a new list to a specific language
export function addNewListToLang(data, lang, listName) {
	const langIndex = data.findIndex((item) => item.lang.toLowerCase() === lang);
	const listExists = data[langIndex].lists.some((list) => list.name.toLowerCase() === listName);

	if (!listExists) {
		data[langIndex].lists.push({ name: listName, words: [] });
	}

	return data;
}

// Add words to an existing list in a specific language
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
					return data;
				}
			});
		}
	}

	return data;
}
