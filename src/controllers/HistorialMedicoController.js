// controllers/HistorialMedicoController.js
const HistorialMedico = require('../models/HistorialMedico');
const Paciente = require('../models/Paciente');

// Obtener historial médico completo
exports.getHistorialMedico = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ numeroDocumento: req.params.numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }

        const historialMedico = await HistorialMedico.find({ pacienteId: paciente._id });
        if (historialMedico.length === 0) {
            return res.status(200).json({ message: 'EL PACIENTE NO TIENE DIAGNÓSTICOS REGISTRADOS', historialMedico });
        }

        res.status(200).json(historialMedico);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener historial médico por ID
exports.getHistorialMedicoByID = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ numeroDocumento: req.params.numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }
        const historialMedico = await HistorialMedico.findById(
            req.params.idHistorialMedico
        );
        if (!historialMedico) {
            return res.status(404).json({ error: 'EL REGISTRO NO FUE ENCONTRADO' });
        }
        res.status(200).json({ historialMedico });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Agregar nueva registro en el historial médico
exports.addHistorialMedico = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ numeroDocumento: req.params.numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }
        const historialMedico = new HistorialMedico({
            pacienteId: paciente._id,
            ...req.body,
        });
        await historialMedico.save();
        res.status(201).json({ message: 'Historial Médico registrado con Éxito', historialMedico });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar registro en el historial médico
exports.updateHistorialMedico = async (req, res) => {
    try {
        const paciente = await Paciente.findOne({ numeroDocumento: req.params.numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }
        const updateHistorialMedico = await HistorialMedico.findByIdAndUpdate(
            req.params.idHistorialMedico,
            { ...req.body, pacienteId: paciente._id },
            { new: true }
        );
        if (!updateHistorialMedico) {
            return res.status(404).json({ error: 'EL REGISTRO NO FUE ENCONTRADO' });
        }
        res.status(200).json({ message: 'Historial Médico actualizado con Éxito', updateHistorialMedico });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
