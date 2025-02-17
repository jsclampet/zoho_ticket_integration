require("dotenv/config");
const axios = require("axios");
const express = require("express");
const port = process.env.PORT | 3005;
const refresh_token = process.env.REFRESH_TOKEN;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const params = new URLSearchParams({
  refresh_token,
  grant_type: "refresh_token",
  client_id: process.env.CLIENT_ID,
  client_secret: "adaede72d84a442a9561ddf32238c699f8d2c897a5",
  redirect_uri: "https://www.zoho.com",
  scope: "SDPOnDemand.requests.ALL",
});

const encodedParams = params.toString();

app.get("/getToken", async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      encodedParams
    );
    res.json({ access_token: response.data.access_token });
  } catch (err) {
    console.log(err.message);
    console.log(err);
    res.json({ error_message: err.message, status: err.status });
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      encodedParams
    );
    console.log("WORKED");
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.log(error);
    res.json("DIDNT WORK :-(, this is because ... >>>" + `${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
