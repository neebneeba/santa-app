// Init server
const express = require("express");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// For scheduled tasks
const cron = require("node-cron");
const morgan = require("morgan");

// I run backend and frontend seperately so backend needs to allow orgin of frontend.
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

// Routers
const router = require("./route");

// Service
const { sendRequestsToSmtpServer } = require("./service/mail");

// Server configuration

app.use(bodyParser());
app.use(morgan());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
  })
);

// Injecting routers
app.use("/", router);

// Serving static files
app.get("/successfully-stored", (request, response) => {
  response.sendFile(__dirname + "/views/successfully-stored.html");
});

// Cron job runs every 15 seconds
cron.schedule("*/15 * * * * *", () => {
  sendRequestsToSmtpServer();
  console.log("Running a task every 15 seconds");
});

// listen for requests :)
const listener = app.listen(process.env.BACKEND_PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
