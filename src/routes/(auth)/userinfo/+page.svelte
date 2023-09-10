<script lang="ts">
    import { signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
</script>

<section>
    <h1>SvelteKit AuthJS and Zitadel Example</h1>
    <p>
        {#if $page.data.session && $page.data.session.roles?.includes('Admin')}
            <div class="">
                {#if $page.data.session.user?.image}
                    <img src="{$page.data.session.user.image}" alt="avatar" class="avatar"/>
                {/if}
                <span class="signedInText">
                    <strong class="">{$page.data.session.user?.name ?? "User"}</strong>
                </span>
                <div class="centered-content height-container"><strong>You are connected as admin</strong></div>
                <div class="centered-content height-container"><strong>Your claims are:</strong></div>
                {#each Object.entries($page.data.session.metadata) as [key, value]}
                    <div class="centered-content height-container"><strong>{key}: {value}</strong></div>
                {/each}
                <div class="centered-content height-container">
                    <button on:click={() => signOut({callbackUrl: "/", })} class="button">Sign out</button>
                </div>
            </div>
        {:else}
            <span><strong>You are not logged in as Admin</strong></span>
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
    button {
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
    .centered-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }
    .height-container {
        margin-top: 20px; /* Add vertical space between the button and the content above */
    }
</style>