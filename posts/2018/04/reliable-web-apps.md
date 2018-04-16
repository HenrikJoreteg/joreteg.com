---

title: "Building Honey Badger Web Apps"
date: 2018-04-16 10:00:00 PST
tags: pwa, mobile, web, book, redux
slug: honey-badger-web-apps
...
**This is a chapter from my new book [Human Redux](https://reduxbook.com/) which is now available!**

# Reliable apps

As a user, nothing will more quickly sour me on a piece of software than flakiness. When we try to get someone to use our software, to some degree, we're asking them to trust us. If they're going to enter their data, spend their precious time, or hope to get some value out of the app we've built, they have to trust that it's going to do what it's supposed to do.

How is trust built? Through experience, right? Consistent experiences over time lead to trust.

Historically, web developers haven't _really_ had to care about reliability quite to the same extent as folks building native applications, since the _web itself_ has always been a little untrustworthy. Our Internet connections are far from perfect, browsers have different quirks, and at the end of the day, our users can always just hit "refresh" if we end up in a broken state.

To this day, when I've written anything of significant length into a `<textarea>` I'll instinctively copy it to the clipboard before hitting "submit" because I don't trust that the developers will have taken care to make sure I don't lose my work if it fails to submit!

Sure, if you're building simple websites that level of inherent flakiness might be acceptable because users expect it. But, at the point where you're asking a user to use _your app_ to accomplish something that _matters to them_ all of a sudden this becomes unacceptable.

## The Web has a trust problem

When you type a URL into a browser and hit "enter" what level of confidence do you have that it will quickly load and get you what you're looking for?

By contrast, when you open Instagram on your phone what level of confidence do you have that it will open quickly and will at least show you what you saw last time you opened it even if you don't have an Internet connection?

Quite a different level of trust, right?

It used to be that this difference could be attributed entirely to the differences between the platforms. On the one hand, The Web won't typically get you anything if your connection is failing, on the other hand, Instagram, the app, is already downloaded and installed locally and the data it has fetched is also stored locally. So it shouldn't be too surprising that Instagram can achieve a higher level of reliability, right?

Here's the thing: **That excuse is gone**! Today's web platform allows us to build apps that can:

1.  Be installed on the device
2.  Be opened and run from cache first, before even trying the network
3.  Fetch and store data locally

**The inherent reliability advantages of native apps are gone.** But as a group, web developers haven't necessarily embraced that mindset. But, if we want to build trust with our users, it is downright irresponsible for us to assume we'll always have a fast, reliable connection. We simply cannot assume that we'll always be able to fetch what we need on demand.

Let me say that again:

> If we want to build trust with our users, it is downright irresponsible for us to assume we'll always have a fast, reliable connection.

You may have heard the phrase "Offline first" used to describe these types of approaches. But "Offline first" is somewhat confusing since many people read that think "Oh, I don't need offline support." But, what I'm discussing here is reliability. _Everyone_ wants reliability. Consistent, reliable experiences build trust, and people spend their time (and money) with companies and services they trust.

## Rebuilding trust

If I tap an icon on my phone, I expect that app to open. Period. Sure, it may not be able to connect to fetch what it needs but it damn well better open and at least tell me that it couldn't get what it needed.

Users have that expectation of things that are installed. In fact, that's arguably what the word "installed" actually means to a user. Sure, a modern web app that you open in a browser may have been built to be capable of working offline, and truly be run locally, as if it were installed. But, we're never in a million years going to teach users to open their browser, type in a URL and hit "Enter" when they know they don't have an Internet connection! It's simply not going to happen because in that scenario _our app_ isn't "the app" they're running; _the browser_ is the app they're running.

As a result, if we even want a shot at creating the same level of trust, we need our apps to exist outside of the browser. Users have to be able to install our web apps on their devices.

Fortunately, that's now possible with Progressive Web Apps. I won't get into the nitty-gritty of building PWAs here, but if you're not familiar with them, I'd urge you to read the "Betting on the Web" blog post that I've included in the Appendix.

I would also argue, however, that at the point where we've recognized that we're building real apps, that realization should affect how we approach data fetching.

## Trustworthy data fetching

If you've built web apps, you've no doubt fetched data from a server from JavaScript that's running on a web page. Back in the day, you may have done it like this:

```js
$.ajax('https://example.com/some.json', {
  success: function(data) {
    console.log(data)
  }
})
```

If you were diligent, you'd also handle the error case. More often than not "handling the error" involves popping up a message to the user saying something like "Sorry, there was an error fetching your data." I suppose this is _marginally_ better than doing nothing, but sheesh, in most cases you've essentially left your user at a dead-end street without a map; not exactly great for building trust.

Not to mention, in a mobile world, a failed request should not be a surprise! It's _not an edge case_. It's not even strictly an _exception_ because frankly, it's not all that exceptional.

As we've discussed in previous chapters, if we want to build reliable applications we have to decouple the data from the views that show them. If we've coupled things so that displaying a component always causes a fetch that breaks the cache-first behavior. There are cases where that's sufficient, but often it sells users short.

What's the problem with just fetching data when a view loads that needs the data? Imagine the following example:

```js
class MyPage extends Component {
  componentDidMount() {
    this.setState({
      loading: true
    })
    fetch('https://example.com/some.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          data: data
        })
      })
  }
  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    return <div>{data.map(item => <p>{item.name}</p>)}</div>
  }
}
```

In this case, anytime this component is added to the page it's going to immediately fetch data while showing a "loading..." message. The trouble is, if the component was added, removed, then quickly added back again it will _still_ show `loading...` even though we just successfully fetched the data 2 seconds ago!

And sure, you can use various simple loader helpers that will mitigate the need to re-fetch. But they're usually quite simplistic and doesn't address the issue of coupling view and behavior.

As we've said, these simple approaches may have been OK for the old web, but if we're building real apps, we can do better.

## A rather ambitious, yet real-life example

While I was prototyping the PWA for Starbucks before it became a "real" project, I ran into an interesting feature in the mockup design. The goal was to show what song was currently playing in a given Starbucks store, that is if we thought you were in one.

Conceptually the various APIs required to pull this off were all available. But, the process was not exactly straightforward; quite the opposite, in fact. Here's what it had to do:

1.  Call an API to return "cards" to be shown on the landing page of the app.
2.  If we got a "now-playing" card back with sufficiently high priority, we'd attempt to fetch the song that was now playing.
3.  First, we'd need to determine if we had permission to ask for geolocation.
4.  If we didn't, we wanted to display a "card" in the UI casually explaining the cool feature we could provide if they would give us permission with a button they could use to grant us permission.
5.  If we had permission, then we would trigger a geolocation request of the user behind the scenes and hope it was successful and sufficiently accurate (which is anything but guaranteed with this API).
6.  If we had geolocation that was within our accuracy threshold and not too stale we could use that to trigger a request to the API that would give us the closest store to that geolocation.
7.  If there was a store nearby and within distance threshold, we could _reasonably_ assume the user was probably in or at least near the store.
8.  Now that we have a store ID we could attempt to call the API that told us what music was playing and use the result to show the right image and song info.

That's quite the cascade of things that need to occur, right? Plus, any number of them were known to be likely to fail.

1.  Geolocation permission could be denied.
2.  Geolocation could fail.
3.  Geolocation could just not be accurate enough to trust.
4.  There may not be any store nearby at all.
5.  There may be a store returned but is often too far away to assume the user was inside.
6.  We may have correctly guessed the user is in the store, but that particular store may not have "now playing" information available (not all stores did).
7.  Also, often, when a customer enters a store, their phone will start to try to connect to the wifi. But, they may not have accepted terms of use. So if a customer is walking into a store, the network may be working outside, but stop working as they near wifi range.

So, by no fault of Starbucks', any number of things could go wrong here. How on earth do you even go about building something to handle this reliably?

## How we tackled it

First, as you probably guessed if you read the previous chapter, all the logic was contained in selector functions. Selectors could be used to inspect what point in the process we were. Unless all the prerequisite conditions were in place, the next actions would not be dispatched. This alone, was incredibly effective at just ensuring only the next possible thing would be triggered.

Also, at each point in the process where _any_ step of the process was successful the result would be persisted locally by means we'll discuss in the next chapter. Then, on startup, the application's initial data that we passed to `createStore` would always contain the contents of the reducers that had been successfully persisted. This meant we could march forward in this chain of events without ever needing to take a step back. It also meant that even if a user refreshed the browser or got disconnected because their phone was trying to jump to WiFi, the process would always be able to pick up where it left off, rather than having to start from the beginning.

## Recovering from errors

Since, as we stated, things were likely to go wrong I didn't want the whole thing to fail because part of it failed. Instead, I wanted it to wait a little bit then keep trying. In order to support this in addition to storing the result of the data fetches, I also kept track of the metadata _about_ the request. To be more specific, the reducers stored state that was structured like this:

```js
const state = {
  // the actual data, the payload of the successful requests
  data: null,

  // a flag to check whether currently loading
  loading: false,

  // timestamp of last successful fetch
  lastFetch: null,

  // timestamp of last error
  lastError: null,

  // The type of error that occurred
  error: null
}
```

The reducers would then do this type of thing:

```js
const reducer = (state, action) => {
  if (action.type === 'SUCCESS') {
    return Object.assign({}, data, {
      data: action.payload,
      // CAVEAT: Using Date.now() here
      // makes the reducer impure. Personally,
      // I don't mind, but it could certainly be
      // argued that this value should be passed
      // in as part of the action instead.
      lastFetch: Date.now(),
      loading: false,

      // clear any previous error data
      lastError: null,
      error: null
    })
  }

  // other conditions

  return state
}
```

In this way, by tracking this _metadata_ along with the data itself, we had enough information in selectors to determine what the next step should be.

If sufficient time had passed since the last error, the data was too stale, and we weren't currently fetching, we could in a reactor compare those timestamps to the "app time" and dispatch an action creator that give it another try.

With all these pieces combined I could build a very robust solution that would:

1.  Retry if there were network errors.
2.  Give up if there were "permanent" failures such as the user blocking geolocation.
3.  Persist any time it succeeded and automatically pick up where it left off.
4.  Automatically determine what to do next based on how long it had been.

Essentially, it was a "honey badger." You could just let it start, then sit there and refresh the browser but it would still keep marching forward until it completed. I think this type of resilience should be the standard for PWAs.

At first it a problem like this sounds quite daunting, but by breaking down the problem into smaller pieces, we can tackle them one by one and ultimately it's quite doable.

## Higher order reducers

You may have noticed in the example reducer where I just handled one `action.type` things get a little busy. Imagine if you have 4 or 5 different resources where you have to do this bookkeeping along with each reducer that needs these kinds of capabilities.

Humans are inconsistent. Handling _each_ of those conditions and tracking all that metadata correctly in many different reducers in our app sounds like a recipe for lots of evil, subtle, hard-to-track-down bugs.

We're programmers, no? Let's solve this with some programming. Instead of handwriting these complex reducer functions, perhaps we can write a function that will generate a reducer for us? You could call this approach "higher order reducers."

To do this, we need to write a function that will take a "base" action type and then return a reducer that handles the state changes for the error and success cases.

Let's target an API like this:

```js
import getMetadataReducer from 'get-metadata-reducer'
import { createStore, combineReducers } from 'redux'

const store = createStore(
  combineReducers({
    usersReducer: getMetadataReducer({
      baseType: 'FETCH_USERS'
    })
    // ...
    // ... other reducers
    // ...
  })
)
```

By using a convention for how our actions are named, we can write a function that supports that target API:

`get-metadata-reducer.js`

```js
export default ({ baseType }) => {
  const START = `${baseType}_START`
  const SUCCESS = `${baseType}_SUCCESS`
  const ERROR = `${baseType}_ERROR`

  const initialData = {
    data: null,
    lastError: null,
    error: null,
    lastFetch: null,
    loading: false
  }

  // here we're returning our customized reducer
  return (state, action) => {
    if (action.type === START) {
      return Object.assign({}, state, {
        loading: true
      })
    }
    if (action.type === SUCCESS) {
      // if successful we store our data
      // store the lastFetch timestamp
      // clear out any errors
      // and set loading to false
      return Object.assign({}, state, {
        data: action.payload,
        lastFetch: Date.now(),
        error: null,
        lastError: null,
        loading: false
      })
    }
    if (action.type === ERROR) {
      // we still want to leave existing
      // data intact as well as "last fetch"
      // which would let us determine if the
      // data is stale or not
      return Object.assign({}, state, {
        lastError: Date.now(),
        error: action.error,
        loading: false
      })
    }

    return state
  }
}
```

In this way, we can take something that sounds tedious, complex, and error-prone and turn it into something we can isolate, write unit tests for and _know_ works consistently.

Similarly, we can create helpers for our selectors that can determine if we should fetch something based on this _now consistent_ data structure and the current app time.

The "honey-badger" example available at: https://reduxbook.com/honey-badger is built on these ideas but uses tools from redux-bundler to do it. The resilience of this approach enables us to build some of those "riskier" features in a way that is ultimately reliable.

## Mixing higher-order reducers into your own reducer

One problem with generating reducers it that reducers are not always so generic. You may well end up in a scenario where you have a reducer where you want to do this type of metadata tracking, but you also need to handle additional action types.

As it turns out, we can manually compose the generated reducer with our own to accomplish this. If you recall from Chapter 3 on updating state, we can use `combineReducers` to nest reducers however we wish. Using `combineReducers` to keep our generated reducer separate from our customizations is probably cleaner, but that's not our only option.

Let's manually use our generated reducer inside a custom one to extend it with the ability to handle other action types as well:

```js
// just using the file we defined above
import getMetadataReducer from './get-metadata-reducer'
import { createStore, combineReducers } from 'redux'

const generatedReducer = getMetadataReducer({
  baseType: 'FETCH_USERS'
})

// we will write our own reducer here
const userReducer = (state, action) => {
  // we can just pass our state and action
  // through the generated reducer first.
  state = generatedReducer(state, action)

  if (action.type === 'SOME_OTHER_ACTION') {
    return Object.assign({}, state, {
      otherThing: true
    })
  }

  return state
}

const store = createStore(
  combineReducers({
    usersReducer
    // ...
    // ... other reducers
    // ...
  })
)
```

As you can see, since we're just dealing with simple functions here we can combine them however we wish.

**Note**: If you needed to add something to the `initialState` inside the generated reducer that could also be accomplished. We would change our `getMetadataReducer` helper to return an object containing both a generated `initialState` object _and_ the `reducer`.

Then, we we use it, we'd grab

```js
// again grabbing the file from above, that now has
// has been modified to also return `initialState`.
import getMetadataReducer from 'get-metadata-reducer'
import { createStore, combineReducers } from 'redux'

// now this would be an object with both initial
// and reducer, so we could grab them as variables
const { initialState, reducer } = getMetadataReducer({
  baseType: 'FETCH_USERS'
})

// here we can modify the initial state returned from
// our helper.
const initialUserState = Object.assign({}, initialState, {
  otherThing: false
})

// Now we'd pass our updated initial state
// as the initial state here:
const userReducer = (state = initialUserState, action) => {
  // remember `reducer` here is the one
  // generated by our helper above.
  state = reducer(state, action)

  // Here we can handle additional action types
  if (action.type === 'SOME_OTHER_ACTION') {
    return Object.assign({}, state, {
      otherThing: true
    })
  }

  return state
}
```

## Chapter recap

1.  Reliability is not the default on the web, this needs to change with PWAs, or we will continue to have a trust problem on The Web.
1.  Coupling data fetching to components doesn't allow for the reliability we're aiming for.
1.  I provided a real-world example of trying to show the "now playing" card in the Starbucks PWA powered by very seemingly complicated waterfall of things that had to occur reliably.
1.  I showed how to store metadata along with your data in reducers to enable your app to recover from errors.
1.  Higher-order reducers can be used to tackle tedious "bookkeeping" problems while significantly reducing the surface area for bugs.
1.  We can compose the generated reducer function into another reducer to customize behavior to support handling other action types as well.
1.  For an example of what you can do with this approach see: https://reduxbook.com/honey-badger

**If you enjoyed this the whole book is now available. It's called Human Redux buy it at [https://reduxbook.com](https://reduxbook.com)!**