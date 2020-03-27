---
title: "Migrating to Next.js: Part 2"
subtitle: "Breaking SSR is so easy, even you can do it!"
date: "2020-03-20"
slug: "nextjs-migration-part-2"
category: "Migration"
featuredImage: ../images/nextjs-part-2-thumbnail.png
tags: ["nextjs", "migration"]
---

Hello.

I want to start off this post by talking about what the purpose of this blog series is going to be. This is meant to be more of a journal for the progress I make as I am learning to work with Next.js -- I don't intend for this to be a tutorial, if anyone has made that assumption. In light of this I want to ask anyone who finds mistakes or things that I am missing in my work, please let me know. I hope that this will be as much of a learning process for you as it is for me!

### Server-side rendering with remote data

Something that I am realizing (thankfully early on in this project) is that the normal way of writing a React component that retrieves data from an API or database does not work quite the same in Next.js. Normally, when making asynchronous requests, you would specify some conditional logic in your render() function that will handle the different states of those requests (loading, error, etc). However, because we want all rendering to be done on the server side, using this logic will cause the component to be re-rendered, defeating the purpose of using SSR in the first place. 

Thankfully, someone else has already solved this problem before us. The `next-apollo` node package gives us a higher-order component to work with that integrates data retrieved from Apollo into our Next.js pages. It supports SSR by default, which is of course perfect for our application. 

```tsx
import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';
// where I store my apollo config options
import httpConfig from '../apollo.config';

const { GRAPHQL_URL } = process.env;

const config = {
  link: new HttpLink({
    uri: httpConfig.client.service.url,
    // Shopify API requires pub/priv key in request headers
    headers: httpConfig.client.service.headers,
  }),
};

export default withData(config);
```

As you can see, it's very easy to set up and configure. Another helpful feature of next-apollo is that cache is handled automatically by defualt. They mention in their docs that you can set up your own custom cache, but it needs to be a cache creation *function*, not an `InMemoryCache` instance (the docs say this will break SSR support).

The result of this is that we have a Higher-Order Component to wrap our Next.js page component with. Now, any component within a page that is wrapped with the `withData` HOC will have access to the ApolloClient to make queries, mutations etc. and will automatically pull existing data from the cache.

### What about conditional rendering?

Now, if are anything like me, you might be thinking to yourself, "Wow, my pages are loading instantly now! I don't even see loading indicators!"... Then come to the realization that all of your components are conditionally rendering for the status of your GraphQL requests. For example you might have a `render` function that looks like this:

```tsx
return (
  <div id="cart-btn">
    {loading && (
      <CircularProgress />
    )}
    {error && (
      <Typography variant="body2">Error!</Typography>
    )}
    {(data && (
      <>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="cart"
          onClick={handleOpen}
        >
          <ShoppingCartIcon />
        </IconButton>
        <Popover
          open={open}
          onClose={handleClose}
        >
          <CartContent
            cart={getCartData}
            total={total}
            clearCart={clearCart}
          />
        </Popover>
      </>
    )}
  </div>
);
```

In this example, I was retrieving data from the Shopify API about the user's cart information and rendering the component based on what data had been returned from Apollo. However, since the intention (and result) of SSR is that we don't have anything load on the client side, it is pointless to define a condition where the data is loading. This condition will never be seen by the user anyway,  so accounting for it might cause our component to render more slowly and possibly make the page take longer to load on the client side. 

This might seem like a small detail for most people, but these incremental performance improvements are vitally important to the particular project I am working on. As I said in my previous post, I am essentially rebuilding an existing Shopify webstore from scratch with the intention to remove as many performance bottlenecks as possible. Any performance enhancements I can make, small or large, will help me greatly in the long run.

If you have any feedback on my work, or any questions, please reach out to me!
