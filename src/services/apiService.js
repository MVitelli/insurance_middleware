import jwtDecode from "jwt-decode";
import customAxios from "../utils/customAxios.js";
import ApiError from "../utils/customError.js";

const login = async (username, password) => {
  if (!username || !password) throw new ApiError(400, "Invalid Parameters");

  const response = await customAxios.post(`${process.env.API_URL}login`, {
    client_id: username,
    client_secret: password,
  });

  const { data } = response;
  const decodedInfo = jwtDecode(data.token);
  const expiresIn = decodedInfo.exp - decodedInfo.iat;
  return {
    ...data,
    expires_in: expiresIn,
  };
};

const getPolicies = async () => {};

const getClients = async () => {};

export { login, getPolicies, getClients };
