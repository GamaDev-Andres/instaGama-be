import bcryptjs from 'bcryptjs';

import generarJWT from '../helpers/jwt.js';
import Usuario from '../models/User.js';

// api/auth
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en servidor'
    });
  }

}

export const renovarToken = async (req, res = response) => {

  const { usuario } = req;

  if (!usuario) {
    return res.status(500).json({
      msg: "se intenta renovar token, cuando no se ha verificado."
    })
  }
  try {
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error generando token"
    })
  }

}
