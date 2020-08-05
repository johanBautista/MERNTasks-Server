const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
  // destructuring email, pass
  const { email, password } = req.body;

  try {
    //verificar si hay usuario igual
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    //crea nuevo usuario
    usuario = new Usuario(req.body);

    //hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hashSync(password, salt);

    // guardar nuevo usuario
    await usuario.save();
    //mensaje de confirmacion
    res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(400).send('Error al crear Usuario');
  }
};
