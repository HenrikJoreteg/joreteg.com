import React, { Component } from "react";
import classnames from "classnames";

export default class Header extends Component {
  render() {
    const imageUrl = "https://static.joreteg.com/large_background.jpg";

    return (
      <header>
        <div>
          <img src={imageUrl} alt="Henrik speaking at a conference" />
        </div>
        <h2>{this.props.title}</h2>
        <p>{this.props.subtitle}</p>
        <p>
          <a href="/blog/all">posts</a> |{" "}
          <a href="http://twitter.com/henrikjoreteg">twitter</a> |{" "}
          <a href="mailto:henrik@joreteg.com">email</a> |{" "}
          <a href="http://consulting.joreteg.com">hire</a> |{" "}
          <a href="https://reduxbook.com">book</a> |{" "}
          <a href="https://anesthesiacharting.com">anesthesia charting pwa</a>
        </p>
      </header>
    );
  }
}

Header.defaultProps = {
  title: "Hi, I’m Henrik Joreteg",
  subtitle: "Mobile web consultant, developer, and speaker"
};
