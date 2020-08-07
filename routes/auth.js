//ruta para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

//Inicio de sesion
// api/auth
router.post(
  '/',
  [
    check('email', 'Agrega un email válido').isEmail(),
    check('password', 'El password debe ser minimo 6 caracteres').isLength({
      min: 6,
    }),
  ],
  authController.autenticarUsuario,
);

module.exports = router;
