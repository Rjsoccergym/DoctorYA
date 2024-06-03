// routes/HistorialMedico.js
const express = require('express');
const router = express.Router();
const historialMedicoController = require('../controllers/HistorialMedicoController');

router.get('/:numeroDocumento', historialMedicoController.getHistorialMedico);
router.get('/:numeroDocumento/:idHistorialMedico', historialMedicoController.getHistorialMedicoByID);
router.post('/:numeroDocumento', historialMedicoController.addHistorialMedico);
router.put('/:numeroDocumento/:idHistorialMedico', historialMedicoController.updateHistorialMedico);

module.exports = router;