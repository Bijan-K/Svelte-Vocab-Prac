<!-- src/lib/Icons/NavigationIcons.svelte -->
<script>
    // This file consolidates navigation-related icons
    export let icon = '';
    export let props = {};
  </script>
  
  {#if icon === 'link'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="currentColor"
        d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5"
      /></svg>
  {:else if icon === 'search'}
    <svg
      style="transform: translateY(15%) scale(150%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zM8.7 8l2.1 2.1L7 14l2.8 2.8l3.8-3.9l2.1 2.1V8z"
    /></svg>
  {:else if icon === 'github'}
    <svg
      style="font-size: 2rem;"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    ><path
      fill="currentColor"
      d="M216 104v8a56.06 56.06 0 0 1-48.44 55.47A39.8 39.8 0 0 1 176 192v40a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-16H72a40 40 0 0 1-40-40a24 24 0 0 0-24-24a8 8 0 0 1 0-16a40 40 0 0 1 40 40a24 24 0 0 0 24 24h24v-8a39.8 39.8 0 0 1 8.44-24.53A56.06 56.06 0 0 1 56 112v-8a58.14 58.14 0 0 1 7.69-28.32A59.78 59.78 0 0 1 69.07 28A8 8 0 0 1 76 24a59.75 59.75 0 0 1 48 24h24a59.75 59.75 0 0 1 48-24a8 8 0 0 1 6.93 4a59.74 59.74 0 0 1 5.37 47.68A58 58 0 0 1 216 104"
    /></svg>
  {:else if icon === 'question'}
    <svg
      style="transform: scale(150%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    ><path
      fill="currentColor"
      d="M200 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16m-64 119.28v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.77 31.93-32 35.28m4 36.72a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
    /></svg>
  {/if}