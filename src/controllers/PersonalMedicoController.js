const PersonalMedico = require('../models/PersonalMedico');

// Crear un nuevo registro del personal médico
exports.createPersonalMedico = async (req, res) => {
  try {
    const personalMedico = new PersonalMedico(req.body);
    await personalMedico.save();
    res.status(201).json({ message: 'Empleado creado con Éxito', personalMedico });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los registros del personal médico
exports.getAllPersonalMedico = async (req, res) => {
  try {
    const total_personalMedico = await PersonalMedico.find();
    res.status(200).json(total_personalMedico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un registro por número de documento del personal médico
exports.getPersonalMedicoById = async (req, res) => {
  try {
    const personalMedico = await PersonalMedico.findOne({ numeroDocumento: req.params.numeroDocumento });
    if (!personalMedico) {
      return res.status(404).json({ error: 'EL EMPLEADO SELECCIONADO NO FUE ENCONTRADO' });
    }
    res.status(200).json(personalMedico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar el registro por número de documento del personal médico
exports.updatePersonalMedico = async (req, res) => {
  const { telefono, email, ciudad, direccion, genero, contactoEmergencia } = req.body;
  try {
    const personalMedico = await PersonalMedico.findOneAndUpdate(
      { numeroDocumento: req.params.numeroDocumento },
      { telefono, email, ciudad, direccion, genero, contactoEmergencia },
      { new: true }
    );
    if (!personalMedico) {
      return res.status(404).json({ error: 'EMPLEADO NO ENCONTRADO' });
    }
    res.status(200).json({ message: 'Empleado actualizado con Éxito', personalMedico });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un registro por número de documento del personal médico
exports.deletePersonalMedico = async (req, res) => {
  try {
    const personalMedico = await PersonalMedico.findOneAndDelete({ numeroDocumento: req.params.numeroDocumento });
    if (!personalMedico) {
      return res.status(404).json({ error: 'EMPLEADO NO ENCONTRADO' });
    }
    res.status(200).json({ message: 'Empleado eliminado con Éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint para el login de Personal Médico
exports.loginPersonalMedico = async (req, res) => {
  const { email, numeroDocumento } = req.body;

  try {
    // Buscar al empleado por email y número de documento
    const personalMedico = await PersonalMedico.findOne({ email, numeroDocumento });

    if (!personalMedico) {
      return res.status(404).json({ error: 'CREDENCIALES INVÁLIDAS' });
    }

    // Si se encuentra, enviar mensaje de inicio exitoso
    const fechaHoraIngreso = new Date().toLocaleString();
    res.status(200).json({
      message: 'Inicio de sesión Exitoso',
      welcomeMessage: `Bienvenid@ ${personalMedico.nombre}`,
      fechaHoraIngreso
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};