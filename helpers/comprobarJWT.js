import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const comprobarJWT = async (token = '') => {

  try {
    if (!token) {
      return null
    }
    const { id } = jwt.verify(token, process.env.FRASE_SECRETA);
    const usuario = await User.findById(id);

    if (!usuario) {
      return null
    }
    return usuario

  } catch (error) {
    console.log(error);
    return null;
  }

}