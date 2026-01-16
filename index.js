import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;

// Leer JSON de oráculos
function cargarOraculos() {
  const filePath = path.join(process.cwd(), "oraculos.json");
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Obtener oráculo aleatorio
function oraculoAleatorio() {
  const oraculos = cargarOraculos();
  return oraculos[Math.floor(Math.random() * oraculos.length)];
}

// Endpoint JSON
app.get("/api/oraculo", (req, res) => {
  res.json(oraculoAleatorio());
});

// Página HTML mínima
app.get("/", (req, res) => {
  const data = oraculoAleatorio();
  res.send(`
    <html>
      <head><title>Oráculo de Hades</title></head>
      <body>
        <h1>🔮 Oráculo de Hades</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        <p>Casa: Hades · Plataforma: Surge / Render / Railway</p>
      </body>
    </html>
  `);
});

// Servidor activo
app.listen(PORT, () => {
  console.log(`☠️ Oráculo activo en http://localhost:${PORT}`);
});
