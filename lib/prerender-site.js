const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const browserPromise = puppeteer.launch();

const renderUrl = async (url) => {
  const browser = await browserPromise;
  const page = await browser.newPage();
  console.log("navigating to", "http://localhost:8000" + url);
  await page.goto("http://localhost:8000" + url);

  const html = await page.content();

  const $ = cheerio.load(html);
  $("head").append([
    '<link rel="apple-touch-icon-precomposed" href="/avatar.png" />',
    '<link rel="shortcut icon" href="/avatar.png" />',
  ]);
  $("#main-script").remove();

  console.log("rendered", url);

  let filename;
  if (url === "/") {
    filename = "/index.html";
  } else {
    filename = url + ".html";
  }

  fs.outputFileSync("dist" + filename, $.html(), "utf8");
};

const getAllUrls = () => {
  const postData = require("../data.json");
  const postUrls = postData.posts.map((post) => post.url);

  // the '/' needs to be last or it won't work
  return ["/blog/all", ...postUrls, "/"];
};

const renderUrls = async () => {
  const urls = getAllUrls();

  while (urls.length) {
    await renderUrl(urls.shift());
  }
};

renderUrls()
  .then(() => {
    console.log("done!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    throw err;
  });
