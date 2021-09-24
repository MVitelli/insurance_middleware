import express from "express";
import {
  getClientById,
  getClientPolicies,
  getClients,
} from "../services/apiService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit, name } = req.query;
  const { user } = req;

  try {
    const response = await getClients(user, limit, name);
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
    const response = await getClientById(user, id, true);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

router.get("/:id/policies", async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const response = await getClientPolicies(user, id, true);
    res.send(response);
  } catch (error) {
    console.log(`error`, error);
    const { status, ...info } = error;
    if (status) res.status(status).send({ ...info });
    else res.sendStatus(500);
  }
});

export default router;
