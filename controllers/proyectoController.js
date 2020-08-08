const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {
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

exports.obtenerProyecto = async (req, res) => {};

exports.actualizarProyecto = async (req, res) => {};

exports.eliminarProyecto = async (req, res) => {};
