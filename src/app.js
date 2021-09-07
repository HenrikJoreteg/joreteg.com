import React, { Component } from "react";
import Header from "./header";
import Post from "./post";
import Home from "./home";
import Blog from "./blog";
import FourOhFour from "./404";

export default class Index extends Component {
  render() {
    const { posts, url } = this.props;

    let page;
    let headerHeight = "short";

    let fallbackTitle = "Henrik Joreteg's Blog";

    if (!url || url === "/") {
      document.title = fallbackTitle;
      headerHeight = "full";
      page = <Home posts={posts.slice(0, 5)} />;
    }

    if (!page && url === "/blog/all") {
      document.title = fallbackTitle;
      page = <Blog posts={posts} />;
    }

    if (!page && url === "/404") {
      document.title = `Page not found. ${fallbackTitle}`;
      page = <FourOhFour />;
    }

    if (!page) {
      const found = posts.find((post) => post.url === url);
      if (found) {
        document.title = found.title || fallbackTitle;
        page = <Post post={found} />;
      }
    }

    return (
      <div>
        <Header height={headerHeight} />
        <main>{page}</main>
      </div>
    );
  }
}
