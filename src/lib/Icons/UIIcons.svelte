<!-- src/lib/Icons/UIIcons.svelte -->
<script>
    // This file consolidates UI-related icons
    export let icon = '';
    export let props = {};
  </script>
  
  {#if icon === 'add'}
    <svg
      style="transform: translateY(15%) scale(160%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
    /></svg>
  {:else if icon === 'edit'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.525q.5 0 .75.313t.25.687t-.262.688T11.5 5H5v14h14v-6.525q0-.5.313-.75t.687-.25t.688.25t.312.75V19q0 .825-.587 1.413T19 21zm4-7v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10q-.425 0-.712-.288T9 14m12.025-9.6l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
      /></svg>
  {:else if icon === 'x'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
      /></svg>
  {:else if icon === 'check'}
    <svg
      style="transform: translateY(10%);"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 14l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
    /></svg>
  {:else if icon === 'negative'}
    <svg
      style="transform: translateY(10%);"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM7 11h10v2H7z"
    /></svg>
  {:else if icon === 'setting'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="currentColor"
        d="M2 18h7v2H2zm0-7h9v2H2zm0-7h20v2H2zm18.674 9.025l1.156-.391l1 1.732l-.916.805a4.014 4.014 0 0 1 0 1.658l.916.805l-1 1.732l-1.156-.391a4 4 0 0 1-1.435.83L19 21h-2l-.24-1.196a3.997 3.997 0 0 1-1.434-.83l-1.156.392l-1-1.732l.916-.805a4.014 4.014 0 0 1 0-1.658l-.916-.805l1-1.732l1.156.391c.41-.37.898-.655 1.435-.83L17 11h2l.24 1.196a3.99 3.99 0 0 1 1.434.83M18 18a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      /></svg>
  {:else if icon === 'info'}
    <svg
      style="transform: scale(200%) translateY(10%);"
      xmlns="http://www.w3.org/2000/svg"
      width="0.7em"
      height="0.7em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
    /></svg>
  {:else if icon === 'remove'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="currentColor"
        d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"
      /></svg>
  {:else if icon === 'fadeDown'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="currentColor"
        d="m16.5 5.586l-4.5 4.5l-4.5-4.5L6.086 7L12 12.914L17.914 7zm0 6.5l-4.5 4.5l-4.5-4.5L6.086 13.5L12 19.414l5.914-5.914z"
      /></svg>
  {:else if icon === 'tick'}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}
      ><path
        fill="currentColor"
        d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"
      /></svg>
  {/if}