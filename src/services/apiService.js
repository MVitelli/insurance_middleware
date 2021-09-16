import ApiError from "../utils/customError.js";
import generateAccessToken from "./authService.js";

const login = async (username, password) => {
  if (!username || !password) throw new ApiError(400, "Invalid Parameters");
  return generateAccessToken(username);
};

const getPolicies = async () => {};

const getClients = async () => {};

export { login, getPolicies, getClients };
