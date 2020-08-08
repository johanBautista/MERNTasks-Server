//ruta para tareas
const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//crea proyecto
// api/tareas
router.post(
  '/',
  auth,
  [
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty(),
  ],

  tareaController.crearTarea,
);

//obtener proyetos
router.get('/', auth, tareaController.obtenerTareas);

// actualizar proyectos
router.put('/:id', auth, tareaController.actualizarTarea);

// eliminar proyectos
router.delete('/:id', auth, tareaController.eliminarTarea);

module.exports = router;
