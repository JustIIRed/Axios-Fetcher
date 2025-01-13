console.log(`Starting Up...`);
console.log(`Init Env Vars...`);
require("dotenv").config(); // Ensure the .env file is loaded
const axios = require("axios");
const https = require("https");
const envState = process.env.ENV_STATE.trim(); // Ensure no extra spaces
const devUrl = `${process.env.DEV_URL}/api/post`;
const prodUrl = `${process.env.PROD_URL}/api/post`;
let URL = "";
switch (envState) {
  case "dev":
    URL = devUrl;
    break;
  case "prod":
    URL = prodUrl;
    break;
  default:
    URL = devUrl;
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
        username: "Axios Fetcher",
        role: "Client Requester",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TOKEN",
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
