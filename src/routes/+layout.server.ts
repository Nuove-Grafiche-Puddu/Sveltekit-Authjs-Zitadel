import type {LayoutServerLoad} from "./$types";
import {readUserInfo} from "$lib/ReadUserInfo";
import {decodeMetadatas, getRoles, metadataScope, rolesScope} from "$lib/ProfileUtility";
import type {Session} from "@auth/core/types";


export const load: LayoutServerLoad = async (event) => {
    const session: Session | null = await event.locals.getSession()
    if (session) {
        const response = await readUserInfo(session)
        if (response.ok) {
            const data = await response.json();
            session.roles = getRoles(data[rolesScope])
            session.metadata = decodeMetadatas(data[metadataScope])
        } else {
            console.error('Request failed:', response.statusText);
        }
    }
    return {
        session: session,
    };
};