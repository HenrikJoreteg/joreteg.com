---

title: "Project Fugu: A New Hope"
date: 2020-06-10 22:00:00 PST
tags: pwa, mobile, web
slug: project-fugu-a-new-hope
...

Capabilities. That's what The Web needs.

Things like:

1. Face or other biometric logins for websites
2. USB connectivity
3. TCP and UDP sockets clients / servers
4. Serial connections
5. Geofencing and background location tracking
6. Screen lock / screen brightness
7. Barcode scanning / generation
8. Contacts API.
9. etc., etc., etc.

If a native app can do it, the web should be able to do also!

## Progress!

As it turns out the folks on the Chrome team feel the same.

In fact, there's an entire public spreadsheet with a really ambitious list of capabilities that have been identified as gaps between what the web can do and what native apps can do.

The web as an application platform, has an incredible future.

See it for yourself! [goo.gle/fugu-api-tracker](https://goo.gle/fugu-api-tracker)

![project fugu tracker](/images/fugu-tracker.png)

> > > This gives me a new hope for the future of The Web!

## Meanwhile over on IE, ahem... I mean Safari

The following appears to be the general attitude I see from the Webkit folks even for adding something as benign as screen lock **which requires explicit permission**. Ricky is a WebKit engineer and @othermaciej who responds with a similar attitude is currently **head of WebKit Engineering**:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Looking forward to the battery life benefits this API will bring.</p>&mdash; othermaciej (@othermaciej) <a href="https://twitter.com/othermaciej/status/1171963641098162176?ref_src=twsrc%5Etfw">September 12, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

That makes me sad.

## Why does any of this matter?

In short, because software distribution is hard.

Every other means of distribution involves a variety of B.S. that is unique to each platform you want to distribute to. This involves, but it not limited to:

1. Building/packaging
2. Code signing
3. App store approval seeking
4. App store revenue sharing.
5. Risk of being demoted in the lottery of app store picks and search engines.
6. Dealing with obsolescence due to platforms moving forward without backward compatibility.
7. Every time you want to do a material update, you have to repeat this same silly song and dance again... for each platform.

And _most_ of these little steps and requirements are different for _every_ platform you want to distribute to.

Take Windows, for example. If you want to provide a link to download an electron app installer from your site and you don't want to have to coach your users how to click through the Windows warnings when they try to run the installer you have to do code signing. Fine. Ok. No big deal, right?

Well, I'm doing this right now so... you have to:

1. Buy an Extended Validation cert for \$349 (a year)
2. Complete some really extensive information about your business.
3. Submit/upload a bunch of documentation, _including_ a formal attestation letter from your CPA (who obviously won't do this for free)
4. Then, once everything is submitted, they will _mail you a USB drive_ with the certificate on it.
5. _Then_ you get to sign your software.

Doable? Sure. Fun? Definitely not. Cost effective and sustainable? Not really.

## So, why not just stick to the web!?

That's what I'm trying to do! But sometimes, you need to do something that the web does not yet allow. More frequently, this is becoming "you need to do something that _Apple_ doesn't think the web should be able to do" (or won't prioritize the work required to implement).

This happens both in my consulting work (currently with Walmart, previously at Starbucks), and in my [AnesthesiaCharting.com](https://anesthesiacharting.com/) business. We keep running into these limitations of what the browser can do.

The common answer is, well... so just build native apps for that, or use Electron.

## Ok, let's look a little closer, maybe it's not actually so bad?

If you really "go all in" on native, you have to build at least _three_ different code bases instead of one.

If you're like my big clients, maybe that's worthwhile... _maybe_. But that doesn't mean it isn't a _a lot_ more work.

So, now you're probably thinking: "**Just use React Native, or Flutter, or Electron or some other meta platform!**"

But that still doesn't solve it, for several reasons. For example let's look at my business AnesthesiaCharting.com. We'd ideally want to support the following platforms:

1. Windows Desktop
2. Mac Desktop
3. iPad/iOS
4. Android Phones/Tablets
5. Chromebooks

So, I guess React Native can now mostly support all these. Flutter has a "alpha" support for Mac OS but not Windows.

And there's a giant gap in all these ideas: _none_ of the problems outlined previously about distributing on multiple platforms goes away.

If you _actually want to distribute and update software to all these platforms_ you still have to get approval everywhere, pay your developer fees, so you can sign your code, and set up a big complicated release process for pushing updates.

I feel like most people that throw this answer out have not actually done this themselves. It seems they're frequently spouting off things that they've heard at conferences from what I can only call "the marketing department" for these various technologies.

## What do all those platforms have in common?

All but _one_ of those 5 platforms I listed above _can run Chrome_! That means that I have a very capable web runtime available on all but _one_ of the platforms that my customers use.

Oh, in case you're wondering--iOS cannot run Chrome. Don't be fooled by the fact that you can install an app called "Chrome" from the Apple app store. It is _not_ actually Chrome, in fact, it's not even Safari. It's _less than Safari_. It's a WebKit web-view which, cannot even have things that Safari supports like ServiceWorker, let alone any of the other, more advanced APIs that expose the capabilities of the device.

## So what specific capabilities do I need that Web doesn't yet provide?

I've been finding myself working with serial ports recently. Yeah, that's right, good 'ol RS-232. A standard for device to device communication first published in **1960**!

It's dinosaur tech, but unlike the big lizards, this tech has stuck around. As it turns out, one of the most popular patient vitals monitors (you know the ones that show your heart rate, oxygen saturation, etc) is made by a company called Criticare. These things you can only talk to via, you guessed it: serial.

But it's not just for old tech, lots of robotics stuff and other simple controllers use serial connections.

As it turns out Google is working on a Web Serial API right now! It's in the Fugu tracker! In fact, it's already shipped as an [Origin Trial](https://developers.chrome.com/origintrials) that I'm in... and I'm **stoked**!

All I have to do is:

```js
const port = await navigator.serial.requestPort();
await port.open({ baudrate: 38400 });
```

Now I can read and write to the connected device!

## Why is that a big deal?

With those two lines above. I can distribute software via The Web that talks to these patient vitals monitors.

And it works with _no additional work_ on 4 of the 5 platforms I'm trying to target!

All I have to do is tell customers to use a Chromium-based browser.

## Pedantry

You can be as pedantic as you want about "browser engine diversity" you can say that "Google has too much control of the web", you can argue about all manner of pedantic things.

But at the end of the day, as a business trying to ship software to my customers, guess what I'm going to do?

I'm going to tell my customers to use a Chromium-based browser if they need to talk to a Criticare monitor.

I'll tell them to skip the fancy iPad Pro and buy a \$300 chromebook to use as a _clinical tool in their operatories_.

Forget Apple. I'm going to tell all these doctors that Apple is selling them sort and to buy a cheap chromebook or other device that can run a Chromium based browser.

Oh and hey, before you get too pedantic on me. This is a reminder that Microsoft is taking Chromium and using it to _compete with Chrome on user-facing features_! So is Brave and others.

> > > This is The Web we want.

A Web with all the capabilities we need, while keeping software distribution SIMPLE. Let the vendors compete on user-facing features, like password managers, privacy controls, etc. But, let's have the most capable open source browser engine available so we can get the capabilities we need to _ship software_.

This is why Project Fugu give me a new hope.

Thanks for reading! See ya on Twitter, I'm [@HenrikJoreteg](https://twitter.com/HenrikJoreteg) on there if you want to _kindly_ tell me all the ways I'm wrong :)
