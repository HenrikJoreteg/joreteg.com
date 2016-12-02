---
title: "Installing web apps on phones (for real)"
date: 2016-12-01 22:40:00 PST
tags: pwa, mobile, web, android, chrome
slug: installing-web-apps-for-real
...
If you're building for the web, you've likely heard the term "Progressive Web App" by now.

Its definition is a bit vague and somewhat contentious perhaps, but generally the idea is that it's a web page that has "taken all the right vitamins" so it can behave more like an app you installed from the app store. It starts as a normal tab in your browser and if it has all the *right stuff* the browser will prompt visitors if they'd like to "Add to Homescreen", which up to this point has largely equated to being a glorified bookmark.

Once opened from the Homescreen it hides the browser UI and appears as its own app when switching apps, etc.

**This is huge!**

If you're not familiar with the challenges currently facing native app developers, here are a few:

1. It's nearly impossible to break into the small group of 5 - 8 apps users use regularly.
2. On average, in the US, smartphone owners install [*zero* new apps per month](http://qz.com/253618/most-smartphone-users-download-zero-apps-per-month/).
3. You have no control over the approval process.
4. Paid apps obviously require paying fees to the app store.

PWAs are an attempt to hit the sweet spot balance between web and native. Fast, native-app-like experiences without the list of problems above. The simple act of opening one of these *Webpages With Special Sauce™* means you've already downloaded "the app" so there's no need for an App Store run-around where you ask users to download a 50mb binary over their flaky mobile connections just so they can read your web content. Arguably, it's really more like "saving experiences" you're currently having in your browser for easy access later, even if you're offline. This ability for a web page to graduate to becoming a full app-like experience appears, by all measures and case studies that have come out so far to be pure magic juice for businesses who care about you know, those silly little useless metrics like conversions or retention or whatnot. My professional interpretation of the data I've seen on this so far is: OMG.

But don't take my word for it, [watch this instead](https://youtu.be/eI3B6x0fw9s?t=14m3s).

PWAs are the entire reason I switched to Android after being on iOS for 7-some years. The [blog post I wrote about why I switched](https://joreteg.com/blog/why-i-switched-to-android) apparently struck a nerve. It had 80k+ uniques in the first two weeks and led to several response posts by folks like [Jeremy Keith](https://adactio.com/journal/10410), et. al. I'm not saying this to brag (well, maybe just a little), but the point is, this stuff is a big friggin' deal and we have good reason to be excited about it!

For me personally, building web apps that feel like native apps is something I've been trying to do for ages. Exhibit A: this screen cap [I made about something I built for this](https://vimeo.com/8254856) *seven* years ago!

Let's just say the concept has just always made a lot of sense to me. However...

## The implementations have historically fallen short

Of course, building app-like websites are hardly a new idea. This is how Steve Jobs originally proposed folks build for the iPhone! But as I explained in more detail in my post. I don't believe the incentives made sense for platforms to do this kind of thing at the time.

I'll spare you repeating my other post, you can [just go read it if that sounds interesting](https://joreteg.com/blog/why-i-switched-to-android).

## The time has come

PWAs have already come *a long* way even without the changes I'm discussing here. They're already solidly in the "very likely a much better investment than building native apps" category for most companies considering building mobile apps.

But, as awesome as PWAs are on Android, they still have had a few annoyances that keep them from being truly "first class citizens" on the platform.

For example:

1. PWAs added to Homescreen are not listed in the "all apps" panel on Android. This also means it isn't possible to have PWAs that are "installed" but not on a Homescreen somewhere like you can with other Android apps.
2. Once it's added to your Homescreen, the app developer can't later decide to change the name or the icon. Changing the published [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) has no impact on previous "Add to Homescreen"-ed apps.
3. When you migrate from one Android phone to another, as I recently did when I got a Pixel, my "installed" PWAs lost their full-screen-ness and didn't run in standalone mode until I removed and re-added them.
4. Even though App Store discovery has proven very challenging certainly users have been trained to look for apps in app stores. So if you tell your users you built an app the reaction is probably going to be to go search for it in the app store. But, as of right now, they're not listed in app stores (though [Microsoft is changing that](https://blogs.windows.com/msedgedev/2016/07/08/the-progress-of-web-apps/#clsLLk1RvqTVvAyK.97)).
5. The phrasing of "Add to Homescreen" is pretty weak. It doesn't imply that you're doing more than adding a bookmark. For better or worse we've taught users that apps are to be "installed". As a developer of PWAs, I can tell you that the phrase "Add to Homescreen" feels like it's selling what I built short. I know users won't quite get this, whereas they certainly know what "installing an app" means.
6. An installed native app can "own" a "url scope", which means its possible to create a link that opens an installed application. This may not seem like a big deal, but say you're building a password-less login system where a magic login link is emailed to you that logs you into the application. As it stands right now, there's no way for me to tell the OS to open that link in the installed PWA, instead they'll always open in the default browser.
7. Web push notifications as implemented right now, come from Chrome, not the PWA. This also means that if you block notifications, it's kind of all or nothing. Because the OS is blocking *Chrome* from notifying users.
8. Stuff like storage usage and battery consumption get bundled in with Chrome rather than being presented as isolated apps to the user.

So here's the interesting thing about all these problems: **most, if not all of them, stem from the fact that "installed PWAs" are *not truly apps* in the eyes of the operating system!**

## That's what's changing!

Soon "installed PWAs" will actually be APKs, as in *real* Android apps will be **created and side-loaded** into the OS by Chrome. This means they won't be websites that have been "Add to Homescreen"-ed they'll be **actually generated and installed** on the fly, and with the language to match.

It was rather subtly announced by [Paul Kinlan](https://twitter.com/paul_kinlan), please watch his talk from Chrome Dev Summit the specific part I'm referring to [starts right here](https://youtu.be/YJwrBbze_Ec?t=21m33s). It seemed like not a lot of people even caught it. Personally, I erupted into spontaneous applause (in fact, you can hear me on the video right [here](https://youtu.be/YJwrBbze_Ec?t=24m25s)), but I think, given that this was the last talk of the conference and a lot of folks were kinda zoning out I felt like perhaps the implications of this were a bit lost.

So, let me be clear: I think this is a **BIG FRIGGIN' DEAL** for the web and worth being very excited about!

## What happens?

Beware, I'm told the way it's implemented as I will describe below is not its final state. Apparently the whole "side-loading" bit will be smoothed over and be more seamless. There's a [list of bugs](https://bugs.chromium.org/p/chromium/issues/list?can=2&q=component%3AMobile) related to all of this stuff, you're curious.

It's not landed yet, it's currently behind a flag in Canary so details are sure to change, but you can try it today if you've got an up-to-date copy of Android and Chrome Canary installed.

### 1. Turn on the flag

Go to `chrome://flags` and enable "Improved add to Home screen":

<img src="/images/1/chrome-flag.png" width="270" height="480" />

### 2. Open a sweet PWA and install it...

I'd recommend something like [paperplanes.world](https://paperplanes.world/) and select "add to Homescreen" from the menu. You'll see this:

<img src="/images/1/prompt.png" width="270" height="480" />

**Note:** The language is all about "installing this application" because you're actually side-loading an Android APK here!

Next you get this "app installed" language:

<img src="/images/1/installed.png" width="270" height="480" />

And now, you've actually got an APK installed for this web app!

Which means it's also listed in my "all apps" view:

<img src="/images/1/all-apps.png" width="270" height="480" />

You can even view app info like other apps:

<img src="/images/1/app-info.png" width="270" height="480" />

### 3. Why does any of this matter?

A platform with over 1 billion monthly active mobile is working to make web apps first class citizens on that platform in every way they can. This is a *huge* deal. But, to be clear this isn't about Google and Chrome, sure the term Progressive Web App may have been [coined](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) and promoted by Googlers. But, don't confuse this with just being a Google Thing™.

I'm pretty sure the folks at Microsoft, Mozilla, and Opera would take that personally. Friggin' Steve Jobs promoted the basic idea. Microsoft has [committed to listing PWAs in their store](https://blogs.windows.com/msedgedev/2016/07/08/the-progress-of-web-apps/#clsLLk1RvqTVvAyK.97)! Which is actually more than Google has committed to doing though, if I were a betting man, I'd say this little APK tweak is a step they're taking in that direction. But regardless, the point is this isn't about Google, it's a Web Thing™.

Right now the Google folks are definitely among the group pushing the envelope with this concept the hardest. But none of this would get me excited if it were not based on extending the reach of standards-based web applications onto their host systems.

As someone who's been working in this space for a long time I'm super excited to see metrics support and economic forces all finally seem to be aligning behind this idea, its time seems to finally have come.

It's a good time to go all in on the web. I can't wait to see what the next few years bring. Personally, I feel like the web is well poised to replace the majority of apps we now get from app stores.

Oh, and for those of you worried about Apple, don't be. They don't like to be the laggard and there are positive signs that they're coming around to the idea. I think the best way to make that happen is to building amazing web experiences that make choosing to invest in building native apps for App Stores seem arduous and unnecessary. Apple certainly don't want Safari to be [the new IE](https://nolanlawson.com/2015/06/30/safari-is-the-new-ie/), so watch them closely and help speak out where you can.

If you want to (nicely) disagree with me or if you just think there may be something to this whole Web Thing™ I'm [@HenrikJoreteg](https://twitter.com/henrikjoreteg) on twitter you can hit me up there.
