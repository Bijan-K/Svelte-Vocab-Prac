<script>
	import { onMount } from 'svelte';

	export let text = '';

	let displayText = '';
	let currentIndex = 0;
	let isTyping = false;
	let isErasing = false;
	let isInitialized = false;

	const typeSpeed = 50;
	const eraseSpeed = 40;

	function typeText(newText) {
		isTyping = true;
		currentIndex = 0;

		const typeNextChar = () => {
			if (currentIndex < newText.length) {
				displayText += newText[currentIndex];
				currentIndex++;
				setTimeout(typeNextChar, typeSpeed);
			} else {
				isTyping = false;
			}
		};

		typeNextChar();
	}

	function eraseText() {
		isErasing = true;
		currentIndex = displayText.length - 1;

		const eraseNextChar = () => {
			if (currentIndex >= 0) {
				displayText = displayText.slice(0, -1);
				currentIndex--;
				setTimeout(eraseNextChar, eraseSpeed);
			} else {
				isErasing = false;
				if (text !== '') {
					typeText(text);
				}
			}
		};

		eraseNextChar();
	}

	$: {
		if (isInitialized && text !== displayText && !isTyping && !isErasing) {
			eraseText();
		}
	}

	onMount(() => {
		// Wait for a short delay to allow the store to initialize
		setTimeout(() => {
			isInitialized = true;
			if (text) {
				typeText(text);
			}
		}, 100); // Adjust this delay as needed
	});
</script>

<div id="typewriter">
	{displayText}
</div>

<style>
	div {
		background-color: transparent;
		color: #f0fdf4;
		opacity: 0.8;
		font-size: larger;
	}
</style>
