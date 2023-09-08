import ZitadelProvider from "@auth/core/providers/zitadel";
import {SvelteKitAuth} from "@auth/sveltekit";
import { ZITADEL_ISSUER, ZITADEL_CLIENT_ID, ZITADEL_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private"
import type {JwtCallbackParams, Metadata, SessionParams} from "./types/auth";
import {decodeMetadatas, getRoles, metadataScope, rolesScope} from "$lib/ProfileUtility";

export const handle = SvelteKitAuth( {
    providers: [
        ZitadelProvider({
                issuer: ZITADEL_ISSUER,
                clientId: ZITADEL_CLIENT_ID,
                clientSecret: ZITADEL_CLIENT_SECRET,
                authorization: {
                    params: {
                        scope: `openid email profile offline_access urn:zitadel:iam:user:metadata`,
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
                        roles: getRoles(profile[rolesScope]),
                        metadata: decodeMetadatas(profile[metadataScope])
                    };
                },
            },
        )],
    secret: AUTH_SECRET,
    trustHost: true,
    callbacks: {
        async jwt({ token, user, account, profile }: JwtCallbackParams) {
            // Your JWT callback logic here
            if (account) {
                token.id = account.providerAccountId;
                token.accessToken = account.access_token;
            }
            if (user) {
                token.roles = user.roles;
                token.metadata = user.metadata;
            }
            return token;
        },
        async session({ session, token, user }: SessionParams) {
            session.accessToken = token.accessToken as string;
            if (session.user) {
                session.user.roles = token.roles as string[]
                session.user.metadata = token.metadata as Metadata
            }
            return session;
        }
    }
});