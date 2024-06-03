const Cita = require('../models/Cita');
const Paciente = require('../models/Paciente');
const PersonalMedico = require('../models/PersonalMedico');

// Obtener tipos de citas disponibles
exports.getTiposCita = async (req, res) => {
    try {
        const tiposCita = ['Odontología', 'Medicina General', 'Especialista', 'Psicología'];
        res.status(200).json(tiposCita);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Agendar una nueva cita médica
exports.addCita = async (req, res) => {

    try {
        // Buscar al paciente por su número de documento
        const paciente = await Paciente.findOne({ numeroDocumento: req.params.numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }

        // Verificar la existencia del médico por su ID
        const medico = await PersonalMedico.findById( req.body.medicoId );
        if (!medico) {
            return res.status(404).json({ error: 'EL MÉDICO ASIGNADO NO EXISTE' });
        }

        // Crear la nueva cita asignándole el pacienteId recuperado
        const cita = new Cita({ ...req.body, pacienteId: paciente._id, medicoId: medico._id, });
        await cita.save();

        res.status(201).json({ message: 'Cita creada Exitosamente', cita });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener todas las citas de un paciente por número de documento
exports.getCitas = async (req, res) => {
    const { numeroDocumento } = req.params;

    try {
        // Buscar al paciente por su número de documento
        const paciente = await Paciente.findOne({ numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }

        // Obtener las citas registradas al usuario
        const cita = await Cita.find({ pacienteId: paciente._id });

        if (!cita || cita == '') {
            return res.status(404).json({ error: 'EL USUARIO NO TIENE CITAS REGISTRADAS' });
        }

        res.status(200).json({ cita });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obtener cita por ID de un paciente
exports.getCitaByID = async (req, res) => {
    const { idCita, numeroDocumento } = req.params;

    try {
        // Buscar al paciente por su número de documento
        const paciente = await Paciente.findOne({ numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }

        // Verificar la existencia de la cita médica por su ID
        const citaFiltrada = await Cita.findById( idCita );
        if (!citaFiltrada) {
            return res.status(404).json({ error: 'LA CITA FILTRADA NO EXISTE' });
        }

        res.status(200).json({ citaFiltrada });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Actualizar una cita médica por su ID
exports.updateCita = async (req, res) => {
    const { idCita, numeroDocumento } = req.params;

    try {
        // Buscar al paciente por su número de documento
        const paciente = await Paciente.findOne({ numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }

        // Actualizar la cita por su ID y el pacienteId recuperado
        const cita = await Cita.findOneAndUpdate(
            { _id: idCita, pacienteId: paciente._id },
            req.body,
            { new: true }
        );

        if (!cita) {
            return res.status(404).json({ error: 'LA CITA A ACTUALIZAR NO EXISTE' });
        }

        res.status(200).json({ message: 'Cita actualizada Exitosamente', cita });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Eliminar una cita médica por su ID
exports.deleteCita = async (req, res) => {
    const { idCita, numeroDocumento } = req.params;

    try {
        // Buscar al paciente por su número de documento
        const paciente = await Paciente.findOne({ numeroDocumento });
        if (!paciente) {
            return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
        }

        // Eliminar la cita por su ID y el pacienteId recuperado
        const cita = await Cita.findOneAndDelete({ _id: idCita, pacienteId: paciente._id });

        if (!cita) {
            return res.status(404).json({ error: 'LA CITA A ELIMINAR NO EXISTE' });
        }

        res.status(200).json({ message: 'Cita eliminada Exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};