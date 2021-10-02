import express from "express";
import authRouter from "./src/routes/auth.js";
import clientRouter from "./src/routes/clients.js";
import policyRouter from "./src/routes/policies.js";
import { authenticateJWT } from "./src/services/authService.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/clients", authenticateJWT, clientRouter);
app.use("/policies", authenticateJWT, policyRouter);

export default app;
