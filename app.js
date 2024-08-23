import express from "express";


const app = express()
const PORT = 8000

import {config} from './dbconfig.js'

import pkg from 'pg'
const {Client} = pkg;

import cors from 'cors'
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉  ')
})

app.get('/canciones',async (req, res) => {
    const client = new Client(config);
    await client.connect();
    let result = await client.query("select * from public.canciones");
    await client.end();
    console.log(result.rows);
    res.send(result.rows)
  })
  
app.post('/canciones',async (req, res) => {
    const client = new Client(config);
    await client.connect();
    const cancion = req.body;
    console.log("Cancion", cancion)

    const result1 = await client.query("select max(id) from public.canciones");
    const max_id = result1.rows[0].max
    console.log("max id",max_id)
    const result2 = await client.query("insert into public.canciones(id,album, duracion, nombre) values ($1,$2,$3,$4)",
      [max_id+1,cancion.album, cancion.duracion, cancion.nombre ]);
    await client.end();
    res.status(200).json({message:"Success!"})
  })

app.get('/artistas',async (req, res) => {
    const client = new Client(config);
    await client.connect();
    let result = await client.query("select * from public.artistas");
    await client.end();
    console.log(result.rows);
    res.send(result.rows)
  })


  app.get('/artistas/:id/canciones',async (req, res) => {
    const {id} = req.params;
    const client = new Client(config);
    await client.connect();
    let result = await client.query("select c.* from public.canciones c, public.albumes a where c.album = a.id and artista=$1", [id]);
    await client.end();
    console.log(result.rows);
    res.send(result.rows)
  })


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  })