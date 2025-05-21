<!-- src/lib/Icons/StatIcons.svelte -->
<script>
    // This file consolidates statistics-related icons
    export let icon = '';
    export let props = {};
  </script>
  
  {#if icon === 'calendar'}
    <svg
      style="transform: translateY(15%) scale(120%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"
    /></svg>
  {:else if icon === 'fire'}
    <svg
      style="transform: translateY(15%) scale(120%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="m12 12.9l-2.03 2c-.46.46-.82 1.03-.93 1.67C8.74 18.41 10.18 20 12 20s3.26-1.59 2.96-3.42c-.11-.64-.46-1.22-.93-1.67z"
    /><path
      fill="currentColor"
      d="M15.56 6.55C14.38 8.02 12 7.19 12 5.3V3.77c0-.8-.89-1.28-1.55-.84C8.12 4.49 4 7.97 4 13c0 2.92 1.56 5.47 3.89 6.86a4.86 4.86 0 0 1-.81-3.68c.19-1.04.75-1.98 1.51-2.72l2.71-2.67c.39-.38 1.01-.38 1.4 0l2.73 2.69c.74.73 1.3 1.65 1.48 2.68c.25 1.36-.07 2.64-.77 3.66c1.89-1.15 3.29-3.06 3.71-5.3c.61-3.27-.81-6.37-3.22-8.1c-.33-.25-.8-.2-1.07.13"
    /></svg>
  {:else if icon === 'today'}
    <svg
      style="transform: translateY(15%) scale(120%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V8h14zM7 10h5v5H7z"
    /></svg>
  {:else if icon === 'refresh'}
    <svg
      style="transform: translateY(15%) scale(120%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"
    /></svg>
  {:else if icon === 'q'}
    <svg
      style="transform: scale(190%)"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    ><path
      fill="currentColor"
      d="M9.423 19H5.615q-.69 0-1.153-.462T4 17.384V4.616q0-.691.463-1.153T5.616 3h12.769q.69 0 1.153.463T20 4.616v12.769q0 .69-.462 1.153T18.384 19h-3.807l-2.012 2.011q-.242.243-.565.243t-.566-.243zm2.573-2.789q.333 0 .56-.227q.229-.228.229-.561q0-.332-.228-.56t-.56-.228q-.334 0-.561.228t-.228.56t.227.56t.561.229m1.885-7.904q0 .483-.247.95q-.246.469-.78.948q-.387.356-.65.674t-.417.63q-.12.219-.17.429q-.05.209-.1.459q-.03.202.104.352q.135.15.342.15q.197 0 .347-.134q.15-.135.192-.349q.075-.388.288-.726q.212-.339.706-.833q.74-.74 1.055-1.321t.315-1.23q0-1.118-.769-1.818q-.768-.7-2.016-.7q-.837 0-1.565.398q-.73.398-1.172 1.113q-.098.166-.022.356t.272.258q.172.067.362 0q.19-.068.313-.227q.352-.485.8-.726q.448-.242 1.012-.242q.823 0 1.311.42q.489.42.489 1.169"
    /></svg>
  {/if}