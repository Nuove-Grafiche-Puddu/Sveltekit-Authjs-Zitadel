import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {ZITADEL_ISSUER} from "$env/static/private";
import {decodeMetadatas, getRoles, metadataScope, rolesScope} from "$lib/ProfileUtility";

export const load: PageServerLoad = async (event) => {
    // If you decide to the +page.server.ts instead of layout to get the session and avoid problems
    // const session = await event.locals.getSession();
    const { session } = await event.parent();
    if (!session?.user) {
        const path = encodeURIComponent(event.url.pathname ?? "/");
        const redirectUrl = `/auth?redirect=${path}`;
        throw redirect(303, redirectUrl);
    }
    const response = await fetch(`${ZITADEL_ISSUER}/oidc/v1/userinfo`, {
        credentials:'include',
        headers: {
            Authorization: "Bearer " + session.accessToken, // Add the authorization token to the headers
        },
    });
    if (response.ok) {
        const data = await response.json();
        session.user.roles = getRoles(data[rolesScope])
        session.user.metadata = decodeMetadatas(data[metadataScope])

    } else {
        console.error('Request failed:', response.statusText);
    }
    return {};
};
