<script lang="ts">
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
</script>

<section>
    <h1>SvelteKit AuthJS and Zitadel Example</h1>
    <p>
        {#if $page.data.session}
            {#if $page.data.session.user?.image}
                <img src="{$page.data.session.user.image}" alt="avatar" class="avatar"/>
            {/if}
            <span class="signedInText">
                <small>Home</small><br/>
                <strong class="">{$page.data.session.user?.name ?? "User"}</strong>
            </span>
            <button on:click={() => signOut({callbackUrl: "/", })} class="buttonSignOut">Sign out</button>
        {:else}
            <span class="notSignedInText">You are not signed in</span><br/>
            <button on:click={() => signIn('zitadel')} class="buttonSignIn">Sign In with Zitadel</button>
        {/if}
    </p>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }
    .buttonSignOut {
        background-color: #04AA6D;
        border: none;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 24px;
    }
    .buttonSignIn {
        background-color: deepskyblue;
        border: none;
        color: white;
        padding: 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 24px;
    }
</style>