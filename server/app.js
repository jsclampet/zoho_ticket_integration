require("dotenv/config");
const axios = require("axios");
const express = require("express");
const dayjs = require("dayjs");
const port = process.env.PORT || 3005;
const refresh_token = process.env.REFRESH_TOKEN;
const qs = require("qs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const access_token_params = new URLSearchParams({
  refresh_token,
  grant_type: "refresh_token",
  client_id: process.env.CLIENT_ID,
  client_secret: "adaede72d84a442a9561ddf32238c699f8d2c897a5",
  redirect_uri: "https://www.zoho.com",
  scope: "SDPOnDemand.requests.ALL",
});

const encodeParams = (params) => params.toString();

app.get("/getToken", async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      encodeParams(access_token_params)
    );

    const created_time = dayjs().format("M/D/YY HH:mm");
    const expiry_time = dayjs().add(55, "minute").format("M/D/YY HH:mm");
    const access_token = response.data.access_token;

    console.log({ response, created_time, expiry_time });

    res.status(200);
    res.json({
      access_token,
      created_time,
      expiry_time,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error_message: err.message, status: err.status });
  }
});

app.post("/create_request", async (req, res) => {
  const url = "https://sdpondemand.manageengine.com/app/itdesk/api/v3/requests"; // Replace with your actual SDP domain
  const auth = JSON.parse(req.body.auth).access_token;
  const headers = {
    Accept: "application/vnd.manageengine.sdp.v3+json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Zoho-oauthtoken ${auth}`,
  };
  const input_data = {
    request: {
      subject: "Test ticket created from API",
    },
  };
  const postData = qs.stringify({
    input_data: JSON.stringify(input_data),
  });
  try {
    console.log(auth);
    const response = await axios.post(url, postData, { headers });
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
