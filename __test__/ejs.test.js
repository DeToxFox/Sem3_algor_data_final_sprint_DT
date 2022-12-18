const fs = require("fs");

test("index is accessible", async () => {
  const filePath = "index.js";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("home.ejs is accessible", async () => {
  const filePath = "views/home.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("display.ejs is accessible", async () => {
  const filePath = "views/display.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("currentTree.ejs is accessible", async () => {
  const filePath = "views/currentTree.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("503.ejs is accessible", async () => {
  const filePath = "views/503.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});

test("404.ejs is accessible", async () => {
  const filePath = "views/404.ejs";

  try {
    await fs.promises.access(filePath, fs.constants.R_OK);
    expect(true).toBe(true);
  } catch (err) {
    expect(true).toBe(false);
  }
});
