// src/lib/stores/uiStore.js
import { writable } from 'svelte/store';

// Overlay controls
export const overlayMode = writable(false); // options: selectlist / selectlang / conformation / newword
export const overlayState = writable(false);

// Menu controls
export const menuState = writable(false);
export const showSelector = writable(false);

// Mode controls
export const statsSettingMode = writable('reflect');
export const pracMode = writable('normal');

// Form controls
export const currentForm = writable({
  Lang: '',
  List: '',
  defineWord: ''
});

export const formState = writable(false);