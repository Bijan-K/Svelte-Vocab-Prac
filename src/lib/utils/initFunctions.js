export function getDefaultLang(data) {
	return data[0].lang.toLowerCase();
}

export function getDefaultList(data, currentLang) {
	const langObject = data.find((obj) => obj.lang.toLowerCase() === currentLang);

	return langObject.lists[0].name;
}

export function returnListsOfLang(data, lang) {
	const langObject = data.find((obj) => obj.lang.toLowerCase() === lang);

	if (langObject) {
		const currentLists = langObject.lists.map((obj) => obj.name.toLowerCase());
		return currentLists;
	}

	return ['notfound'];
}

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
