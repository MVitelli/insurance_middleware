import dotEnv from "dotenv";
import express from "express";
import authRouter from "./src/routes/auth.js";
import clientRouter from "./src/routes/clients.js";
import policyRouter from "./src/routes/policies.js";
import { authenticateJWT } from "./src/services/authService.js";

dotEnv.config();

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);
app.use("/clients", authenticateJWT, clientRouter);
app.use("/policies", authenticateJWT, policyRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

export default app;
