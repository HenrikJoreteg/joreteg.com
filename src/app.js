import React, { Component } from "react";
import Header from "./header";
import Post from "./post";
import Home from "./home";
import Blog from "./blog";

export default class Index extends Component {
  render() {
    const { posts } = this.props;
    const url = window.location.pathname;

    let page;
    let headerHeight = "short";

    let fallbackTitle = "Henrik Joreteg's Blog";

    console.log("URL", url);

    if (url === "/") {
      document.title = fallbackTitle;
      headerHeight = "full";
      page = <Home posts={posts.slice(0, 5)} />;
    } else if (url === "/blog/all") {
      document.title = fallbackTitle;
      page = <Blog posts={posts} />;
    } else if (url.startsWith("/blog")) {
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
