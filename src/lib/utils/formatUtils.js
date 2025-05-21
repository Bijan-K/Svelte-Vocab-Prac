// src/lib/utils/formatUtils.js
// Formatting and display utility functions

/**
 * Capitalize the first letter of a word
 */
export function capitalizeWord(word) {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return 'No-Word';
  }
  
  /**
   * Get the current date in a formatted string
   */
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
  
  /**
   * Calculate the user's streak based on past dates
   */
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