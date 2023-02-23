import http from "http";
import mongoose from "mongoose";
require("dotenv").config();
import app from "./app";

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.on("open", (err) => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL!);
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
