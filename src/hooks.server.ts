import ZitadelProvider from "@auth/core/providers/zitadel";
import {SvelteKitAuth} from "@auth/sveltekit";
import { ZITADEL_ISSUER, ZITADEL_CLIENT_ID, ZITADEL_CLIENT_SECRET, ZITADEL_RESOURCE_ID, AUTH_SECRET } from "$env/static/private"
import type {JWT} from "@auth/core/jwt";
import type {Session} from "@auth/core/types";
import type {AdapterUser} from "@auth/core/adapters";

export const handle = SvelteKitAuth( {
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
                async profile(profile) {
                    return {
                        id: profile.sub,
                        name: profile.name,
                        firstName: profile.given_name,
                        lastName: profile.family_name,
                        email: profile.email,
                        loginName: profile.preferred_username,
                        image: profile.picture,
                        accessToken: profile.access_token,
                    };
                },
            },
        )],
    secret: AUTH_SECRET,
    trustHost: true,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            console.log(token, profile)
            if (account) {
                token.id = account.providerAccountId;
                token.accessToken = account.access_token
            }
            if (profile) {
                token.roles = Object.keys(profile[`urn:zitadel:iam:org:project:${ZITADEL_RESOURCE_ID}:roles`] as Object ?? [])
                console.log(token.roles)
            }
            return token;
        },
        async session({ session, token, user }: { session: Session, token: JWT, user: AdapterUser}) {
            session.accessToken = token.accessToken as string;
            if (session.user) {
                session.user.roles = token.roles as string[]
            }
            return session;
        }
    }
});
