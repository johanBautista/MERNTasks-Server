const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
  try {
    let usuario;

    //crea nuevo usuario
    usuario = new Usuario(req.body);
    // guardar nuevo usuario
    await usuario.save();
    //mensaje de confirmacion
    res.send('Usuario creado correctamente');
  } catch (error) {
    console.log(error);
    res.status(400).send('Error al crear Usuario');
  }
};
