import axios from "axios";
interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const getAccessToken = async (): Promise<AccessTokenResponse | void> => {
  return await axios.get('http://localhost:3008/gettoken');
};
