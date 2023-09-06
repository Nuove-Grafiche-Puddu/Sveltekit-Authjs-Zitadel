import type {DefaultSession} from "@auth/core/types";

export declare module "@auth/core/types" {  // I'm using PNPM but this seems to be working fine
    interface Profile {
        nickname?: string;
    }
    interface Session {
        accessToken?: string
        user?: {
            roles?: string[];
        } & DefaultSession['user'];
    }
}