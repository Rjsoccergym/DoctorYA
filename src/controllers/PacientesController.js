const Paciente = require('../models/Paciente');

// Registrar un nuevo paciente
exports.createPaciente = async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json({ message: 'Paciente registrado con Éxito', paciente });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los pacientes registrados
exports.getPacientes = async (req, res) => {
  try {
    const total_paciente = await Paciente.find();
    res.status(200).json(total_paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener registro de un paciente por número de documento
exports.getPacienteById = async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ numeroDocumento: req.params.numeroDocumento });
    if (!paciente) {
      return res.status(404).json({ error: 'EL PACIENTE SELECCIONADO NO FUE ENCONTRADO' });
    }
    res.status(200).json(paciente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar el registro de un paciente por número de documento
exports.updatePaciente = async (req, res) => {
  const { telefono, email, ciudad, direccion, genero, contactoEmergencia } = req.body;
  try {
    const paciente = await Paciente.findOneAndUpdate(
      { numeroDocumento: req.params.numeroDocumento },
      { telefono, email, ciudad, direccion, genero, contactoEmergencia },
      { new: true }
    );
    if (!paciente) {
      return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
    }
    res.status(200).json({ message: 'Paciente actualizado con Éxito', paciente });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar registro de un paciente por número de documento
exports.deletePaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findOneAndDelete({ numeroDocumento: req.params.numeroDocumento });
    if (!paciente) {
      return res.status(404).json({ error: 'PACIENTE NO ENCONTRADO' });
    }
    res.status(200).json({ message: 'Paciente eliminado con Éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint para el login de Paciente
exports.loginPaciente = async (req, res) => {
  const { email, numeroDocumento } = req.body;

  try {
    // Buscar al paciente por email y número de documento
    const paciente = await Paciente.findOne({ email, numeroDocumento });

    if (!paciente) {
      return res.status(404).json({ error: 'CREDENCIALES INVÁLIDAS' });
    }

    // Si se encuentra, enviar mensaje de inicio exitoso
    const fechaHoraIngreso = new Date().toLocaleString();
    res.status(200).json({
      message: 'Inicio de sesión Exitoso',
      welcomeMessage: `Bienvenid@ ${paciente.nombre}`,
      fechaHoraIngreso
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar pacientes por nombre o número de identificación
exports.searchPacientes = async (req, res) => {
  const { nombre } = req.query;

  try {
    const query = {};
    if (nombre) query.nombre = new RegExp(nombre, 'i'); // búsqueda parcial e insensible a mayúsculas

    const pacientes = await Paciente.find(query);
    res.status(200).json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
