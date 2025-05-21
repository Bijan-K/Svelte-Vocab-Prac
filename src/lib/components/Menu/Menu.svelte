<!-- src\lib\components\Menu\Menu.svelte -->
<script>
	import { page } from '$app/stores';
	import { slide, fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { afterNavigate, goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { overlayMode, overlayState, menuState, pracMode } from '$lib/stores';
	import { UIIcons, NavigationIcons } from '$lib/Icons/index.js';
	import ModeSelectPrac from './ModeSelectPrac.svelte';
	import DataFileHandler from './DataFileHandler.svelte';

	let visible = false;
	let activeTab = 'settings';

	onMount(() => {
		visible = true;

		// Set the active tab based on the current page
		if ($page.url.pathname === '/practice') {
			activeTab = 'practice';
		} else if ($page.url.pathname === '/stats') {
			activeTab = 'stats';
		} else if ($page.url.pathname === '/about') {
			activeTab = 'about';
		}
	});

	afterNavigate(() => {
		visible = false;
		setTimeout(() => {
			visible = true;

			// Update active tab after navigation
			if ($page.url.pathname === '/practice') {
				activeTab = 'practice';
			} else if ($page.url.pathname === '/stats') {
				activeTab = 'stats';
			} else if ($page.url.pathname === '/about') {
				activeTab = 'about';
			} else {
				activeTab = 'settings';
			}
		}, 200);
	});

	function resetHandler() {
		overlayState.update((n) => !n);
		overlayMode.update((n) => 'conformation');
	}

	function closeMenu() {
		menuState.update((n) => !n);
	}

	function navigateTo(path, tabName) {
		if ($page.url.pathname !== path) {
			goto(path);
		}
		activeTab = tabName;
	}
</script>

<div class="menu-overlay" transition:fade={{ duration: 200 }}>
	<div class="menu-container" in:fly={{ x: 300, duration: 300, easing: cubicOut }}>
		<div class="menu-header">
			<h2>Settings</h2>
			<button class="close-btn" on:click={closeMenu} aria-label="Close menu">
				<UIIcons icon="x" />
			</button>
		</div>

		<div class="menu-tabs">
			<button
				class="tab-btn"
				class:active={activeTab === 'settings'}
				on:click={() => (activeTab = 'settings')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="3"></circle>
					<path
						d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
					></path>
				</svg>
				<span>General</span>
			</button>

			<button
				class="tab-btn"
				class:active={activeTab === 'practice'}
				on:click={() => navigateTo('/practice', 'practice')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
				</svg>
				<span>Practice</span>
			</button>

			<button
				class="tab-btn"
				class:active={activeTab === 'stats'}
				on:click={() => navigateTo('/stats', 'stats')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 20v-6M6 20V10M18 20V4"></path>
				</svg>
				<span>Stats</span>
			</button>

			<button
				class="tab-btn"
				class:active={activeTab === 'about'}
				on:click={() => navigateTo('/about', 'about')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="12" y1="16" x2="12" y2="12"></line>
					<line x1="12" y1="8" x2="12.01" y2="8"></line>
				</svg>
				<span>About</span>
			</button>
		</div>

		<div class="menu-content">
			{#if activeTab === 'settings'}
				<div class="settings-panel" in:fade={{ duration: 200 }}>
					<div class="settings-section">
						<h3>Navigation</h3>
						<div class="nav-links">
							<a href="/practice" class:active={$page.url.pathname === '/practice'}>
								<NavigationIcons icon="link" />
								<span>Practice</span>
							</a>
							<a href="/stats" class:active={$page.url.pathname === '/stats'}>
								<NavigationIcons icon="link" />
								<span>Stats</span>
							</a>
							<a href="/about" class:active={$page.url.pathname === '/about'}>
								<NavigationIcons icon="link" />
								<span>About</span>
							</a>
						</div>
					</div>

					<div class="settings-section">
						<h3>Data Management</h3>
						<DataFileHandler />
					</div>
				</div>
			{:else if activeTab === 'practice'}
				<div class="settings-panel" in:fade={{ duration: 200 }}>
					<div class="settings-section">
						<h3>Practice Mode</h3>

						{#if $page.url.pathname === '/practice'}
							<ModeSelectPrac />

							<div class="settings-info">
								<div class="info-card">
									<div class="info-icon">
										<UIIcons icon="info" />
									</div>
									<div class="info-content">
										<strong>Keyboard Shortcuts</strong>
										<p>Use arrow keys for quick actions:</p>
										<ul>
											<li><kbd>←</kbd> Mark as wrong</li>
											<li><kbd>↑</kbd> Look up definition</li>
											<li><kbd>→</kbd> Mark as correct</li>
										</ul>
									</div>
								</div>
							</div>
						{:else}
							<div class="not-in-section">
								<p>Navigate to the Practice page to manage practice settings.</p>
								<a href="/practice" class="action-link">Go to Practice</a>
							</div>
						{/if}
					</div>
				</div>
			{:else if activeTab === 'stats'}
				<div class="settings-panel" in:fade={{ duration: 200 }}>
					<div class="settings-section">
						<h3>Stats Settings</h3>

						{#if $page.url.pathname === '/stats'}
							<div class="settings-actions">
								<button class="danger-btn" on:click={resetHandler}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M3 6h18"></path>
										<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
										<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
										<line x1="10" y1="11" x2="10" y2="17"></line>
										<line x1="14" y1="11" x2="14" y2="17"></line>
									</svg>
									Reset All Data
								</button>
							</div>

							<div class="settings-info">
								<div class="info-card">
									<div class="info-icon">
										<UIIcons icon="info" />
									</div>
									<div class="info-content">
										<strong>Quick Tips</strong>
										<p>In Reflect mode, press Enter to quickly add new words to the list.</p>
									</div>
								</div>
							</div>
						{:else}
							<div class="not-in-section">
								<p>Navigate to the Stats page to view your progress and manage statistics.</p>
								<a href="/stats" class="action-link">Go to Stats</a>
							</div>
						{/if}
					</div>
				</div>
			{:else if activeTab === 'about'}
				<div class="settings-panel" in:fade={{ duration: 200 }}>
					<div class="settings-section">
						<h3>About This App</h3>
						<p class="about-text">
							A simple web app to help you practice new vocabulary words in any language. Track your
							progress, manage custom word lists, and improve your language skills.
						</p>

						<div class="about-links">
							<h4>Source Code:</h4>
							<a
								class="github-link"
								target="_blank"
								rel="noopener noreferrer"
								href="https://github.com/Bijan-K/Svelte-Vocab-Prac.git"
							>
								<NavigationIcons icon="github" />
								<span>GitHub Repository</span>
							</a>
						</div>

						<div class="version-info">
							<span>Version: 2.0.0</span>
							<span class="author">Made by Bijan</span>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 100;
		display: flex;
		justify-content: flex-end;
	}

	.menu-container {
		width: 380px;
		height: 100%;
		background-color: var(--bg-medium);
		box-shadow: -5px 0 25px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.menu-header {
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid var(--border-dark);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.menu-header h2 {
		margin: 0;
		font-size: 1.3rem;
		color: var(--text-primary);
	}

	.close-btn {
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background-color: var(--bg-light);
		color: var(--text-primary);
	}

	.menu-tabs {
		display: flex;
		border-bottom: 1px solid var(--border-dark);
		background-color: var(--bg-dark);
	}

	.tab-btn {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.75rem;
		background-color: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
		position: relative;
	}

	.tab-btn:hover {
		color: var(--text-secondary);
	}

	.tab-btn.active {
		color: var(--primary);
	}

	.tab-btn.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 25%;
		width: 50%;
		height: 2px;
		background-color: var(--primary);
		border-radius: 2px 2px 0 0;
	}

	.menu-content {
		flex: 1;
		overflow-y: auto;
	}

	.settings-panel {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem;
	}

	.settings-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.settings-section h3 {
		color: var(--text-secondary);
		font-size: 1.1rem;
		margin: 0;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--border-dark);
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-links a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: 8px;
		color: var(--text-secondary);
		text-decoration: none;
		transition: all 0.2s;
	}

	.nav-links a:hover {
		background-color: var(--bg-light);
	}

	.nav-links a.active {
		background-color: rgba(14, 165, 233, 0.1);
		color: var(--primary);
	}

	.settings-info {
		margin-top: 1rem;
	}

	.info-card {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background-color: var(--bg-dark);
		border-radius: 8px;
		border-left: 3px solid var(--primary);
	}

	.info-icon {
		color: var(--primary);
		flex-shrink: 0;
		display: flex;
		align-items: flex-start;
	}

	.info-content {
		font-size: 0.9rem;
	}

	.info-content strong {
		display: block;
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.info-content p {
		color: var(--text-muted);
		margin: 0 0 0.5rem 0;
	}

	.info-content ul {
		margin: 0.5rem 0 0 1rem;
		padding: 0;
		color: var(--text-muted);
	}

	.info-content li {
		margin-bottom: 0.25rem;
	}

	kbd {
		background-color: var(--bg-light);
		border-radius: 4px;
		padding: 0.1rem 0.4rem;
		font-family: monospace;
		font-size: 0.85rem;
	}

	.settings-actions {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.danger-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s;
		font-weight: 500;
	}

	.danger-btn:hover {
		background-color: rgba(239, 68, 68, 0.2);
	}

	.about-text {
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.about-links {
		margin-bottom: 1.5rem;
	}

	.about-links h4 {
		margin: 0 0 0.5rem 0;
		font-size: 0.95rem;
		color: var(--text-secondary);
	}

	.github-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background-color: var(--bg-light);
		border-radius: 8px;
		text-decoration: none;
		color: var(--text-secondary);
		transition: all 0.2s;
	}

	.github-link:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.version-info {
		margin-top: auto;
		padding-top: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.85rem;
		color: var(--text-muted);
		border-top: 1px solid var(--border-dark);
	}

	.author {
		font-style: italic;
	}

	.not-in-section {
		text-align: center;
		padding: 2rem 1rem;
		background-color: var(--bg-dark);
		border-radius: 8px;
		color: var(--text-muted);
	}

	.action-link {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background-color: var(--primary);
		color: white;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 500;
		transition: all 0.2s;
	}

	.action-link:hover {
		background-color: var(--primary-dark);
		transform: translateY(-2px);
	}

	@media (max-width: 600px) {
		.menu-container {
			width: 100%;
		}
	}
</style>
