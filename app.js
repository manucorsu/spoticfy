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
});

app.get("/", (req, res) => {
  res.send(`API 🆗`);
});

app.get("/canciones", async (req, res) => {
  try {
    console.log("Enviando todas las canciones...");
    const qry = `
    SELECT public.canciones.nombre, 
    public.artistas.nombre AS artista, public.albumes.nombre AS album,
    public.canciones.duracion, public.canciones.reproducciones
    
    FROM public.canciones
    
    JOIN public.albumes ON public.canciones.album = public.albumes.id
    JOIN public.artistas ON public.albumes.artista = public.artistas.id;
    `; //flashbacks de tp4

    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});

app.get("/albumes", async (req, res) => {
  try {
    console.log("Enviando todos los álbumes...");
    const qry = `
    SELECT public.albumes.nombre, public.artistas.nombre AS artista 
    FROM public.albumes 
    JOIN public.artistas ON public.artistas.id = public.albumes.artista;
    `;

    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});

app.get("/artistas", async (req, res) => {
  try {
    console.log("Enviando todos los artistas...");
    const qry = "SELECT public.artistas.nombre FROM public.artistas;";

    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});
