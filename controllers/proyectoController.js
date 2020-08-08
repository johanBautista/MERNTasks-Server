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
    // console.log('uno:', req.usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

//actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer info del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //revisar el id
    // console.log('dos:', req.params.id);
    let proyecto = await Proyecto.findById(req.params.id);

    //revisar si existe o no el proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }
    //verificar quien lo creo
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No Autorizado' });
    }
    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true },
    );
    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error en el servidor');
  }
};

//eliminar un proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar el id
    // console.log('dos:', req.params.id);
    let proyecto = await Proyecto.findById(req.params.id);

    //revisar si existe o no el proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }
    //verificar quien lo creo
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No Autorizado' });
    }
    //eliminar el proyecto
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Proyecto eliminado ok ' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
