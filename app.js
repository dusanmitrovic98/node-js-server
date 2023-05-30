import {
  PATH_SSL_KEY,
  PATH_SSL_CERT,
  IP_ADDRESS,
} from "./src/utility/constants/server.js";
import "dotenv/config.js";
import cors from "cors";
import express from "express";
import https from "https";
import fs from "fs";

const app = express();

app.use(cors());

const options = {
  key: fs.readFileSync(PATH_SSL_KEY),
  cert: fs.readFileSync(PATH_SSL_CERT),
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  https
    .createServer(options, app)
    .listen(process.env.PORT, IP_ADDRESS, () =>
      console.log(`Server url: https://${IP_ADDRESS}:${process.env.PORT}`)
    );
} catch (error) {
  console.log(`Error caught: ${error}`);
}
