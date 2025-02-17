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
  const response = await axios.get('http://localhost:3069/gettoken');

  console.log(response);
};

getAccessToken();