import express from "express";
import { getPolicies } from "../services/apiService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const { user } = req;

  try {
    const response = await getPolicies(limit, user);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

router.get("/:id", () => {});

export default router;
