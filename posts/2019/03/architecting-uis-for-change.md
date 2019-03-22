---

title: "Architecting UIs for Change"
date: 2019-03-22 12:00:00 PST
tags: architecture, pwa, state, redux
slug: architecting-uis-for-change
...

**Techniques for keeping your app code under control even when requirements shift dramatically.**

I've had this pinned on my twitter for just about as long as "tweet pinning" has been a thing:

> > If you don't actively fight for simplicity in software, complexity will win... and it will suck.

It's a nice, pithy little quip, perhaps... but how do you actually accomplish this?

The way I see it, broadly speaking, you have three options:

1. **Push back on any complex requirements.** Just avoid the complex problems altogether by only building relatively simple things.
2. **Minimize entropy** by trying to isolate areas of your app into distinct concerns and do whatever you can to hold those lines.
3. **Develop coping mechanisms** for the inherent complexity we're bound to face and learn to manage it.

**Option #1** is untenable and frankly—boring. Yet, there are a surprising number of folks who seem to believe the web should still just be a set of linked static documents of content. But, some of us like to build more interesting things on the web that are truly app experiences. Not just documents, but document _editors_. Oh, and things like video editing suites, graphic design tools, [interactive sheet music for learning how to play guitar](https://www.soundslice.com/) and tools for [tracking and monitoring patients during surgery](https://app.anesthesiacharting.com).

**Option #2** is well-intentioned and seems reasonable on the surface. I've heard this desire expressed from management from the last two big corporate PWAs I've worked on. There's a logical desire to have distinct teams that are able to develop, build, and deploy in isolation from one another. To be clear, I'm all for separation of concerns. But the entire presentation layer of a nice cohesive "app" experience is, in fact, a shared concern and not something that can be divided so simply (more on this later).

**Options #3** As you probably guessed, this is my preference and will the subject of this post. But, before we can develop coping mechanisms, we have to study the problem. Perhaps we can discern something about the source of complexity.

## Identifying the source of complexity

If you're a developer, I bet you're a little bit like me, you have an internal barometer that can sense how in-control the codebase is at any one time. I feel a sense of dread as we start to pile on features if I'm feeling that the current patterns are not able to sustain the addition of more features without causing serious deterioration of the overall quality of the code. On the flip-side, I also feel a huge sense of relief when I refactor something that was starting to slip into disorder and then manage to create the right abstraction that lets us reign it in. Doing this can be downright euphoric.

But is there anything we can pinpoint about the source of the "slippage" to begin with? I think so.

I've seen this in so many apps now, that I feel confident that it's a common source of many of these issues. For context, I've built a wide range of what might be considered "ambitious" web apps. Real-time asset geo-location tracking systems, chat apps, video calling apps, the Starbucks PWA, apps that enable you to make and receive real phone calls in a browser, surgery tracking apps, and recently I've been working on an e-commerce PWA for one of the world's largest retailers. These observations seem to hold true regardless of app or team size.

Early development tends to go something like this:

1. Initial requirements are identified and a small team builds a tidy, small, simple prototype with no real tech debt based on their understanding of initial requirements.

2. Stakeholders and early users start using the prototype and quickly realize there were several scenarios that were not accounted for. In addition, they also start to generate a whole bunch of "wouldn't it be awesome if we could" feature suggestions.

3. Code tidiness (and often performance) goes to hell as developers scramble to connect previously cleanly isolated areas of the app in the attempt to build those "wouldn't it be awesome if we could" features. These type of features frequently involve connecting previous isolated logic because you realize there is value to be gained by doing so (example below).

Later, when the app is launched to real users, steps 2 and 3 repeat, over and over. Or more precisely, they repeat until the developers working on it so dread their work that they either walk away, stop caring, or stop being able to actually deliver them in a timely manner.

2-5 years after the initial build someone comes along as says: "this is all garbage, we need to re-write it."

And... the whole cycle starts again.

To some degree, this is inevitable, and not all bad because sometimes you just need a fresh start. But, perhaps if we did things a little differently we could at minimum _extend_ this cycle a bit. So, if we look at the above sequence there is a precise moment where things seem to go off the rails.

> > It happens at the point where the original assumptions are challenged.

Can we perhaps define the point more clearly? I think so. As I hinted at above, more often than not, the precise point where "loss of control" over the app begins is when someone realizes the potential benefit of connecting logic from two previously disparate areas of the application. I've seen this so often that I've started to believe that most of us are drawing the wrong boundaries when we first build an app.

> > I think this happens because we're too focused on what data the app will _consume_ instead of how the data will _interact_ in our app.

This is a natural consequence of identifying the data we'll be fetching in our apps. But I think we tend to stop here for a couple of reasons:

1. Our brains have a bias toward broad generalizations and simple solutions. We at least know what data models we're dealing with, so we build around that.
2. We don't fully understand what the real requirements should be until we try to build a solution so we build around what we _do_ know: the data models we can get from the data APIs.

When we're first starting imagining a brand new application, it's relatively easily identify the _types_ of data we'll have to keep track of and it often fits into neat little buckets. The trouble is:

> > The whole reason for building a UI in the first place, is often to enable us to manage the interactions between these different data types!

## Let's make this less abstract

Let's say you're building an e-commerce experience. You know you'll have products in various categories. You know you'll have users, and shopping carts, and payment methods etc. You know that people will have to search for products, add them to a cart, and then checkout.

So, from a data perspective we'll have:

1. Products
2. Categories
3. Carts
4. Users

From a process perspective:

1. People will search
2. They'll add to cart
3. They'll checkout

> > Simple, right?!

So, as developers and product managers we have some really clean, simple lines we can draw, right? We'll obviously need an API that returns collections of products as search results, and as items in your cart.

So when splitting up the work of building a UI, we kind of let the data types split the UI concerns too. Part of the UI will be all about searching for products. There's one clean boundary. Then we'll need a product detail view that pulls in relevant product data like full descriptions, images, and user reviews. Then we'll need a cart view, and a checkout view.

That all sounds good, **let's divide an conquer**! We can have one team focused on building the API, we'll have a product model with a search API. We'll have a set of categories which we can group products into. From the UI side of things we'll need a search page, an item detail page, a cart page, and a checkout page.

Let's have a "shopping cart" team, a search page team, a homepage team, etc. All the pieces are cleanly separated. Because it was logically assumed that a user would cleanly jump from one part of the app to the other. Again, our bias toward simple solutions means we opt to split along easily identifiable major sections of the app. Great! The code is beautiful, teams are operating independently: everybody is feeling good about themselves.

Then, a smart UX designer comes along and says:

> > "You know, we really ought to have customers be aware of their cart the whole time. It's like walking around in a store, you have your cart with you and you should be able to metaphorically glance down at it whenever you want without leaving your shopping experience."

This is hard to argue with. _Of course_ that's a better experience. So, now what? You already have a completely separate team managing the "cart" experience. They own everything that happens at the `yourstore.com/cart` page.

It's ok, we can hack this. Let's add this bit of logic to the persistent header that shares a bit of code that checks and show the cart count, no big deal, right? Well, it chips away a bit of architectural beauty. Now, we have to share some piece application logic for fetching and retrieving the shopping cart data in a way that can be used by the cart team, but also can be used by every other team. But, whatever, we deal with it. It produces customer value, let's ship it!

The UX designer is happy, the new feature is shipped and everybody feels good about themselves again.

But soon, when people get a taste for this ability they say "well wouldn't it be awesome if we used our knowledge of what was in the cart to enhance and customize, well... _pretty much the whole experience_!" It goes on and on:

1. "You know, we really ought to let users not just see how many items are in the cart, but also actually pop it open to see items from anywhere."
2. "Well, if we know what's in the cart, maybe we can use the home page to show related products to what you've already added."
3. "Oooh, what about if they re-visit the item detail page of an item that's _already_ in their cart, perhaps we should remind them that they've already added it."
4. "Well, if we're showing suggested items related to what's in the cart, we should have it update those suggestions each time they add something and then include those suggestions throughout their shopping experience."
5. "Oh, but what if they add something to their cart directly from the area of the app that is showing that list of suggested products? In that case, we don't want to refresh that list right away... just imagine if they're in the middle of adding two things and then it disappears from underneath their hovering fingertip. So, can we make sure we only refresh that list once it's out of view?"

> > Can't you just feel your internal barometer starting to build pressure?

Our previous lines of separation break down. The idea of the item detail page showing a single product is no longer a standalone concept. Now we really care about that product _in the context of the cart_ and the context of other things we may want to search for, etc. This may seem annoying at first, but should not come as a surprise.

> > Often times the entire purpose of an app / UI is to handle the intersection of the various types of data.

A few examples off the top of my head:

1. An e-commerce app is about combining products in different categories into shopping carts. Then connecting those shopping carts with customers with certain payment methods, order histories, and preferences.
2. A "contacts" app is about organizing people you know into favorites, groups, and your interaction history with them.
3. An anesthesia charting application is about combining a patient record with medications administered, vitals recorded, and people involved.

I would argue that **UIs, by their very nature, are all about connecting disparate types of data!** Yet somehow, when building UIs our data structures often fail to account for this.

So what happens? Progress slows as engineers start to push back on what really would have been fairly simple change requests if it had been built differently.

## What could we have done?

We can't anticipate what specific features we're going to be requested to add.

1. But, perhaps we can avoid drawing such distinct lines to begin with?
2. Perhaps we can increase our flexibility somehow?

I'd like to make another observation here:

> > Figuring out how to render stuff is not the hard part of building a rich, interactive UI!

Regardless, of whether you use Vue, React, Preact, or whatever. Let's be clear, the difficulty is _not_ the how-to-generate-DOM part. The hard part is managing the intersection of interrelated but seemingly distinct state in a way that doesn't cause what I like to call "state bugs". Where something ends up in an odd state. For example, one part of the UI reflects state that is no longer true.

> > What if our mental models are wrong?

The three predominant approaches we've seen to building stateful UIs on the Web in the last decade have essentially been:

1. Model and Collection objects (think Backbone.js, Ember.js, etc.)
2. Component all the things! (React state, very little code lives outside the files that defining components)
3. State "god objects" paired with something that is a "view layer" this could be anything, but commonly Redux and React.

**Option #1** is the embodiment of the first part of the shopping cart example I mentioned above. Apps that I've personally built this way (which is quite a few, I first wrote about [adopting backbone in 2010](https://blog.andyet.com/2010/10/29/building-a-single-page-app-with-backbonejs-undersc/)) always got messy when trying to share models between collections, or somehow associate models with one another. The one _really_ strong point in _favor_ of this model/collection approach is it often perfectly mimics the data structures we get from data APIs.

**Option #2** works great for simpler stuff. In my option, one of the main reasons the React programming model is so successful is it solved the nested component problem. Before React we were always hacking together "child views" but we always had to manage them ourselves. But the shortcoming with using components for everything is that it doesn't directly address the problem of state that clearly is not directly tied to a single component. With React 16+ we have the new context API. This helps pass state around, but still doesn't directly help us solve the structuring and management of "global app state." From what I've seen, attempting to do everything in components frequently leads to a giant interconnected mess of components that are hard to to reason about as a whole.

**Option #3** has enabled some incredibly cool demos like time traveling, state rehydration, etc. But it has been problematic for many to implement in the real world. As it turns out, dealing with a single app-global state object comes with its own set of challenges. Gaps in functionality of Redux (and similar state tools) have been filled by third party libs and many times, the _core idea_ of having a "god object" is a bit at odds with other popular libraries. For example, redux and React-Router have not always played nicely together. And other perceived gaps in functionality have led to a large crop of supplemental libraries such as redux-saga, redux-loop, and Immutable.js. Also, the process of connecting redux to something like react has historically been a bit messy. After after writing a ton of `mapDispatchToProps`, `mapStateToProps` suddenly the idea feels a little less ideal.

Frankly, that summary of the three options is a bit disappointing.

> > Do all our models just suck?

I don't think so. Perhaps we can combine the best ideas from all of them?

1. Use the mental framework of "collections" to fetch data from APIs. We don't have much choice here, this is just kind of how data APIs have to be structured. But let's skip the whole "turn each item into a model object" part.
2. Use a component hierarchy like React, or my favorite: Preact. But, let's use it for what it's best at, which is rendering a tree of visual components. Let's use local component state for things that are truly local to the component and its children. Usually local state is perfect for things like transient UI state, such as whether or not a particular line item in a list is temporarily in "editing mode." Or for tracking form values and form field error states while the user is in the process of filling out a form.
3. Use the "god object" approach to aggregate all the various data fetched by APIs as well as any other "app state" that needs to be shared between components.

From my experience, plucking the best patterns from each is great. But, there are still shortcomings we have to make up for in the "god object" approach. Luckily, I've found that those things can be worked around. Unlike trying to hold strict boundaries between different data-types or "pages" within an app, there are other boundaries we can draw that are much more defensible because they're more structural instead of being linked to the app's feature set.

They are:

1. **Don't introduce _any_ other sources of truth.** If you're doing the "god object" thing. By all means, don't have multiple "gods." If you need data from something like a browser API write some glue code that mirrors the relevant state from the browser into your "god object." This includes things like the current URL ([you can read more about how I do routing with redux here](https://read.reduxbook.com/markdown/part2/09-routing.html)).
2. **_Always_ read state through an abstraction.** There's a concept called "selectors" that is essentially a function that takes the state from the "god object" and returns just the slice of state you care about for a given thing. By always reading state through selectors you can retain flexibility in how you choose to structure the "raw" data of the "god object". Also, selectors enable you to "subscribe" to a very specific subset of changes within your "god object" enabling efficient rendering. The most common example of this pattern is probably: [reselect](https://github.com/reduxjs/reselect).
3. **Precisely _never_ store derived state in the "god object."** Only store state in its rawest, purest form. You can decorate and enrich it as it's being read through selectors. This will save you a lot of headaches.
4. **For extra credit: never use `componentDidMount`, or something similar to initiate data fetching.** Because, contrary to popular opinion, whether or not a particular component is mounted has very little to do with whether or not the app actually should consider fetching the data. The shopping cart example above is a good example of this. Regardless of whether the user is looking at their cart or not, we want to know what's in their cart because we can enhance the entire rest of the experience based on that data. Instead, ideally we want to be able to just declare a maximum stale age that we're ok with, and it should refresh the data behind the scenes whenever it's too old. To accomplish this we can use selectors to subscribe to our "god object" and look for conditions which should trigger other changes.

If you're able to follow those rules, just think about what you now have:

1. You have a single source of truth containing everything your entire application needs to be aware of.
2. You can easily combine state from completely disparate sources in whatever fashion you need, as you read it through selectors.
3. You can write code that that responds dynamically to any possible condition that may need to be responded to.
4. You can export and recreate this entire "god object" at will to recreate any state your app can be in.
5. You can init and "run" an entire functional application _without any visual components having been built whatsoever_, this is analogous to running a browser in headless mode.
6. You can build an entire data layer for an application before design has even decided how anything is going to look.

To be clear, these are not _hypotheticals_ these are the approaches I've used to build the last five apps I've been involved in.

## Applying these ideas to our e-commerce example

**note:** for brevity I'm glossing over some of the implementation details. [I've written a whole book that goes deeper](https://read.reduxbook.com) if you're interested.

**Requirement #1:** The cart should be fetched and be available no matter where you are in the app.

A top-level key in the "god object" tracks the current cart data. When the app boots up, the mere _lack_ of cart data is sufficient to trigger a fetch of cart items. Once fetched, it is stored along with a timestamp indicating when it was last successfully fetched.

Now, let's say we want to show a cart count number in the header. We can now take that _raw_ cart items data (which is an array of objects) and write a selector to derive a cart number to show like this:

```
// select relevant slice of data from our "god object"
selectCartItemsRaw: state => state.cartItems.data,

// a selector that always returns a usable number
// of cart items regardless of the state of cart
// items. Even if we just haven't fetched the
// cart items yet.
selectCartItemCount: createSelector(
  'selectCartItemsRaw',
  items => items ? items.length : 0
)
```

Ok, so now we have a selector the header nav bar component can subscribe to, in order to always render a count. If we later determine that we want our total number of items to take into account multiple quantities of the same item, we can easily change our selector to now determine that value a little differently.

That's literally a one-line change:

```
// now we change the existing selector to
// instead sum up the `quantity` attribute
// of our cart items.
selectCartItemCount: createSelector(
  'selectCartItemsRaw',
  items =>
    items ?
      items.reduce(
        (total, item) => total + item.quantity, 0
      )
      : 0
)
```

**Requirement #2:** we should fetch a list of suggested products every time the cart contents changes. If you were building it, how would you do this? If you're like most developers I've seen, you would create a "fetch related products" function that you manually called after each "add to cart" operation, right? But, that's super procedural, what if they added one more item of the same thing that the cart already had so the "list of items" didn't actually change. What if they remove something? Now you have to manually run it after that too, right? Soon, we're daisy chaining things and directly coupling one type of fetch with another.

Maybe we can do this a little differently. First, maybe we just need to extract a list of product IDs in the cart, since that's what's sent to the recommendation API.

No big deal, we add another selector:

```
selectCartItemIds: createSelector(
  'selectCartItemsRaw',
  items => {
    if (!items) {
      return null
    }
    return items.map(item => item.id)
  }
)
```

Now, let's write something that triggers the fetch if we have cart item ids that we haven't already fetched, and we're not already in the process of fetching them.

Again, I'm glossing over some of the details, in order to focus on the ideas. But essentially this is a selector too, but it will just lead to trigger an action if certain conditions are met.

```
reactShouldFetchRelatedProducts: createSelector(
  'selectCartItemIDs',
  'selectRecommendedItemsRaw',
  (cartItems, recommendedItems) => {
    if (!cartItems) {
      return
    }
    const idString = cartItemIds.join(',')
    const idsHaveChanged = recommendedItems.lastFetchIdsString !== idString
    if (idsHaveChanged && !recommendedItems.loading) {
      // if this doesn't make sense to you, don't worry
      // the point is we're triggering another action
      // as a result of a set of conditions
      return { actionCreator: 'doFetchRecommendedItems', args: [idString]}
    }
  }
)
```

Now, anytime an item with a new item ID is added or removed from the cart it will update the recommended products list, sweet!

Ok, so now what?

Oh, right, we said we don't ever want to update the list of recommended products _while_ the user is looking at their cart, which is where those recommendations are shown.

Fortunately, our "god object" also knows the current URL pathname and we have a selector that returns just the pathname part of the URL.

So all we have to do is add one more condition:

```
reactShouldFetchRelatedProducts: createSelector(
  'selectCartItemIDs',
  'selectRecommendedItemsRaw',
  'selectPathname', // <- This is new
  (cartItems, recommendedItems, pathname) => {
    // we now also check to make sure user is not looking at their cart
    if (!cartItems && pathname !== '/cart') {
      return
    }
    const idString = cartItemIds.join(',')
    const idsHaveChanged = recommendedItems.lastFetchIdsString !== idString
    if (idsHaveChanged && !recommendedItems.loading) {
      // if this doesn't make sense to you, don't worry
      // the point is we're triggering another action
      // as a result of a set of conditions
      return { actionCreator: 'doFetchRecommendedItems', args: [idString]}
    }
  }
)
```

Now, our recommendations will magically fetch whenever cart item IDs change, but only if the cart page is not currently open.

**Requirement #3**: modify the item detail page if the item is in the cart. Crap! Now we have another two, seemingly distinct, concerns that all of a sudden care about each other.

Again, our "god object" knows what URL they're on, so we can know which item page they're looking at because the item ID is in the URL. So, we can select the "activeItemId" (realistically we have already written this by the time new new requirement comes along, but it probably looks something like this:

```
selectActiveItemId: createSelector(
  'selectPathname', // url pathname
  'selectRouteParams',
  (pathname, routeParams) => {
    if (!pathname.startWith('/product')) {
      return null
    }
    return routeParams.itemId
  }
)
```

Ok, so let's assume we've also got a selector called `selectActiveItem` that actually returns the data we've fetched for that item.

Read the code comments in this block carefully:

```
selectActiveItem: createSelector(
  'selectItemDataById',  // grabs all item data we have
  'selectActiveItemId',  // the one from above
  'selectCartItems',     // the current items in cart
  (itemDataById, activeItemId, cartItems) => {
    const foundItem = itemDataById[activeItemId]

    if (!foundItem) {
      return null
    }

    // now if we want to mix in what we know about the cart
    // we can do that without manipulating the "raw" state at all

    // let's see if we have one
    const cartItem = cartItems.find(item => item.id === activeItemId)

    // now we can decorate our active item with the corresponding cart item
    // if it exists.
    return Object.assign({}, foundItem, {relatedCartItem: cartItem || null})
  }
)

```

Here you can see how we've successfully combined two _completely_ different types of data. Or to put it into MVC / Backbone.js terms, two models from two different collections are now merged without truly merging their sources.

Now, the page that renders the item detail page just has to check for the existence of a `.cartItem` property to render something different in that scenario.

> > You can start to see how mashing together seemingly disparate parts of state can now be done very arbitrarily. This is a huge strength of this approach!

Now if some product manager decides that on the third tuesday of the month, and a user have more than 50 items in their cart, and if three or more of those items qualify for a warranty, then we need to render a congratulatory message. All of a sudden, with this type of approach, it doesn't really sound all that scary to implement.

> > We just define a selector that answers each one of those questions. Then use those as inputs to another selector that checks if all those are met.

We haven't even had to mess around with manually firing data fetches. We've defined the conditions that should trigger a fetch, and we've seamlessly stitched it into the data that is already being used to render the item detail page.

> > This also, very importantly, means that our view components, (React, Preact, View, Web-Components, etc.) can actually be quite simple. They just have to focus on rendering the right stuff, given the properties they're given.

## Conclusion

Hopefully I've at lest helped illustrate at a high level, the benefits and flexibility that we can get by changing the boundaries we use when building UIs with complex and ever-evolving feature sets.

You may be thinking this all sounds nice, Henrik, but... does it scale?!?! In my experience on 5 different apps, Yes. Can I do SSR with these ideas? Yes, I'm doing this for a big client right now. Is it performant? That's a bit of an tangential question, because it's also possible to do really stupid things if you misuse these patterns, but yes, in my apps this has not prevented me from consistently building apps with lighthouse performance scores in the high 90s.

There are obviously still implementation details I'm completely ignoring here. To fully explain all those things and the tools and libraries I actually use to do all of this in practice I'd have to write a whole book, which I actually did and made available online for free: [read.reduxbook.com](https://read.reduxbook.com).

Hope I've at least given you something to think about. I'm just trying to share the ideas that are working well for me. I figure if we all keep doing that, everybody wins by learning from each other's experiences.

Let me know what you think. Easiest way to reach me is on Twitter: [@HenrikJoreteg](https://twitter.com/henrikjoreteg). Thanks for reading!
