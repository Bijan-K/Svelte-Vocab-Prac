// src\lib\stores\mode.js
import { writable } from 'svelte/store';

// modes:
// options: selectlist / selectlang / conformation / newword
export let overlayMode = writable(false);

export let overlayState = writable(false);

export let menuState = writable(false);

export let showSelector = writable(false);

export let statsSettingMode = writable('reflect');

export let pracMode = writable('normal');
