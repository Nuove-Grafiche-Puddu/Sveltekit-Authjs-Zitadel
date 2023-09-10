import type {LayoutServerLoad} from "./$types";
import type {Session} from "@auth/core/types";


export const load: LayoutServerLoad = async (event) => {
    const session: Session | null = await event.locals.getSession()
    return {
        session: session,
    };
};