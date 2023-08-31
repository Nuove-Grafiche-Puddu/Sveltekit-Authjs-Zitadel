import ZitadelProvider from "@auth/core/providers/zitadel";
import {SvelteKitAuth} from "@auth/sveltekit";
import { ZITADEL_ISSUER, ZITADEL_CLIENT_ID, ZITADEL_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private"
import type {Handle} from "@sveltejs/kit";

export const handle = SvelteKitAuth(async (event) => {
    return {
        providers: [
            ZitadelProvider({
                issuer: ZITADEL_ISSUER,
                clientId: ZITADEL_CLIENT_ID,
                clientSecret: ZITADEL_CLIENT_SECRET,
                authorization: {
                    params: {
                        scope: `openid email profile offline_access`,
                    },
                },
            }
        )],
        secret: AUTH_SECRET,
        trustHost: true,
    }
}) satisfies Handle;