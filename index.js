// Date: Dec 10, 2022
// Assignment: Final Sprint
// Course Name: Algorithms and Data Structures
// Written By: David Turner

const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 4500;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// allows the use of the public folder and static files like images, css, and js
app.use(express.static("public"));

// "/" is the root and routes to the home page
app.get("/", (req, res) => {
  res.render("home.ejs", { name: "David Turner" });
});

// Routes to the input page
const treeifyRouter = require("./routes/treeify");
app.use("/treeify", treeifyRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(
    `"Binary Search Tree" app running on port ${PORT}; Ctrl-C to terminate`
  );
});
