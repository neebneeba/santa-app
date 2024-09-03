// Main service file.

// Store
const store = require("../store");

// Api
const serverAxiosInstance = require("../api");

function getUsers() {
  return serverAxiosInstance.get("users.json");
}

function getUserProfiles() {
  return serverAxiosInstance.get("userProfiles.json");
}

async function getCombinedUserData() {
  const [usersResponse, profilesResponse] = await Promise.all([
    getUsers(),
    getUserProfiles(),
  ]);

  const users = usersResponse.data;
  const profiles = profilesResponse.data;

  // this will combine users data with profile data then return
  return users.map((user) => {
    const profile = profiles.find((profile) => profile.userUid === user.uid);
    const userRequests = store.getSentReadyRequestByUserId(user.uid);

    return {
      ...user,
      address: profile.address,
      birthdate: profile.birthdate,
      requests: userRequests,
    };
  });

  // return combinedData;
}

module.exports = {
  getUsers,
  getUserProfiles,
  getCombinedUserData,
};
