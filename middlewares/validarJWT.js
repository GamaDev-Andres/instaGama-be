import { response, request } from 'express';
import jwt from 'jsonwebtoken';

import Usuario from '../models/User.js';


export const validarJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.FRASE_SECRETA);
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en DB'
      })
    }

    req.usuario = usuario;
    next();

  } catch (error) {

    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    })
  }

}
