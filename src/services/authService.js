import jwt from "jsonwebtoken";
import clientRepository from "../repositories/clientRepository.js";
import ApiError from "../utils/customError.js";

const refreshTokens = {};

const comparePassword = (password) => password === process.env.CLIENT_SECRET;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const generateAccessToken = async (username, password) => {
  const user = await clientRepository.findUser(username);
  if (!user || !comparePassword(password)) {
    throw new ApiError(401, 0, "Unauthorized");
  }
  const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
  refreshTokens[user.id] = refreshToken;

  return {
    accessToken,
    refreshToken,
  };
};

const login = async (username, password) => {
  if (!username || !password) throw new ApiError(400, 0, "Invalid Parameters");
  const token = await generateAccessToken(username, password);
  return {
    ...token,
    type: "Bearer",
    expires_in: process.env.TOKEN_EXPIRATION,
  };
};

// eslint-disable-next-line consistent-return
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).send({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = user;
    next();
  });
};

const getNewToken = async (refreshToken) => {
  let accessToken;
  if (!refreshToken) throw new ApiError(401, 0, "Unauthorized");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) throw new ApiError(403, 0, "Forbidden");

    if (refreshTokens[user.id] !== refreshToken)
      throw new ApiError(403, 0, "Forbidden");

    const { iat, exp, ...otherAttrs } = user;

    accessToken = jwt.sign(otherAttrs, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  });
  return {
    accessToken,
  };
};

const logout = (refreshToken) => {
  const payload = jwt.decode(refreshToken);
  delete refreshTokens[payload.id];
};

export { login, authenticateJWT, getNewToken, logout };
