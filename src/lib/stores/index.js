// src/lib/stores/index.js

// Data stores
export { 
  data, 
  current, 
  langs, 
  lists, 
  fileWords, 
  DATA_VERSION, 
  SRS_INTERVALS, 
  createNewWord, 
  isWordDue, 
  calculateNextDueDate 
} from './dataStore.js';

// Stats store
export { stats } from './statsStore.js';

// UI stores
export { 
  overlayMode, 
  overlayState, 
  menuState, 
  showSelector, 
  statsSettingMode, 
  pracMode, 
  currentForm, 
  formState,
  dictionarySettings
} from './uiStore.js';