const express = require('express');
const router = express.Router();
const personal_medicoController = require('../controllers/Personal_MedicoController');

// Crear un nuevo registro del personal médico
router.post('/', personal_medicoController.createPersonal_Medico);

// Obtener todo el personal médico
router.get('/', personal_medicoController.getAllPersonal_Medico);

// Obtener un empleado del personal médico por ID
router.get('/:numeroDocumento', personal_medicoController.getPersonal_MedicoById);

// Actualizar un empleado del personal médico por ID
router.put('/:numeroDocumento', personal_medicoController.updatePersonal_Medico);

// Eliminar un empleado del personal médico por ID
router.delete('/:numeroDocumento', personal_medicoController.deletePersonal_Medico);

module.exports = router;