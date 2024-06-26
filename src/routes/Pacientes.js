const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/PacientesController');

// Login de Paciente
router.post('/login', pacientesController.loginPaciente);

// Crear un nuevo paciente
router.post('/', pacientesController.createPaciente);

// Obtener todos los pacientes
router.get('/', pacientesController.getPacientes);

// Obtener pacientes por nombre o número de documento
router.get('/search', pacientesController.searchPacientes);

// Obtener un paciente por número de documento
router.get('/:numeroDocumento', pacientesController.getPacienteById);

// Actualizar un médico por ID
router.put('/:numeroDocumento', pacientesController.updatePaciente);

// Eliminar un médico por ID
router.delete('/:numeroDocumento', pacientesController.deletePaciente);

module.exports = router;