// This service is for sending email to fake server.

// Store
const store = require("../store");

// Services
const { getCombinedUserData } = require(".");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.ETHEREAL_USERNAME,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

// This function sends all requests to smpt server that has not sent status
async function sendRequestsToSmtpServer() {
  const combinedUserData = await getCombinedUserData();

  await Promise.all(
    combinedUserData.map(async (user) => {
      await user.requests.map(async (request) => {
        if (!request.isSent) {
          const info = await transporter.sendMail({
            from: "do_not_reply@northpole.com",
            to: "santa@northpole.com",
            subject: `USERNAME: ${user.username}, ADDRESS: ${user.address}`,
            text: request.request,
          });

          store.changeStateOfRequestById(request.requestId);
        }
      });
    })
  ).catch((e) => {
    throw new Error(e);
  });
}

module.exports = {
  sendRequestsToSmtpServer,
};
