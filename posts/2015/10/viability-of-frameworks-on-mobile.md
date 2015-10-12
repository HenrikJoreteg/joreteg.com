---
title: "The viability of JS frameworks on mobile"
date: 2015-10-12 18:20:00 GMT
tags: mobile, performance, frameworks, js
slug: viability-of-js-frameworks-on-mobile
scripts: 
	- "//platform.twitter.com/widgets.js"
...

Whether I like it or not, not everyone using my web apps will be running iOS 9 on an iPhone 6S or a Nexus 6P and connecting via super-speedy wifi.

The reality is often anything but that. 3G connections and older hardware is often the norm. Google reports that there are [1.4 billion active Android users][1]. Many of them, will no doubt, be running less-than-top-of-the-line hardware.

And, if you read stuff like [Jeff Atwood’s recent post][2] on Android performance you may feel that things are pretty bleak for the mobile web. 

A few notable pull quotes from that post:

> In a nutshell, the fastest known Android device available today -- and there are millions of Android devices much slower than that out there -- performs 5× slower than a new iPhone 6s, and a little worse than a 2012 era iPhone 5 in Ember. How depressing.
	
> We've done enough research to know this issue is not really specific to Ember, but also affects Angular and **most other heavy/complex JavaScript on Android**. Why?

Perhaps the “heavy/complex” part is the problem?

Continuing…

> This is becoming more and more of a systemic problem in the Android ecosystem, one that will not go away in the next few years, and it may affect the future of Discourse, since we bet heavily on near-desktop JavaScript performance on mobile devices. That is clearly happening on iOS but it is quite disastrously the opposite on Android.

Ok, there’s the state of the mobile web ecosystem, per Atwood.

He ends with this line:

> I am no longer optimistic this will change in the next two years, and there are untold millions of slow Android devices out there, so we need to start considering alternatives for the Discourse project.

Bummer, right?! Let’s all go home. At least there’s React Native so we can all pretend we’re building web apps while actually writing native apps ;)

So, is the mobile web a dead-end for apps?

## Hang on a minute…

If you didn’t catch it. The “Discourse” app Atwood is referring to is the app he used to publish the post *about* Discourse. It’s a forum app of sorts. So meta! 

Anyway, when I realized this, I open the network panel of dev tools on that Discourse page and there was 659kb of JS transferred across the wire (that’s the gzipped size). 

In my opinion, that’s the same as forfeiting on mobile before you even start.

I think we *have* to do better than this to be viable on mobile.

I’m not blaming or even trying to criticize Atwood or Discourse here. A huge number of mobile web apps are built this way so this could really have been *any number* of sites.

My question is simply: are all these heavier tools/frameworks even viable for mobile use?

I’m not convinced they all are. 

## Let’s look at some research

The fine folks at The Filament Group [published some research last December][4] about load time performance of the TodoMVC app of 5 popular web frameworks. Obviously, TodoMVC is a bit of a contrived example and may not be indicative of a real-world app. But, it’s a great fit for this type of research because it will include all the base assets for a given framework, and at least hopefully, the best practices as well.

You may be thinking: *”this is load time performance, Atwood was talking about runtime performance!”*

Yes, Atwood was discussing runtime performance, I’ll get to that shortly. *But, the user doesn’t care why they’re waiting*, so load time is clearly an important part of performance too.

The whole post is worth reading, but the summary of the research findings can be seen in their graphs:

![load time screenshots][3]

In my opinion, the data for Angular and Ember (the two options that Atwood mentioned) flat out disqualify them for mobile use. 

If you know that I co-created Ampersand you may assume that I’m  flaming against other frameworks and trying to sell you on Ampersand.

Nope.

The last two apps I built actually didn’t contain any Ampersand code at all. If you’ve read my [recent, excited post about Redux][5] that probably doesn’t surprise you. 

**I don’t care what you use, beyond how it effects how I experience your app as a user.**

Tools are merely a means to an end. 

Ok, I lied. I do *sort of* care what you pick. But, only because I don’t want your experiences as a developer lead you to think the mobile web isn’t viable just because sending a megabyte of JS made the app slow.

## It’s not game over

Maybe the mobile web is fast enough and we just need to stop pretending we can get away with ineffeciencies that we don’t feel on a desktop.

I think we need to be much more minimalist from the start.

The ever brilliant Dominic Tarr once said this:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">if you want to write fast software, use a slow computer</p>&mdash; Dominic Tarr (@dominictarr) <a href="https://twitter.com/dominictarr/status/629992939738005504">August 8, 2015</a></blockquote>

How many web developers, to this day, don’t test on a phone locally when building apps? This isn’t just about small screens, we need to assume that we’re building for weaker, slower computers. I think we need to bake mobile into our dev workflow, not just as some final pre-launch check. If you’re curious, I [use this setup][6] while developing.

Regardless, even though phones may continue to get faster and faster, I think it’s myopic to assume we can just ignore current speed problems in hopes that they’ll be resolved by faster hardware. Although, phones may continue to improve, I don’t think phones should be our only runtime target. 

As this whole Internet of Things, um… thing becomes more of a thing (wow, that sentence was epically terrible #leavingitanyway). It seems likely there will be a some other platforms we’ll want to write for that are *not* phones. Things like watches, TVs, VR, and small computers hooked to to large displays.

## That’s nice, Henrik. So what should do you propose we do?

First, as [I’ve written before][7], I think all the HTML we can infer from the URL alone should be rendered at build time to static HTML files. As it turns out, browsers, even “slow” mobile ones are pretty friggin’ fast at rendering HTML sent from the server.

Secondly, I think we need to do more with less, let me explain…

Much of the hoop-jumping in Backbone, Ampersand, Ember, and Angular have to do with properly binding state to the UI. They certainly do more than that, but even many of the data features, on closer inspection have to do with supporting those binding capabilities. As a result, they all ship with an event system of some kind, and most have a way to create derived/calculated properties that can also be observed. 

You can certainly use React as a view layer for any of those, but  one of the big wins with React is that at the point where you can do a cheap re-render it removes the need for many of those other features that add complexity to your system.

As a simple example, if you’ve got a `Backbone.Collection` with models in it, how do you go about rendering the length of that collection to the UI using Backbone paradigms? Getting the value in the template initially is certainly easy if you know it at the point when it’s first rendered. But, how do you bind that value so that any change in the collection will also update that length that you’ve rendered into the DOM?

You could set it up to re-render on all add/remove/change events or, you could create an observable property somewhere that did the same and then track that as you would any other property. That total would be updated with any changes, and then, you’d bind it to the view. 

But all this feels a bit silly. If you’ve ever inspected an instance of a `Backbone.Collection` you know that `collection.models` is simply an array of `Backbone.Model`’s.  An Array already *has* a value for length, it’s called `.length` \*\*sigh\*\*!

Contrast that to React or anything else that allows us to inexpensively re-render our whole app at will (the promise of React). When we have that, we can just use that `length` property directly in our `render` method in the individual component that cares about it. Now whenever we have any change in any of the state in our app we re-render. 

So now it becomes this simple:

```js
React.createClass({
  render: function () {
  	return <span>{this.props.species.length}</span>
  }
})
```

Or, if using the [new stateless functional components][8] in React 0.14, with ES6 destructuring, and assuming `species` is our array of objects here it gets downright beautiful. The entire component could be written as:

```js
var Aquarium = ({species}) => (
  <span>{species.length}</span>
);
```

Aesthetics aside, just think how much less stuff we need:

1. We no longer need to register multiple event listeners on the collection (less code, less memory use).
2. We no longer need to define another property that we have to compute that creates an observable duplicate of what we already have with `.length` (less code, less memory).
3. Shoot, we may not even need the collection or any of its models to be observable at all! The collection could be a plain ‘ol JavaScript array containing plain ‘ol JavaScript objects instead of custom created observable models (a lot less code, less memory, less computation)

**We no longer need many of the features in those heavy frameworks at all.**

React then becomes the biggest pill you have to swallow. In my simple tests with React, and React-DOM 0.14, built with webpack and gzipped you end up around 37kb. 

For comparison, jQuery 2.x weighs in at about 29kb min+gzip. So, really, we’re doing pretty good and my hope would be that eventually, much like happened with jQuery, many of the core features of React would simply be part of browser API.

Anyway, now rather than needing observable models, observable collections, the ability to subscribe to changes on derived properties and all that jazz, we can probably get away with an architecture that works more like this:

1. A single application state object as a JSON-like structure of plain JS arrays and objects.
2. A set of mutator functions that represent all the ways that state can be changed to be used any time there needs to be a change in the state tree (you could follow immutability principles here too, if you’d like and just make sure you replace anything you change).
3. Re-render the whole app any time these mutator functions are done.

I’m simplifying a bit, but that’s pretty much how Redux works. Read [my Redux post][5] for a better overview. But, you don’t need Redux to implement a simple pattern as described above. Oh, an by comparison Redux weighs practically nothing at approximately 2kb.

The point is, that **by leaning on React for DOM syncing we can dump a bunch of stuff**.

Imagine how much less code it takes, and how much less work is required of the browser to deal with a simple set of objects and arrays and a smart render call. 

As opposed to shipping a class system, an event system, a templating system, a custom set of observables types, a DOM library like jQuery (required by some of them), all the extra app-specific code you’d write describing those models and collections and all their properties. Instantiating models and keeping all their internal state and caches those models use to enable their capabilities will require more memory and computation. The processing and memory required to do value comparisons (also known as “dirty-checking”) to see whether a `change` needs to be triggered.

There’s just **so many more layers of code that have to run even for simple changes to the state of the app**. 

The ability to re-render *at will* allows for a fundamentally lighter approach.

Unfortunately, I don’t have any perfect example I can just line up next to the Ember runtime performance test Atwood links to, but it’s not hard to imagine that all these simplifications that flat-out reduce the amount of computation required, would also have a very positive impact on runtime performance. 

Also, to clarify, total file size may not matter so much as long as load time and runtime performance are still good. 

## So, what’s next?

Unless we want the web to be seen as a second class citizen on mobile, I think we need to address these performance issues. I believe the web can be fast even on mediocre hardware while providing a good developer experience. BTW, if you doubt the developer experience part [watch Dan Abramov’s talk from React Europe][9].

I certainly don’t have all the answers here and I’m not saying React + Redux is some kind of panacea. I just like what they enable.

But so far, pre-rendering all known HTML and using the lighter approaches described here seems to be working well for me. I’ll keep sharing my thoughts as I keep building more stuff. Please do the same.

Hit me up on twitter: [@HenrikJoreteg](http://twitter.com/henrikjoreteg) or better yet, write a response on your blog to continue the conversation. Go go gadget web!

[1]: http://www.wsj.com/articles/google-says-android-has-1-4-billion-active-users-1443546856
[2]: https://meta.discourse.org/t/the-state-of-javascript-on-android-in-2015-is-poor/33889
[3]: https://cldup.com/jjiqPZLLEK-2000x2000.png
[4]: https://www.filamentgroup.com/lab/mv-initial-load-times.html
[5]: https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux
[6]: https://github.com/henrikjoreteg/hjs-webpack#developing-on-multiple-devices-at-once
[7]: https://blog.andyet.com/2015/05/18/lazymorphic-apps-bringing-back-static-web
[8]: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
[9]: https://www.youtube.com/watch?v=xsSnOQynTHs