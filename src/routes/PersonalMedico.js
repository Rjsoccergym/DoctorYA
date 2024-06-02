const express = require('express');
const router = express.Router();
const personalMedicoController = require('../controllers/PersonalMedicoController');

// Login del Personal Médico
router.post('/login', personalMedicoController.loginPersonalMedico);

// Crear un nuevo registro del personal médico
router.post('/', personalMedicoController.createPersonalMedico);

// Obtener todo el personal médico
router.get('/', personalMedicoController.getAllPersonalMedico);

// Obtener un empleado del personal médico por ID
router.get('/:numeroDocumento', personalMedicoController.getPersonalMedicoById);

// Actualizar un empleado del personal médico por ID
router.put('/:numeroDocumento', personalMedicoController.updatePersonalMedico);

// Eliminar un empleado del personal médico por ID
router.delete('/:numeroDocumento', personalMedicoController.deletePersonalMedico);

module.exports = router;