const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.post("/test", (_req, res) => {
  res.send({ path: "/test" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
