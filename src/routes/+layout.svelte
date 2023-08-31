<script>
	import './styles.css';
	import { page } from "$app/stores"
</script>

<div class="app">

	<header>
		<div class="signedInStatus">
			<p class="nojs-show loaded">
				{#if $page.data.session}
					{#if $page.data.session.user?.image}
            <span
					style="background-image: url('{$page.data.session.user.image}')"
					class="avatar"
			/>
					{/if}
					<span class="signedInText">
            <small>Signed in as</small><br />
            <strong
			>{$page.data.session.user?.email ??
			$page.data.session.user?.name}</strong
			>
          </span>
					<a href="/auth/signout" class="button" data-sveltekit-preload-data="off">Sign out</a>
				{:else}
					<span class="notSignedInText">You are not signed in</span>
					<a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off">Sign in</a>
				{/if}
			</p>
		</div>
		<nav>
			<ul class="navItems">
				<li class="navItem"><a href="/">Home</a></li>
				<li class="navItem"><a href="/protected">Protected</a></li>
			</ul>
		</nav>
	</header>
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
