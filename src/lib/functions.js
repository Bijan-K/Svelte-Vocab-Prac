import { current } from './stores.js';

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

// dropdown check
export function DropdownListCheck() {
	const dropdown1 = document.querySelector('.dropdown1');
	const select1 = dropdown1.querySelector('.select1');
	const caret1 = dropdown1.querySelector('.caret1');
	const menu1 = dropdown1.querySelector('.menu1');
	const options1 = dropdown1.querySelectorAll('.menu1 li');
	const selected1 = dropdown1.querySelector('.selected1');
	select1.addEventListener('click', () => {
		select1.classList.toggle('select-clicked1');
		caret1.classList.toggle('caret-rotate1');
		menu1.classList.toggle('menu-open1');
	});

	options1.forEach((option) => {
		option.addEventListener('click', () => {
			if (option.innerText != '+') {
				selected1.innerText = option.innerText;
				console.log('option innertext', option.innerText);
				select1.classList.remove('select-clicked1');
				caret1.classList.remove('caret-rotate1');
				menu1.classList.remove('menu-open1');

				options1.forEach((option) => {
					option.classList.remove('active');
				});
				option.classList.add('active');
				console.log('this is option', option);

				current.update((n) => {
					let tmp = n;
					tmp.list = option.innerText.toLowerCase();
					tmp.word = capitalizeWord(returnSingleWord(returnWordsInList($data, tmp.lang, tmp.list)));
					return tmp;
				});
			}
		});
	});
}

export function DropdownLangCheck(word) {
	selected.innerText = word;
	// select.classList.toggle('select-clicked1');

	select.classList.remove('select-clicked');
	caret.classList.remove('caret-rotate');
	menu.classList.remove('menu-open');
	options.forEach((option) => {
		option.classList.remove('active');
	});
	option.classList.add('active');
}
