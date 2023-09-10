import type {JWT, Account, Profile, User, DefaultSession, Session} from "@auth/core/types";
import type {AdapterUser} from "@auth/core/adapters";

export type Metadata = {
    [key: string]: string; // Assuming all values are base64-encoded strings
}

export interface SessionParams {
    session: Session;
    token: JWT;
    user: AdapterUser;
}

export type JwtCallbackParams = {
    token: JWT;
    user: User | AdapterUser;
    account: Account | null;
    profile?: Profile | undefined;
    trigger?: "signIn" | "signUp" | "update" | undefined;
    isNewUser?: boolean | undefined;
    session?: any;
}

export declare module "@auth/core/types" {  // I'm using PNPM but this seems to be working fine
    interface User {
        roles?: string[];
        metadata?: Metadata;
    }

    interface AdapterUser {
        roles?: string[];
        metadata?: Metadata;
    }

    interface Session {
        accessToken?: string
        roles?: string[]
        metadata?: Metadata
        user?: AdapterUser & DefaultSession['user'];
    }
}