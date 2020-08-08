//ruta para proyectos
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//crea proyecto
// api/proyectos
router.post(
  '/',
  auth,
  [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
  proyectoController.crearProyecto,
);

//obtener proyetos
router.get('/', auth, proyectoController.obtenerProyecto);

// actualizar proyectos
router.put(
  '/:id',
  [check('nombre', 'El nombre del proyecto es obligtorio').not().isEmpty()],
  proyectoController.actualizarProyecto,
);

// eliminar proyectos
router.delete('/:id', proyectoController.eliminarProyecto);

module.exports = router;
