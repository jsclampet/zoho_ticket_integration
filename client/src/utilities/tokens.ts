import axios from "axios";
interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const getAccessToken = async (): Promise<AccessTokenResponse | void> => {
  const response = await axios.get('http://localhost:3069/gettoken');
  return response;
};

// export const isTokenValid = (accessToken: string) =>  {

// };