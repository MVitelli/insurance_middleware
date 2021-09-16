import jwt from "jsonwebtoken";
import customAxios from "../utils/customAxios.js";
import ApiError from "../utils/customError.js";

const comparePassword = (password) => password === process.env.CLIENT_SECRET;

const findUser = async (username) => {
  const { data } = await customAxios.get("clients");
  return data.find((user) => user.name === username);
};

const generateAccessToken = (username, password) => {
  const user = findUser(username);
  if (!user || !comparePassword(password)) {
    throw new ApiError(401, "Unauthorized");
  }
  const { name, email, role } = user;
  return jwt.sign({ name, email, role }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s"
  });
};
export default generateAccessToken;
