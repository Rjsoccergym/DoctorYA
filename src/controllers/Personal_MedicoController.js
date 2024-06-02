const Personal_Medico = require('../models/Personal_Medico');

// Crear un nuevo registro del personal médico
exports.createPersonal_Medico = async (req, res) => {
  try {
    const personal_medico = new Personal_Medico(req.body);
    await personal_medico.save();
    res.status(201).json({ message: 'Empleado creado con Éxito', personal_medico });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los registros del personal médico
exports.getAllPersonal_Medico = async (req, res) => {
  try {
    const total_personal_medico = await Personal_Medico.find();
    res.status(200).json(total_personal_medico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un registro por número de documento del personal médico
exports.getPersonal_MedicoById = async (req, res) => {
  try {
    const personal_medico = await Personal_Medico.findOne({ numeroDocumento: req.params.numeroDocumento });
    if (!personal_medico) {
      return res.status(404).json({ error: 'EL EMPLEADO SELECCIONADO NO FUE ENCONTRADO' });
    }
    res.status(200).json(personal_medico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar el registro por número de documento del personal médico
exports.updatePersonal_Medico = async (req, res) => {
  const { telefono, email, ciudad, direccion, genero, contactoEmergencia } = req.body;
  try {
    const personal_medico = await Personal_Medico.findOneAndUpdate(
      { numeroDocumento: req.params.numeroDocumento },
      { telefono, email, ciudad, direccion, genero, contactoEmergencia },
      { new: true }
    );
    if (!personal_medico) {
      return res.status(404).json({ error: 'EMPLEADO NO ENCONTRADO' });
    }
    res.status(200).json({ message: 'Empleado actualizado con Éxito', personal_medico });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un registro por número de documento del personal médico
exports.deletePersonal_Medico = async (req, res) => {
  try {
    const personal_medico = await Personal_Medico.findOneAndDelete({ numeroDocumento: req.params.numeroDocumento });
    if (!personal_medico) {
      return res.status(404).json({ error: 'EMPLEADO NO ENCONTRADO' });
    }
    res.status(200).json({ message: 'Empleado eliminado con Éxito' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};