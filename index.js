const express = require("express");
const app = express();

app.get("/", function (req, res) {
  return res.send("hello world!");
});

app.listen(4000, function () {
  console.log("server running at port 4000");
});
