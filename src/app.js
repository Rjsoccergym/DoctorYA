// src/app.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');

// Cargar las variables de entorno desde el archivo .env
const dotenv = require('dotenv');
dotenv.config();

connectDB();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});