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
  client_secret: process.env.CLIENT_SECRET,
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Request failed",
      details: error?.response?.data || error.message,
    });
  }
});

app.post("/create_request", async (req, res) => {
  const url = "https://sdpondemand.manageengine.com/app/itdesk/api/v3/requests";
  const auth = req.body.auth;
  const headers = {
    Accept: "application/vnd.manageengine.sdp.v3+json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Zoho-oauthtoken ${auth}`,
  };

  const postData = {
    input_data: JSON.stringify({
      request: {
        subject: "Test ticket created from API",
        category: {
          name: "MFA",
        },
        status: {
          name: "Open",
        },
      },
    }),
  };

  try {
    const response = await axios.post(url, qs.stringify(postData), { headers });
    console.log("Ticket Created:", response.data.request.display_id);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Unhandled Error:", error.message);
    }
    const messages = error?.response?.data?.response_status?.messages;

    res.status(500).json({
      message: "Request failed",
      details: messages?.length
        ? messages
        : error.response?.data || error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
