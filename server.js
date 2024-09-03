// Init server
const express = require("express");
const cors = require("cors");
const path = require("path");

// For scheduled tasks
const morgan = require("morgan");
const app = express();
const cron = require("node-cron");
const bodyParser = require("body-parser");

// Routers
const router = require("./backend/route");

// Service
const { sendRequestsToSmtpServer } = require("./backend/service/mail");

// Server configuration
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser());
app.use(morgan());
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// Inject routers
app.use("/", router);

// Cron job runs every 15 seconds
cron.schedule("*/60 * * * * *", () => {
  sendRequestsToSmtpServer();
  console.log("Running a task every 15 seconds");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
