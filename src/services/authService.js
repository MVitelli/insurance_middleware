import jwt from "jsonwebtoken";
import customAxios from "../utils/customAxios.js";
import ApiError from "../utils/customError.js";

const comparePassword = (password) => password === process.env.CLIENT_SECRET;

const getUsers = async () => customAxios.get("clients");

const findUser = async (username) => {
  const { data } = await getUsers();
  return data.find((user) => user.name === username);
};

const generateAccessToken = async (username, password) => {
  const user = await findUser(username);
  if (!user || !comparePassword(password)) {
    throw new ApiError(401, 0, "Unauthorized");
  }
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: `${process.env.TOKEN_EXPIRATION}s`,
  });
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { generateAccessToken, authenticateJWT };
