// General
export function capitalizeWord(word) {
	if (word) return word.charAt(0).toUpperCase() + word.slice(1);
	return ['NoList'];
}

export function getCurrentDate() {
	const today = new Date();
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const day = today.getDate();
	const month = monthNames[today.getMonth()];
	const year = today.getFullYear();

	if (day === 1 || day === 21 || day === 31) {
		return `${day}st ${month} ${year}`;
	} else if (day === 2 || day === 22) {
		return `${day}nd ${month} ${year}`;
	} else if (day === 3 || day === 23) {
		return `${day}rd ${month} ${year}`;
	} else {
		return `${day}th ${month} ${year}`;
	}
}

export function calculateStreak(dateArray, targetDate) {
	if (dateArray.length == 0) return 0;

	function parseDate(dateStr) {
		const [day, month, year] = dateStr.split(' ');
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		return new Date(year, monthNames.indexOf(month), parseInt(day));
	}

	dateArray.sort((a, b) => parseDate(b) - parseDate(a));

	const targetIndex = dateArray.indexOf(targetDate);
	if (targetIndex === -1) return 0;

	let consecutiveDays = 1;
	const targetDateObj = parseDate(targetDate);

	for (let i = targetIndex + 1; i < dateArray.length; i++) {
		const currentDateObj = parseDate(dateArray[i]);
		const dayDifference = (targetDateObj - currentDateObj) / (1000 * 60 * 60 * 24);

		if (dayDifference === consecutiveDays) {
			consecutiveDays++;
		} else {
			break;
		}
	}

	return consecutiveDays - 1;
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
	if (list.length == 0) return 'empty list';

	return list[Math.floor(Math.random() * list.length)].word;
}

///// buttons

export function resetKnown(data, Lang, List) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];
		if (currentObject.lang == Lang) {
			for (let j = 0; j < currentObject.lists.length; j++) {
				const currentList = currentObject.lists[j];
				if (currentList.name == List) {
					let newArray = currentList.words.map((obj) => {
						if (obj.known === true) {
							return { ...obj, known: false };
						}
						return obj;
					});
					data[i]['lists'][j].words = newArray;

					return data;
				}
			}
		}
	}

	return data;
}

// update data (correct)
export function findWord(data, lang, list, word) {
	for (let i = 0; i < data.length; i++) {
		const currentObject = data[i];

		if (currentObject.lang == lang) {
			for (let j = 0; j < currentObject.lists.length; j++) {
				const currentList = currentObject.lists[j];
				if (currentList.name == list) {
					for (let k = 0; k < currentList.words.length; k++) {
						const currentWord = currentList.words[k];
						if (currentWord.word == word) {
							return [i, j, k];
						}
					}
				}
			}
		}
	}

	return [-1, -1, -1];
}

export function changeWordKnownToCorrect(data, currentLang, currentList, word) {
	const [i, j, k] = [...findWord(data, currentLang, currentList, word)];

	if (i != -1) {
		data[i]['lists'][j]['words'][k].known = true;
	}

	return data;
}

// update current (correct & wrong)
export function newCurrentWordList(data, currentLang, currentList) {
	for (let i = 0; i < data.length; i++) {
		const thisObject = data[i];
		if (thisObject.lang == currentLang) {
			for (let j = 0; j < thisObject.lists.length; j++) {
				const thisList = thisObject.lists[j];
				if (thisList.name == currentList) {
					return thisList.words.filter((item) => item.known == false);
				}
			}
		}
	}
}

export function selectRandomWord(listWords) {
	if (listWords.length != 0) {
		return listWords[Math.floor(Math.random() * listWords.length)];
	}

	return { word: 'Completed ^^' };
}

// update data(wrong)
export function addWordtoMistakesList(data, currentLang, word) {
	for (let i = 0; i < data.length; i++) {
		const currObject = data[i];
		if (currObject.lang == currentLang) {
			for (let j = 0; j < currObject.lists.length; j++) {
				const currList = currObject.lists[j];
				if (currList.name == 'mistakes') {
					let index = data[i]['lists'][0].words.findIndex((obj) => obj.word === word);
					if (index == -1) {
						data[i]['lists'][0].words.push({ word: word, known: false });
					} else {
						data[i]['lists'][0].words[index].known = false;
					}
					return data;
				}
			}
		}
	}
}

// Add word to stats wrong list
export function updateStatsMistakesList(stats, currentLang, word) {
	for (let i = 0; i < stats.mistake_lang.length; i++) {
		if (stats.mistake_lang[i].lang == currentLang) {
			// if the word did not exist
			if (!stats.mistake_lang[i].mistakes.some((obj) => obj.word === word)) {
				stats.mistake_lang[i].mistakes.push({ word: word, times: 1 });

				return stats;
			}
			// increasing the count of the word
			else {
				let index = stats.mistake_lang[i].mistakes.findIndex((obj) => obj.word === word);
				stats.mistake_lang[i].mistakes[index].times++;

				return stats;
			}
		}
	}
}
