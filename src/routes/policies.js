import express from "express";
import { getPolicies, getPolicyById } from "../services/apiService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  const { user } = req;

  try {
    const response = await getPolicies(user, limit);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const response = await getPolicyById(user, id);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

export default router;
