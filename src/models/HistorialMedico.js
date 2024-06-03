// src/models/HistorialMedico.js
const mongoose = require('mongoose');

const HistorialMedicoSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  diagnostico: { type: String, required: true },
  recetas: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HistorialMedico', HistorialMedicoSchema);
