import express from "express";
import { login } from "../services/apiService.js";

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

export default router;
