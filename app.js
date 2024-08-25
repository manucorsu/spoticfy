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

app.get("/canciones/:searchTxt", async (req, res) => {
  try {
    const searchTxt = req.params.searchTxt;
    let qry = `
    SELECT public.canciones.nombre, 
    public.artistas.nombre AS artista, public.albumes.nombre AS album,
    public.canciones.duracion, public.canciones.reproducciones
    
    FROM public.canciones
    
    JOIN public.albumes ON public.canciones.album = public.albumes.id
    JOIN public.artistas ON public.albumes.artista = public.artistas.id
    `; //flashbacks de tp4
    if (searchTxt != "*") {
      qry += ` WHERE public.canciones.nombre = "${searchTxt}";`;
    }
    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});

app.get("/albumes/:searchTxt", async (req, res) => {
  try {
    const searchTxt = req.params.searchTxt;
    let qry = `
    SELECT public.albumes.nombre, public.artistas.nombre AS artista 
    FROM public.albumes 
    JOIN public.artistas ON public.artistas.id = public.albumes.artista
    `;
    if (searchTxt != "*") {
      qry += ` WHERE public.albumes.nombre = "${searchTxt}";`;
    }
    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});

app.get("/artistas/:searchTxt", async (req, res) => {
  try {
    const searchTxt = req.params.searchTxt;
    let qry = "SELECT public.artistas.nombre FROM public.artistas";
    if (searchTxt != "*") {
      qry += ` WHERE public.artistas.nombre = "${searchTxt}";`;
    }
    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});
