// src/services/mailService.js

const nodemailer = require('nodemailer');

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Asegúrate de configurar esto en tu archivo .env
        pass: process.env.EMAIL_PASS   // Asegúrate de configurar esto en tu archivo .env
    }
});

// Función para enviar correos electrónicos
const sendMail = async (destinatario, asunto, cuerpo) => {
    try {
        // Opciones del correo electrónico
        const opcionesCorreo = {
            from: process.env.EMAIL_USER,
            to: destinatario,
            subject: asunto,
            text: cuerpo
        };

        // Enviar el correo electrónico
        await transporter.sendMail(opcionesCorreo);
        console.log('Correo electrónico enviado con Éxito');
    } catch (error) {
        console.error('ERROR AL ENVIAR EL EMAIL:', error);
    }
};

module.exports = sendMail;