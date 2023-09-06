# Sveltekit + AuthJS + Zitadel
This is an example project showcasing how to integrate SvelteKit with AuthJS and Zitadel for authentication.
# Zitadel configuration
You can follow the [Next.js tutorial provided by Zitadel]((https://zitadel.com/docs/examples/login/nextjs)) for the initial setup. Be sure to set the redirect URI to [origin]/auth/callback/zitadel in your Zitadel configuration.
# How to run the project
To run the project, follow these steps:
1. Copy the provided .env.example file to .env and fill in all the required fields.
2. Open your terminal and run the following commands:
```
npm install
npm run dev
```
The project will be accessible on port 5173.

# Implementation choices
SvelteKit provides various methods for route protection. You can find detailed information on these methods in the [@auth/sveltekit documentation](https://authjs.dev/reference/sveltekit).
In this project, I've chosen the layout-based protection method hoping that this [sveltekit issue](https://github.com/sveltejs/kit/issues/6315) is soon fix, but please note that you can adjust the approach based on your requirements.
## +page.server.ts
This method is currently recommended by the AuthJS creator on a per-component basis. It helps avoid race conditions between `+layout.server.ts` and `+page.server.ts`.<br>
Example implementation:
```
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user) throw redirect(303, "/auth/signin");
  return {};
};
```
## +layout.server.ts
This approach involves a slight risk of encountering the issue linked earlier. However, it offers advantages in terms of layout management. In this project, protected routes are placed in the (auth) directory.<br>
`+layout.server.ts` example:
```
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession(),
  };
};
```
`+page.server.ts` example:
```
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const { session } = await event.parent();
    if (!session?.user) {
        throw redirect(303, /auth/signin);
    }
    return {};
};
```
## hooks.server.ts
This method is described [here](https://authjs.dev/reference/sveltekit#per-path). It offers flexibility, but please note that SvelteKit does not always call it. Details on when it's called can be found [here](https://kit.svelte.dev/docs/hooks#server-hooks-handle)

# Auth route
In the project, there's a route called `auth` that plays a crucial role. This route is necessary because SvelteKit's server cannot directly redirect the user to Zitadel's login page; instead, it must route them through `/auth/signin`.<br>
However, to avoid this behavior, the SvelteKit server will redirect the user to the `/auth` page, which will trigger AuthJS's authentication function for signing in through Zitadel.<br>
To streamline this process and allow users to return to their previous page after login, we've added a redirect search parameter to these requests. You can see this behavior in the following files:
1. `/src/routes/(auth)/protected/+page.server.ts`  
2. `/src/routes/auth/+page.svelte`

By implementing this approach, we aim to provide a smoother user experience for your authentication flow.

# Authorization

## Setting User Roles
1. In Zitadel, create the role "Admin."
2. Assign the "Admin" role to a user within your project.
3. To enable authorization in the project, ensure that you fill in the variable `ZITADEL_RESOURCE_ID` in the environment file.
4. Logout from the user if you were connected before editing the authorizations.

## Testing Authorization
To test Authorization I made the page Admin. If everything is correct you should see that the user has the "Admin" authorization.

## Customizing Session Data
1. To access additional data from the user's profile, set the callback `jwt` and `signin` in the file `/src/hooks.server.ts`.
2. If you need to add custom data to the session and keep intellisense, modify the file `/src/types/auth.d.ts`.

To get more information about this visit the page [Authorization](https://github.com/nextauthjs/next-auth/discussions/6914).

I hope this project helps people integrate their SvelteKit projects with Zitadel!