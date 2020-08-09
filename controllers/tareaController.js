const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    //extraer el proyecto
    const { proyecto } = req.body;

    //comprobar si existe
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }
    //comprobar si pertenece al usuaroio autenticadao
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No Autorizado' });
    }

    // crear la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//obtener Tarea del usuario actual
exports.obtenerTareas = async (req, res) => {
  try {
    //extraer el proyecto
    const { proyecto } = req.body;

    //comprobar si existe
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }
    //comprobar si pertenece al usuaroio autenticadao
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No Autorizado' });
    }

    // obtener las tarea por proyecto
    const tareas =  await Tarea.find({proyecto})
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//actualiza un Tarea
exports.actualizarTarea = async (req, res) => {};

//eliminar un Tarea
exports.eliminarTarea = async (req, res) => {};
