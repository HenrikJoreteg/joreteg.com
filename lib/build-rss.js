import fs from "fs";
import path from "path";
import RSS from "rss";
import data from "../data.json";

var feed = new RSS({
  title: "Henrik Joreteg's Blog",
  description: "Mobile web consultant, developer, and speaker",
  generator: "node.js, sucka!",
  feed_url: "https://joreteg.com/rss",
  site_url: "https://joreteg.com",
  image_url: "https://joreteg.com/avatar.png",
  webMaster: "henrik@joreteg.com (Henrik Joreteg)",
  copyright: "Henrik Joreteg",
  language: "en",
  pubDate: new Date(),
});

const recentPosts = data.posts.filter((post) => !post.draft).slice(0, 20);

recentPosts.forEach((post) => {
  feed.item({
    title: post.title,
    description: post.html,
    url: "https://joreteg.com" + post.url,
    author: post.author || "Henrik Joreteg",
    date: new Date(post.date),
  });
});

fs.writeFileSync(
  path.join(__dirname, "/../dist", "rss.xml"),
  feed.xml(),
  "utf8"
);
