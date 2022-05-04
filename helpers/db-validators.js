import Usuario from "../models/User.js"
import Post from '../models/Post.js';
import Comentario from '../models/Comment.js';
export const emailExiste = async (email = '') => {

  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
}

export const existeUsuarioPorId = async (id) => {

  try {

    const existeUsuario = await Usuario.find({ _id: id });
    existeUsuario
    if (!existeUsuario[0]) {
      throw new Error(`El id no existe ${id}`);
    }
    return existeUsuario[0]
  } catch (error) {
    console.log(error);
  }
}
export const existePostPorId = async (idPost) => {
  const existePostPorId = await Post.findById(idPost);
  if (!existePostPorId) {
    throw new Error(`El id no existe ${idPost}`);
  }
  return existePostPorId;
}
export const existeComentPorId = async (idComent) => {
  const existeComentarioPorId = await Comentario.findById(idComent);
  if (!existeComentarioPorId) {
    throw new Error(`El id no existe ${idComent}`);
  }
}