import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "pg";
import cors from "cors";

import { config } from "./dbconfig.js";

const app = express();
const PORT = 8000;
const { Client } = pkg;
const jwtkey = "clavesupersegurajwt"; ///???

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`API 👂 port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`API 🆗`);
});

app.get("/canciones", async (req, res) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query("select * from public.canciones");
  await client.end();
  console.log(result.rows);
  res.send(result.rows);
});

app.post("/canciones", async (req, res) => {
  const client = new Client(config);
  await client.connect();
  const cancion = req.body;
  console.log("Cancion", cancion);

  const result1 = await client.query("select max(id) from public.canciones");
  const max_id = result1.rows[0].max;
  console.log("max id", max_id);
  const result2 = await client.query(
    "insert into public.canciones(id,album, duracion, nombre) values ($1,$2,$3,$4)",
    [max_id + 1, cancion.album, cancion.duracion, cancion.nombre]
  );
  await client.end();
  res.status(200).json({ message: "Success!" });
});

app.get("/artistas", async (req, res) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query("select * from public.artistas");
  await client.end();
  console.log(result.rows);
  res.send(result.rows);
});

app.get("/artistas/:id/canciones", async (req, res) => {
  const client = new Client(config);
  const { id } = req.params;
  await client.connect();
  let result = await client.query(
    "select c.* from public.canciones c, public.albumes a where c.album = a.id and artista=$1",
    [id]
  );
  await client.end();
  console.log(result.rows);
  res.send(result.rows);
});

app.post("/usuarios", async (req, res) => {
  const client = new Client(config);
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

app.get("/usuarios/canciones", async (req, res) => {
  const client = new Client(config);
  await client.connect();
  console.log("req", req.headers);
  const jwtoken = req.headers.authorization.slice(7);
  console.log("jwt", jwtoken);
  try {
    const payload = await jwt.verify(jwtoken, jwtkey);
    console.log("Desencriptado:", payload);
    let result = await client.query("select * from favoritos where userid=$1", [
      payload.userid,
    ]);
    res.send(result.rows);
  } catch (e) {
    console.log("error jwt", e);
    res.send("Error jwt");
  }

  await client.end();
});

app.post("/login", async (req, res) => {
  const client = new Client(config);
  await client.connect();
  const { userid, password } = req.body;

  let result = await client.query("select * from usuarios where userid=$1", [
    userid,
  ]);
  console.log(result.rows[0]);
  const usuario_db = result.rows[0];
  const hashed = usuario_db.password;

  const match = await bcrypt.compare(password, hashed);
  await client.end();

  if (match) {
    const token = jwt.sign({ userid: usuario_db.userid }, jwtkey);
    res.send({
      nombre: usuario_db.nombre,
      email: usuario_db.email,
      token: token,
    });
    return;
  }
  res.send("Inexistente");
});