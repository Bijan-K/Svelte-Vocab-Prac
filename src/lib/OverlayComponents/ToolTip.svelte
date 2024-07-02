<script>
	export let message;

	if (message[0] != '[') {
		message = 'word <br/> word <br/>';
	}
</script>

<div class="tooltip-container">
	<slot />

	<span class="tooltip-text">
		<span title>Tooltip: </span>
		{#if message[0] == '['}
			{message}
		{:else}
			<span class="w">word</span>
			<span class="w">word</span>
			<span class="w"> word</span>
			<span class="w">word</span>
		{/if}
	</span>
</div>

<style>
	.tooltip-container {
		position: relative;
		display: inline-block;
	}

	.tooltip-text {
		display: flex;
		flex-direction: column;
		padding: 0.75rem;
		border: #000 3px solid;
		visibility: hidden;
		background-color: #475569;
		color: #eee;
		text-align: center;
		border-radius: 4px;
		padding: 5px;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;

		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltip-container:hover .tooltip-text {
		visibility: visible;
		opacity: 1;
	}
	.w {
		border-left: #000 1px solid;
	}
</style>
