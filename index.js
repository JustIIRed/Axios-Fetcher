console.log(`Starting Up...`);
console.log(`Init Env Vars...`);
require("dotenv").config(); // Ensure the .env file is loaded
const axios = require("axios");
const https = require("https");

const envState = process.env.ENV_STATE.trim(); // Ensure no extra spaces
const devUrl = `${process.env.DEV_URL}/api/log`;
const prodUrl = `${process.env.PROD_URL}/api/log`;
let URL = "";

// Improved URL selection with logging
switch (envState) {
  case "dev":
    URL = devUrl;
    break;
  case "prod":
    URL = prodUrl;
    break;
  default:
    URL = devUrl; // Fallback devURL
    break;
}

console.log(`Environment State: ${envState}`);
console.log(`Selected URL: ${URL}`);

// Create an Axios instance that accepts self-signed certificates
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const testPostData = async () => {
  try {
    const response = await axiosInstance.post(
      URL,
      {
        username: "exampleUser",
        role: "admin",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-token",
        },
      }
    );

    // Log the full response object
    //console.log("Full response from server:", response);
    console.log("Response data from server:", response.data);
  } catch (error) {
    console.error("Error posting data:", error.message);
  }
};

testPostData();
