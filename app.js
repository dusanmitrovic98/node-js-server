import {
  PATH_SSL_KEY,
  PATH_SSL_CERT,
  IP_ADDRESS,
  DEFAULT_PORT,
  DIRECTORY_SOURCE,
  PATH_VIEW_INDEX,
} from "./src/utility/constants/server.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import https from "https";
import cors from "cors";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", DIRECTORY_SOURCE)));

const options = {
  key: fs.readFileSync(PATH_SSL_KEY),
  cert: fs.readFileSync(PATH_SSL_CERT),
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, DIRECTORY_SOURCE, PATH_VIEW_INDEX));
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
