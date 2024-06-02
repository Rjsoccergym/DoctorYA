const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    fechaNacimiento: { type: Date, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    genero: { type: String, required: true },
    contactoEmergencia: { type: String, required: true },
    enfermedadesbase: { type: String, default: "" },
    alergiaMedicamento: { type: Boolean, default: false },
    nombreAlergiaMedicamento: { type: String, required: function() { return this.tieneAlergiaMedicamento; }, default: "" },
    diagnostico: { type: String, default: "" }
});

module.exports = mongoose.model('Paciente', PacienteSchema);