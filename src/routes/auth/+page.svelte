<script lang="ts">
    import {onMount} from "svelte";
    import {signIn} from "@auth/sveltekit/client";

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get("redirect") ?? "/";

        signIn('zitadel', {
            callbackUrl: redirectUrl, // Specify the redirect URL after sign-in
        })
    })
</script>