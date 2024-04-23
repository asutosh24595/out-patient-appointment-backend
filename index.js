import express from "express";
import { config } from "dotenv";
config();
import connectDb from "./src/config.js";
import router from "./src/routes/router.js";
const app = express();

const PORT = 8080;

app.use(express.json());

(async () => {
  await connectDb();
})();

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}...`);
});
