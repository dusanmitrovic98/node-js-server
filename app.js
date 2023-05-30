import {
  PATH_SSL_KEY,
  PATH_SSL_CERT,
  IP_ADDRESS,
  DEFAULT_PORT,
} from "./src/utility/constants/server.js";
import "dotenv/config.js";
import express from "express";
import dotenv from "dotenv";
import https from "https";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  key: fs.readFileSync(PATH_SSL_KEY),
  cert: fs.readFileSync(PATH_SSL_CERT),
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  let PORT = process.env.PORT || DEFAULT_PORT;

  https
    .createServer(options, app)
    .listen(PORT, IP_ADDRESS, () =>
      console.log(`Server url: https://${IP_ADDRESS}:${PORT}`)
    );
} catch (error) {
  console.log(`Error caught: ${error}`);
}
