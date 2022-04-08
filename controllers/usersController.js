import bcryptjs from 'bcryptjs'

import generarJWT from '../helpers/jwt.js';
import Usuario from "../models/User.js"

export const getUser = (req, res) => {
  res.json({ msg: "get user" })
}
export const createUser = async (req, res = response) => {
  const { email, password, name } = req.body
  try {
    const usuario = new Usuario({ email, password, name })

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()
    const token = await generarJWT(usuario.id, usuario.name)
    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error en la peticion",
    });
  }

}