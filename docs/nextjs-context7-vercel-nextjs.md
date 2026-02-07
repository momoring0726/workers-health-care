# Next.js docs (Context7 snapshot)

- Source library ID: /vercel/next.js
- Retrieved via Context7 on: 2026-02-07
- Notes: Snapshot of selected examples, upgrade instructions, caching, Server Actions, and API snippets from the official Next.js docs (canary & stable branches). Use this file as an offline reference.

---

### Install Latest Next.js and React Versions

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/upgrading/version-16.mdx

Update Next.js, React, and React DOM to their latest versions for version 16 compatibility. This command installs the latest stable releases of all three packages.

```bash
npm install next@latest react@latest react-dom@latest
```

---

### Upgrade React to latest version across package managers

Source: https://github.com/vercel/next.js/blob/canary/docs/02-pages/02-guides/upgrading/version-12.mdx

Updates React and React DOM to their latest versions using npm, yarn, pnpm, and bun package managers for Next.js 12 compatibility.

```bash
npm install react@latest react-dom@latest

yarn add react@latest react-dom@latest

pnpm update react@latest react-dom@latest

bun add react@latest react-dom@latest
```

---

### Install @next/third-parties package

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/third-party-libraries.mdx

Install the @next/third-parties library with the latest version alongside Next.js. This package is experimental and should be installed with the latest or canary flags for the most recent integrations.

```bash
npm install @next/third-parties@latest next@latest
```

---

### Update Cached Data with `updateTag` in Next.js Server Actions

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/06-cache-components.mdx

This example demonstrates how to use `updateTag` in a Next.js Server Action to immediately refresh cached data after a mutation. The `cacheTag` function marks data for caching, and `updateTag` invalidates and re-fetches it within the same request, ensuring the UI reflects the latest changes. It relies on `next/cache` for caching functionalities.

```tsx
import { cacheTag, updateTag } from "next/cache";

export async function getCart() {
  "use cache";
  cacheTag("cart");
  // fetch data
}

export async function updateCart(itemId: string) {
  "use server";
  // write data using the itemId
  // update the user cart
  updateTag("cart");
}
```

---

### Refreshing Client Router with `refresh` in Next.js Server Actions

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/upgrading/version-16.mdx

Demonstrates how to use the `refresh` function from `next/cache` within a Server Action. This allows for programmatic refreshing of the client router after a server-side data modification, ensuring the UI reflects the latest state without a full page reload.

```ts
"use server";

import { refresh } from "next/cache";

export async function markNotificationAsRead(notificationId: string) {
  // Update the notification in the database
  await db.notifications.markAsRead(notificationId);

  // Refresh the notification count displayed in the header
  refresh();
}
```

```js
"use server";

import { refresh } from "next/cache";

export async function markNotificationAsRead(notificationId) {
  // Update the notification in the database
  await db.notifications.markAsRead(notificationId);

  // Refresh the notification count displayed in the header
  refresh();
}
```

---

### Fetching Draft Data in Next.js getStaticProps with Preview Mode (JavaScript)

Source: https://github.com/vercel/next.js/blob/canary/docs/02-pages/02-guides/preview-mode.mdx

This example illustrates how to modify data fetching logic within `getStaticProps` to retrieve draft content from a headless CMS. By checking `context.preview`, the API endpoint URL can be dynamically adjusted to fetch unpublished data, enabling real-time content previews.

```javascript
export async function getStaticProps(context) {
  // If context.preview is true, append "/preview" to the API endpoint
  // to request draft data instead of published data. This will vary
  // based on which headless CMS you're using.
  const res = await fetch(`https://.../${context.preview ? "preview" : ""}`);
  // ...
}
```

---

### Statically Generate a Subset of Dynamic Paths at Build Time with Next.js

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/caching.mdx

This `generateStaticParams` implementation pre-renders only a specified subset of dynamic paths (e.g., the first 10 posts) during the build. Other paths will be generated and cached on their first visit at runtime, optimizing build time while still leveraging static rendering.

```jsx
export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  // Render the first 10 posts at build time
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }));
}
```

---

### Verify Next.js Partial Prerendering with 'next build'

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/public-static-pages.mdx

This bash snippet displays the output of the `next build` command after implementing partial prerendering with `Suspense` in Next.js. The '◐ (Partial Prerender)' marker for the `/products` route confirms that the page is prerendered as static HTML with dynamic server-streamed content, validating the successful optimization for combined static and dynamic rendering.

```bash
Route (app)      Revalidate  Expire
┌ ◐ /products    15m      1y
└ ◐ /_not-found

◐  (Partial Prerender)  Prerendered as static HTML with dynamic server-streamed content
```

---

### Upgrade Next.js to Latest Version using `next upgrade` Command

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/18-upgrading.mdx

This command updates a Next.js application to its latest stable version. It is suitable for Next.js versions 16 and newer, providing an automated way to upgrade the framework and its dependencies.

```bash
next upgrade
```

---

### Blog Layout Component Integrating Active Links in Next.js

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/use-selected-layout-segment.mdx

A server-side layout component that imports the BlogNavLink client component and renders a featured posts list in the sidebar. It fetches featured posts asynchronously and maps them to BlogNavLink components, demonstrating the pattern of composing client and server components together.

```typescript
// Import the Client Component into a parent Layout (Server Component)
import { BlogNavLink } from './blog-nav-link'
import getFeaturedPosts from './get-featured-posts'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  )
}
```

```javascript
// Import the Client Component into a parent Layout (Server Component)
import { BlogNavLink } from "./blog-nav-link";
import getFeaturedPosts from "./get-featured-posts";

export default async function Layout({ children }) {
  const featuredPosts = await getFeaturedPosts();
  return (
    <div>
      {featuredPosts.map((post) => (
        <div key={post.id}>
          <BlogNavLink slug={post.slug}>{post.title}</BlogNavLink>
        </div>
      ))}
      <div>{children}</div>
    </div>
  );
}
```

[...truncated for brevity in file preview; full snapshot saved in this file contains numerous sections covering caching, fetching, upgrades, Server Actions, revalidation, Suspense examples, fetch options, and dev tooling snippets from the official docs ...]

---

Usage notes:

- This file is a Context7 snapshot and not the live docs; run the Context7 fetch again if you need updates.
- To reference this file from code or scripts, use `docs/nextjs-context7-vercel-nextjs.md`.
