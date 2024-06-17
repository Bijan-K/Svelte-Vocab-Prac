// General
export function capitalizeWord(word) {
	if (word) return word.charAt(0).toUpperCase() + word.slice(1);
	return ['NoList'];
}

// init
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

// buttons
export function findWord(data, lang, list, word) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];
		console.log('0', currentObject);
		if (currentObject.lang == lang) {
			for (let j = 0; j < currentObject.lists.length; j++) {
				const currentList = currentObject.lists[j];
				if (currentList.name == list) {
					for (let k = 0; k < currentList.words.length; k++) {
						const currentWord = currentList.words[k];
						if (currentWord.word == word) {
							console.log(i, j, k);
							return [i, j, k];
						}
					}
				}
			}
		}
	}

	return ['not found', 'not found', 'not found'];
}

export function changeWordKnownToCorrect(data, currentLang, currentList, word) {
	const [i, j, k] = [...findWord(data, currentLang, currentList, word)];

	data[i]['lists'][j]['words'][k].known = true;
	return data;
}

export function newCurrentWordList(data, currentLang, currentList) {
	console.log('1', data);
	console.log('1', currentLang);
	console.log('1', currentList);

	for (let i = 0; i < data.length; i++) {
		const thisObject = data[i];
		if (thisObject.lang == currentLang) {
			for (let j = 0; j < thisObject.lists.length; j++) {
				const thisList = thisObject.lists[j];
				console.log('this list', thisObject.lists[j]);
				if (thisList.name == currentList) {
					console.log('this list words --', thisList.words);
					return thisList.words.filter((item) => item.known == false);
				}
			}
		}
	}
}

export function filterKnownIsTrue(listWords) {
	console.log('listWords', listWords);
	if (listWords.length != 0) {
		return listWords[Math.floor(Math.random() * listWords.length)];
	}

	return { word: 'List has been Completed', known: false };
}
