const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // crear nuevo proyecto
    const proyecto = new Proyecto(req.body);
    //guardar el creador via jwt
    proyecto.creador = req.usuario.id;
    //guardar nuevo proyecto
    proyecto.save();
    //mensaje de confirmacion
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//obtener proyectos del usuario actual
exports.obtenerProyecto = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
    console.log('uno:', req.usuario);
    console.log('dos:', req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarProyecto = async (req, res) => {};

exports.eliminarProyecto = async (req, res) => {};
