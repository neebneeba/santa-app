// For calling 3th party api
const serverAxiosInstance = require("axios").create({
  baseURL: process.env.GITHUB_USER_CONTENT,
});

module.exports = serverAxiosInstance;
