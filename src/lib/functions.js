export function getDefaultLang(data) {
	if (data[0].lang) return data[0].lang, data[0].lists[0].name;
	return 'notfound', ['notfound'];
}

export function returnLists(data, lang) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];
		if (data[i].lang === lang) {
			const currentLists = currentObject.lists.map((obj) => obj.name);
			return currentLists;
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

export function capitalizeWord(word) {
	if (word) return word.charAt(0).toUpperCase() + word.slice(1);
	return 'NoList';
}

export function returnWordsInList(data, lang, list) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];
		if (currentObject.lang == lang) {
			for (let j = 0; j < currentObject.lists.length; j++) {
				const currentList = currentObject.lists[j];
				if (currentList.name == list) {
					return currentList.words;
				}
			}
		}
	}

	return [];
}

export function returnSingleWord(list) {
	console.log(list);
	if (list.length == 0) return 'empty list';

	return list[Math.floor(Math.random() * list.length)].word;
}
