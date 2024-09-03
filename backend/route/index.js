const express = require("express");
const router = express.Router();

// For validating request body
const { body } = require("express-validator");

const appController = require("../controller");

// ==============================================================================================================================
// Get requests

router.get("/get-requests", appController.getRequests);
// ==============================================================================================================================

// ==============================================================================================================================
// Post requests

router.post(
  "/send-request",
  // Validating request body
  [[body("uid").isUUID(), body("request").isString()]],
  appController.saveRequest
);
// ==============================================================================================================================

module.exports = router;
