export function returnLangs(data) {
	const values = data.map((obj) => obj.lang);
	return values;
}

export function returnLists(data, lang) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];
		if (data[i].lang === lang) {
			const currentList = currentObject.lists.map((obj) => obj.name);
			return currentList;
		}
	}
	return 'notfound';
}

export function findWord(data, lang, word) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];
		if (currentObject.lang == lang) {
			for (let j = 0; j < currentObject.lists.length; j++) {
				const currentList = currentObject.lists[j];
				if (currentList.name == list) {
					for (let k = 0; k < currentList.words.length; k++) {
						const currentWord = currentList.words[k];
						if (currentWord.word == word) {
							return i, j, k;
						}
					}
				}
			}
		}
	}

	return false;
}

export function changeWordKnownToCorrect(data, currentLang, currentList, word) {
	const [i, j, k] = [...findWord(word)];
	data[i][lang][currentLang][j][currentList][k].known = true;
	return data;
}
