const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema({
    tipoCita: {
        type: String,
        enum: ["Odontología", "Medicina General", "Especialista", "Psicología"],
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    pacienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paciente",
        required: true,
    },
    medicoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalMedico",
        required: true,
    }
});

const Cita = mongoose.model("Cita", citaSchema);

module.exports = Cita;
