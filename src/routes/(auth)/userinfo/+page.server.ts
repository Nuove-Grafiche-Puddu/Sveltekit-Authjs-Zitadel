import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    // If you decide to the +page.server.ts instead of layout to get the session and avoid problems
    // const session = await event.locals.getSession();
    const { session } = await event.parent();
    if (!session?.user) {
        const path = encodeURIComponent(event.url.pathname ?? "/");
        const redirectUrl = `/auth?redirect=${path}`;
        throw redirect(303, redirectUrl);
    }
    return {};
};
