import ApiError from "../utils/customError.js";
import customAxios from "../utils/customAxios.js";
import { generateAccessToken } from "./authService.js";

const login = async (username, password) => {
  if (!username || !password) throw new ApiError(400, 0, "Invalid Parameters");
  const token = await generateAccessToken(username, password);
  return {
    token,
    type: "Bearer",
    expires_in: process.env.TOKEN_EXPIRATION,
  };
};

const getPolicies = async (limit = 10, user) => {
  let { data: policies } = await customAxios.get("policies");

  if (user.role === "admin") policies = policies.slice(0, limit);
  else policies = policies.filter((policy) => policy.clientId === user.id);

  return policies.map(({ clientId, ...keepAttrs }) => keepAttrs);
};

const getClients = async () => {};

export { login, getPolicies, getClients };
