import ZitadelProvider from "@auth/core/providers/zitadel";
import {SvelteKitAuth} from "@auth/sveltekit";
import { ZITADEL_ISSUER, ZITADEL_CLIENT_ID, ZITADEL_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private"
import type {JwtCallbackParams, SessionParams} from "./types/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handle = SvelteKitAuth( {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
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
                    };
                },
            },
        )],
    secret: AUTH_SECRET,
    trustHost: true,
    callbacks: {
        async jwt({ token, user, account, profile }: JwtCallbackParams) {
            if (account) {
                token.id = account.providerAccountId;
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }: SessionParams) {
            session.accessToken = token.accessToken as string;
            return session;
        }
    }
});