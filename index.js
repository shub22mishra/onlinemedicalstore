const express = require("express");
const app = express();

app.get("/", (req, res) => {
  //   try {
  //     throw new Error("Foo");
  //     return res.send("Hello World!");
  //   } catch (e) {
  //     return res.status(500).send("Internal Server Error");
  //   }
  return res.send("hello world!");
});

app.listen(4000, () => {
  console.log("server running at port 4000");
});
module.exports = app;
