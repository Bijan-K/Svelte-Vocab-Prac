// Add a new Lang to Data and Stats
export function addNewLang(data, stats, langName = '', defineWord = '') {
	data.push({
		lang: langName,
		lists: [
			{
				name: 'mistakes',
				words: []
			}
		]
	});

	stats.mistake_lang.push({
		lang: langName,
		defineKeyword: defineWord,
		mistakes: []
	});

	return [data, stats];
}

// Add a new list to a specific language
export function addNewList(data, lang, listName) {
	const langIndex = data.findIndex((item) => item.lang === lang);

	if (langIndex === -1) {
		data.push({
			lang: lang,
			lists: [{ name: listName, words: [] }]
		});
	} else {
		const listExists = data[langIndex].lists.some((list) => list.name === listName);

		if (!listExists) {
			data[langIndex].lists.push({ name: listName, words: [] });
		}
	}

	return data;
}

// Add words to an existing list in a specific language
export function addWordsToList(data, lang, listName, newWords) {
	const langIndex = data.findIndex((item) => item.lang === lang);

	if (langIndex !== -1) {
		const listIndex = data[langIndex].lists.findIndex((list) => list.name === listName);

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
