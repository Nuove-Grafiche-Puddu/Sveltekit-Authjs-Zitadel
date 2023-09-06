import type { LayoutServerLoad } from "../.svelte-kit/types/src/routes";

export const load: LayoutServerLoad = async (event) => {
    return {
        session: await event.locals.getSession(),
    };
};