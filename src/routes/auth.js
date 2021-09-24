import express from "express";
import { login, getNewToken, logout } from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await login(username, password);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const response = await getNewToken(refreshToken);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    res.status(400).send({ message: "Provide a refresh token" });
  else {
    logout(refreshToken);
    res.send("Logout successful");
  }
});

export default router;
