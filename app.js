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
  try{
    console.log("Enviando todas las canciones...");
    const qry = `SELECT public.canciones.id, public.canciones.nombre, 
    public.artistas.nombre AS artista, albumes.nombre AS 
    album, canciones.duracion, canciones.reproducciones
  
    FROM public.canciones
  
    JOIN public.albumes ON public.canciones.album = public.albumes.id
    JOIN public.artistas ON public.albumes.artista = artistas.id
    
    WHERE canciones.id = ?;`;
  
    const client = new Client(config);
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);  
  } catch(ex){
    console.error(ex);
  }
})