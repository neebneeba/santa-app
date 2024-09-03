// Store
const store = require("../store");

// Service
const service = require("../service");

// Utils
const { ageCalculator } = require("../utils/age_calculator");

// For validating user request
const { validationResult } = require("express-validator");

async function saveRequest(request, response) {
  // Getting validation result
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    // This line adds all error messages into single text
    let errorText = "";

    errors.array().map((item) => {
      errorText += `${item.path}: ${item.msg}\n`;
    });

    return response.status(400).send(errorText);
  }

  // Fetches user profile and check if request userId exists
  const userProfiles = await service.getUserProfiles();

  for (let item of userProfiles.data) {
    if (item.userUid === request.body.uid) {
      // Calculate age and if too old then show warning
      if (ageCalculator(item.birthdate) > 10) {
        return response
          .status(400)
          .send("You are too old to get a gift from santa !!!");
      }

      // Stores user request into in-memory variable
      store.addRequest({
        requestId: store.userRequests.length + 1,
        uid: request.body.uid,
        request: request.body.request,
        isSent: false,
      });

      // After saving the user request. it sends the message indicating that the request has received.
      return response.send("Successfully stored !!!");
    }
  }

  return response.status(400).send("You are not registered !!!");
}

function getRequests(request, response) {
  response.send(store.userRequests);
}

// ==============================================================================================================================
// ==============================================================================================================================
module.exports = {
  saveRequest,
  getRequests,
};
