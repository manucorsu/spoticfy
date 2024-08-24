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
  console.log("Enviando todas las canciones...");
  const qry = `SELECT canciones.id, canciones.nombre, 
  artistas.nombre AS nombre_artista, albumes.nombre AS 
  nombre_album, canciones.duracion, canciones.reproducciones

  FROM canciones

  JOIN albumes ON canciones.album = albumes.id
  JOIN artistas ON albumes.artista = artistas.id
  
  WHERE canciones.id = ?;`;

  const client = new Client(config);
  await client.connect();
  const result = await client.query(qry);
  await client.end();
  res.send(result.rows);
})