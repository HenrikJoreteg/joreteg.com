---

title: "Building Honey Badger Web Apps"
date: 2018-04-16 10:00:00 PST
tags: pwa, mobile, web, book, redux
slug: honey-badger-web-apps
...

## Building a Permanent ServiceWorker

With ServiceWorker the web platform now has [broadly available]() network proxying capabilities, that enable all sort of incredible offline-capable web applications.

Despite the fact that a ServiceWorker is just a plain JavaScript file it's interesting that nearly everybody using one is for building offline-capable are injecting a file manifest into their service worker file as part of a build process. Or many times, just generating the entire thing programmatically. To be clear, there's nothing wrong with this! But I do find it comically similar to what we did when we built offline stuff with appcache. You know, back in the dark 'ol days of the offline web when it was determined that [appcache was a d-bag](https://alistapart.com/article/application-cache-is-a-douchebag).

>>> I couldn't help but think that maybe there's another way.

Here's an example of the injected manifest from the Starbucks PWA I worked on. You can see the file itself here: [https://app.starbucks.com/serviceworker.js](https://app.starbucks.com/serviceworker.js)

![screenshot of service worker code](/images/4/)

We need this manifest in order to tell the SW knows which files it needs to download and cache in order to run the app without an internet connection. 

Running a SW in production on a mission critical app like Starbucks has a few pitfalls.

1. SWs provide quite a few ways you can shoot yourself in the foot. Anyone who has used one in production on knows that introducing a bug in an updated SW in production is a great way to have a bad day. It's kind of nice to keep the SW relatively static.

2. Most approaches for actually templating a JS file are a bit awkward. I much prefer to write a sw.js file that is actually a valid JS file instead of using a templating language. This way your editor knows it's JS and can give you the normal help (like code coloration) that we've all come to expect from our editors. But, if we really don't want to introduce bugs (see item \#1) it's nice to get all the help we can get. By the way, if you're interested in a solution to just this, I made a thing for that called: [timple](http://npmjs.com/package/timple). 

3. The most pertinenet thing for this post is that this approach _doesn't give the application much say in determining when to update/upgrade_. Specifically, it's quite difficult to _prevent_ a service worker from being replaced before you want it to be.

You're probably thinking:

>>> why on earth would you want to prevent your app from updating to the latest version?! 

Fair question. I mean, this is a bit like turning off automatic updates. Why wouldn't you want the latest version!?

But, I recently had a scenario where I was doing something you may not think of as a typical use case for a PWA: helping track and monitor progress of surgeries.

>>> PWAs for surgery, why not?

Well, as it turns out, reliability is pretty critical for this application. I *really*, *really*, didn't want the app to ever be able update in the middle of a surgery. Largely because each release is tested thoroughly in an of itself, but it's much more difficult to test the update process, especially when you've persisted a large amount of client side state. Well, in this case, we store *all* the case data on the client side. Actually we *only* store it clientside because HIPAA.

For a bit more context:

1. The app helps doctors, dentists, CRNAs track and document anesthesia cases. 
2. There are a ton of things they need to document and a shockingly large percentage of anesthesia cases are still charted on paper.
3. What I built is basically a fancy report generation wizard built entirely in client side JS.
4. They keep the app (typically on a tablet) in the operatory with them during the case and it walks them through properly documenting the case, things like:
  1. Helps them perform a systems review as a final check to help catch exiting conditions that could pose a danger when they're sedated.
  2. Automatically records times everything as you perform the case.
  3. It beeps when it's time to time to record vitals and gives you quick/easy mechanism for entering that data.
  4. Helps you record drugs you draw up and tap a button to record when a dose is administered and automatically track amounts wasted (which has to be documented for these controlled substances).
  5. It automatically checks for potentially dangerous drugs interactions.
  6. Helps track flow rates of inhalation agents like Nitrous Oxide, Oxygen, etc.
  7. Calculates all totals, etc. 
3. **The final product is just a chart that is either printed or saved as a PDF** so they can attach it to then patient record in their existing EMR system.
4. Unless you have a medical background most of it won't make sense, but you can try the app anonymously (without signing up): https://anesthesiacharting.com 




 
These days, many (most??) modern front end applications are generated using some kind of bundler, like [Parcel]() (my personal favorite), or [Webpack](). Typically this involves compiling to a set of static assets in a `dist` folder or similar. Or you may use some metadata about your build from the bundler, but the end goal is the same. Create a list of files to be cached by the service worker.