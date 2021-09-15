import axios from "axios";
import ApiError from "./customError.js";

const customAxios = axios.create(process.env.API_URL);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        throw new ApiError(
          401,
          `${response.data?.error}: ${response.data?.message}`
        );
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
