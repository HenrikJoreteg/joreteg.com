import data from "../data.json";
import React from "react";
import { render } from "react-dom";
import App from "./app";

render(<App posts={data.posts} />, document.getElementById("app"));
