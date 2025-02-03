import axios from "axios";

const refresh_token = import.meta.env.VITE_REFRESH_TOKEN;
const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

const isTokenValid = (accessToken) => {};

export const getAccessToken = async () => {
  const response = await axios({
    method: "post",
    baseURL: "https://accounts.zoho.com/oauth/v2/token?",
    params: {
      refresh_token,
      grant_type: "refresh_token",
      client_id,
      client_secret,
      scope: "SDPOnDemand.requests.ALL",
    },
  });

  console.log(response);
};

export default getAccessToken;
