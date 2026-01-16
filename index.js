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

function oraculoTodo() {
  const oraculos = cargarOraculos();
  return oraculos;
}


// Endpoint JSON
app.get("/api/oraculo", (req, res) => {
  res.json(oraculoTodo());
});

// Página HTML con CSS oscuro inline
app.get("/", (req, res) => {
  const data = oraculoAleatorio();
  res.send(`
    <html>
      <head>
        <title>Oráculo de Hades</title>
        <style>
          body {
            background-color: #121212;
            color: #e0e0e0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 2rem;
            line-height: 1.6;
          }
          h1 {
            color: #bb86fc;
            text-shadow: 0 0 10px #7f39fb;
          }
          pre {
            background-color: #1e1e1e;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 0 15px #3700b3;
            overflow-x: auto;
            font-size: 1.1rem;
          }
          p {
            font-style: italic;
            margin-top: 2rem;
            color: #a0a0a0;
            text-align: center;
          }
          a {
            color: #bb86fc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>🔮 Oráculo de Hades</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        <p>Casa: Hades - Equipo: 6 - Plataforma: Render</p>
      </body>
    </html>
  `);
});

// Servidor activo
app.listen(PORT, () => {
  console.log(`☠️ Oráculo activo en http://localhost:${PORT}`);
});
