import axios from "axios";
import dotEnv from "dotenv";

dotEnv.config();

const customAxios = axios.create({ baseURL: process.env.API_URL });

let apiToken = "";

const refreshAPIToken = async () => {
  const response = await customAxios.post("login", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });
  const { data } = response;
  return `${data.type} ${data.token}`;
};

customAxios.interceptors.request.use(
  (config) => {
    const newConfig = config;
    if (apiToken) {
      newConfig.headers = {
        Authorization: `${apiToken}`,
        Accept: "application/json",
      };
    }
    return newConfig;
  },
  (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    if (response) {
      if (response.status === 401) {
        apiToken = await refreshAPIToken();
        return customAxios(config);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
