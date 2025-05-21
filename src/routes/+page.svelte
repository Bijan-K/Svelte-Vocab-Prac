<!-- src\routes\+page.svelte -->
<script>
	import { fly, fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Vocabulary Practice</title>
</svelte:head>

<div class="container">
	<div class="hero" in:fade={{ duration: 500 }}>
		<div class="hero-content">
			<h1 in:fly={{ y: -20, duration: 800 }}>
				Expand your <span class="accent">vocabulary</span>
			</h1>

			<p in:fly={{ y: 20, duration: 800, delay: 200 }}>
				A modern app to help you learn, practice, and remember new words in any language
			</p>

			<div class="features" in:fly={{ y: 20, duration: 800, delay: 400 }}>
				<div class="feature">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
						<polyline points="14 2 14 8 20 8"></polyline>
						<line x1="16" y1="13" x2="8" y2="13"></line>
						<line x1="16" y1="17" x2="8" y2="17"></line>
						<line x1="10" y1="9" x2="8" y2="9"></line>
					</svg>
					<span>Create custom word lists</span>
				</div>

				<div class="feature">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
					</svg>
					<span>Track your progress</span>
				</div>

				<div class="feature">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						></polygon>
					</svg>
					<span>Build learning streaks</span>
				</div>
			</div>
		</div>

		<div class="hero-buttons" in:fly={{ y: 20, duration: 800, delay: 600 }}>
			<a class="btn btn-primary" href="/practice">Start Practicing</a>
			<a class="btn btn-secondary" href="/stats">View Stats</a>
			<a class="btn btn-outline" href="/about">Learn More</a>
		</div>
	</div>

	<div class="background">
		<div class="bg-accent-1"></div>
		<div class="bg-accent-2"></div>
	</div>
</div>

<style>
	.container {
		position: relative;
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 2rem;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		max-width: 800px;
		z-index: 10;
		gap: 3rem;
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		background: linear-gradient(to right, #f8fafc, #94a3b8);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}

	.accent {
		background: linear-gradient(to right, #0ea5e9, #38bdf8);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
	}

	p {
		font-size: clamp(1.1rem, 2vw, 1.25rem);
		line-height: 1.6;
		color: #94a3b8;
		max-width: 600px;
		margin-bottom: 2rem;
	}

	.features {
		display: flex;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.feature {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #cbd5e1;
		font-size: 0.95rem;
	}

	.feature svg {
		color: #0ea5e9;
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn {
		display: inline-block;
		padding: 0.875rem 1.5rem;
		border-radius: 8px;
		font-weight: 500;
		font-size: 1rem;
		transition: all 0.2s;
		text-decoration: none;
	}

	.btn-primary {
		background: linear-gradient(to right, #0ea5e9, #38bdf8);
		color: white;
		box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(14, 165, 233, 0.25);
	}

	.btn-secondary {
		background: rgba(30, 41, 59, 0.8);
		color: #f8fafc;
		box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.btn-secondary:hover {
		background: rgba(30, 41, 59, 1);
		transform: translateY(-2px);
	}

	.btn-outline {
		background: transparent;
		color: #94a3b8;
		border: 1px solid rgba(148, 163, 184, 0.3);
	}

	.btn-outline:hover {
		background: rgba(148, 163, 184, 0.05);
		color: #e2e8f0;
		border-color: rgba(148, 163, 184, 0.5);
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		overflow: hidden;
	}

	.bg-accent-1 {
		position: absolute;
		top: -50%;
		left: -20%;
		width: 70%;
		height: 140%;
		background: radial-gradient(circle, rgba(14, 165, 233, 0.15) 0%, rgba(14, 165, 233, 0) 70%);
		filter: blur(40px);
		animation: float 12s ease-in-out infinite alternate;
	}

	.bg-accent-2 {
		position: absolute;
		bottom: -30%;
		right: -10%;
		width: 60%;
		height: 120%;
		background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(56, 189, 248, 0) 70%);
		filter: blur(40px);
		animation: float 15s ease-in-out infinite alternate-reverse;
	}

	@keyframes float {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(5%, 5%);
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.features {
			gap: 1.5rem;
		}

		.hero-buttons {
			gap: 0.75rem;
		}

		.btn {
			padding: 0.75rem 1.25rem;
			font-size: 0.95rem;
		}
	}

	@media (max-width: 600px) {
		.features {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}

		.hero-buttons {
			flex-direction: column;
			width: 100%;
			max-width: 300px;
		}

		.btn {
			width: 100%;
			text-align: center;
		}
	}
</style>
