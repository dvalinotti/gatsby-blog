---
title: "Migrating to Next.js: Part 1"
subtitle: "A formal introduction."
date: "2020-03-03"
slug: "nextjs-migration-part-1"
category: "Migration"
featuredImage: ../images/next.png
tags: ["nextjs", "migration", "introduction"]
---

Hello. 

Anyone who has worked with Shopify knows that it’s a pain in the ass. From my experience, it’s basically Wordpress for storefronts - except it (thankfully) drops PHP for a slightly better templating language, Liquid. While I don’t personally have a problem with Liquid itself, it’s become evident to my team that this solution is going to be difficult to scale.

Coming onto this team, I was given a codebase that was actually written by a third-party contractor - you can probably see where this is going. Many of the Liquid templates don’t actually take advantage of the features that make it better than writing plain-Jane HTML, and they seem to have foregone any standards for code formatting. Reading their CSS is an absolute nightmare. Images are left totally uncompressed and not a single one is lazy-loaded, which leads to monolithically large download sizes - some pages almost _30MB_. 

I was hired at this company recently in an effort to modernize their website and optimize it for a vitally important product launch later this year. The business side of our operation cares a lot about site performance, particularly on mobile which is where the majority of our traffic comes from. It wasn’t long before I determined that the current codebase would not be sufficient for the expectations of higher-ups, and began creating a proposal for a total site overhaul.

## Why Next.js?
If you’re not familiar with Next.js, it is a React framework that enables server-side rendering. There are tons of additional features that support better site performance, such as automatic code splitting and static page rendering for the minority of browsers that don’t support Javascript. The primary reason for this choice over just using React or some other front-end framework is our pivot to mobile-first performance enhancements. Phones are getting faster every year, but leveraging the server’s CPU power to render the page instead leads to much faster load times. These improvements are also visible on the desktop, but are not as dramatic. We considered using React to make our storefront a PWA, but the performance decrease was not worth the benefits of PWA.

## Documentation who?
Another glaring issue of the existing codebase is the complete lack of documentation. Honestly, I was not  _too_ surprised by this, as I am not working for a tech company. However, the corporate side of our team has been making concerted efforts to gather more funding and hire more developers, so trying to get them up to speed without documentation seemed like a great waste of my time. While I have been keeping a minimal document on the current Liquid codebase, I have been looking into tools that will make it easy to document the new website code as I’m developing. Projects like MDX-docs and React Docgen seem to make this process simple for me, as I can either store .mdx files along with my components or just maintain a standard for commenting that will generate clean documentation for me.

## TypeScript
The biggest learning curve for myself is going to be leveraging TypeScript in our project. In order to support the eventual scaling of our application, I feel that it is important to supplement our code with hard type-checking. This is a proven method to reducing bugs in development or production, and once understood will bring a lot more clarity when looking at someone else’s work. Outside of work I have been learning Rust programming, and its type-checking system has proven to be a great example of these benefits. I have substantial experience with ES6 React, so remembering to define types and do the extra work has been a steep mountain to climb, but I feel it will be worth it for the future of this project as a whole.

## What’s Next(.js)?
I will be using this blog as a way to document the development progress of this migration, with the intention of giving others a taste of the experience and difficulties I experience. Hopefully it will also serve as a tool for me to reflect on my work as I go, and try to learn from my own mistakes as well. I will be publishing these posts on Reddit as well, so please give me any constructive feedback on either the content or my writing! 

Thanks for reading.
