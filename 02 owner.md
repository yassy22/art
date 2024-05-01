# Kaasbaas - Owner

In this exercise, we will focus on ownership of resources. We will add an owner to the cheese resource and make sure that only the owner can edit the cheese.

## Detail page

First, we need a detail page, from there on we can show the owner of the cheese and create an edit link later on.

- Add a detail page for the cheese, provide it with some useful data.
- Wrap the cheese cards on the index page with a link, so we can navigate to the detail page.
- To keep the color of the text in the cards, you can use the following -global- CSS snippet:

    ```css
    a:has(article){
      color: inherit;
    }

- We have to introduce the concept of an owner in Strapi. Form a Cheese type, create a relation to a User. In this case, a user has many cheeses, rename the field to `owner` instead of the default user-permission thingy.
- Add an owner to some cheeses, you can use the user you created earlier.
- Populate the owner in your get-cheese-by-id query, since it’s a relation. You will run into a permission issue.
- Change the permissions, for the unauthenticated (public) user, it should be able to ‘find’ a user
- Now change the frontend to show the name of the owner. Use conditional rendering to not show anything about an owner if a cheese has no owner. (yet)

## Save owner when creating cheese

We need to link a user to a cheese (as an owner) when creating a cheese. Things could become problematic if we have to do this by hand in our application. This should be done automatically, in Strapi

Luckily, Strapi lets us alter the way things are saved, we can add our own logic to it. Things can become very complicated, but for now, we will try to keep it simple.

We will be using the following example as a guide.
<https://docs.strapi.io/dev-docs/backend-customization/examples/services-and-controllers>

First, create a new Strapi service in `/src/api/cheese/services/cheese.js`. Try to figure out what’s going on here.

```js
"use strict";

/**
 * cheese service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::cheese.cheese", ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { body } = ctx.request;

    const newCheese = await strapi.entityService.create("api::cheese.cheese", {
      data: {
        ...body.data,
        owner: {
          set: [user.id],
        },
      },
    });

    return { data: newCheese };
  },
}));
```

Now, we need to tell Strapi to use this service when creating a cheese. We can do this by changing the controller in `/src/api/cheese/controllers/cheese.js`.

```js
"use strict";

/**
 * cheese controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::cheese.cheese", ({ strapi }) => ({
  /**
   * As the controller action is named
   * exactly like the original `create` action provided by the core controller,
   * it overwrites it.
   */
  async create(ctx) {
    // Creates the new cheese using a service
    const newCheese = await strapi.service("api::cheese.cheese").create(ctx);

    const sanitizedCheese = await this.sanitizeOutput(newCheese, ctx);

    ctx.body = sanitizedCheese;
  },
}));
```

That’s it! Now, when you create a cheese, the owner will be set to the user who is currently logged in. Try it out!

## Profile page

Now that we have a relation between a user and a cheese, we can show the user’s cheeses on their profile page.

To show a link to a profile page in the header, we have to do some extra work because of our fancy header scroll animation. The idea is that there is a user icon next to the “Add cheese” button, but only when the scrolling is done…

We will be using an icon from [React-icons](https://react-icons.github.io/react-icons/) for the user icon. Install it with:

```bash
npm install react-icons
```

In the `AuthStatus` component:

```jsx
 return (
    <div className={styles.btnWrapper}>
      {user ? (
        <>
          <Link className={styles.button} to="/cheese/create">
            Add Cheese
          </Link>
          <Link className={styles.iconButton} to="/auth/profile">
            <FaUser />
          </Link>
        </>
      ) : (
        <Link className={styles.button} to="/auth/login">
          Sign in
        </Link>
      )}
    </div>
  );
```

In the Hero.module.css, add the following:

```css
.iconButton svg {
  width: 100%;
}

.iconButton:hover {
  box-shadow: var(--shadow-4);
  color: var(--pink-7);
}

.btnWrapper {
  display: grid;
  grid-template-columns: auto 2rem;
  gap: var(--size-4);
  align-items: center;
  font-size: 2em;
}
```

Set the animation on the `.btnWrapper` instead of the `.button`:

```diff
-  .button {
+  .btnWrapper {
    animation: titelpos linear forwards; 
```

To animate the space for the user icon, we can do this using CSS grid(!). Change the `titlepos` animation to:

```css
@keyframes titelpos {
  0% { 
    translate: var(--x) var(--y);
    grid-template-columns: auto 0;
    gap: 0;
  } 
  50% {
    grid-template-columns: auto 0;
    gap: var(--size-2);
  }
  100% {
    font-size: 1rem;
  }
}
```

### The Page itself

Create a profile page, include it in the router.

To get all the profile data, there is a special route in the API, `/users/me`. This will return the user who is currently logged in.

Implement this in the auth.js service:

```js
export const getMe = async () => {
  const result = await fetch(
    `${import.meta.env.VITE_STRAPI_URL}/api/users/me?populate=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  ).then((res) => res.json());

  return result;
};
```

Now, you can use this in the profile page to get the user data, and the cheeses that belong to the user.

## Sign out

The profile page could also be a good place to add a sign-out button. This is a simple action, just remove the token from the local storage.

```js
export const removeAuthData = () => {
  localStorage.removeItem(AUTH_DATA);
};
```

You don’t have to create a dedicated page for this. Just create a route with action that calls the `removeAuthData` function and redirects to the home page.

Now make profile page protected, only authenticated users can see it. Redirect an unauthenticated user to the login page, and redirect the user to the profile page after login.

## Public profile page

Besides the protected profile page, we can also create a public profile page. This page will show the user’s name and all the cheeses that belong to the user.

To show this data, we can’t rely on the `/users/me` route because this is protected. So we have to use the `/users/:id` route.
Since we’re dealing with another entity type here, put this method in a `user.js` service.

```js
const getUserById = async (id) => {
  const user = await fetchApi({
    endpoint: `users/${id}`,
    query: { populate: ["cheeses"] },
  });
  console.log("user", user);
  return user;
};
```

Create the public profile page, and use the `getUserById` function to get the user data and the cheeses. You can call this page `user` and make a route like `/user/:id`.
Try to show some data on the page. Sadly, it won’t work out of the box…

You will have to change some access rights again. A public user should be able to use the `findOne` option for a user.

Since the whole user-permission thing is, in fact, a plugin, data is structured differently than default entity types. There is no need to unwrap data or something like that.
It's best to set the `wrappedByKey` to `undefined` by default, and set the `wrappedByKey` to "data" only when you need it. (when getting cheese)

```diff
  {
    endpoint,
    query = undefined,
-    wrappedByKey = "data",
+    wrappedByKey = undefined,
    wrappedByList = undefined,
  },
```

## Edit own cheese

Let us edit cheese. We will add a link from the detail page, and create an edit page. Only the owner of the cheese should be able to edit it.

Create edit page, you can copy the create page to get started. Alter the loader to get the cheese by ID, and use this data as `defaultValues` in the form.

Create an edit link on the detail page. We will always show it. (for now)

Update the action to call the `updateCheese` method

```js
const updateCheese = async (id, data) => {
  const cheese = await fetchApi(
    {
      endpoint: `cheeses/${id}`,
    },
    {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  return unwrapAtributes(cheese);
};
```

Test this, you should get an error, forbidden. This is because we have to change the permissions for the authenticated user. An authenticated user should be able to update a cheese.

So far, so good. Now we have to make sure that only the owner of the cheese can edit it. One can now edit everyone's cheeses...

### Policies

We can use a so-called policy to define our logic. Only the owner of a cheese might edit it  

Our implementation is based on this example <https://docs.strapi.io/dev-docs/backend-customization/examples/policies>

Create a new policy in `/src/api/cheese/policies/is-owner-cheese.js`:

```js
const { errors } = require("@strapi/utils");
const { ApplicationError } = errors;

module.exports = async (policyContext, config, { strapi }) => {
  const { body, params } = policyContext.request;
  const { user } = policyContext.state;

  console.log("body", body);
  // Return an error if there is no authenticated user with the request
  if (!user) {
    console.log("no user");
    return false;
  }
  /**
   * Queries the Cheeses collection type
   * using the Entity Service API
   * to retrieve information about the cheeses's owner.
   */
  const [cheese] = await strapi.entityService.findMany("api::cheese.cheese", {
    filters: {
      id: params.id,
    },
    populate: ["owner"],
  });
  console.log("CHEESE found", cheese);
  if (!cheese) {
    return false;
  }

  if (user.id != cheese?.owner?.id) {
    /**
     * Throws a custom policy error
     * instead of just returning false
     * (which would result into a generic Policy Error).
     */
    console.log("policy error");
    const error = new ApplicationError(
      "Only the owner of the cheese can perform this action.",
      {
        policy: "is-owner-cheese",
        errCode: "CHEESE_OWNER",
      }
    );
    error.name = "OwnerCheeseError";
    throw error;
  }

  return true;
};
```

Now, we have to apply this policy to the update action. We can do this by adding the policy to the route.

Change that part over there:

```js
module.exports = createCoreRouter("api::cheese.cheese", {
  config: {
    update: {
      //auth: false, // set the route to bypass the normal Strapi authentication system
      policies: ["is-owner-cheese"], // set the route to use a custom policy
      middlewares: [],
    },
  },
});
```

Now test it, edit own cheese and another cheese. Does this work like expected?

### Hide unnecessary links

Make sure only the owner can see the edit cheese page. Add this to the loader of the edit page:

```js
  if (user.id != cheese.owner.data.id) {
    return redirect(`/cheese/${params.id}`);
  }
```

And use conditional rendering to only show the edit link when a user might edit that piece of cheese.
