const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
};

//obtener Tarea del usuario actual
exports.obtenerTareas = async (req, res) => {};

//actualiza un Tarea
exports.actualizarTarea = async (req, res) => {};

//eliminar un Tarea
exports.eliminarTarea = async (req, res) => {};
