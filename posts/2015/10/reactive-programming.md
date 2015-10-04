---
slug: reactive-programming
date: 2015-09-28 04:01:06 GMT
title: "Reactive Programming"
old_url: http://joreteg.com/post/130039101027/reactive-programming
tags: programming
...

The term “reactive programming” may sound a bit cryptic, but if you’ve ever used a spreadsheet, you’re already quite familiar with the concept.

When you’re simply *viewing* a spreadsheet, each cell isn’t necessarily showing you what was actually typed into the cell. Sure, some cells may contain simple values, but others actually contain *formulas*. 

The formula may, for example, describe that the cell should contain the sum of cells `A2` and `B2`. But, when you’re viewing it you’ll see the computed value, not the formula itself.

The real power of a spreadsheet comes from the fact that when you reference another cell from one formula the referenced cell could either contain a simple value *or another formula*. Any changes made to the inputs will flow through the entire spreadsheet. Each cell gets recomputed anytime any of its inputs change until the entire sheet is reflecting the changes that have cascaded through those formulas.

What I’ve been describing with the spreadsheet is in fact **reactive programming**. Each cell is simply reacting to changes in the inputs.

That’s the key distinction: instead of writing code that calculates simple values, *we write code that describes relationships between sources of values*. 

Once we’ve described how everything should react to the changes to its inputs, then the data flows through our functions until all the new values have been computed.

## So, why would we want to build things that way? What does it gain us? 

Well, let’s think of the alternative:

If you have a table of values that you want to total up, you could certainly pull out a calculator, add them all up, and type the resulting value into the “Total” cell. 

Done! Easy.

But, now what happens when the values change? Obviously, you’d have to repeat the exercise. This may be tolerable for a small table, but it would quickly become completely unmanageable if you’re dealing with, say, an amortization table showing 30 years of monthly principal and interest payments. Managing changing inputs in that type of system requires a difference paradigm.

## Let’s give a more specific example. 

Let’s say you want to build a mobile web app that is going to let people sort a list by touching and holding an item or swipe an item right and left to perform different actions on it.

A browser gives us four different “touch” events we can listen for: 

1. `touchstart`
2. `touchmove`
3. `touched`
4. `touchcancel`

Where’s my `touchhold` event?! There’s no such thing. So if we want to build an app that triggers “sort mode” when a user has held their finger on an item for a half second. Think about what we’d have to do:

1. Listen for a `touchstart`
2. start a timer
3. wait half a second

Doesn’t sound too bad right? But wait… we also have to make sure they haven’t moved their finger too far, but we should probably still consider it a hold if they’ve moved just a few pixels. We also have to make sure we stop the timer if we get a `touchend`.

So, now we have to also store starting position we have to compare that position with any subsequent `touchmove` events we have to continually calculate a distance moved from that starting point with any changes. As long as that distance is within our tolerance and the timer reaches half second before any `touchend` event… congrats, we have a “hold”. 

If we think about it, this is really spreadsheet-type problem, right?

We’ve got some input cells that are simple values, some of which will be updated over time:

1. starting X
2. starting Y 
3. start time
3. current X 
4. current Y
5. current time

We’ve got formula cells that will calculate as the time passes and inputs change:

1. time elapsed
2. distance moved

We’ve got an `is holding` formula cell that uses the values from `time elapsed` and `distance moved`.

Ultimately, all this touch-related logic could be broken out into its own library. Then, our program would only have to care about that `is holding` cell and update the interface accordingly. All the complexity of how those touches are tracked and measured would be contained within the library.

This is just one example of types of issues reactive programming approaches help us deal with.

Over time, you’ll find that much of the code we write is really just tracking and updating relationships between different variables. 

Recognizing that and learning to use reactive patterns allows us to more easily solve complex problems and break them down into small, manageable pieces. 

Then, just let the data flow.

---
*Note: I was asked to produce a writing sample explaining reactive programming for a technical writing contract. I'm posting it here because I thought it may be useful to someone (and yes, I "passed").*

If you like this, or if you think I botched it, please let me know on twitter: [@HenrikJoreteg](http://twitter.com/henrikjoreteg)