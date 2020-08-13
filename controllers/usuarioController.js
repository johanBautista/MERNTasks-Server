const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

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

    //crear y firmar el jwt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    //firmar el jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1hora
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      },
    );
    // //mensaje de confirmacion
    // res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(400).send('Error al crear Usuario');
  }
};
