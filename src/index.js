import "dotenv/config.js";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () =>
  console.log(`Server url: https://localhost:${process.env.PORT}!`)
);
