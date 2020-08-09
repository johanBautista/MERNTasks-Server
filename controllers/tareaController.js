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
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//actualiza un Tarea
exports.actualizarTarea = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    // Si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: 'No existe esa tarea' });
    }

    // extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No Autorizado' });
    }
    // Crear un objeto con la nueva información
    const nuevaTarea = {};
    if (nombre) nuevaTarea.nombre = nombre;
    if (estado) nuevaTarea.estado = estado;

    // Guardar la tarea
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//eliminar un Tarea
exports.eliminarTarea = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    // Si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: 'No existe esa tarea' });
    }

    // extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No Autorizado' });
    }
    // Eliminar Tarea
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Tarea Eliminada' });

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
