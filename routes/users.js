const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Ruta para mostrar el formulario de registro
router.get('/register', UserController.register);

// Ruta para procesar el registro
router.post('/register', UserController.processRegister);

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', UserController.login);

// Ruta para procesar el inicio de sesión
router.post('/login', UserController.processLogin);

module.exports = router;