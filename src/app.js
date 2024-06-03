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

// Rutas Personal Médico
const personalMedicoRouter = require('./routes/PersonalMedico');
app.use('/api/personalMedico', personalMedicoRouter);

// Rutas Paciente
const pacientesRouter = require('./routes/Pacientes');
app.use('/api/paciente', pacientesRouter);

// Rutas Historial Médico
const historialMedicoRouter = require('./routes/HistorialMedico');
app.use('/api/historialMedico', historialMedicoRouter);

// Rutas Citas
const citaRouter = require('./routes/Cita');
app.use('/api/cita', citaRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});