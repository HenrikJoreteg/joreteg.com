import data from "../data.json";
import React from "react";
import { render } from "react-dom";
import App from "./app";

let url;

if (typeof window !== "undefined") {
  url = window.location.pathname;
}

render(<App posts={data.posts} url={url} />, document.getElementById("app"));
