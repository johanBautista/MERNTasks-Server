const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
  try {
    // crear nuevo proyecto
    const proyecto = new Proyecto(req.body);
    //guardar nuevo proyecto
    proyecto.save();
    //mensaje de confirmacion
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerProyecto = async (req, res) => {};

exports.actualizarProyecto = async (req, res) => {};

exports.eliminarProyecto = async (req, res) => {};
