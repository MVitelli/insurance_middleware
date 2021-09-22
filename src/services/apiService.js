import policyRepository from "../repositories/policyRepository.js";
import ApiError from "../utils/customError.js";
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

const getPolicies = async (user) => {
  const policies = policyRepository.getAll(user);

  return policies.map(({ clientId, ...keepAttrs }) => keepAttrs);
};

const getPolicyById = async () => {};

const getClients = async () => {};

const getClientById = async () => {};

export { login, getPolicies, getClients, getPolicyById, getClientById };
