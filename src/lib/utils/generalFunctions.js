export function capitalizeWord(word) {
	if (word) return word.charAt(0).toUpperCase() + word.slice(1);
	return 'No-Word';
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

export function selectRandomWord(listWords) {
	if (listWords.length != 0) {
		return listWords[Math.floor(Math.random() * listWords.length)];
	}

	return { word: 'Completed ^^' };
}

export function returnSingleWord(list) {
	if (list.length == 0) return 'empty list';

	return list[Math.floor(Math.random() * list.length)].word;
}

export function resetKnown(data, targetLang, targetListName) {
	for (const langObject of data) {
		if (langObject.lang.toLowerCase() === targetLang) {
			for (const list of langObject.lists) {
				if (list.name === targetListName) {
					list.words = list.words.map((word) => (word.known ? { ...word, known: false } : word));
					return data;
				}
			}
		}
	}
	return data;
}
