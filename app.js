import express from "express";
import { config } from "./dbconfig.js";
import pkg from "pg";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 8000;
const { Client } = pkg;
const client = new Client(config);

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
    SELECT public.canciones.id, public.canciones.nombre, 
    public.artistas.nombre AS artista, public.albumes.nombre AS album,
    public.canciones.duracion, public.canciones.reproducciones
    
    FROM public.canciones
    
    JOIN public.albumes ON public.canciones.album = public.albumes.id
    JOIN public.artistas ON public.albumes.artista = public.artistas.id
    `; //flashbacks de tp4
    if (searchTxt != "*") {
      qry += ` WHERE public.canciones.nombre = '${searchTxt}';`;
    }
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
    SELECT public.albumes.id, public.albumes.nombre, public.artistas.nombre AS artista 
    FROM public.albumes 
    JOIN public.artistas ON public.artistas.id = public.albumes.artista
    `;
    if (searchTxt != "*") {
      qry += ` WHERE public.albumes.nombre = '${searchTxt}';`;
    }
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
    let qry =
      "SELECT public.artistas.id, public.artistas.nombre FROM public.artistas";
    if (searchTxt != "*") {
      qry += ` WHERE public.artistas.nombre = '${searchTxt}';`; //esto está mal había que usar $ y recién me entero.
    }
    await client.connect();
    const result = await client.query(qry);
    await client.end();
    res.send(result.rows);
  } catch (ex) {
    console.error(ex);
  }
});

app.post("/usuarios", async (req, res) => {
  await client.connect();
  const usuario = req.body;
  const hashed = await bcrypt.hash(usuario.password, 10);
  console.log("usuario", usuario);
  console.log("hashed", hashed);
  let result = await client.query(
    "insert into usuarios(userid, email, nombre, password) values($1, $2, $3, $4)",
    [usuario.userid, usuario.email, usuario.nombre, hashed]
  );
  await client.end();
  console.log(result.rows);
  res.send(result.rows);
});

app.post("/login/", async (req, res) => {
  await client.connect();
  const { userid, password } = req.body;
  let result = await client.query("select * from usuarios where userid=$1", [
    userid,
  ]);
  const usuario_db = result.rows[0];
  const hashed = usuario_db.password;
  const match = await bcrypt.compare(res.send(password, hashed));
  await client.end();
  if (match) {
    res.send("OK");
    return;
  } else {
    res.send("Los datos ingresados contienen un error.");
  }
});
