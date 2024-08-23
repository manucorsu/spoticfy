import express from "express";
import { config } from "./dbconfig.js";
import pkg from "pg";
import cors from "cors";

const app = express();
const PORT = 8000;
const { Client } = pkg;

app.use(express.json());
app.use(cors());



app.listen(PORT, () => {
  console.log(`API 👂 port ${PORT}`);
})

app.get("/", (req, res) => {
  res.send(`API 🆗`);
})

app.get("/canciones", async (req, res) => {
  console.log("Trayendo todas las canciones...");
  const client = new Client(config);
  await client.connect();
  const result = await client.query("SELECT * FROM public.canciones");
  await client.end();
  res.send(result.rows);
})