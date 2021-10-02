import dotEnv from "dotenv";
import app from "./app.js";

dotEnv.config();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
