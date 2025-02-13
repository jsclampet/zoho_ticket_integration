import axios from "axios";

const refresh_token = import.meta.env.VITE_REFRESH_TOKEN;
const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// const isTokenValid = (accessToken: string) =>  {};

export const getAccessToken = async (): Promise<AccessTokenResponse | void> => {
  const response = await axios({
    method: "post",
    url: "https://accounts.zoho.com/oauth/v2/token?",
    withCredentials: false,
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

getAccessToken();