const express = require('express');
const router = express.Router();
const citaController = require('../controllers/CitaController');

// Obtener tipos de cita disponibles
router.get('/tipos', citaController.getTiposCita);

// Obtener médicos disponibles para una fecha, hora y tipo de cita específicos
//router.get('/medicosDisponibles', citaController.getMedicos);

// Obtener todas las citas de un usuario por número de documento
router.get('/:numeroDocumento', citaController.getCitas);

// Obtener cita por ID de un usuario
router.get('/:numeroDocumento/:idCita', citaController.getCitaByID);

// Obtener detalles de una cita por ID en el email
router.get('/detalles/:numeroDocumento/:idCita', citaController.getInfoCitaByID);

// Agendar una nueva cita médica
router.post('/agendar/:numeroDocumento', citaController.addCita);

// Actualizar una cita por ID de cita y número de documento del usuario
router.put('/:numeroDocumento/:idCita', citaController.updateCita);

// Eliminar una cita por ID de cita y número de documento del usuario
router.delete('/:numeroDocumento/:idCita', citaController.deleteCita);

module.exports = router;