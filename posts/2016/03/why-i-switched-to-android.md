---
title: "Why I switched to Android after 7 years of iOS"
date: 2016-03-22 19:40:00 GMT
tags: mobile, web, ios, android, chrome
slug: why-i-switched-to-android
...
Monday of last week I was all excited. I had just gotten the green light to start prototyping a new [Progressive Web App](https://developers.google.com/web/progressive-web-apps?hl=en) for a client I've been working with.

I pulled out an older Android phone that I keep around for development. Then I also got my sleek, new, shiny iPhone 6s out of my pocket, with its smooth curves and speedy OS. But as I looked at my iPhone I was kind of bummed out.

I realized that this slick piece of Apple hardware was *less* capable as a platform for web applications than my dusty old Android dev phone.

At that point I knew I was over iOS.

So, instead of opening my text editor I placed an order for a Nexus 6P and signed up for [Google fi phone service](http://fi.google.com/) (which is awesome, btw).

Just like that, after 7-some years, bye bye iOS.

## What!? What’s wrong with iOS?

Remember the original iPhone announcement? Where Steve introduced the amazing combination of a mobile phone, an iPod, and an *Internet communications device*.

I don’t know about you, but the idea of having a fully capable web browser in my pocket was *a huge part* of the appeal.

That’s never changed.

Of course I don’t know the full backstory, but it sure seemed like the original plan for 3rd party developers on iOS was to have us all just build apps using the web. Safari added support for making web apps that could be added to your home screen as an icon and by including a few magical `<meta>` tags you could use to create something that could sort of be “installed” to your home screen. Then, when you opened it would run in “standalone mode”.

These were, in many ways, the original “Progressive Web Apps” and this was sometime around 2009!

Think about it…

1. They started in the browser, but then you could kind of upgrade them to “home screen status”.
2. When you ran them from the home screen they’d open with a splash screen and without any visible browser UI.
3. You could pick a loading screen and app icon.
4. You could even even pick from a few different status bar colors!

I don’t know whether or not this type of app was actually intended to be the primary mechanism for 3rd party dev to build apps for iOS but regardless… it was way ahead of its time.

Unfortunately, the web platform itself wasn’t quite ready for the spotlight yet. It was *sort of* possible to build web apps that looked and performed like native apps, I was trying to do this 6 years ago using [David Kaneda’s](https://twitter.com/davidkaneda) awesome, [jQTouch](http://jqtjs.com/) lib. Hilariously, [the corny little demo video](https://vimeo.com/8254856) that I posted, led to a call from David and almost got me a job at [extjs](https://www.sencha.com/products/extjs/) right as they were rebranding to Sencha and starting to build [Sencha Touch](https://www.sencha.com/products/touch/). But the story for offline was terrible.

But anyway, as it turned out, the capabilities of the web on iOS were not quite enough to satiate ravenous developers. So developers were left clawing for the ability to build stuff that ran natively on the device to give them better performance and deeper API access.

## Enter the iOS SDK and App Store

Apple made what turned out to be a really smart business decision: they released an iOS SDK and an App Store and the rest is history.

First, I was excited about “apps” just like everyone else seemed to be. Just think, here we had been busy building “applications” when we really should’ve been building “apps” all along! Who knew?! ;)

Anyway, I quickly found myself hunting for the best apps and switching to whatever bank, social networks, and other services had the best iOS apps. I bought a book on iOS development and built a hello world or two. My old co-worker [Ryan Youngman](https://twitter.com/cruffledoh) made iSaber to let you swing a fake lightsaber at your friends with your phone. Every developer I knew was talking about iOS development but at some point the fun of all this iOS stuff dried up.

Seeing the hoops you had to jump through to ship an app on iOS didn’t seem right.

**How quickly developers traded away the wide-open-spaces of the web for a walled castle with a monarch enforcing a 30% tax.**

So, I decided to focus on building “installable web apps” for iOS instead because surely, the web would catch up.

## However, this became problematic

Despite the popularity of native apps the original idea of these standalone installable web apps has continued to be supported for new versions of iOS. But, they didn’t fit into Apple’s business model! The App Store turned into a huge business, the term “app” was going mainstream, and every business suddenly felt they needed to have their own “app” whether they had any users or not.

As Apple’s app business took off these capabilities very clearly, very quickly, and somewhat unsurprisingly were deprioritized. The end result, for those of us still trying to build installable web apps for iOS was that with nearly every new iOS release some key feature that we were depending on broke.

I’m talking about stuff that QA should have caught, stuff that if *anybody* at Apple was actually building apps this way would have noticed before they released.

One quick example that bit me was how they broke the ability to link out to an external website from within an app running in “standalone” mode. `target=_blank` no longer worked, neither did `window.open` or anything else I could think of. So now since our “standalone” app didn’t have a URL bar or back button it would simply take the user to the link they clicked within the same full-screen web view *with no way to return to the app*! The *only* way out was forcibly quitting the app (hopefully the user knew how to do that).

We were running a chat product at the time, so anytime someone pasted a URL into chat it was essentially a trap.

These sorts of issues continued to happen release after release. Soon it became obvious that while you can *sort of* build these types of apps on iOS you can’t really depend on them not breaking with the next update.

The message from Apple seemed clear: web apps are second-class citizens on iOS


## What of Android?

I didn’t care much at the time, but somewhere in the middle of all of this, Android appeared on the scene. It promised to be a more open alternative as a mobile platform. It was a collaboration between several big companies, it was their attempt to essentially fight off the fruit-company-comeback-kid-turned-gorilla and its Mighty Joe App Store.

It started gaining traction, but its web experience at the beginning was quite sub-par.


## Fast-Forward five years…

1. People are [somewhat burnt out on Apps](https://medium.com/swlh/nobody-wants-your-app-6af1f7f69cb7).
2. The vast majority of developers building native iOS apps never even make back their expenses. [We knew this in 2013](http://www.forbes.com/sites/tristanlouis/2013/08/10/how-much-do-average-apps-make/#426a415f12cb).
3. A *few* games are still making money, but that’s a lottery.
4. Meanwhile, there are over 1.4 billion active Android users.
5. Android switched to using Chrome as the default browser.
6. Chrome, Opera, and Firefox have added features to allow building actual app experiences via the Web.

And here I am… switching to Android.

## So why Android? Isn’t it just more of the same?

Yes. It is. Android itself bores me, honestly. There’s nothing all that terribly new or exciting here.’

**save one very important detail…**

**IT’S CURRENTLY THE BEST MOBILE WEB APP PLATFORM**

## What do you mean?! Doesn’t Safari run my JS is faster?

Most people when they say this are referring to [this post by Jeff Atwood (a.k.a. codinghorror)](https://meta.discourse.org/t/the-state-of-javascript-on-android-in-2015-is-poor/33889), which [I wrote a whole response post to, if you’re interested](https://joreteg.com/blog/viability-of-js-frameworks-on-mobile).

So yeah, Safari runs my JS faster, but guess what… most of your users won’t have a shiny new iPhone 6s, and as [I’ve said before](https://www.youtube.com/watch?v=okk0BGV9oY0), betting on desktop-like performance on the mobile web, or sending huge frameworks like Ember to a mobile device probably isn’t a great idea.

With performance, there is such a thing as “good enough”. It wouldn’t matter if Safari ran JS 50x faster! The *only* thing that matters is whether my app runs *fast enough*. Beyond that, as a user, I don’t care.

As it turns out, it’s possible to write web apps that [run at 60fps even on older, crappier hardware](http://www.pocketjavascript.com/blog/2015/11/23/introducing-pokedex-org).

But, all that aside, note this: I said “*better app platform*” not faster JavaScript runtime.

## So why not just use Chrome for iOS?!

As I started tweeted about switching I was surprised to realize that many people don’t know that Chrome, Opera, and Firefox for iOS all just using WebKit web views under the hood.

In fact, apps that include a different browser engine are a violation of Apple’s terms of service.

They're just different UIs on the same browser engine.

## But isn’t WebKit getting better?

Yes, it seems like [they're picking up some momentum recently](https://developer.apple.com/library/mac/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_1.html).

But, there’s a whole lot more to it than just what happens in the browser window. I want the ability to create app-like experiences on the OS with web technology.

Very little seems to be happening in that regard as far as I can tell.

## Let's look at Apple and WebRTC

A few years ago when I built [SimpleWebRTC](http://simplewebrtc.com) and the first version of [Talky.io](https://talky.io).

I seem to have been one of the early web geeks to get really excited about WebRTC (the browser web technology that now powers Google Hangout video calls). Anyway, I managed to figure out how to build one of the first, possibly *the first* multi-user, peer-to-peer, video calling WebRTC app on the web that worked with more than 2 people and worked between Chrome and FireFox.

This was my first experience with Apple lagging behind in implementing new web APIs. Though Chrome and FireFox were both actively implementing and excited about WebRTC, there was not a peep from Apple. iOS still hasn’t added WebRTC support to this day. Though, they’ve apparently been hiring WebRTC engineers of the Safari team. So here’s hoping…

But it kinda makes sense, right? Why would they? They’d rather you use FaceTime, right?

They seem fine with improving *the browser engine*, but seem very slow to do anything that involves increasing the web’s reach in the OS.

Anyway, we shipped [Talky.io](https://talky.io) as a web app that worked in Chrome and FireFox and eventually [@hjon](https://twitter.com/hjon) built an iOS app for it too.

But the thing that blew my mind was one day I just downloaded Chrome on Android, opened it to Talky.io and sure enough… IT JUST FRIGGIN’ WORKED!

Since then I’ve been paying much closer attention to what’s happening in mobile Chrome and it’s very impressive.

## Meanwhile on Android

During the last couple of years, a few very bright, very persistent, and idealistic developers (many of them at Google) who believed in the web have been at work pushing for, and implementing new web standards that fill the gaps between native and web.

Incredibly cool new stuff is coming, like:

- WebBluetooth (yup, talking to bluetooth devices from JS on a webpage)
- WebNFC is coming too, apparently

These things are going to blow the roof off IoT stuff (but that’s a whole other blog post).

Just type `chrome://flags` in the URL bar of Chrome for Android and read through all the stuff that's currently in the works. It's amazing!

Anyway, in the past couple of years these fine folks have built a feature that has me more excited than I’ve been by any web tech for a loooooong time:

**ServiceWorker and the concept of Progressive Web Apps.**

**I believe that the introduction of ServiceWorker and Progressive Web Apps on Android is the most important thing to happen to the mobile web since Steve first introduced the iPhone.**

Why?! Because, for the first time, we have a mobile platform with a huge user base that lets me build a web app that is treated as a first-class citizen by the platform!

(note: yes, I’m aware there have been other attempts to do this, but none of those had 1.4 billion active users.)

These folks **finally gave the us a platform where web apps were first-class citizens**!

And to be clear, I’m not just talking about a way to put a glorified bookmark on the home screen.

I’m talking about a way for us to build web apps that are *indistinguishable* from native apps.

The terms that’s sticking for these types of apps are “Progressive Web Apps”.

In fact, I think Progressive Web Apps (PWAs) actually have a huge leg-up on native apps because you can start using them immediately. You don't have to jump to an app store and wait a minute or two until some huge binary is done downloading. They’re just web apps, they have URLs, they can be built to load super fast. Because… well, we’ve been optimizing load time performance on the web for a long time.

There’s just *so much less friction* for users to start using them. Just think what that would do to your conversion numbers!

Because of the improved on-boarding experience I believe that businesses targeting Android users should be strongly questioning whether they should be building native Android apps at all.

## So what are Progressive Web Apps anyway?

Unfortunately, for some reason Google has managed to teach a generation of devs the words “Polymer” and “Angular” while the vast majority of web developers that I meet and talk to today have still have **ZERO** idea what ServiceWorkers or Progressive Web Apps are.

Some of this is because of the newness of it all, and some of this improving recently… but sheesh… I hope this changes.

You can think of a a progressive web app like this:

It’s an app written in HTML, CSS, and JS that can *completely masquerade as a native app*.

This includes:

1. Living on the home screen
2. Existing in the Android “app switcher” as a separate app (not as part of the browser app).
3. True offline behavior… meaning when you tap the app icon… it *will* open regardless of current Internet status.
4. The ability to run in the background and triggering OS-level notifications, even when the app and browser is closed.

Instead of starting as a useless web page with a “please install our app” banner, these apps starts life running as a tab in your browser. Then *progressively* they become more installed/integrated into the OS.

At first, it’s really no different than any other website you visit. But, then if you return to that same website/app in your browser again, the browser itself will subtly ask the user if they’d like to add it to their home screen.

*From this moment on it’s indistinguishable from a native app to the user*.

Also, if you build these correctly there’s usually nothing else the user has to download or wait for at all. This means that adding it to the home screen is *effectively an instant app install*. Again, imagine what that’ll do to your conversions? Eh? (no, I’m not Canadian)

Luckily, we don’t have to entirely guess about the business impact. We actually have some real data from a certain $20 billion dollar online retailer in India called FlipKart, who did launched a PWA and have shared some of their numbers.

Key highlights from FlipKart’s experience:

- 40% returning visitors week over week
- +63% conversions from Home screen visits
- 3x time spent on FlipKart Lite

That data came from [Alex Russel’s recent Fluent Keynote on what’s next for mobile](https://www.oreilly.com/ideas/progressive-web-apps-and-whats-next-for-mobile). I encourage you to watch and share it with product managers and leaders at your company. It does a great job of explaining the how/why of Progressive Web Apps.

For related reading check out:

- [Addy Osmani’s Getting started with Progressive Web Apps](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/)
- [Mozilla’s service worker examples at: ServiceWorke.rs](https://serviceworke.rs/)
- [FlipKart’s original technical post about their PWA](http://tech-blog.flipkart.net/2015/11/progressive-web-app/)
- [Jake Archibald’s Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/)
- [Aditya Punjani's post on how they built FlipKart lite](https://medium.com/@AdityaPunjani/building-flipkart-lite-a-progressive-web-app-2c211e641883)

## So what does this all mean for us?

We, as web developers, can finally build screaming fast, fully offline-able, and user-privacy-protecting apps that work cross-platform without the need for any friggin’ App Store taxes, approval processes, or doorslamming users up front with “please install my app to use this service”.


## What about iOS support?

Well, the beauty of it is, iOS user can still use your web app even if service worker support doesn’t exist.

They just don’t get the extra goodies, like offline and push notifications.

But you could also bundle the app with Cordova and use the [Service Worker plugin](https://www.npmjs.com/package/cordova-plugin-service-worker), that would, in theory let you use the same code to do those things but bundled up as an iOS app.

## Why should I care? React Native exists now and solves the same problem.

Personally, I actually kind of wish tools like React Native didn’t exist. Stay with me, let me explain. React Native is an amazing and very impressive tool that lets us use our JS skills to write native iOS apps.

But as I’ve been saying… I don’t think we *should* be building native apps unless we absolutely have to.

The end result of React Native is that because it exists and because its largely aimed at *web developers* we now have web devs flocking to build native apps just because they can!

I fear that this undermines our ability to use our collective bargaining power to encourage Apple to implement support for Progressive Web Apps.

To be clear, I completely understand why it was created and I have a lot of respect for the technical achievement it represents, and the developers behind it.

I just don’t want us to stop pushing Apple to improve web support.


## In summary

So, all this said, these things led me to finally exercising the only voting power I have as a consumer… I took my money and left.

I don’t see this as switching to Android, I’m simply switching to the best mobile web app platform available today.

The web is the only truly open platform we’ve got. It’s the closest thing we have to a level playing field.

This is why I’m focusing all my efforts on building Progressive Web Apps… I hope you’ll do the same.

—

I’m [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter if you want to *nicely* tell me all the ways in which I’m wrong.

See ya on the Interwebz <3
