import express from "express";
import { login } from "../services/apiService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await login(username, password);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({ error });
  }
});

export default router;
