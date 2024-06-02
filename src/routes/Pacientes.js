const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/PacientesController');

// Crear un nuevo paciente
router.post('/', pacientesController.createPaciente);

// Obtener todos los pacientes
router.get('/', pacientesController.getPacientes);

// Obtener un paciente por número de documento
router.get('/:numeroDocumento', pacientesController.getPacienteById);

// Actualizar un médico por ID
router.put('/:numeroDocumento', pacientesController.updatePaciente);

// Eliminar un médico por ID
router.delete('/:numeroDocumento', pacientesController.deletePaciente);

module.exports = router;