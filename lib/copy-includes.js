import fs from "fs-extra";
import path from "path";

// copy blog image dir
fs.copySync(
  path.join(__dirname, "/../src/includes"),
  path.join(__dirname, "/../dist/")
);
