---

title: "A PWA that Spawns PWAs, Oh My!"
date: 2018-01-22 12:00:00 PST
tags: pwa, mobile, web, speedy
slug: pwa-spawns-pwas
...
**TLDR; The ability to build apps with web technology isn't just another way to build the same thing. It enables a whole new category of services that didn't make financial sense previously. As proof, I also introduce a real service that I've built for non-profits called [Speedy](https://speedy.gift) that generates PWAs on the fly and is built on these ideas.**

If you've seen any of my writing about PWAs (Progressive Web Apps), you already know that I'm a fan.

That is because I believe that the core idea of building ad-hoc, app-like experiences that don't require an install step is transformative to how we use our Fancy Pocket Computer Thingies™️. If you want to get a background on PWAs and _why_ I think they're such a big deal read or watch my ["Betting on the Web"](/blog/betting-on-the-web) post/talk.

But, the short version is that The Web has finally gotten "good enough" for making first-class app experiences.

## A few quick supporting anecdotes

I've been happily using the [Twitter Lite](https://mobile.twitter.com) as my only Twitter client on my phone since it was first launched. I recently I did the same for Instagram, their PWA is coming along nicely and even though it may lack a few features for the time being, I've made the switch.

I also recently helped Starbucks build/ship [their PWA](https://app.starbucks.com) (U.S.-only for the time being).

There are many, many more, examples of companies investing in PWAs. All this to say this isn't theoretical; it's already happening.

## That's nice Henrik, but users don't care how the app was built!

**You're absolutely right**. Once it's on their device, they don't care whether it's powered by web tech or is running native code for their platform. But, that's actually kind of the point! We can now build the same experience and deliver it in less time than it takes to load the typical boring ol' website. I would argue that users _do_ care about whether or not they have to go install stuff from an app store or not, but I digress. For the purposes of this post **let's assume users don't care at all.**

> > What this _does_, however, is change the types of things that make sense for us to build as developers.

Let's take an example of a local bike shop. Should they have an app? If we're talking about an app in the traditional sense: absolutely not.

There's a very low chance that a bike shop owner could justify dropping $30k+ to a software company to build a custom native app for her. I mean, why would she?! Realistically, unless there's some _serious_ value or incentive she can offer to customers for installing it, they're simply not going to do it.

> > It is _extremely_ unlikely that it investing in custom app development would be a wise investment for her.

But that's not to say that there aren't aspects of her business where she could benefit from providing _a greater level of interactivity with her customers_. What if instead of her bike shop website just being a simple page with contact details and a pic of the shop it was… wait for it… ✨a PWA!✨

It could load just as fast as a simple site, but also let her do more. It could show off current inventory, highlight sale items, and maybe let loyal customers track their purchases over time to earn rewards? Or let folks track status of their bike repair. Perhaps there are a few of her most loyal customers who would actually want to add her shop's PWA to their home screens? Or maybe she could have a way to do push notifications about special events, or group rides.

For many small businesses, keeping loyal customers engaged and coming back is their life-blood. Therefore, anything that helps them do that is _hugely_ valuable.

> > There are so many use-cases that don't justify the cost of custom software development but could still benefit from a an app-like experience!

## So what are we supposed to do with this information?

Perhaps we can use the inherently dynamic nature of the web to make PWAs for things that previously didn't justify the investment?

What I mean is that "bike shop software" can likely be reduced into a fairly constrained and generic set of potential requirements.

> > If she could pay ~$100/mo for a service made for bike shops where she could customize, configure, and publish a PWA that helped her better engage her customers that'd be a no-brainer!

There ya go, free business idea: build the _ultimate bike shop_ management tool and make it so each bike shop customer can generate/configure a PWA for their customers.

A few more businesses off the top of my head that could benefit from something like this:

* Hair salons
  * Appointment bookings
  * Push notification reminders
  * Loyalty programs
* Auto repair shops
  * Tracking status of repair
  * Authorizing proposed fixes
* Lawyer's offices
  * Scheduling appointments
  * Delivering consultations via WebRTC video
* Cities
  * Payment of public utilities
  * Public parking, fees and fines
* Doctor clinics
  * Appointment scheduling
  * Requesting a call back for a medical question
  * Viewing medical records
  * Viewing/paying medical bills
* Churches
  * Member directories
  * Online giving
  * Publishing events
* Schools
  * Updates/notifications
  * Parent teacher communication and scheduling
* Coffee shops
  * Order-ahead functionality (a. la. Starbucks, but for any coffee shop)
  * Location-based info, what music is playing, etc.
  * In-store ordering via tablets on tables

If you build one of these, and make a lot of money I'd gladly accept 1% of your profits 🤓 .

## This isn't actually new, Henrik

I suppose you're right, you could argue it's just a content management system with some industry-specific functionality baked in. But, doing this with PWAs takes it to a different level because it actually makes it relevant to our mobile lives.

There's an entire class of problems that could arguably be solved once for a given industry and PWA tech ensures they can integrate into our mobile experiences.

This basic idea has intrigued me for a very long time. That is, the concept of using a web app to essentially generate customized apps for everyone in a certain niche. I first built something like this _[8 years ago](https://vimeo.com/8254856)_ using jQTouch and Django.

**Site note:** Some of you will note that there are people doing this type of thing with native apps, they're sometimes referred to as "templated apps". I would argue, however, that most of these really shouldn't be native apps at all because without the automatic delivery and discovery via the company's website it's not likely that many people will download, install, and actually use these.

## Ok that's a nice theory, but is it doable?

Well, umm… so I did this. I've quietly built a business that does exactly what I've been describing. Don't worry, unless you're involved with a non-profit you're not the target audience.

The service has been in private beta for some time, but is now open to public as of last week. It's called [Speedy](https://speedy.gift) if you're interested you can read more about what it provides here: [https://speedy.gift](https://speedy.gift). But, for our purposes in this post, it lets non-profits configure their own PWAs for giving them money online using Apple Pay, Google Pay, or credit cards. The whole thing is optimized for removing barriers to giving with a smartphone.

<img class='border' src='/images/3/projects.jpg' width='560' alt='screenshot of admin tool for configuring fundraising projects'/>

If you're a U.S. based non-profit organization I'm not aware of any faster or easier way to start accepting online donations. It's simply a dynamically generated PWA served on a sub-domain of their choosing (unfortunately, for the time being it's limited to the U.S. for legal reasons).

The very first bit of setup for a new organization in Speedy is to pick a sub-domain. From the instant they complete that step they are now the proud owners of a PWA for their organization. They can literally start to collect donations through their own PWA in less than 5 minutes of setup. **This would not even be possible with templated native apps**.

Also, just to make things interesting, everything in the generated app and the admin itself, for that matter, _updates in real-time_. This means as you use the admin tool to configure your PWA you can have another device open to your donation app and watch changes being applied to your app as you change them in the admin tool.

> > As anyone donates, all the charts, graphs, and lists in both the donation PWA and the admin site update in real-time.

## So you configure a PWA with an admin tool?

Yep, and obviously, it's a PWA too! I mean, why wouldn't it be?!

We use an iframe to embed the PWA you're configuring _into_ the admin tool so you can see your changes applied in real-time. There's no need for us to build a preview of the app, instead we just show you the PWA itself _inside_ the other PWA!

So it's not just a PWA spawning PWAs…

> > It's PWA inception!

Here's another screenshot showing the admin tool where you can configure the icon and app name:

<img class='border' src='/images/3/app-icon.jpg' width='560' alt='screenshot of admin tool for configuring the donation app icon'/>

If you're familiar with PWAs you know that these details are configured using a [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) which is just a JSON file. So, that part is pretty straightforward to generate on the fly.

## This is all just silly, Henrik!

Maybe. But, is it though?! So far, in a small private beta we've helped a handful or organizations collect over $60,000 in donations through those generated PWAs and the feedback has been overwhelmingly positive from both the orgs and the donors.

As it turns out, the combination of making it incredibly easy to donate and being able to see progress toward the fundraising goals animate in real-time as donations come in is _highly_ motivating for donors.

In addition we also have a view of the fundraising project designed for display on large screens. So, it can put it up on a projector as a live dashboard in front of an audience:

<img class='border' src='/images/3/projector.jpg' width='560' alt='projector showing speedy in front of live audience'/>

Or a TV in a public space:

<img class='border' src='/images/3/tv.jpg' width='560' alt='man donating with phone while standing in front of TV with speedy displayed'/>

This view is also just a page on the PWA that includes support for going into full-screen mode. This means it's super simple to put it on a projector or just use an inexpensive [Chromecast](https://store.google.com/product/chromecast_2015) to show it on a TV.

The web is so versatile! Same app can be used on the phone or on a huge projector. Pretty sweet, right?! Anyway, If you're involved with a non-profit you should probably go [sign up for Speedy](https://speedy.gift) to try it out.

_But_, remember how I said this whole approach enables new business models? Speedy is a case in point. If we were generating native app builds, there's no possible way we could let organizations start with zero up-front costs like we do.

## How does it all work?

Really well, thanks! 😜 If you're a dev you're probably wondering how it's built.

I'll do more technical breakdowns in other posts, but at a high level it's built with:

* Preact
* Redux
* Redux Bundler (a soon-to-be open sourced thing I made for minimizing redux boilerplate)
* Firebase
* Stripe Connect, Stripe Elements
* GraphQL API for faster-than-Firebase initial fetches
* The Web App Manifest is served dynamically by the API
* sw-toolbox for service worker stuff (will likely update to Workbox soon-ish)

## What's next?

There's still a lot I want to do to build on these ideas and techniques. But at this point I've at least proven the core concept to myself. That's why I figured it was time to share it.

I'll be blogging more about some of the technical aspects of this stuff in the future and I'm also in the process of writing a second book. The book is about Redux patterns that I've found really helpful in building Speedy and the work I did for Starbucks.

Obviously, if you're involved with a non-profit in any way, I'd love to hear your thoughts on [Speedy](https://speedy.gift) itself.

If you have questions or whatnot feel free to email me: [henrik@joreteg.com](mailto:henrik@joreteg.com) or follow me on Twitter: [@HenrikJoreteg](http://twitter.com/henrikjoreteg).

See ya on the Interwebz ❤️
