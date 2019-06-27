---

title: "Improving Redux state transfer performance with JSON.parse(), a quick case study"
date: 2019-06-26 12:00:00 PST
tags: architecture, pwa, state, redux
slug: improving-redux-state-transfer-performance
...

**TLDR:** Turning Redux state into a JavaScript string you can parse with _JSON.parse()_ instead of an object literal, or inert script tag, appears to be _significantly_ faster than other approaches for sending Redux store state to the browser.

For my case making this one change shaved TTI (Time To Interactive) from an already pretty good _4.04s_ to _3.3s_, a _.74s_ or _~18%_ improvement. It increased the Lighthouse performance score an average of _8_ points from _87.2_ to _95.2_!

These results were unexpected, when I shared them on Twitter both [Addy Osmani](https://twitter.com/addyosmani) and [Mathias Bynens](https://twitter.com/mathias) asked me write it up... so here we are.

## Introduction

When doing Server-side Rendering (a.k.a SSR) it is common practice to render HTML and "[rehydrate](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#rehydration)" it in the browser using Preact or React.

Often times, this also requires you transfer the current application state to the browser, somehow. That way, when your application spins up in the browser, it can rehydrate with all the state it had on the server.

Most of my experience with doing this as a consultant is with [Redux](https://redux.js.org/). And, in my experience these Redux state dumps can easily get _way too big_... but I digress.

The best strategy is always to _minimize their size to begin with_. But, there are certain cases where that is difficult to do beyond a certain point, and plenty of other cases where things have already gotten out of hand and you're just trying to make thing better.

There are three predominant mechanisms (that I'm aware of) for doing this "state transfer."

They are:

## Option #1: Turn your state in to a JS object literal

This means that on the server-side you do something like _JSON.stringify(store.getState())_ and you end up with HTML that includes a script tag like this.

```html
<script>
  window.__REDUX__ = { some: "value", someOther: "value and so on" };
</script>
```

For this approach to work you also have to be careful about not including anything in your JSON that would make the browser think the script tag was terminating. So some extra escaping may be in order ([learn more here](https://mathiasbynens.be/notes/etago)). Additionally, using the result of _JSON.stringify()_ directly in JS source code was a potential security issue until recently, since JSON strings could contain certain characters that were invalid in JS strings. More recently, this has been addressed with a [spec-level proposal that made it into ES2019](https://github.com/tc39/proposal-json-superset).

But, as you'll see you probably won't want to use this approach anyway since it's the slowest option.

When this executes in the browser what was JSON on the server-side is treated and parsed by the browser as a JS object literal. No different than if you have written code like this, without the quoted key names:

```html
<script>
  window.__REDUX__ = { some: "value", someOther: "value and so on" };
</script>
```

But, it just has a few extra double quotes.

The important point in this case is that the data itself is parsed _as if it were JavaScript_.

## Option #2: Turn your state into an "inert" script

Browsers only will parse the contents of a _&lt;script&gt;_ tag if its type is _"module"_, _"text/javascript"_, or another [recognized JS MIME type](https://mimesniff.spec.whatwg.org/#javascript-mime-type), or well... it doesn't have a _type_ specified at all. So the point is _anything else you specify as a type_ means its contents will be ignored.

People use this for all manner of trickery, but it can also be used to transfer Redux state with a bit less escaping, but again, you still need to escape for stuff like _&lt;/script_ to protect against XSS issues.

Some people like to to give it a valid MIME type to make themselves feel better but... browser don't care.

For example:

```html
<script id="myState" type="application/json">
  {"your": "state", "goes": "here"}
</script>
```

Then you can later parse it by grabbing the element out of the DOM and parsing its contents in some other script like so:

```js
window.__REDUX__ = JSON.parse(
  querySelector("myState").innerHTML
);
```

Unlike approach #1, in this case, the browser _never interprets the data as JavaScript_ it merely parses a string as JSON, which is a much stricter data type, which as it turns out, is much faster.

_However_, this approach means that the browser first has to create a DOM element with a lot of text in it and _then_ you have to read that text from the DOM. This, as it turns out, is not without performance overhead of its own (results below).

## Option #3: Turn your state into JS String containing escaped JSON.

What you do end up with in your HTML is this:

```html
<script>
  window.__REDUX__ = JSON.parse("{\"some\":\"state\",\"other\":\"value\"}");
</script>
```

As it turns out, this is _way_ faster than the other options.

It may look a bit funny, but you still end up with a JS object. _However_, the key difference is that the contents of the data you're sending is _never interpreted as if it were code_. It's just a long JavaScript string literal, as far as the JavaScript parser is concerned. But, at runtime, it's _parsed as JSON_ and becomes a JS object instance just like all the other approaches.

**A quick note on how I generated the JSON string:** It turns out, it's not so easy to do this correctly, especially if you're including data from an API that you may not have full control over. Avoiding XSS is important here.

Anyway, again [thanks to Mathias](https://twitter.com/mathias/status/1143784574159347712), I ended up doing the following in node.js on the server-side to generate that string in a way that's safe to assume can be treated like a JavaScript string. I'm using his excellent: [jsesc library](https://github.com/mathiasbynens/jsesc) as well as his advice to do roughly something like this:

```js
const jsesc = require("jsesc");

// assume `data` here is the data we want to transfer
module.exports = data => {
  const jsonString = jsesc(JSON.stringify(data), {
    json: true,
    isScriptContext: true
  });

  return `
  <!DOCTYPE html>
  <html>
    <head>
      ... stuff here
    </head>
    <body>
      <div id='js-app'>${allTheAppHTML}</div>
      <script>window.__REDUX_STATE__ = JSON.parse(${jsonString})</script>
      <script src='/my-app.js'></script>
    </body>
  </html>
  `;
};
```

## I'm a stooge, all the credit goes to other people here

The inimitable [Addy Osmani](https://twitter.com/addyosmani) wrote an awesome post for the V8 project's blog about [The Cost of JavaScript in 2019](https://v8.dev/blog/cost-of-javascript-2019).

And I happened to see, the equally inimitable, [Mathias Bynens tweet](https://twitter.com/mathias/status/1143551692732030979) where he screencapped part of it about the cost of parsing JSON and suggested the JSON string approach (and later helped review this post).

I'm currently working on a Preact PWA project for a big client where we're doing SSR with a redux state transfer of an object bigger than I'd like it to be, so... i figured what the heck, let's try it.

What I found blew me away.

## The test setup

- Browser: Chrome Stable _75.0.3770.100_
- Audit Mechanism: Lighthouse Perf Audit, incognito mode, _Simulated Fast 3G, 4x CPU Slowdown_ setting, with no caching.
- Number of tests: 5 runs of each approach
- Size of Redux state in bytes: _163,980_ with escape slashes: _176,017_ added _7%_

The size of the state object here is significant. It's much bigger than I'd like it to be but it comes from an API that I have little control over so anyway...

## The results

Approach #1: JS Object Literal

```
Perf Score   TTI
83           4.0s
87           4.1s
89           4.1s
88           4.1s
89           3.9s

Avg:
87.2         4.04s
```

Approach #2: Inert Script Tag

```
Perf Score   TTI
90           4.0s
90           4.0s
92           4.1s
92           4.0s
90           4.0s

Avg:
90.8         4.02s
```

Approach #3: Escaped JSON String inside Script Tag

```
Perf Score   TTI
95           3.3s
95           3.2s
96           3.3s
96           3.4s
94           3.3s

Avg:
90.8         3.3s
```

## Summary

```
             Avg Perf Score   Avg. TTI
Approach #1: 87.2             4.04s
Approach #2: 90.8             4.02s
Approach #3: 90.8             3.3s
```

Conclusion: JSON String inside a real _&lt;script&gt;_ tag wins by a shocking margin. An _18%_ TTI improvement on an already pretty fast app is incredible for such a simple change.

Your mileage may vary, but if you're doing a state transfer like this I'd encourage you to try it for yourself.

Please tell me what you learn, I'm [@HenrikJoreteg](https://twitter.com/henrikjoreteg) on Twitter. Please, let me know what you find.

Some of my open questions that I don't really have time to dig into right this minute:

1. As Mathias pointed out to me in DM [Chrome 76 includes even faster JSON.parse](https://v8.dev/blog/v8-release-76#json.parse-improvements), how will this perform in Chrome 76+? Could this be even better?!?!
2. Would _.innerHTML_ versus _.textContent_ make any difference in approach #2?
3. How does this change impact performance in other browsers?

I'd love to hear your thoughts, but I wanted to share this while it was all still fresh in my mind. Hope this helps someone, thanks for reading!
